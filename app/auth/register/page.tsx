"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { register } from "@/services/authService";

/**
 * Página de registro
 * Cria nova conta e redireciona para o dashboard
 */
export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (!acceptTerms) {
      setError("Você deve aceitar os termos de uso");
      return;
    }

    setIsLoading(true);

    try {
      const user = await register({
        name,
        email,
        password,
      });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Erro ao criar conta. Tente novamente.");
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

        {/* Card de Registro */}
        <Card>
          <h1 className="text-2xl font-bold text-neutral-900 mb-6">
            Criar conta
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nome completo"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
              placeholder="Seu nome"
            />

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

            <Input
              label="Confirmar senha"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
              placeholder="••••••••"
            />

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                disabled={isLoading}
                className="mt-1"
              />
              <label
                htmlFor="terms"
                className="text-sm text-neutral-600 cursor-pointer"
              >
                Eu aceito os{" "}
                <a href="#" className="text-primary-700 hover:underline">
                  termos de uso
                </a>{" "}
                e{" "}
                <a href="#" className="text-primary-700 hover:underline">
                  política de privacidade
                </a>
              </label>
            </div>

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
              Criar conta
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-neutral-600">Já tem uma conta? </span>
            <Link
              href="/auth/login"
              className="text-primary-700 hover:text-primary-800 font-medium"
            >
              Entrar
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
