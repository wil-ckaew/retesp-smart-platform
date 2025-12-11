use serde::{Deserialize, Serialize};
use uuid::Uuid;
use chrono::{DateTime, Utc};

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
