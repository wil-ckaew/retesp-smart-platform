use axum::{
    Router,
    routing::{post},
    extract::State,
    Json,
};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;

pub fn router() -> Router<PgPool> {
    Router::new()
        .route("/login", post(login))
}

#[derive(Deserialize)]
pub struct LoginRequest {
    pub username: String,
    pub password: String,
}

#[derive(Serialize)]
pub struct LoginResponse {
    pub token: String,
}

async fn login(State(pool): State<PgPool>, Json(payload): Json<LoginRequest>) -> Json<LoginResponse> {
    // TODO: autenticação real
    Json(LoginResponse {
        token: "fake-jwt-token".to_string()
    })
}
