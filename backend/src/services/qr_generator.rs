use crate::models::seal::{SmartSeal, SealQRResponse};
use md5;

pub fn generate_qr_code(seal: &SmartSeal) -> SealQRResponse {
    let qr_hash = format!("{:x}", md5::compute(&seal.serial_number));

    SealQRResponse {
        qr_code_hash: qr_hash,
    }
}
