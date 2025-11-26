"use client";

import React, { useCallback } from "react";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";

/**
 * Componente de upload para landing page
 * Redireciona para registro ou dashboard baseado no estado de autenticação
 * Não permite seleção de arquivo, apenas redireciona
 */
export const LandingUpload: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const handleClick = useCallback(() => {
    // Redirecionar baseado no estado de autenticação
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/auth/register");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <p className="text-lg text-neutral-700 mb-4 text-center">
        Envie uma imagem para verificar se é real ou gerada por IA
      </p>
      <div
        onClick={handleClick}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer",
          "border-primary-300 hover:border-primary-500 hover:bg-primary-50",
          "bg-white shadow-sm hover:shadow-md"
        )}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <Upload className="text-primary-600" size={32} />
          </div>
          <div>
            <p className="text-base font-medium text-neutral-900 mb-1">
              Clique para começar a analisar
            </p>
            <p className="text-sm text-neutral-500">
              JPG, JPEG, PNG, WEBP ou GIF
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
