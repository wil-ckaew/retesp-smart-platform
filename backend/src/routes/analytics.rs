use axum::{Router, routing::get, extract::State, Json};
use sqlx::PgPool;
use serde::Serialize;

pub fn router() -> Router<PgPool> {
    Router::new().route("/seals/summary", get(seal_summary))
}

#[derive(Serialize)]
struct SealSummary {
    total_seals: i64,
    installed: i64,
    operating: i64,
    critical: i64,
    failed: i64,
}

async fn seal_summary(State(pool): State<PgPool>) -> Json<SealSummary> {
    let total_seals: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM smart_seals")
        .fetch_one(&pool).await.unwrap_or((0,));
    let installed: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM smart_seals WHERE current_status='installed'")
        .fetch_one(&pool).await.unwrap_or((0,));
    let operating: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM smart_seals WHERE current_status='operating'")
        .fetch_one(&pool).await.unwrap_or((0,));
    let critical: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM smart_seals WHERE current_status='critical'")
        .fetch_one(&pool).await.unwrap_or((0,));
    let failed: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM smart_seals WHERE current_status='failed'")
        .fetch_one(&pool).await.unwrap_or((0,));

    Json(SealSummary {
        total_seals: total_seals.0,
        installed: installed.0,
        operating: operating.0,
        critical: critical.0,
        failed: failed.0,
    })
}
