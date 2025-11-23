import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScoreGuide } from "@/components/dashboard/ScoreGuide";

describe("ScoreGuide", () => {
  it("deve renderizar o componente sem erros", () => {
    render(<ScoreGuide />);

    expect(screen.getByText(/Como interpretar o score/i)).toBeInTheDocument();
  });

  it("deve exibir as 3 faixas de score", () => {
    render(<ScoreGuide />);

    expect(screen.getByText(/Provavelmente Sintética/i)).toBeInTheDocument();
    expect(screen.getByText(/Zona de incerteza/i)).toBeInTheDocument();
    expect(screen.getByText(/Provavelmente Real/i)).toBeInTheDocument();
  });

  it("deve mostrar os intervalos de score corretos", () => {
    render(<ScoreGuide />);

    expect(screen.getByText(/0–40/i)).toBeInTheDocument();
    expect(screen.getByText(/40–70/i)).toBeInTheDocument();
    expect(screen.getByText(/70–100/i)).toBeInTheDocument();
  });

  it("deve estar sempre visível quando renderizado", () => {
    const { container } = render(<ScoreGuide />);

    expect(container.firstChild).toBeVisible();
  });
});
