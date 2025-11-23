import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("Landing Page", () => {
  it("deve renderizar o header com logo e botão de entrar", () => {
    render(<HomePage />);

    expect(screen.getByText("ProvaReal")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Entrar/i })).toBeInTheDocument();
  });

  it("deve exibir o hero com frase principal", () => {
    render(<HomePage />);

    expect(
      screen.getByText(
        /Verifique se uma imagem é real ou gerada por IA em segundos/i
      )
    ).toBeInTheDocument();
  });

  it("deve exibir seção 'Como funciona' com 3 passos", () => {
    render(<HomePage />);

    expect(screen.getByText(/Como funciona/i)).toBeInTheDocument();
    expect(screen.getByText(/1. Envie a imagem/i)).toBeInTheDocument();
    expect(
      screen.getByText(/2. Nós analisamos padrões invisíveis/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/3. Você recebe um parecer com score de confiança/i)
    ).toBeInTheDocument();
  });

  it("deve exibir seção 'Para quem é'", () => {
    render(<HomePage />);

    expect(screen.getByText(/Para quem é/i)).toBeInTheDocument();
    expect(screen.getByText(/Jornalistas/i)).toBeInTheDocument();
    expect(screen.getByText(/Campanhas Eleitorais/i)).toBeInTheDocument();
    expect(screen.getByText(/Órgãos Públicos/i)).toBeInTheDocument();
    expect(screen.getByText(/Cidadãos/i)).toBeInTheDocument();
  });

  it("deve exibir seção 'Por que isso importa nas eleições?'", () => {
    render(<HomePage />);

    expect(
      screen.getByText(/Por que isso importa nas eleições\?/i)
    ).toBeInTheDocument();
  });

  it("deve ter links para registro", () => {
    render(<HomePage />);

    const registerLinks = screen.getAllByRole("link", {
      name: /Começar agora/i,
    });
    expect(registerLinks.length).toBeGreaterThan(0);
    expect(registerLinks[0]).toHaveAttribute("href", "/auth/register");
  });

  it("deve ter footer com links", () => {
    render(<HomePage />);

    expect(screen.getByText(/Termos de Uso/i)).toBeInTheDocument();
    expect(screen.getByText(/Política de Privacidade/i)).toBeInTheDocument();
    expect(screen.getByText(/contato@provareal.com.br/i)).toBeInTheDocument();
  });
});
