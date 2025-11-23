import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";

/**
 * Utilitários de teste
 * Fornece wrappers customizados para componentes que dependem de contexto/stores
 *
 * Nota: Zustand stores são globais e não precisam de providers,
 * mas podemos resetá-los nos testes individuais quando necessário
 */

interface AllTheProvidersProps {
  children: React.ReactNode;
}

/**
 * Provider customizado (pode ser expandido no futuro para temas, etc)
 */
function AllTheProviders({ children }: AllTheProvidersProps) {
  return <>{children}</>;
}

/**
 * Função de render customizada que inclui providers
 */
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <AllTheProviders>{children}</AllTheProviders>
  );

  return render(ui, { wrapper: Wrapper, ...options });
}

// Re-exporta tudo do testing-library
export * from "@testing-library/react";
export { customRender as render };
