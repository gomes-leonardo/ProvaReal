import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ResultCard } from "@/components/dashboard/ResultCard";
import { AnalysisResult } from "@/lib/types";

describe("ResultCard", () => {
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

  it("deve mostrar o score e label REAL corretamente", () => {
    render(<ResultCard result={mockResultReal} />);

    expect(screen.getByText("Provavelmente REAL")).toBeInTheDocument();
    expect(screen.getByText("85%")).toBeInTheDocument();
    expect(screen.getByText(/Score de confiança/i)).toBeInTheDocument();
  });

  it("deve mostrar o score e label SINTÉTICA corretamente", () => {
    render(<ResultCard result={mockResultSintetica} />);

    expect(screen.getByText("Provavelmente SINTÉTICA")).toBeInTheDocument();
    expect(screen.getByText("25%")).toBeInTheDocument();
  });

  it("deve renderizar a barra de progresso conforme o score", () => {
    render(<ResultCard result={mockResultReal} />);

    // Verifica se o score aparece na barra de progresso
    expect(screen.getByText("85%")).toBeInTheDocument();
    expect(screen.getByText(/Score de confiança/i)).toBeInTheDocument();

    // Verifica se há um elemento com width (barra de progresso)
    const progressContainer = document.querySelector('[style*="width"]');
    expect(progressContainer).toBeTruthy();
  });

  it("deve exibir o texto explicativo", () => {
    render(<ResultCard result={mockResultReal} />);

    expect(
      screen.getByText(
        /Esta imagem apresenta características de imagens reais/i
      )
    ).toBeInTheDocument();
  });

  it("deve exibir o nome do arquivo", () => {
    render(<ResultCard result={mockResultReal} />);

    expect(screen.getByText("test-image.png")).toBeInTheDocument();
  });

  it("deve exibir a data formatada", () => {
    render(<ResultCard result={mockResultReal} />);

    // Verifica se a data aparece (formato brasileiro)
    expect(screen.getByText(/01\/01\/2024/i)).toBeInTheDocument();
  });
});
