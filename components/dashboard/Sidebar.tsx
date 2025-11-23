"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, History, User, Shield, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { logout } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

/**
 * Sidebar de navegação do dashboard
 * Responsivo com menu mobile
 */
export const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Histórico",
      href: "/dashboard/history",
      icon: History,
    },
    {
      name: "Perfil",
      href: "/dashboard/profile",
      icon: User,
    },
  ];

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && onClose && (
        <div
          className="fixed inset-0 bg-neutral-900/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-neutral-200 z-50 transition-transform duration-300 ease-in-out",
          "w-64 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex items-center space-x-3 px-6 py-6 border-b border-neutral-200">
          <Shield className="text-primary-600" size={28} />
          <span className="text-xl font-bold text-primary-900">ProvaReal</span>
        </div>

        {/* Navegação */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-primary-50 text-primary-700 font-medium"
                    : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                )}
              >
                <Icon
                  size={20}
                  className={isActive ? "text-primary-600" : "text-neutral-500"}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Informações do usuário */}
        <div className="px-4 py-4 border-t border-neutral-200">
          <div className="px-4 py-3 bg-neutral-50 rounded-lg mb-3">
            <p className="text-sm font-medium text-neutral-900 truncate">
              {user?.name}
            </p>
            <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
            {user?.plan && (
              <p className="text-xs text-primary-600 mt-1">
                Plano: {user.plan.name}
              </p>
            )}
          </div>

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={cn(
              "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
              "text-neutral-700 hover:bg-error-50 hover:text-error-600",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <LogOut size={20} />
            <span>{isLoggingOut ? "Saindo..." : "Sair"}</span>
          </button>
        </div>
      </aside>
    </>
  );
};
