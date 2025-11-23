import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HistoryTable } from "@/components/dashboard/HistoryTable";
import { AnalysisResult } from "@/lib/types";

describe("HistoryTable", () => {
  const mockOnViewDetails = vi.fn();

  const mockAnalyses: AnalysisResult[] = [
    {
      id: "1",
      filename: "image1.png",
      createdAt: new Date("2024-01-01T10:00:00"),
      score: 85,
      label: "REAL",
      explanation: "Imagem real",
    },
    {
      id: "2",
      filename: "image2.png",
      createdAt: new Date("2024-01-02T11:00:00"),
      score: 25,
      label: "SINTETICA",
      explanation: "Imagem sintética",
    },
    {
      id: "3",
      filename: "image3.png",
      createdAt: new Date("2024-01-03T12:00:00"),
      score: 90,
      label: "REAL",
      explanation: "Imagem real",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar a lista de análises mockadas", () => {
    render(
      <HistoryTable analyses={mockAnalyses} onViewDetails={mockOnViewDetails} />
    );

    expect(screen.getByText("image1.png")).toBeInTheDocument();
    expect(screen.getByText("image2.png")).toBeInTheDocument();
    expect(screen.getByText("image3.png")).toBeInTheDocument();
  });

  it("deve exibir mensagem quando não há análises", () => {
    render(<HistoryTable analyses={[]} onViewDetails={mockOnViewDetails} />);

    expect(
      screen.getByText(/Nenhuma análise realizada ainda/i)
    ).toBeInTheDocument();
  });

  it("deve exibir labels corretos (Real/Sintética)", () => {
    render(
      <HistoryTable analyses={mockAnalyses} onViewDetails={mockOnViewDetails} />
    );

    const realLabels = screen.getAllByText("Real");
    const sinteticaLabels = screen.getAllByText("Sintética");

    expect(realLabels.length).toBeGreaterThan(0);
    expect(sinteticaLabels.length).toBeGreaterThan(0);
  });

  it("deve exibir scores corretos", () => {
    render(
      <HistoryTable analyses={mockAnalyses} onViewDetails={mockOnViewDetails} />
    );

    expect(screen.getByText("85%")).toBeInTheDocument();
    expect(screen.getByText("25%")).toBeInTheDocument();
    expect(screen.getByText("90%")).toBeInTheDocument();
  });

  it("deve abrir o modal de detalhes ao clicar em 'ver detalhes'", async () => {
    const user = userEvent.setup();

    render(
      <HistoryTable analyses={mockAnalyses} onViewDetails={mockOnViewDetails} />
    );

    const viewButtons = screen.getAllByText("Ver detalhes");
    await user.click(viewButtons[0]);

    expect(mockOnViewDetails).toHaveBeenCalledWith(mockAnalyses[0]);
    expect(mockOnViewDetails).toHaveBeenCalledTimes(1);
  });

  it("deve exibir datas formatadas", () => {
    render(
      <HistoryTable analyses={mockAnalyses} onViewDetails={mockOnViewDetails} />
    );

    // Verifica se as datas aparecem (formato brasileiro)
    expect(screen.getByText(/01\/01\/2024/i)).toBeInTheDocument();
    expect(screen.getByText(/02\/01\/2024/i)).toBeInTheDocument();
  });
});
