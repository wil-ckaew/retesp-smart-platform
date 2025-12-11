use axum::{
    Router,
    routing::get,
    http::Method,
};
use tower_http::{
    cors::{CorsLayer, Any},
    trace::TraceLayer,
    compression::CompressionLayer,
};
use std::net::SocketAddr;
use tracing_subscriber::EnvFilter;
use dotenvy::dotenv;

mod models;
mod routes;
mod services;
mod database;
mod utils;
mod errors;

use routes::{seals, auth, analytics, customers};
use database::get_pool;

#[tokio::main]
async fn main() {
    dotenv().ok();

    tracing_subscriber::fmt()
        .with_env_filter(EnvFilter::from_default_env())
        .with_target(false)
        .pretty()
        .init();

    let pool = get_pool()
        .await
        .expect("❌ Failed to connect to database");

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods([
            Method::GET,
            Method::POST,
            Method::PUT,
            Method::DELETE,
            Method::OPTIONS,
        ])
        .allow_headers(Any);

    let app = Router::new()
        .route("/health", get(|| async { "RETESP Smart Seal Platform API v1.0.0" }))
        .nest("/api/auth", auth::router())
        .nest("/api/seals", seals::router())
        .nest("/api/customers", customers::router())
        .nest("/api/analytics", analytics::router())
        .layer(cors)
        .layer(TraceLayer::new_for_http())
        .layer(CompressionLayer::new())   // Brotli ativo automaticamente
        .with_state(pool);

    let addr = SocketAddr::from(([0, 0, 0, 0], 3000));
    tracing::info!("🚀 Server starting on http://{}", addr);

    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .expect("❌ Failed to bind TCP");

    axum::serve(listener, app)
        .await
        .expect("❌ Server crashed");
}
