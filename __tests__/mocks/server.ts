import { setupServer } from "msw/node";
import { handlers } from "./handlers";

/**
 * MSW Server para mockar chamadas de API em testes
 * Simula o comportamento do backend Node + Express
 */
export const server = setupServer(...handlers);
