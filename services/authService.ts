import { useAuthStore } from "@/store/useAuthStore";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  plan: {
    id: string;
    name: string;
    monthlyQuota: number;
  };
  monthlyUsage: number;
}

// Mock delay helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Serviço de autenticação - MOCK
 */
export async function register(data: RegisterData): Promise<User> {
  await delay(1000); // Simular delay de rede

  const user: User = {
    id: "mock-user-id",
    name: data.name,
    email: data.email,
    plan: {
      id: "free",
      name: "FREE",
      monthlyQuota: 10,
    },
    monthlyUsage: 0,
  };

  // Salvar no localStorage para persistir "sessão"
  if (typeof window !== "undefined") {
    localStorage.setItem("mock_user", JSON.stringify(user));
  }

  useAuthStore.getState().login(user);
  return user;
}

export async function login(data: LoginData): Promise<User> {
  await delay(1000);

  // Simular erro se senha for "error"
  if (data.password === "error") {
    throw new Error("Invalid credentials");
  }

  const user: User = {
    id: "mock-user-id",
    name: "Usuário Teste",
    email: data.email,
    plan: {
      id: "free",
      name: "FREE",
      monthlyQuota: 10,
    },
    monthlyUsage: 2, // Simular algum uso
  };

  if (typeof window !== "undefined") {
    localStorage.setItem("mock_user", JSON.stringify(user));
  }

  useAuthStore.getState().login(user);
  return user;
}

export async function logout(): Promise<void> {
  await delay(500);
  if (typeof window !== "undefined") {
    localStorage.removeItem("mock_user");
  }
  useAuthStore.getState().logout();
}

export async function getCurrentUser(): Promise<User | null> {
  await delay(500);

  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("mock_user");
    if (stored) {
      const user = JSON.parse(stored);
      useAuthStore.getState().login(user);
      return user;
    }
  }

  return null;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  password?: string;
}

/**
 * Atualiza o perfil do usuário
 */
export async function updateProfile(data: UpdateProfileData): Promise<User> {
  await delay(1000);

  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("mock_user");
    if (stored) {
      const currentUser = JSON.parse(stored);
      const updatedUser: User = {
        ...currentUser,
        name: data.name ?? currentUser.name,
        email: data.email ?? currentUser.email,
      };

      localStorage.setItem("mock_user", JSON.stringify(updatedUser));
      useAuthStore.getState().login(updatedUser);
      return updatedUser;
    }
  }

  throw new Error("Usuário não encontrado");
}

/**
 * Deleta a conta do usuário
 */
export async function deleteAccount(): Promise<void> {
  await delay(1000);

  if (typeof window !== "undefined") {
    localStorage.removeItem("mock_user");
  }

  useAuthStore.getState().logout();
}

/**
 * Planos disponíveis
 */
export const AVAILABLE_PLANS = [
  {
    id: "free",
    name: "FREE",
    price: 0,
    monthlyQuota: 10,
    features: [
      "10 análises mensais",
      "Detecção básica",
      "Histórico de 30 dias",
      "Suporte por email",
    ],
  },
  {
    id: "pro",
    name: "PRO",
    price: 29.9,
    monthlyQuota: 200,
    features: [
      "200 análises mensais",
      "Detecção avançada",
      "Histórico ilimitado",
      "Suporte prioritário",
      "API Access",
    ],
  },
  {
    id: "premium",
    name: "PREMIUM",
    price: 99.9,
    monthlyQuota: -1, // Ilimitado
    features: [
      "Análises ilimitadas",
      "Detecção em tempo real",
      "Relatórios detalhados",
      "Gerente de conta dedicado",
      "SLA garantido",
    ],
  },
];

/**
 * Atualiza o plano do usuário
 */
export async function updatePlan(planId: string): Promise<User> {
  await delay(1000);

  const plan = AVAILABLE_PLANS.find((p) => p.id === planId);
  if (!plan) {
    throw new Error("Plano não encontrado");
  }

  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("mock_user");
    if (stored) {
      const currentUser = JSON.parse(stored);
      const updatedUser: User = {
        ...currentUser,
        plan: {
          id: plan.id,
          name: plan.name,
          monthlyQuota: plan.monthlyQuota,
        },
        monthlyUsage: 0, // Resetar uso ao mudar de plano
      };

      localStorage.setItem("mock_user", JSON.stringify(updatedUser));
      useAuthStore.getState().login(updatedUser);
      return updatedUser;
    }
  }

  throw new Error("Usuário não encontrado");
}

/**
 * Cancela a inscrição (volta para plano FREE)
 */
export async function cancelSubscription(): Promise<User> {
  await delay(1000);

  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("mock_user");
    if (stored) {
      const currentUser = JSON.parse(stored);
      const freePlan = AVAILABLE_PLANS.find((p) => p.id === "free");

      if (!freePlan) {
        throw new Error("Plano FREE não encontrado");
      }

      const updatedUser: User = {
        ...currentUser,
        plan: {
          id: freePlan.id,
          name: freePlan.name,
          monthlyQuota: freePlan.monthlyQuota,
        },
        // Manter o uso atual, mas limitar ao novo plano
        monthlyUsage: Math.min(
          currentUser.monthlyUsage || 0,
          freePlan.monthlyQuota
        ),
      };

      localStorage.setItem("mock_user", JSON.stringify(updatedUser));
      useAuthStore.getState().login(updatedUser);
      return updatedUser;
    }
  }

  throw new Error("Usuário não encontrado");
}
