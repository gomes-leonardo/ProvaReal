# Testes Automatizados - ProvaReal

## 📋 Estrutura de Testes

```
__tests__/
  components/
    UploadArea.test.tsx      # Testes do componente de upload
    ResultCard.test.tsx      # Testes do card de resultado
    HistoryTable.test.tsx     # Testes da tabela de histórico
  pages/
    landing.test.tsx         # Testes da landing page
    login.test.tsx           # Testes da página de login
    dashboard.test.tsx        # Testes do dashboard
  services/
    detectionService.test.ts  # Testes do serviço de detecção
  mocks/
    server.ts                # Configuração do MSW
    handlers.ts              # Handlers MSW para mockar APIs
  setup.ts                   # Setup global dos testes
  test-utils.tsx             # Utilitários de teste
```

## 🧪 Como Rodar os Testes

```bash
# Rodar todos os testes uma vez
npm test

# Rodar em modo watch (re-executa ao salvar arquivos)
npm run test:watch

# Rodar com coverage (cobertura de código)
npm run test:coverage
```

## ✅ Cobertura Mínima

A configuração exige **mínimo de 70%** de cobertura em:

- Linhas (lines)
- Funções (functions)
- Branches (ramificações)
- Statements (declarações)

## 🔧 Tecnologias de Teste

- **Vitest**: Runner de testes (mais rápido que Jest para Next.js)
- **Testing Library**: Testes de componentes React
- **MSW**: Mock Service Worker para simular APIs
- **jsdom**: Ambiente DOM para testes

## 📝 Exemplos de Testes

### Teste de Componente

```typescript
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("deve renderizar corretamente", () => {
    render(<Button>Clique aqui</Button>);
    expect(screen.getByText("Clique aqui")).toBeInTheDocument();
  });
});
```

### Teste com MSW

```typescript
import { server } from "@/__tests__/mocks/server";
import { http, HttpResponse } from "msw";

// MSW já está configurado no setup.ts
// Handlers estão em __tests__/mocks/handlers.ts
```

### Teste de Página

```typescript
import { render, screen } from "@testing-library/react";
import LoginPage from "@/app/auth/login/page";

// Mock do Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));
```

## 🎯 Objetivos dos Testes

1. **UploadArea**: Verificar upload, preview e callbacks
2. **ResultCard**: Verificar exibição de score, label e explicação
3. **HistoryTable**: Verificar renderização e filtros
4. **Dashboard**: Verificar fluxo completo de upload → análise → resultado
5. **Login**: Verificar validação e autenticação
6. **detectionService**: Verificar geração de scores e labels

## 🚨 Notas Importantes

- Todos os testes rodam **sem backend real** - apenas mocks
- MSW intercepta chamadas HTTP e retorna respostas mockadas
- Stores Zustand são resetados entre testes
- Componentes são testados isoladamente quando possível
