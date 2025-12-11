#!/usr/bin/env bash
set -euo pipefail

# Ajuste: nome do serviço postgres no docker-compose (deploy/docker-compose.yml usa "postgres")
COMPOSE_DIR="./deploy"
BACKEND_DIR="./backend"
MIGRATIONS_DIR="./backend/database/migrations"

# Variáveis que você pode ajustar:
DB_USER="retesp_admin"
DB_PASS="${DB_PASSWORD:-shalon}"
DB_NAME="retesp_db"
DB_HOST_SERVICE="postgres"   # host dentro da rede do compose
DB_PORT="5432"

# Caminhos/nomes
SQLX_DATA_FILE="${BACKEND_DIR}/sqlx-data.json"

echo "1) Subindo postgres (docker-compose em ${COMPOSE_DIR})..."
pushd "${COMPOSE_DIR}" >/dev/null
# Exporta DB_PASSWORD para o compose ler
export DB_PASSWORD="${DB_PASS}"
docker-compose up -d postgres
# aguarda container saudável (retry simples com pg_isready)
echo "Aguardando postgres subir..."
for i in {1..30}; do
  if docker exec -T "$(docker-compose ps -q postgres)" pg_isready -U "${DB_USER}" >/dev/null 2>&1; then
    echo "Postgres está pronto."
    break
  fi
  sleep 1
done
popd >/dev/null

echo "2) Garante que backend tenha sqlx-cli e que o ambiente esteja pronto..."
pushd "${BACKEND_DIR}" >/dev/null

# se não tiver sqlx-cli instalado no host, tenta instalar localmente (opcional)
if ! command -v sqlx >/dev/null 2>&1; then
  echo "sqlx não encontrado no PATH — instalando sqlx-cli local (~via cargo)..."
  cargo install sqlx-cli --no-default-features --features postgres || true
  export PATH="${HOME}/.cargo/bin:${PATH}"
fi

# Ajustar DATABASE_URL para apontar para o postgres do docker-compose (a partir do host,
# o postgres é mapeado para localhost:5432, conforme compose).
export DATABASE_URL="postgres://${DB_USER}:${DB_PASS}@localhost:${DB_PORT}/${DB_NAME}"
echo "DATABASE_URL=${DATABASE_URL}"

# cria o DB e aplica migrations se necessário (usa sqlx)
if command -v sqlx >/dev/null 2>&1; then
  echo "Criando DB (se não existir) e aplicando migrations..."
  sqlx database create || true
  # garantir que migrations estão no lugar
  if [ -d "${MIGRATIONS_DIR}" ]; then
    sqlx migrate run || true
  else
    echo "Atenção: pasta de migrations não encontrada em ${MIGRATIONS_DIR}"
  fi

  # Fazer o prepare e gerar sqlx-data.json
  echo "Gerando sqlx-data.json com cargo sqlx prepare..."
  cargo sqlx prepare -- --lib || cargo sqlx prepare -- --bin retesp-backend
  # o comando acima costuma gerar sqlx-data.json na raiz do crate (backend/)
else
  echo "ERRO: sqlx não disponível. Instale sqlx-cli (cargo install sqlx-cli --no-default-features --features postgres)"
  exit 1
fi

# Verifica se arquivo foi criado
if [ -f "./sqlx-data.json" ]; then
  echo "sqlx-data.json gerado em: ${BACKEND_DIR}/sqlx-data.json"
  # mover para lugar desejado se quiser
  mv ./sqlx-data.json "${SQLX_DATA_FILE}" || true
  echo "Movido para ${SQLX_DATA_FILE}"
else
  echo "Falha: sqlx-data.json não foi criado pelo cargo sqlx prepare"
  exit 2
fi

popd >/dev/null

echo "Pronto. Recomendações:"
echo " - Commit ${SQLX_DATA_FILE} no repositório (após revisar)."
echo " - Para builds em CI, rode: docker-compose up -d postgres && cargo sqlx prepare"
