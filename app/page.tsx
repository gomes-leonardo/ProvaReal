import Link from "next/link";
import {
  Shield,
  Upload,
  BarChart3,
  Check,
  Users,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

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
              <Shield className="text-primary-700" size={32} />
              <span className="text-2xl font-bold text-primary-900">
                ProvaReal
              </span>
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
              Verifique se uma imagem é{" "}
              <span className="text-primary-700">real ou gerada por IA</span> em
              segundos
            </h1>
            <p className="text-xl text-neutral-600 mb-8">
              Tecnologia avançada de análise de padrões para combater a
              desinformação e garantir transparência nas eleições
            </p>
            <Link href="/auth/register">
              <Button size="lg" className="text-lg px-8 py-4">
                Começar agora
              </Button>
            </Link>
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
                Faça upload da imagem que deseja verificar. Formatos suportados:
                JPG, PNG, GIF, WEBP
              </p>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="text-primary-700" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                2. Nós analisamos padrões invisíveis
              </h3>
              <p className="text-neutral-600">
                Nossa tecnologia examina gradientes, ruído e padrões
                característicos de imagens reais vs sintéticas
              </p>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-primary-700" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                3. Você recebe um parecer com score de confiança
              </h3>
              <p className="text-neutral-600">
                Receba um resultado claro com score de confiança e explicação
                detalhada da análise
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
                  "10 análises mensais",
                  "Detecção básica",
                  "Histórico de 30 dias",
                  "Suporte por email",
                ],
                isPopular: false,
              },
              {
                name: "PRO",
                price: "R$ 29,90",
                quota: "200 análises/mês",
                features: [
                  "200 análises mensais",
                  "Detecção avançada",
                  "Histórico ilimitado",
                  "Suporte prioritário",
                  "API Access",
                ],
                isPopular: true,
              },
              {
                name: "PREMIUM",
                price: "R$ 99,90",
                quota: "Ilimitado",
                features: [
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
                Jornalistas
              </h3>
              <p className="text-sm text-neutral-600">
                Verifique imagens antes de publicar matérias e reportagens
              </p>
            </Card>

            <Card>
              <Shield className="text-primary-700 mb-3" size={32} />
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Campanhas Eleitorais
              </h3>
              <p className="text-sm text-neutral-600">
                Identifique conteúdo sintético usado em campanhas adversárias
              </p>
            </Card>

            <Card>
              <Shield className="text-primary-700 mb-3" size={32} />
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Órgãos Públicos
              </h3>
              <p className="text-sm text-neutral-600">
                Combata desinformação e garanta transparência nas comunicações
              </p>
            </Card>

            <Card>
              <Users className="text-primary-700 mb-3" size={32} />
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Cidadãos
              </h3>
              <p className="text-sm text-neutral-600">
                Verifique imagens compartilhadas nas redes sociais antes de
                compartilhar
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
              Por que isso importa nas eleições?
            </h2>
            <p className="text-lg text-primary-100 leading-relaxed mb-8">
              A desinformação através de imagens sintéticas é uma ameaça real à
              democracia. O ProvaReal oferece uma ferramenta confiável para
              jornalistas, campanhas e cidadãos verificarem a autenticidade de
              imagens, garantindo transparência e combate à manipulação
              eleitoral.
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
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="text-primary-500" size={24} />
                <span className="text-xl font-bold text-white">ProvaReal</span>
              </div>
              <p className="text-sm">
                Plataforma brasileira de verificação de imagens para combate à
                desinformação.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Política de Privacidade
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    contato@provareal.com.br
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-800 pt-8 text-center text-sm">
            <p>© 2024 ProvaReal. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
