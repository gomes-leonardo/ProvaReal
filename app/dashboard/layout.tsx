"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { getCurrentUser } from "@/services/authService";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/Button";

/**
 * Layout do dashboard com sidebar
 * Protege rotas autenticadas e exibe informações do usuário
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Verificar autenticação ao montar
  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        // Tentar buscar usuário atual (pode ter cookie válido)
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          router.push("/auth/login");
        }
      }
    };
    checkAuth();
  }, [isAuthenticated, router]);

  // Fechar sidebar ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isAuthenticated && !user) {
    return null; // Evita flash de conteúdo não autenticado
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Navbar mobile */}
        <nav className="bg-white border-b border-neutral-200 sticky top-0 z-30 lg:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
            <div className="relative w-8 h-8">
              <Image
                src="/logo-icon-transparent.png"
                alt="ProvaReal"
                fill
                className="object-contain"
              />
            </div>
            <div className="w-10" /> {/* Spacer para centralizar */}
          </div>
        </nav>

        {/* Conteúdo */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
