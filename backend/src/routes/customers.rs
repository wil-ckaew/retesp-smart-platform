// src/routes/customers.rs
use axum::{
    extract::{Path, State},
    routing::{get, post, put, delete},
    Json, Router,
};
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use chrono::{DateTime, Utc};
use sqlx::PgPool;

#[derive(Debug, Serialize, Deserialize)]
pub struct Customer {
    pub id: Uuid,
    pub name: String,
    pub code: String,
    pub r#type: String,
    pub country: Option<String>,
    pub contact_email: Option<String>,
    pub contact_phone: Option<String>,
    pub plan_type: Option<String>,
    pub api_key: Option<String>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
    pub is_active: Option<bool>,
}

#[derive(Debug, Deserialize)]
pub struct CreateCustomer {
    pub name: String,
    pub code: String,
    pub r#type: String,
    pub country: Option<String>,
    pub contact_email: Option<String>,
    pub contact_phone: Option<String>,
    pub plan_type: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateCustomer {
    pub name: Option<String>,
    pub code: Option<String>,
    pub r#type: Option<String>,
    pub country: Option<String>,
    pub contact_email: Option<String>,
    pub contact_phone: Option<String>,
    pub plan_type: Option<String>,
    pub is_active: Option<bool>,
}

pub fn router() -> Router<PgPool> {
    Router::new()
        .route("/customers", get(get_all).post(create))
        .route("/customers/:id", get(get_one).put(update).delete(delete_customer))
}

async fn get_all(State(pool): State<PgPool>) -> Json<Vec<Customer>> {
    let items = sqlx::query_as!(
        Customer,
        r#"
        SELECT id, name, code, type, country, contact_email, contact_phone,
               plan_type, api_key, created_at, updated_at, is_active
        FROM customers
        ORDER BY created_at DESC
        "#
    )
    .fetch_all(&pool)
    .await
    .unwrap();

    Json(items)
}

async fn get_one(Path(id): Path<Uuid>, State(pool): State<PgPool>) -> Json<Customer> {
    let item = sqlx::query_as!(
        Customer,
        r#"
        SELECT id, name, code, type, country, contact_email, contact_phone,
               plan_type, api_key, created_at, updated_at, is_active
        FROM customers
        WHERE id = $1
        "#,
        id
    )
    .fetch_one(&pool)
    .await
    .unwrap();

    Json(item)
}

async fn create(State(pool): State<PgPool>, Json(payload): Json<CreateCustomer>) -> Json<Customer> {
    let created = sqlx::query_as!(
        Customer,
        r#"
        INSERT INTO customers (
            name, code, type, country, contact_email, contact_phone,
            plan_type, api_key, created_at, updated_at, is_active
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, gen_random_uuid(), now(), now(), true)
        RETURNING id, name, code, type, country, contact_email, contact_phone,
                  plan_type, api_key, created_at, updated_at, is_active
        "#,
        payload.name,
        payload.code,
        payload.r#type,
        payload.country,
        payload.contact_email,
        payload.contact_phone,
        payload.plan_type
    )
    .fetch_one(&pool)
    .await
    .unwrap();

    Json(created)
}

async fn update(Path(id): Path<Uuid>, State(pool): State<PgPool>, Json(payload): Json<UpdateCustomer>) -> Json<Customer> {
    let updated = sqlx::query_as!(
        Customer,
        r#"
        UPDATE customers
        SET 
            name = COALESCE($2, name),
            code = COALESCE($3, code),
            type = COALESCE($4, type),
            country = COALESCE($5, country),
            contact_email = COALESCE($6, contact_email),
            contact_phone = COALESCE($7, contact_phone),
            plan_type = COALESCE($8, plan_type),
            is_active = COALESCE($9, is_active),
            updated_at = now()
        WHERE id = $1
        RETURNING id, name, code, type, country, contact_email, contact_phone,
                  plan_type, api_key, created_at, updated_at, is_active
        "#,
        id,
        payload.name,
        payload.code,
        payload.r#type,
        payload.country,
        payload.contact_email,
        payload.contact_phone,
        payload.plan_type,
        payload.is_active
    )
    .fetch_one(&pool)
    .await
    .unwrap();

    Json(updated)
}

async fn delete_customer(Path(id): Path<Uuid>, State(pool): State<PgPool>) -> Json<bool> {
    sqlx::query!("DELETE FROM customers WHERE id = $1", id)
        .execute(&pool)
        .await
        .unwrap();

    Json(true)
}

