FROM rust:latest as builder

WORKDIR /app

# Copiar arquivos de configuração e dependências
COPY Cargo.toml Cargo.lock ./
COPY src ./src
COPY migrations ./migrations

# Instalar dependências do SQLx CLI
RUN cargo install sqlx-cli --no-default-features --features postgres
COPY .sqlx ./.sqlx 
# Build do projeto
RUN cargo build --release

# Rodar as migrações durante o build (opcional, ou fazer via docker-compose)
# ENV DATABASE_URL=postgres://postgres:password@db:5432/retesp_db
# RUN sqlx migrate run

# Container final
FROM debian:bookworm-slim

WORKDIR /app

# Instalar libs necessárias
RUN apt-get update && apt-get install -y libssl-dev ca-certificates && rm -rf /var/lib/apt/lists/*

# Copiar binário compilado e migrations
COPY --from=builder /app/target/release/retesp-backend ./retesp-backend
COPY ./migrations ./migrations

# Porta do backend
EXPOSE 8080

# Rodar o backend
CMD ["./retesp-backend"]
