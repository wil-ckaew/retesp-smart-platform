pub fn validate_serial_number(serial: &str) -> bool {
    !serial.is_empty() && serial.len() <= 50
}

pub fn validate_email(email: &str) -> bool {
    email.contains("@") && email.contains(".")
}
