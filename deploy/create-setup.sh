#!/bin/bash
set -e

echo "🚀 Iniciando setup da RETESP Smart Seal Platform..."

# Backend Rust
echo "🦀 Configurando backend Rust..."
if [ -f "../backend/Cargo.toml" ]; then
    cd ../backend
    cargo build
    cd - >/dev/null
else
    echo "⚠️ Cargo.toml não encontrado em ../backend. Pulei build."
fi

# Frontend Next.js
echo "⚛️ Configurando frontend Next.js..."
if [ -d "../frontend-web" ]; then
    cd ../frontend-web
    npm install --legacy-peer-deps
    cd - >/dev/null
else
    echo "⚠️ Diretório ../frontend-web não encontrado. Pulei npm install."
fi

# App React Native
echo "📱 Configurando app React Native..."
if [ -d "../frontend-mobile" ]; then
    cd ../frontend-mobile
    npm install --legacy-peer-deps || echo "⚠️ Problema de dependências do RN, considere usar Node 20+"
    cd - >/dev/null
else
    echo "⚠️ Diretório ../frontend-mobile não encontrado. Pulei npm install."
fi

# Banco de dados
echo "🐘 Configurando banco de dados..."
if [ -f "../backend/Cargo.toml" ]; then
    cd ../backend
    if command -v sqlx >/dev/null 2>&1; then
        sqlx database create
        sqlx migrate run
    else
        echo "⚠️ sqlx não encontrado, instale com: cargo install sqlx-cli --no-default-features --features postgres"
    fi
    cd - >/dev/null
fi

echo "✅ Setup completo!"
