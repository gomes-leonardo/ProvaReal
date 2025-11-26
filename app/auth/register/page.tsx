"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { register } from "@/services/authService";
import { Shield, Sparkles, Zap, CheckCircle2, Lock } from "lucide-react";

/**
 * Página de registro - Design ultra moderno
 * Split screen com gradiente animado e glassmorphism
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
      await register({
        name,
        email,
        password,
      });
      router.push("/dashboard");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Erro ao criar conta. Tente novamente.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 animate-gradient-slow" />

        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-400/15 rounded-full blur-3xl animate-float-slow" />

        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          {/* Logo */}
          <div>
            <Link href="/" className="inline-block relative w-56 h-16">
              <Image
                src="/logo-full-transparent.png"
                alt="ProvaReal"
                fill
                className="object-contain brightness-0 invert"
                priority
              />
            </Link>
          </div>

          {/* Main Message */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
                <Sparkles size={16} />
                <span>Comece grátis hoje</span>
              </div>
              <h1 className="text-5xl font-bold leading-tight">
                Junte-se a milhares
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-white">
                  de verificadores
                </span>
              </h1>
              <p className="text-xl text-white/70 max-w-md">
                Crie sua conta e comece a proteger você e sua comunidade contra
                imagens falsas.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/90">
                <CheckCircle2 size={20} className="text-green-300" />
                <span>5 análises gratuitas por mês</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <CheckCircle2 size={20} className="text-green-300" />
                <span>Resultados em segundos</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <CheckCircle2 size={20} className="text-green-300" />
                <span>Histórico completo de análises</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-sm text-white/50">
            © 2025 ProvaReal. Todos os direitos reservados.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-neutral-50 relative overflow-y-auto">
        {/* Subtle Background Pattern */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(200 200 200) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="w-full max-w-md relative z-10 py-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-block relative w-64 h-20">
              <Image
                src="/logo-full-transparent.png"
                alt="ProvaReal"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-neutral-200/50 p-8 sm:p-10 border border-neutral-100">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                Criar sua conta
              </h1>
              <p className="text-neutral-500">Preencha os dados para começar</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">
                  Nome completo
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="Seu nome"
                  className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">
                    Senha
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    placeholder="••••••••"
                    className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">
                    Confirmar
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    placeholder="••••••••"
                    className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 py-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  disabled={isLoading}
                  className="mt-1 w-4 h-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-neutral-600 cursor-pointer leading-relaxed"
                >
                  Eu aceito os{" "}
                  <a
                    href="#"
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    termos de uso
                  </a>{" "}
                  e{" "}
                  <a
                    href="#"
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    política de privacidade
                  </a>
                </label>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full py-3.5 text-base font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Criar conta grátis
              </Button>
            </form>

            <div className="mt-8 text-center">
              <span className="text-neutral-500">Já tem uma conta? </span>
              <Link
                href="/auth/login"
                className="text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                Entrar
              </Link>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="mt-6 text-center">
            <p className="text-xs text-neutral-400 flex items-center justify-center gap-2">
              <Lock size={12} />
              Seus dados estão protegidos com criptografia
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
