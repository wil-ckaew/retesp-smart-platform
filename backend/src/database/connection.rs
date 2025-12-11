use sqlx::PgPool;
use std::env;

pub async fn establish() -> Result<PgPool, sqlx::Error> {
    let database_url = env::var("DATABASE_URL").unwrap_or_else(|_| "postgres://retesp:retesp@localhost:5432/retesp_db".to_string());
    PgPool::connect(&database_url).await
}
