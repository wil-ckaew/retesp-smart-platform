use serde::{Serialize, Deserialize};
use sqlx::FromRow;
use sqlx::Type;
use uuid::Uuid;
use chrono::{DateTime, Utc};
use serde_json::Value;

#[derive(Debug, Serialize, Deserialize, Type, Clone)]
#[sqlx(type_name = "seal_material", rename_all = "snake_case")]
pub enum SealMaterial {
    Nitrile,
    Viton,
    Silicone,
    Polyurethane,
    Ptfe,
    Custom,
}

impl Default for SealMaterial {
    fn default() -> Self {
        SealMaterial::Nitrile
    }
}

#[derive(Debug, Serialize, Deserialize, Type, Clone)]
#[sqlx(type_name = "seal_status", rename_all = "snake_case")]
pub enum SealStatus {
    InStock,
    Shipped,
    Installed,
    Operating,
    Warning,
    Critical,
    Failed,
    Replaced,
}

impl Default for SealStatus {
    fn default() -> Self {
        SealStatus::InStock
    }
}

#[derive(Debug, Serialize, Deserialize, Type, Clone)]
#[sqlx(type_name = "scan_type", rename_all = "snake_case")]
pub enum ScanType {
    Production,
    QualityCheck,
    Shipping,
    Receiving,
    Installation,
    Maintenance,
    Inspection,
    Replacement,
}

#[derive(Debug, Serialize, Deserialize, FromRow, Clone, Default)]
pub struct SmartSeal {
    pub id: Uuid,
    pub serial_number: String,
    pub qr_code_hash: String,

    // Manufacturing
    pub batch_number: String,
    pub production_date: Option<DateTime<Utc>>,
    pub production_line: Option<String>,
    pub operator_id: Option<String>,

    // Specifications
    pub material_type: SealMaterial,
    pub size_code: String,
    pub temperature_rating: Option<i32>,
    pub pressure_rating: Option<f32>,

    // Installation
    pub customer_id: Option<Uuid>,
    pub vehicle_vin: Option<String>,
    pub installation_date: Option<DateTime<Utc>>,
    pub installer_id: Option<String>,
    pub installation_location: Option<String>,

    // Status
    pub current_status: SealStatus,
    pub health_score: Option<f32>,
    pub last_scanned: Option<DateTime<Utc>>,
    pub total_operating_hours: Option<f32>,

    // Sensor data
    pub last_temperature: Option<f32>,
    pub last_vibration: Option<f32>,
    pub last_pressure: Option<f32>,

    // Analytics
    pub predicted_failure_date: Option<DateTime<Utc>>,
    pub failure_probability_7d: Option<f32>,
    pub failure_probability_30d: Option<f32>,

    // Warranty
    pub warranty_end_date: Option<DateTime<Utc>>,
    pub warranty_claim_count: Option<i32>,

    // Metadata
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub is_active: bool,
}

#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
pub struct SealScanEvent {
    pub id: Uuid,
    pub seal_id: Uuid,
    pub scanner_id: String,
    pub location: Option<String>,
    pub gps_latitude: Option<f64>,
    pub gps_longitude: Option<f64>,
    pub gps_accuracy: Option<f32>,
    pub scan_type: ScanType,
    pub notes: Option<String>,
    pub sensor_data: Option<Value>,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SealCreationRequest {
    pub serial_number: String,
    pub batch_number: String,
    pub material_type: SealMaterial,
    pub size_code: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SealQRResponse {
    pub qr_code_hash: String,
}
