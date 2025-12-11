use crate::models::seal::SmartSeal;

pub fn predict_seal_health(seal: &SmartSeal, hours_factor: f32, temp_factor: f32, vibration_factor: f32, claim_factor: f32) -> f32 {
    let base_health: f32 = 1.0;

    let health_score: f32 = (base_health * hours_factor * temp_factor * vibration_factor * claim_factor)
        .clamp(0.0, 1.0);

    health_score
}
