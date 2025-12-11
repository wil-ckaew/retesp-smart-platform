use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct ApiError {
    pub message: String,
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        let body = serde_json::to_string(&self).unwrap();
        (StatusCode::INTERNAL_SERVER_ERROR, body).into_response()
    }
}

pub fn not_found(msg: &str) -> ApiError {
    ApiError { message: msg.to_string() }
}
