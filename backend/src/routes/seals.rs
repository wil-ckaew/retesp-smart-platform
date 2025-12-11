use axum::{
    Router,
    routing::{get, post, put, delete},
    Json,
    extract::{State, Path},
    response::IntoResponse,
    http::StatusCode,
};
use sqlx::PgPool;

use crate::models::seal::{
    SmartSeal,
    SealCreationRequest,
    SealQRResponse,
    SealStatus,
};
use uuid::Uuid;
use md5;

// ---------------------
// ROUTER
// ---------------------
pub fn router() -> Router<PgPool> {
    Router::new()
        .route("/", get(list_seals).post(create_seal))
        .route("/:id", get(get_seal).put(update_seal).delete(delete_seal))
}


// ---------------------
// HANDLERS
// ---------------------

pub async fn list_seals(
    State(pool): State<PgPool>
) -> impl IntoResponse {
    let seals: Vec<SmartSeal> = sqlx::query_as::<_, SmartSeal>(
        "SELECT * FROM smart_seals WHERE is_active = true"
    )
    .fetch_all(&pool)
    .await
    .unwrap_or_default();

    Json(seals)
}

pub async fn get_seal(
    State(pool): State<PgPool>,
    Path(id): Path<Uuid>,
) -> impl IntoResponse {
    let seal: Option<SmartSeal> = sqlx::query_as::<_, SmartSeal>(
        "SELECT * FROM smart_seals WHERE id = $1 AND is_active = true"
    )
    .bind(id)
    .fetch_optional(&pool)
    .await
    .unwrap();

    match seal {
        Some(seal) => Json(seal).into_response(),
        None => (StatusCode::NOT_FOUND, "Seal not found").into_response(),
    }
}

pub async fn create_seal(
    State(pool): State<PgPool>,
    Json(payload): Json<SealCreationRequest>,
) -> impl IntoResponse {

    let qr_hash = format!("{:x}", md5::compute(payload.serial_number.clone()));

    sqlx::query(
        "INSERT INTO smart_seals (
            id,
            serial_number,
            qr_code_hash,
            batch_number,
            material_type,
            size_code,
            current_status,
            is_active,
            created_at,
            updated_at
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,true,NOW(),NOW())"
    )
    .bind(Uuid::new_v4())
    .bind(&payload.serial_number)
    .bind(&qr_hash)
    .bind(&payload.batch_number)
    .bind(payload.material_type)
    .bind(&payload.size_code)
    .bind(SealStatus::InStock)
    .execute(&pool)
    .await
    .unwrap();

    Json(SealQRResponse { qr_code_hash: qr_hash })
}

#[derive(Debug, serde::Deserialize)]
pub struct SealUpdateRequest {
    pub current_status: Option<SealStatus>,
}

pub async fn update_seal(
    State(pool): State<PgPool>,
    Path(id): Path<Uuid>,
    Json(payload): Json<SealUpdateRequest>,
) -> impl IntoResponse {

    let updated = sqlx::query(
        "UPDATE smart_seals
         SET 
            current_status = COALESCE($1, current_status),
            updated_at = NOW()
         WHERE id = $2 AND is_active = true"
    )
    .bind(payload.current_status)
    .bind(id)
    .execute(&pool)
    .await;

    match updated {
        Ok(_) => (StatusCode::OK, "Updated").into_response(),
        Err(e) => {
            eprintln!("Update error: {:?}", e);
            (StatusCode::BAD_REQUEST, "Error updating seal").into_response()
        }
    }
}

pub async fn delete_seal(
    State(pool): State<PgPool>,
    Path(id): Path<Uuid>,
) -> impl IntoResponse {
    let deleted = sqlx::query(
        "UPDATE smart_seals
         SET is_active = false, updated_at = NOW()
         WHERE id = $1"
    )
    .bind(id)
    .execute(&pool)
    .await;

    match deleted {
        Ok(_) => (StatusCode::OK, "Deleted").into_response(),
        Err(_) => (StatusCode::BAD_REQUEST, "Error deleting seal").into_response(),
    }
}
