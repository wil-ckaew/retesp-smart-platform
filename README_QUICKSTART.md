# 🚀 RETESP - Quick Start

## Instalação Rápida
1. Clone: `git clone https://github.com/seu-usuario/retesp-smart-platform.git`
2. Acesse: `cd retesp-smart-platform/frontend-web`
3. Instale: `npm install`
4. Configure: Copie `.env.example` para `.env.local` e adicione sua OPENAI_API_KEY
5. Execute: `npm run dev`
6. Acesse: http://localhost:3000

## Comandos Principais
- `npm run dev` - Desenvolvimento
- `npm run build` - Build produção
- `npm start` - Produção
- `npm run lint` - Verificar código

## Configuração OpenAI
1. Acesse platform.openai.com
2. Crie API Key em "API Keys"
3. Configure método de pagamento
4. Adicione no .env.local: `OPENAI_API_KEY=sk-...`

## Docker
docker-compose up --build
