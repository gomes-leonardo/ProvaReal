import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCurrentUser } from "@/services/authService";

export interface User {
  id: string;
  name: string;
  email: string;
  plan: {
    id: string;
    name: string;
    monthlyQuota: number;
  };
  monthlyUsage?: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user: User) => {
        set({ user, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      refreshUser: async () => {
        const user = await getCurrentUser();
        if (user) {
          set({ user, isAuthenticated: true });
        } else {
          set({ user: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
