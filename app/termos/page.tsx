import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Termos de Uso e Política de Privacidade - ProvaReal",
  description:
    "Termos de uso, política de privacidade e informações sobre LGPD do ProvaReal.",
};

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link
              href="/"
              className="flex items-center gap-4 text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <div className="relative w-40 h-12">
                <Image
                  src="/logo-full-transparent.png"
                  alt="ProvaReal Logo"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
        <div className="prose prose-invert prose-lg max-w-none">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            Termos de Uso e Política de Privacidade
          </h1>
          <p className="text-neutral-400 text-lg mb-12">
            Última atualização: 26 de novembro de 2025
          </p>

          {/* Termos de Uso */}
          <section className="mb-16" id="termos">
            <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4 mb-6">
              1. Termos de Uso
            </h2>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">
              1.1 Aceitação dos Termos
            </h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Ao acessar e utilizar a plataforma ProvaReal
              (&quot;Plataforma&quot;), você concorda integralmente com estes
              Termos de Uso. Se você não concordar com qualquer parte destes
              termos, não deverá utilizar nossos serviços.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">
              1.2 Descrição do Serviço
            </h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              O ProvaReal é uma plataforma de verificação de autenticidade de
              imagens que utiliza inteligência artificial para detectar se uma
              imagem foi gerada artificialmente ou é uma fotografia real. O
              serviço fornece uma análise probabilística e não deve ser
              considerado como prova absoluta de autenticidade ou falsidade.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">
              1.3 Uso Permitido
            </h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Você concorda em utilizar a Plataforma apenas para fins lícitos e
              de acordo com estes Termos. É expressamente proibido:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mb-4">
              <li>
                Utilizar o serviço para atividades ilegais ou fraudulentas
              </li>
              <li>
                Tentar burlar, desabilitar ou interferir nos recursos de
                segurança da Plataforma
              </li>
              <li>
                Fazer engenharia reversa ou tentar extrair o código-fonte do
                sistema
              </li>
              <li>
                Utilizar bots, scrapers ou outros meios automatizados não
                autorizados
              </li>
              <li>
                Revender ou redistribuir o acesso ao serviço sem autorização
              </li>
              <li>
                Enviar conteúdo ilegal, difamatório, obsceno ou que viole
                direitos de terceiros
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">
              1.4 Limitação de Responsabilidade
            </h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Os resultados fornecidos pelo ProvaReal são baseados em análise
              algorítmica e representam uma estimativa probabilística. Não
              garantimos 100% de precisão em todas as análises. O usuário é
              responsável por suas decisões baseadas nos resultados fornecidos.
              O ProvaReal não se responsabiliza por danos diretos, indiretos,
              incidentais ou consequenciais decorrentes do uso ou
              impossibilidade de uso do serviço.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">
              1.5 Propriedade Intelectual
            </h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Todo o conteúdo da Plataforma, incluindo mas não limitado a
              logotipos, textos, gráficos, imagens, software e código-fonte, é
              propriedade do ProvaReal ou de seus licenciadores e está protegido
              por leis de propriedade intelectual. As imagens enviadas pelos
              usuários permanecem de propriedade de seus respectivos titulares.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">
              1.6 Modificações dos Termos
            </h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Reservamo-nos o direito de modificar estes Termos a qualquer
              momento. As alterações entrarão em vigor imediatamente após sua
              publicação na Plataforma. O uso continuado do serviço após as
              modificações constitui aceitação dos novos termos.
            </p>
          </section>

          {/* Política de Privacidade */}
          <section className="mb-16" id="privacidade">
            <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4 mb-6">
              2. Política de Privacidade
            </h2>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">
              2.1 Dados Coletados
            </h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Coletamos os seguintes tipos de dados:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mb-4">
              <li>
                <strong>Dados de cadastro:</strong> nome, e-mail e senha
                (criptografada)
              </li>
              <li>
                <strong>Dados de uso:</strong> histórico de análises, datas e
                horários de acesso
              </li>
              <li>
                <strong>Imagens enviadas:</strong> armazenadas temporariamente
                para análise
              </li>
              <li>
                <strong>Dados técnicos:</strong> endereço IP, tipo de navegador,
                sistema operacional
              </li>
              <li>
                <strong>Cookies:</strong> para manutenção de sessão e
                preferências
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">
              2.2 Finalidade do Tratamento
            </h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Utilizamos seus dados para:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mb-4">
              <li>
                Fornecer e melhorar nossos serviços de verificação de imagens
              </li>
              <li>Gerenciar sua conta e autenticação</li>
              <li>Enviar comunicações sobre o serviço (quando autorizado)</li>
              <li>Cumprir obrigações legais e regulatórias</li>
              <li>Prevenir fraudes e garantir a segurança da Plataforma</li>
              <li>Gerar estatísticas anônimas para melhoria do serviço</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">
              2.3 Compartilhamento de Dados
            </h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Não vendemos, alugamos ou compartilhamos seus dados pessoais com
              terceiros para fins de marketing. Podemos compartilhar dados
              apenas nas seguintes situações:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mb-4">
              <li>
                Com prestadores de serviços essenciais (hospedagem,
                processamento de pagamentos)
              </li>
              <li>Quando exigido por lei ou ordem judicial</li>
              <li>
                Para proteger direitos, propriedade ou segurança do ProvaReal e
                seus usuários
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">
              2.4 Retenção de Dados
            </h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Mantemos seus dados pelo tempo necessário para fornecer nossos
              serviços e cumprir obrigações legais. Imagens enviadas para
              análise são processadas e podem ser excluídas automaticamente após
              30 dias. Dados de conta são mantidos enquanto sua conta estiver
              ativa.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">
              2.5 Segurança
            </h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Implementamos medidas técnicas e organizacionais para proteger
              seus dados, incluindo:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mb-4">
              <li>Criptografia de dados em trânsito (HTTPS/TLS)</li>
              <li>Criptografia de senhas com algoritmos seguros (bcrypt)</li>
              <li>Controle de acesso restrito aos dados</li>
              <li>Monitoramento contínuo de segurança</li>
              <li>Backups regulares e plano de recuperação de desastres</li>
            </ul>
          </section>

          {/* LGPD */}
          <section className="mb-16" id="lgpd">
            <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4 mb-6">
              3. Direitos do Titular (LGPD)
            </h2>

            <p className="text-neutral-300 leading-relaxed mb-4">
              Em conformidade com a Lei Geral de Proteção de Dados (Lei nº
              13.709/2018), você possui os seguintes direitos:
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">
              3.1 Seus Direitos
            </h3>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mb-4">
              <li>
                <strong>Confirmação e Acesso:</strong> confirmar a existência de
                tratamento e acessar seus dados
              </li>
              <li>
                <strong>Correção:</strong> solicitar a correção de dados
                incompletos, inexatos ou desatualizados
              </li>
              <li>
                <strong>Anonimização ou Eliminação:</strong> solicitar a
                anonimização ou eliminação de dados desnecessários
              </li>
              <li>
                <strong>Portabilidade:</strong> solicitar a portabilidade dos
                dados a outro fornecedor de serviço
              </li>
              <li>
                <strong>Eliminação:</strong> solicitar a eliminação dos dados
                tratados com seu consentimento
              </li>
              <li>
                <strong>Informação:</strong> obter informações sobre
                compartilhamento de dados com terceiros
              </li>
              <li>
                <strong>Revogação:</strong> revogar o consentimento a qualquer
                momento
              </li>
              <li>
                <strong>Oposição:</strong> opor-se ao tratamento em casos de
                descumprimento da LGPD
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">
              3.2 Como Exercer Seus Direitos
            </h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Para exercer qualquer um dos direitos acima, você pode:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mb-4">
              <li>Acessar as configurações de sua conta na Plataforma</li>
              <li>
                Enviar e-mail para:{" "}
                <a
                  href="mailto:privacidade@provareal.com.br"
                  className="text-blue-400 hover:underline"
                >
                  privacidade@provareal.com.br
                </a>
              </li>
              <li>Utilizar o formulário de contato disponível na Plataforma</li>
            </ul>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Responderemos às solicitações em até 15 (quinze) dias úteis,
              conforme previsto na legislação.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">
              3.3 Base Legal para Tratamento
            </h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              O tratamento de seus dados pessoais é realizado com base nas
              seguintes hipóteses legais previstas na LGPD:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mb-4">
              <li>
                <strong>Execução de contrato:</strong> para fornecer os serviços
                contratados
              </li>
              <li>
                <strong>Consentimento:</strong> para envio de comunicações de
                marketing (quando autorizado)
              </li>
              <li>
                <strong>Legítimo interesse:</strong> para melhoria dos serviços
                e prevenção de fraudes
              </li>
              <li>
                <strong>Cumprimento de obrigação legal:</strong> para atender
                exigências legais e regulatórias
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">
              3.4 Encarregado de Dados (DPO)
            </h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Para questões relacionadas à proteção de dados pessoais, entre em
              contato com nosso Encarregado de Dados:
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-4">
              <p className="text-neutral-300">
                <strong className="text-white">E-mail:</strong>{" "}
                dpo@provareal.com.br
                <br />
                <strong className="text-white">Endereço:</strong> [Endereço da
                empresa]
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-16" id="cookies">
            <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4 mb-6">
              4. Política de Cookies
            </h2>

            <p className="text-neutral-300 leading-relaxed mb-4">
              Utilizamos cookies e tecnologias similares para melhorar sua
              experiência na Plataforma:
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">
              4.1 Tipos de Cookies Utilizados
            </h3>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mb-4">
              <li>
                <strong>Cookies essenciais:</strong> necessários para o
                funcionamento básico da Plataforma
              </li>
              <li>
                <strong>Cookies de sessão:</strong> para manter você logado
                durante a navegação
              </li>
              <li>
                <strong>Cookies de preferências:</strong> para lembrar suas
                configurações e preferências
              </li>
              <li>
                <strong>Cookies analíticos:</strong> para entender como você usa
                a Plataforma e melhorar nossos serviços
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-8 mb-4">
              4.2 Gerenciamento de Cookies
            </h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Você pode gerenciar ou desabilitar cookies através das
              configurações do seu navegador. Note que a desativação de cookies
              essenciais pode afetar o funcionamento da Plataforma.
            </p>
          </section>

          {/* Contato */}
          <section className="mb-16" id="contato">
            <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4 mb-6">
              5. Contato
            </h2>

            <p className="text-neutral-300 leading-relaxed mb-4">
              Para dúvidas, sugestões ou reclamações sobre estes Termos ou nossa
              Política de Privacidade, entre em contato conosco:
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <p className="text-neutral-300">
                <strong className="text-white">ProvaReal</strong>
                <br />
                <br />
                <strong className="text-white">E-mail geral:</strong>{" "}
                contato@provareal.com.br
                <br />
                <strong className="text-white">Privacidade:</strong>{" "}
                privacidade@provareal.com.br
                <br />
                <strong className="text-white">Suporte:</strong>{" "}
                suporte@provareal.com.br
              </p>
            </div>
          </section>

          {/* Disposições Finais */}
          <section>
            <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4 mb-6">
              6. Disposições Finais
            </h2>

            <p className="text-neutral-300 leading-relaxed mb-4">
              Estes Termos são regidos pelas leis da República Federativa do
              Brasil. Qualquer disputa será submetida ao foro da comarca de
              [cidade], com exclusão de qualquer outro, por mais privilegiado
              que seja.
            </p>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Se qualquer disposição destes Termos for considerada inválida ou
              inexequível, as demais disposições permanecerão em pleno vigor e
              efeito.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 bg-neutral-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-neutral-500">
            © 2025 ProvaReal. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
