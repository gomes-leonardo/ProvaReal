"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { login } from "@/services/authService";
import { Shield, Sparkles, Eye, Lock } from "lucide-react";

/**
 * Página de login - Design ultra moderno
 * Split screen com gradiente animado e glassmorphism
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
      await login({ email, password });
      router.push("/dashboard");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Erro ao fazer login. Tente novamente.";
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 animate-gradient-slow" />

        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-400/15 rounded-full blur-3xl animate-float-slow" />

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
                <span>Tecnologia de ponta em IA</span>
              </div>
              <h1 className="text-5xl font-bold leading-tight">
                Detecte imagens
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white">
                  geradas por IA
                </span>
              </h1>
              <p className="text-xl text-white/70 max-w-md">
                Proteja-se contra deepfakes e desinformação com nossa plataforma
                de verificação.
              </p>
            </div>

            {/* Features */}
            <div className="flex gap-6">
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                  <Shield size={20} />
                </div>
                <span className="text-sm">Seguro</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                  <Eye size={20} />
                </div>
                <span className="text-sm">Preciso</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                  <Lock size={20} />
                </div>
                <span className="text-sm">Privado</span>
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
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-neutral-50 relative">
        {/* Subtle Background Pattern */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(200 200 200) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="w-full max-w-md relative z-10">
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
                Bem-vindo de volta
              </h1>
              <p className="text-neutral-500">
                Entre na sua conta para continuar
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">
                  E-mail
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-neutral-700">
                    Senha
                  </label>
                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Esqueceu?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    placeholder="••••••••"
                    className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full py-3.5 text-base font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Entrar
              </Button>
            </form>

            <div className="mt-8 text-center">
              <span className="text-neutral-500">Não tem uma conta? </span>
              <Link
                href="/auth/register"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Criar conta grátis
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
