use argon2::{Argon2, password_hash::{SaltString, PasswordHasher}};

pub fn hash_password(password: &str) -> String {
    let salt = SaltString::generate(&mut rand::thread_rng());
    let argon2 = Argon2::default();
    argon2.hash_password(password.as_bytes(), &salt).unwrap().to_string()
}
