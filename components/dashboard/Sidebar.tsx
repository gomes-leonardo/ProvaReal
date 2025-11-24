"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, History, User, LogOut } from "lucide-react";
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
          "fixed top-0 left-0 h-screen bg-white border-r border-neutral-200 z-50 transition-transform duration-300 ease-in-out",
          "w-64 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-center px-6 py-8 border-b border-neutral-200">
          {/* Logo Icon - Visible on all screens now as per request */}
          <div className="relative w-24 h-24">
            <Image
              src="/logo-icon-transparent.png"
              alt="ProvaReal Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
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
          <div className="bg-neutral-100 rounded-xl p-4 mb-3">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-neutral-900 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
              </div>
            </div>
            {user?.plan && (
              <div className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block">
                Plano: {user.plan.name}
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={cn(
              "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
              "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
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
