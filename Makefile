.PHONY: help install dev test test-frontend test-backend test-all docker-up docker-down migrate

help:
	@echo "ProvaReal - Comandos disponíveis:"
	@echo ""
	@echo "  make install          - Instala dependências (frontend + backend)"
	@echo "  make dev              - Roda frontend e backend simultaneamente"
	@echo "  make test             - Roda todos os testes"
	@echo "  make test-frontend    - Roda testes do frontend"
	@echo "  make test-backend     - Roda testes do backend"
	@echo "  make docker-up        - Sobe Postgres + Redis"
	@echo "  make docker-down      - Para containers"
	@echo "  make migrate          - Roda migrações do Prisma"
	@echo ""

install:
	@echo "📦 Instalando dependências do frontend..."
	npm install
	@echo "📦 Instalando dependências do backend..."
	cd backend && npm install
	@echo "✅ Instalação completa!"

dev:
	@echo "🚀 Iniciando frontend e backend..."
	npm run dev:all

test:
	@echo "🧪 Rodando todos os testes..."
	npm run test:all

test-frontend:
	@echo "🧪 Rodando testes do frontend..."
	npm test

test-backend:
	@echo "🧪 Rodando testes do backend..."
	cd backend && npm test

docker-up:
	@echo "🐳 Subindo Postgres e Redis..."
	cd backend && docker-compose up -d postgres redis
	@echo "⏳ Aguardando serviços ficarem prontos..."
	sleep 5
	@echo "✅ Serviços prontos!"

docker-down:
	@echo "🐳 Parando containers..."
	cd backend && docker-compose down

migrate:
	@echo "🗄️  Rodando migrações..."
	cd backend && npm run prisma:generate && npm run prisma:migrate dev


