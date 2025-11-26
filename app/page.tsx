"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  Upload,
  BarChart3,
  Check,
  Users,
  AlertCircle,
  Building2,
  Newspaper,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { LandingUpload } from "@/components/landing/LandingUpload";

/**
 * Landing page pública do ProvaReal
 * Apresenta o produto de forma clara e institucional
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="relative w-80 h-24">
                <Image
                  src="/logo-full-transparent.png"
                  alt="ProvaReal Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                Entrar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
              Descubra em segundos se uma imagem é{" "}
              <span className="text-primary-700">real ou gerada por IA</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8">
              Proteja-se contra deepfakes e manipulações visuais. Nossa
              inteligência artificial analisa padrões invisíveis ao olho humano.
            </p>

            {/* Input de upload */}
            <div className="mb-8">
              <LandingUpload />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/register">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 w-full sm:w-auto"
                >
                  Criar conta grátis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-neutral-900 mb-12">
            Como funciona
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="text-primary-700" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                1. Envie a imagem
              </h3>
              <p className="text-neutral-600">
                Arraste ou selecione qualquer imagem que você deseja verificar.
                Suportamos JPG, PNG, GIF e WEBP.
              </p>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="text-primary-700" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                2. Análise inteligente
              </h3>
              <p className="text-neutral-600">
                Nossa IA examina milhares de padrões de pixels, texturas e
                metadados para detectar sinais de geração artificial.
              </p>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-primary-700" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                3. Resultado claro
              </h3>
              <p className="text-neutral-600">
                Receba um score de confiança e uma explicação detalhada sobre a
                autenticidade da imagem em linguagem simples.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-neutral-900 mb-12">
            Planos e Preços
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "FREE",
                price: "R$ 0,00",
                quota: "10 análises/mês",
                features: [
                  "Perfeito para uso pessoal",
                  "10 análises mensais",
                  "Detecção básica",
                  "Histórico dos últimos 30 dias",
                  "Suporte por e-mail",
                ],
                isPopular: false,
              },
              {
                name: "PRO",
                price: "R$ 29,90",
                quota: "200 análises/mês",
                features: [
                  "Para profissionais e equipes",
                  "200 análises por mês",
                  "Detecção avançada com mais precisão",
                  "Histórico ilimitado",
                  "Suporte prioritário",
                  "Acesso à API para automação",
                ],
                isPopular: true,
              },
              {
                name: "PREMIUM",
                price: "R$ 99,90",
                quota: "Ilimitado",
                features: [
                  "Para empresas e operações críticas",
                  "Análises ilimitadas",
                  "Detecção em tempo real",
                  "Relatórios detalhados",
                  "Gerente de conta dedicado",
                  "SLA garantido",
                ],
                isPopular: false,
              },
            ].map((plan) => (
              <Card
                key={plan.name}
                className={`relative flex flex-col ${
                  plan.isPopular ? "border-primary-500 shadow-lg scale-105" : ""
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Mais Popular
                  </div>
                )}
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-bold text-neutral-900 mb-4">
                    {plan.price}
                    <span className="text-sm font-normal text-neutral-500">
                      /mês
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 mb-6">{plan.quota}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check
                          className="text-primary-600 mr-2 flex-shrink-0"
                          size={18}
                        />
                        <span className="text-sm text-neutral-600">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 pt-0 mt-auto">
                  <Link href="/auth/register" className="w-full block">
                    <Button
                      variant={plan.isPopular ? "primary" : "outline"}
                      className="w-full"
                    >
                      Escolher {plan.name}
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Para Quem É */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-neutral-900 mb-12">
            Para quem é
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card>
              <Users className="text-primary-700 mb-3" size={32} />
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Uso Pessoal
              </h3>
              <p className="text-sm text-neutral-600">
                Verifique imagens recebidas em redes sociais e grupos de
                mensagens antes de compartilhar.
              </p>
            </Card>

            <Card>
              <Newspaper className="text-primary-700 mb-3" size={32} />
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Jornalistas
              </h3>
              <p className="text-sm text-neutral-600">
                Garanta a autenticidade de imagens antes de publicar matérias e
                reportagens.
              </p>
            </Card>

            <Card>
              <Building2 className="text-primary-700 mb-3" size={32} />
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Empresas
              </h3>
              <p className="text-sm text-neutral-600">
                Proteja sua marca contra fraudes visuais e deepfakes em
                comunicações corporativas.
              </p>
            </Card>

            <Card>
              <ShoppingBag className="text-primary-700 mb-3" size={32} />
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                E-commerce
              </h3>
              <p className="text-sm text-neutral-600">
                Valide imagens de produtos e evite fraudes em marketplaces e
                lojas online.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Por Que Isso Importa */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <AlertCircle className="mx-auto mb-6" size={48} />
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Por que isso importa?
            </h2>
            <p className="text-lg text-primary-100 leading-relaxed mb-8">
              Vivemos na era da desinformação visual. Deepfakes e imagens
              geradas por IA estão cada vez mais realistas e difíceis de
              identificar. O ProvaReal oferece uma ferramenta confiável para
              verificar a autenticidade de imagens, ajudando você a tomar
              decisões informadas e combater a manipulação.
            </p>
            <Link href="/auth/register">
              <Button
                variant="secondary"
                size="lg"
                className="text-lg px-8 py-4"
              >
                Começar a verificar
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-300 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="relative w-40 h-12">
                  <Image
                    src="/logo-full-transparent.png"
                    alt="ProvaReal"
                    fill
                    className="object-contain brightness-0 invert"
                  />
                </div>
              </div>
              <p className="text-sm">
                Plataforma brasileira de verificação de imagens com inteligência
                artificial. Proteja-se contra deepfakes e manipulações visuais.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/termos"
                    className="hover:text-white transition-colors"
                  >
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link
                    href="/termos#privacidade"
                    className="hover:text-white transition-colors"
                  >
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="mailto:contato@provareal.com.br"
                    className="hover:text-white transition-colors"
                  >
                    contato@provareal.com.br
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-800 pt-8 text-center text-sm">
            <p>© 2025 ProvaReal. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
