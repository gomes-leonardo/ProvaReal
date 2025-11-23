import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { useAnalysisStore } from "@/store/useAnalysisStore";
import { AnalysisResult } from "@/lib/types";

// Mock do store
vi.mock("@/store/useAnalysisStore");

describe("StatsCards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar os 4 cards de estatísticas", () => {
    (useAnalysisStore as any).mockReturnValue({
      analyses: [],
    });

    render(<StatsCards />);

    expect(
      screen.getByText(/Total de imagens analisadas/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/% Provavelmente Reais/i)).toBeInTheDocument();
    expect(screen.getByText(/% Provavelmente Sintéticas/i)).toBeInTheDocument();
    expect(screen.getByText(/Análises nas últimas 24h/i)).toBeInTheDocument();
  });

  it("deve mostrar valores corretos com base em dados mockados", () => {
    const mockAnalyses: AnalysisResult[] = [
      {
        id: "1",
        filename: "test1.png",
        createdAt: new Date(),
        score: 85,
        label: "REAL",
        explanation: "Real",
      },
      {
        id: "2",
        filename: "test2.png",
        createdAt: new Date(),
        score: 25,
        label: "SINTETICA",
        explanation: "Sintética",
      },
      {
        id: "3",
        filename: "test3.png",
        createdAt: new Date(),
        score: 90,
        label: "REAL",
        explanation: "Real",
      },
    ];

    (useAnalysisStore as any).mockReturnValue({
      analyses: mockAnalyses,
    });

    render(<StatsCards />);

    // Total de imagens - usar getAllByText pois pode haver múltiplos "3"
    const totalElements = screen.getAllByText("3");
    expect(totalElements.length).toBeGreaterThan(0);

    // % Reais (2 de 3 = 66.67% arredondado para 67%)
    expect(screen.getByText(/67%/i)).toBeInTheDocument();

    // % Sintéticas (1 de 3 = 33.33% arredondado para 33%)
    expect(screen.getByText(/33%/i)).toBeInTheDocument();
  });

  it("deve calcular análises das últimas 24h corretamente", () => {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 25 * 60 * 60 * 1000); // 25 horas atrás
    const recent = new Date(now.getTime() - 12 * 60 * 60 * 1000); // 12 horas atrás

    const mockAnalyses: AnalysisResult[] = [
      {
        id: "1",
        filename: "test1.png",
        createdAt: recent,
        score: 85,
        label: "REAL",
        explanation: "Real",
      },
      {
        id: "2",
        filename: "test2.png",
        createdAt: yesterday,
        score: 25,
        label: "SINTETICA",
        explanation: "Sintética",
      },
    ];

    (useAnalysisStore as any).mockReturnValue({
      analyses: mockAnalyses,
    });

    render(<StatsCards />);

    // Deve mostrar apenas 1 análise nas últimas 24h
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("deve mostrar 0 quando não há análises", () => {
    (useAnalysisStore as any).mockReturnValue({
      analyses: [],
    });

    render(<StatsCards />);

    const zeros = screen.getAllByText("0");
    // Pelo menos 2 zeros (total e análises 24h), e 0% para real/sintética
    expect(zeros.length).toBeGreaterThanOrEqual(2);
    // Verifica que há pelo menos um "0%" (para porcentagens)
    expect(screen.getAllByText("0%").length).toBeGreaterThan(0);
  });
});
