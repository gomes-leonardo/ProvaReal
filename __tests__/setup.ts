import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, afterAll } from "vitest";
import { server } from "./mocks/server";

/**
 * Setup global para testes
 * Configura MSW e limpa estado após cada teste
 */

// Inicia MSW antes de todos os testes
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Limpa handlers após cada teste
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

// Fecha MSW após todos os testes
afterAll(() => server.close());
