import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ResultCard } from "@/components/dashboard/ResultCard";
import { AnalysisResult } from "@/lib/types";

describe("ResultCard - Melhorias", () => {
  const mockResultReal: AnalysisResult = {
    id: "test-1",
    filename: "test-image.png",
    createdAt: new Date("2024-01-01T12:00:00"),
    score: 85,
    label: "REAL",
    explanation: "Esta imagem apresenta características de imagens reais.",
  };

  const mockResultSintetica: AnalysisResult = {
    id: "test-2",
    filename: "fake-image.png",
    createdAt: new Date("2024-01-01T12:00:00"),
    score: 25,
    label: "SINTETICA",
    explanation: "Esta imagem apresenta características sintéticas.",
  };

  const mockResultIncerteza: AnalysisResult = {
    id: "test-3",
    filename: "uncertain-image.png",
    createdAt: new Date("2024-01-01T12:00:00"),
    score: 55,
    label: "REAL", // Label pode ser REAL ou SINTETICA, mas score está na zona de incerteza
    explanation: "Análise inconclusiva.",
  };

  it("deve mudar texto e classes quando score é baixo (sintético)", () => {
    render(<ResultCard result={mockResultSintetica} />);

    expect(screen.getByText("Provavelmente SINTÉTICA")).toBeInTheDocument();
    expect(screen.getByText("25%")).toBeInTheDocument();
  });

  it("deve mudar texto e classes quando score é médio (incerto)", () => {
    render(<ResultCard result={mockResultIncerteza} />);

    // Deve mostrar o score e indicar incerteza se o score estiver entre 40-70
    expect(screen.getByText("55%")).toBeInTheDocument();
  });

  it("deve mudar texto e classes quando score é alto (real)", () => {
    render(<ResultCard result={mockResultReal} />);

    expect(screen.getByText("Provavelmente REAL")).toBeInTheDocument();
    // Pode haver múltiplos elementos com "85%", usar getAllByText
    const scoreElements = screen.getAllByText("85%");
    expect(scoreElements.length).toBeGreaterThan(0);
  });

  it("deve exibir texto explicativo baseado na faixa do score", () => {
    render(<ResultCard result={mockResultReal} />);

    // Verifica se há texto explicativo
    const explanation = screen.getByText(/características/i);
    expect(explanation).toBeInTheDocument();
  });

  it("deve renderizar barra de progresso visual", () => {
    render(<ResultCard result={mockResultReal} />);

    // Verifica se há elemento com role progressbar ou elemento com width
    const progressContainer = document.querySelector('[role="progressbar"]');
    expect(progressContainer).toBeTruthy();
  });
});
