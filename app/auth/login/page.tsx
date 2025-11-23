"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { login } from "@/services/authService";

/**
 * Página de login
 * Autentica usuário e redireciona para o dashboard
 */
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const user = await login({ email, password });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <Shield className="text-primary-700" size={40} />
            <span className="text-3xl font-bold text-primary-900">
              ProvaReal
            </span>
          </Link>
        </div>

        {/* Card de Login */}
        <Card>
          <h1 className="text-2xl font-bold text-neutral-900 mb-6">
            Entrar na sua conta
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              placeholder="seu@email.com"
            />

            <Input
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              placeholder="••••••••"
            />

            {error && (
              <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Entrar
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-neutral-600">Não tem uma conta? </span>
            <Link
              href="/auth/register"
              className="text-primary-700 hover:text-primary-800 font-medium"
            >
              Criar conta
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
