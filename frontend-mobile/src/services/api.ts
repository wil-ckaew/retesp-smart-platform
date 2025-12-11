// Simple API stubs. Replace baseUrl with your backend.
const BASE = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8000";

export async function loginRequest(email: string, password: string) {
  // Replace with real fetch
  return { token: "mock-token", user: { id: "1", email, name: "Admin" } };
}

export async function registerRequest(name: string, email: string, password: string) {
  return { token: "mock-token", user: { id: "2", email, name } };
}

export async function fetchMe(token: string) {
  return { id: "1", email: "admin@retesp.com", name: "Admin RETESP" };
}

export async function scanSeal(qr: string, meta: any) {
  // mock response
  return {
    seal_id: qr.replace(/[^0-9]/g, "") || "0000",
    serial_number: qr,
    batch_number: "BATCH-2024-01",
    health_score: 87.5,
    current_status: "operating",
    total_operating_hours: 1450,
    predicted_failure_date: null,
    failure_probability_7d: 0.12,
    scan_timestamp: new Date().toISOString(),
    ...meta,
  };
}

export async function getSealById(id: string) {
  return { id, serial_number: `RET-${id}`, batch_number: "BATCH-2024-01", material_type: "Nitrile", current_status: "operating", health_score: 87.5, installation_date: new Date().toISOString(), total_operating_hours: 1450.5, warranty_end_date: new Date().toISOString() };
}

export async function getSealHealth(id: string) {
  return { failure_probability_7d: 0.12, failure_probability_30d: 0.2, failure_probability_90d: 0.35, predicted_failure_date: null };
}
