# 🚀 RETESP - Smart Seal Platform

Plataforma inteligente de monitoramento e rastreamento para retentores industriais, utilizando IoT, análise de vibração e manutenção preditiva com IA.

## 📋 Índice
- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Execução](#execução)
- [Chatbot com IA](#chatbot-com-ia)
- [Páginas do Sistema](#páginas-do-sistema)
- [API Endpoints](#api-endpoints)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Deploy](#deploy)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🎯 Visão Geral

A RETESP Smart Seal Platform é uma solução completa para monitoramento industrial que oferece:
- **Monitoramento em Tempo Real** de retentores e selos industriais
- **Análise Preditiva** com IA para prever falhas
- **Dashboard Intuitivo** com métricas em tempo real
- **Sistema de Alertas** inteligente e configurável
- **Chatbot com IA** especializado em monitoramento industrial

## ✨ Funcionalidades

### 📊 Dashboard
- Visão geral do sistema em tempo real
- Métricas de desempenho e eficiência
- Gráficos interativos de temperatura, vibração e pressão
- Status de dispositivos conectados

### 🔍 Monitoramento
- Monitoramento contínuo de sensores IoT
- Visualização de dados em tempo real
- Histórico de leituras e tendências
- Controle de dispositivos remotos

### 🛡️ Selos Industriais
- Gerenciamento completo de selos/retentores
- Status de saúde e manutenção
- Histórico de operações
- Configurações individuais por dispositivo

### 🚨 Alertas
- Sistema de notificações inteligente
- Configuração de limites personalizados
- Histórico de alertas e resoluções
- Notificações por email e push

### 📈 Analytics
- Análises preditivas com machine learning
- Relatórios detalhados de desempenho
- KPIs e métricas de eficiência
- Insights automáticos

### ⚙️ Configurações
- Configurações do sistema
- Gerenciamento de usuários
- Preferências de notificação
- Segurança e acesso

### 🤖 Chatbot com IA
- Assistente especializado em monitoramento industrial
- Integração com OpenAI GPT-4/3.5
- Respostas em tempo real
- Suporte técnico automatizado

## 🛠️ Tecnologias

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Hook Form**
- **Framer Motion** (animações)
- **Recharts** (gráficos)
- **Lucide React** (ícones)

### Backend
- **Node.js**
- **Express.js**
- **PostgreSQL**
- **Prisma ORM**
- **Socket.io** (comunicação em tempo real)

### IA & ML
- **OpenAI API** (GPT-4/3.5)
- **TensorFlow.js** (análise preditiva)
- **Python** (scripts de ML)

### DevOps
- **Docker** & **Docker Compose**
- **GitHub Actions** (CI/CD)
- **Nginx** (proxy reverso)
- **PM2** (process manager)

## 📁 Estrutura do Projeto
retesp-smart-platform/
├── frontend-web/ # Aplicação Next.js
│ ├── src/
│ │ ├── app/ # App Router
│ │ │ ├── dashboard/ # Área logada
│ │ │ │ ├── page.tsx # Dashboard principal
│ │ │ │ ├── monitoring/ # Monitoramento
│ │ │ │ ├── seals/ # Gerenciamento de selos
│ │ │ │ ├── alerts/ # Sistema de alertas
│ │ │ │ ├── analytics/ # Análises
│ │ │ │ ├── overview/ # Visão geral
│ │ │ │ └── settings/ # Configurações
│ │ │ ├── api/ # API Routes
│ │ │ │ └── chat/ # Endpoint do chatbot
│ │ │ └── page.tsx # Home pública
│ │ ├── components/ # Componentes React
│ │ │ ├── layout/ # Layout components
│ │ │ ├── chatbot/ # Chatbot com IA
│ │ │ └── ui/ # UI components
│ │ ├── hooks/ # Custom hooks
│ │ ├── lib/ # Utilities
│ │ └── styles/ # Estilos globais
│ ├── public/ # Arquivos estáticos
│ ├── .env.local # Variáveis de ambiente
│ └── package.json
│
├── backend/ # API REST
│ ├── src/
│ │ ├── controllers/ # Controladores
│ │ ├── models/ # Modelos de dados
│ │ ├── routes/ # Rotas da API
│ │ ├── middleware/ # Middlewares
│ │ └── utils/ # Utilities
│ └── package.json
│
├── docker-compose.yml # Orquestração Docker
├── .github/ # CI/CD workflows
├── docs/ # Documentação
└── README.md # Este arquivo

## 🚀 Instalação

### Pré-requisitos
- Node.js 18+ 
- Docker & Docker Compose
- PostgreSQL 14+
- Conta OpenAI (para o chatbot)

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/retesp-smart-platform.git
cd retesp-smart-platform

2. Instale as dependências

# Frontend
cd frontend-web
npm install

# Backend
cd ../backend
npm install

3. Configuração do Banco de Dados
# Usando Docker Compose
docker-compose up -d db

# Ou manualmente com PostgreSQL
createdb retesp_database

⚙️ Configuração
1. Variáveis de Ambiente

Crie o arquivo .env.local na pasta frontend-web/:

# OpenAI API (para o chatbot)
OPENAI_API_KEY=sk-sua_chave_api_aqui
NEXT_PUBLIC_OPENAI_MODEL=gpt-4-turbo-preview

# Next.js
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Autenticação
NEXTAUTH_SECRET=seu_secret_aqui
NEXTAUTH_URL=http://localhost:3000

# Banco de Dados
DATABASE_URL="postgresql://user:password@localhost:5432/retesp_database"

2. Configuração do OpenAI

    Acesse platform.openai.com

    Crie uma conta ou faça login

    Vá para API Keys → Create new secret key

    Copie a chave e cole no OPENAI_API_KEY

    Configure o método de pagamento (obrigatório para uso)

🏃 Execução
Desenvolvimento

# Frontend (Next.js)
cd frontend-web
npm run dev
# Acesse: http://localhost:3000

# Backend (Node.js)
cd backend
npm run dev
# API em: http://localhost:3001

Produção com Docker

# Build e execução
docker-compose up --build

# Ou em background
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down

Comandos Úteis

# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start

# Lint e formatação
npm run lint
npm run format

# Testes
npm test

🤖 Chatbot com IA

O chatbot integra a OpenAI API para fornecer suporte especializado:
Configuração

    Obtenha sua chave OpenAI em platform.openai.com

    Configure o pagamento na conta OpenAI

    Adicione a chave no .env.local

    Reinicie o servidor

Funcionalidades

    Respostas especializadas em monitoramento industrial

    FAQ inteligente com perguntas pré-definidas

    Markdown suportado nas respostas

    Feedback (like/dislike) para melhorias

    Configuração em tempo real (temperatura do modelo)

API Endpoint

POST /api/chat
Content-Type: application/json

{
  "messages": [
    {"sender": "user", "text": "Como configurar alertas?"}
  ],
  "temperature": 0.7
}

📄 Páginas do Sistema
🏠 Home Pública (/)

    Apresentação da plataforma

    Recursos e benefícios

    Call-to-action para login

📊 Dashboard (/dashboard)

    Visão geral do sistema

    Métricas em tempo real

    Gráficos de desempenho

    Status de dispositivos

🔍 Monitoramento (/dashboard/monitoring)

    Monitoramento em tempo real

    Visualização de sensores

    Controle de dispositivos

    Histórico de dados

🛡️ Selos (/dashboard/seals)

    Gerenciamento de selos

    Status de saúde

    Configurações individuais

    Histórico de manutenção

🚨 Alertas (/dashboard/alerts)

    Sistema de notificações

    Configuração de limites

    Histórico de alertas

    Resolução de problemas

📈 Analytics (/dashboard/analytics)

    Análises preditivas

    Relatórios detalhados

    KPIs e métricas

    Insights automáticos

⚙️ Configurações (/dashboard/settings)

    Configurações do sistema

    Gerenciamento de usuários

    Preferências de notificação

    Segurança e acesso

🔌 API Endpoints
Autenticação

POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/logout
GET    /api/auth/session

Dispositivos

GET    /api/devices           # Listar dispositivos
POST   /api/devices           # Criar dispositivo
GET    /api/devices/:id       # Obter dispositivo
PUT    /api/devices/:id       # Atualizar dispositivo
DELETE /api/devices/:id       # Remover dispositivo

Sensores

GET    /api/sensors           # Listar sensores
POST   /api/sensors/data      # Enviar dados do sensor
GET    /api/sensors/:id/data  # Histórico do sensor

Alertas

GET    /api/alerts            # Listar alertas
POST   /api/alerts            # Criar alerta
PUT    /api/alerts/:id/resolve # Resolver alerta

Chatbot

POST   /api/chat              # Chat com IA

🌐 Variáveis de Ambiente
Frontend (.env.local)

# OpenAI
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_OPENAI_MODEL=gpt-4-turbo-preview

# Next.js
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=RETESP Smart Platform

# Auth
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000

# Features
NEXT_PUBLIC_ENABLE_CHATBOT=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true

Backend (.env)

# Server
PORT=3001
NODE_ENV=production

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/retesp_database"

# Auth
JWT_SECRET=...
JWT_EXPIRES_IN=7d

# OpenAI
OPENAI_API_KEY=sk-...

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...

🚢 Deploy
Opção 1: Vercel (Recomendado)

# Instale a CLI
npm i -g vercel

# Faça deploy
vercel

# Para produção
vercel --prod

Opção 2: Docker + Nginx

# Dockerfile.production
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]

Opção 3: Manual

# Build
npm run build

# Serve
npm start

# Com PM2
pm2 start npm --name "retesp-frontend" -- start

🤝 Contribuição

    Fork o projeto

    Crie uma branch para sua feature (git checkout -b feature/AmazingFeature)

    Commit suas mudanças (git commit -m 'Add some AmazingFeature')

    Push para a branch (git push origin feature/AmazingFeature)

    Abra um Pull Request

Guia de Estilo

    Use TypeScript estritamente tipado

    Siga o eslint e prettier configurados

    Escreva testes para novas funcionalidades

    Documente novas APIs e componentes

📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para detalhes.
📞 Suporte

    Email: suporte@retesp.com

    Documentação: docs.retesp.com

    Issues: GitHub Issues

🙏 Agradecimentos

    OpenAI pela API GPT

    Next.js pelo framework incrível

    Tailwind CSS pelos estilos utilitários

    Comunidade Open Source por todas as contribuições