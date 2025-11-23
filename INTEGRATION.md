# 🔗 Integração Frontend ↔ Backend

Este documento explica como o frontend está integrado com o backend real.

## ✅ O que foi removido

- ❌ Mocks de `authService.ts`
- ❌ Mocks de `detectionService.ts`
- ❌ Dados aleatórios/fake
- ❌ MSW handlers (mantidos apenas para testes unitários)

## ✅ O que foi implementado

### 1. Cliente HTTP (axios)

**Arquivo:** `lib/api.ts`

- Cliente axios configurado com `withCredentials: true` para cookies
- Interceptors para tratamento de erros
- Logout automático em caso de 401
- Base URL configurável via `NEXT_PUBLIC_API_URL`

### 2. Serviços Atualizados

#### `services/authService.ts`

- ✅ `register()` - Registra usuário e faz login automático
- ✅ `login()` - Login real com backend
- ✅ `logout()` - Logout e limpeza de estado
- ✅ `getCurrentUser()` - Busca usuário atual via `/me`

#### `services/detectionService.ts`

- ✅ `analyzeImage()` - Upload e análise real via `POST /analysis`
- ✅ `getAnalysisHistory()` - Busca histórico via `GET /analysis`

### 3. Stores Atualizadas

#### `store/useAuthStore.ts`

- Persistência com Zustand persist
- Método `refreshUser()` para atualizar dados do usuário
- Integração com API real

#### `store/useAnalysisStore.ts`

- Método `setAnalyses()` para carregar dados do backend
- Mantém cache local para performance

### 4. Componentes Atualizados

#### `app/dashboard/page.tsx`

- Carrega histórico real do backend
- Atualiza dados após análise
- Tratamento de erros (quota, etc)

#### `app/dashboard/history/page.tsx`

- Busca histórico paginado do backend
- Filtros funcionais
- Paginação real

#### `components/dashboard/StatsCards.tsx`

- Carrega todas as análises para estatísticas
- Cálculos baseados em dados reais

#### `app/dashboard/layout.tsx`

- Verifica autenticação ao montar
- Busca usuário atual se tiver cookie válido

## 🔧 Configuração

### Variáveis de Ambiente

Crie `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

### Backend

Certifique-se que o backend está configurado:

```env
# backend/.env
FRONTEND_URL=http://localhost:3000
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
```

## 🧪 Testando a Integração

### 1. Subir Backend

```bash
cd backend
docker-compose up -d postgres redis
npm run dev
```

### 2. Subir Frontend

```bash
npm run dev
```

### 3. Testar Fluxo

1. Acesse `http://localhost:3000`
2. Crie uma conta
3. Faça login
4. Faça upload de imagem
5. Analise a imagem
6. Verifique histórico

## 🐛 Troubleshooting

### Erro de CORS

- Verifique `FRONTEND_URL` no backend
- Certifique-se que `withCredentials: true` está configurado

### Cookie não é enviado

- Verifique que `withCredentials: true` está no axios
- Certifique-se que backend aceita `credentials: true` no CORS

### Erro 401 em todas as requisições

- Verifique se cookie `pr_session` está sendo setado
- Verifique se Redis está rodando
- Verifique se sessão não expirou

### Imagem não analisa

- Verifique se backend está processando corretamente
- Verifique logs do backend
- Verifique se quota não foi excedida

## 📝 Notas

- Cookies são gerenciados automaticamente pelo navegador
- Estado é sincronizado entre frontend e backend
- Histórico é carregado sob demanda
- Estatísticas são calculadas em tempo real
