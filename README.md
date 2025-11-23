# ProvaReal

Plataforma brasileira de verificação de imagens para combate à desinformação. Verifique se uma imagem é real ou gerada por IA em segundos.

## 🚀 Características

- ✅ Análise de imagens em tempo real
- ✅ Dashboard interativo com visualização 3D
- ✅ Histórico completo de análises
- ✅ Sistema de planos (FREE, PRO, PREMIUM)
- ✅ Gerenciamento de perfil e assinatura
- ✅ Interface moderna e responsiva
- ✅ API RESTful com Next.js App Router

## 🏗️ Arquitetura

Este projeto usa **Next.js 14+ com App Router** de forma unificada:

- **Frontend**: Páginas em `app/`
- **Backend**: API Routes em `app/api/`
- **Um único servidor**: `npm run dev` sobe tudo
- **Banco de Dados**: PostgreSQL com Prisma
- **Docker**: PostgreSQL em container

## 📁 Estrutura do Projeto

```
ProvaReal/
├── app/
│   ├── api/                  # API Routes
│   │   └── v1/
│   │       └── status/       # Endpoint de status
│   ├── auth/                 # Páginas de autenticação
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/            # Dashboard e funcionalidades
│   │   ├── history/          # Histórico de análises
│   │   ├── profile/          # Perfil do usuário
│   │   ├── layout.tsx        # Layout com sidebar
│   │   └── page.tsx          # Dashboard principal
│   ├── globals.css           # Estilos globais
│   └── page.tsx              # Landing page
├── components/
│   ├── dashboard/            # Componentes do dashboard
│   ├── three/                # Visualização 3D
│   └── ui/                   # Componentes UI reutilizáveis
├── infra/
│   └── compose.yaml          # Docker Compose
├── lib/                      # Código compartilhado
│   ├── types.ts              # Tipos TypeScript
│   └── utils.ts              # Utilitários
├── prisma/                   # Prisma ORM
│   └── schema.prisma         # Schema do banco
├── services/                 # Serviços frontend
│   ├── authService.ts        # Autenticação
│   └── detectionService.ts   # Análise de imagens
├── store/                    # Zustand stores
│   ├── useAnalysisStore.ts   # Store de análises
│   └── useAuthStore.ts       # Store de autenticação
└── test/                     # Testes (Jest)
```

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 20+ (LTS)
- Docker e Docker Compose
- npm ou yarn

### Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
# Crie .env.development na raiz do projeto:
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=provareal
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/provareal

# 3. Subir PostgreSQL com Docker
npm run services:up

# 4. Gerar Prisma Client (se necessário)
npx prisma generate

# 5. Iniciar servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

## 📊 Endpoints da API

### Status

- `GET /api/v1/status` - Verifica status da API
  ```json
  {
    "status": "ok",
    "message": "API is running",
    "timestamp": "2025-11-23T21:38:52.967Z"
  }
  ```

## 🎨 Paleta de Cores

O projeto usa uma paleta de cores moderna e semântica:

- **Primary**: Azul índigo (#6366f1)
- **Secondary**: Verde esmeralda (#10b981)
- **Success**: Verde (#22c55e)
- **Warning**: Âmbar (#f59e0b)
- **Error**: Vermelho (#ef4444)
- **Info**: Azul ciano (#06b6d4)

## 🔧 Scripts Disponíveis

### Desenvolvimento

```bash
npm run dev              # Servidor de desenvolvimento (porta 3000)
npm run build            # Build para produção
npm run start            # Iniciar servidor de produção
```

### Linting e Formatação

```bash
npm run lint                     # ESLint (Next.js)
npm run lint:eslint:check        # Verificar ESLint
npm run lint:eslint:fix          # Corrigir ESLint
npm run lint:prettier:check      # Verificar Prettier
npm run lint:prettier:fix        # Formatar com Prettier
```

### Docker

```bash
npm run services:up      # Subir containers
npm run services:down    # Parar containers
npm run services:logs    # Ver logs
npm run services:ps      # Status dos containers
npm run services:restart # Reiniciar containers
```

### Prisma

```bash
npx prisma generate       # Gerar Prisma Client
npx prisma migrate dev    # Criar e aplicar migrações
npx prisma studio         # Interface visual do banco
```

## 🐳 Docker

O projeto usa Docker Compose para gerenciar o PostgreSQL:

```yaml
# infra/compose.yaml
services:
  database:
    image: postgres:17.5-alpine
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
```

### Comandos Docker

```bash
# Subir PostgreSQL
npm run services:up

# Ver status
npm run services:ps

# Ver logs
npm run services:logs

# Parar
npm run services:down
```

## 📝 Variáveis de Ambiente

Crie `.env.development` na raiz do projeto:

```env
# PostgreSQL
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=provareal
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

# Database URL (para Prisma)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/provareal

# Ambiente
NODE_ENV=development
```

## 🎯 Funcionalidades Principais

### Dashboard

- Upload de imagens com drag & drop
- Análise em tempo real
- Visualização 3D do processo
- Cards de estatísticas
- Histórico recente

### Perfil do Usuário

- Edição de informações pessoais
- Alteração de senha
- Gerenciamento de plano/assinatura
- Cancelamento de assinatura
- Exclusão de conta

### Navegação

- Sidebar responsiva
- Menu mobile
- Navegação entre páginas
- Informações do usuário

## 🧪 Testes

O projeto está configurado para testes com Jest:

```bash
# Executar testes (quando configurado)
npm test

# Modo watch
npm run test:watch

# Com cobertura
npm run test:coverage
```

## 🛠️ Tecnologias

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **ORM**: Prisma
- **Banco de Dados**: PostgreSQL
- **Estado**: Zustand
- **3D**: Three.js + React Three Fiber
- **Ícones**: Lucide React
- **Linting**: ESLint + Prettier

## 📚 Documentação Adicional

- `INTEGRATION.md` - Integração frontend ↔ backend
- `PROJECT_STRUCTURE.md` - Estrutura detalhada do projeto
- `QUICK_START.md` - Guia rápido de início
- `TESTING.md` - Guia de testes

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e proprietário.

## 👥 Equipe

Desenvolvido para combater desinformação e garantir transparência nas eleições.

---

**ProvaReal** - Verificação de imagens para combate à desinformação
