import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DashboardPage from "@/app/dashboard/page";
import { useAuthStore } from "@/store/useAuthStore";
import { useAnalysisStore } from "@/store/useAnalysisStore";
import * as detectionService from "@/services/detectionService";

// Mock dos stores
vi.mock("@/store/useAuthStore");
vi.mock("@/store/useAnalysisStore");
vi.mock("@/services/detectionService");
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));
vi.mock("@/components/three/AnalysisVisualizer3D", () => ({
  AnalysisVisualizer3D: ({ status }: { status: string }) => (
    <div data-testid="3d-visualizer" data-status={status}>
      3D Visualizer
    </div>
  ),
}));

describe("Página /dashboard - Melhorias", () => {
  const mockLogin = vi.fn();
  const mockAddAnalysis = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock do store de autenticação
    (useAuthStore as any).mockReturnValue({
      user: { id: "1", name: "Test User", email: "test@test.com" },
      isAuthenticated: true,
      login: mockLogin,
    });

    // Mock do store de análises
    (useAnalysisStore as any).mockReturnValue({
      analyses: [],
      addAnalysis: mockAddAnalysis,
    });

    // Mock do serviço de detecção
    vi.spyOn(detectionService, "analyzeImage").mockResolvedValue({
      id: "test-1",
      filename: "test.png",
      createdAt: new Date(),
      score: 75,
      label: "REAL" as const,
      explanation: "Imagem real",
      imageUrl: "data:image/png;base64,test",
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("deve exibir os cards de estatísticas", () => {
    render(<DashboardPage />);

    expect(
      screen.getByText(/Total de imagens analisadas/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/% Provavelmente Reais/i)).toBeInTheDocument();
  });

  it("deve exibir o guia de interpretação do score", () => {
    render(<DashboardPage />);

    expect(screen.getByText(/Como interpretar o score/i)).toBeInTheDocument();
    expect(screen.getByText(/Provavelmente Sintética/i)).toBeInTheDocument();
    expect(screen.getByText(/Zona de incerteza/i)).toBeInTheDocument();
    expect(screen.getByText(/Provavelmente Real/i)).toBeInTheDocument();
  });

  it("deve exibir visualizador 3D durante análise", async () => {
    const user = userEvent.setup();
    const file = new File(["test"], "test.png", { type: "image/png" });

    render(<DashboardPage />);

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (input) {
      await user.upload(input, file);

      await waitFor(() => {
        const analyzeButton = screen.getByText(/Analisar imagem/i);
        expect(analyzeButton).toBeInTheDocument();
      });

      const analyzeButton = screen.getByText(/Analisar imagem/i);
      await user.click(analyzeButton);

      await waitFor(() => {
        const visualizer = screen.getByTestId("3d-visualizer");
        expect(visualizer).toBeInTheDocument();
        expect(visualizer).toHaveAttribute("data-status", "analyzing");
      });
    }
  });

  it("deve mudar status do visualizador 3D quando resultado chega", async () => {
    const user = userEvent.setup();
    const file = new File(["test"], "test.png", { type: "image/png" });

    render(<DashboardPage />);

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (input) {
      await user.upload(input, file);

      await waitFor(() => {
        const analyzeButton = screen.getByText(/Analisar imagem/i);
        expect(analyzeButton).toBeInTheDocument();
      });

      const analyzeButton = screen.getByText(/Analisar imagem/i);
      await user.click(analyzeButton);

      // Verifica que 3D aparece durante análise
      await waitFor(() => {
        const visualizer = screen.getByTestId("3d-visualizer");
        expect(visualizer).toBeInTheDocument();
        expect(visualizer).toHaveAttribute("data-status", "analyzing");
      });

      // Aguarda resultado
      await waitFor(
        () => {
          expect(screen.getByText(/Provavelmente REAL/i)).toBeInTheDocument();
        },
        { timeout: 3000 }
      );

      // Verifica que 3D muda para status "real"
      const visualizer = screen.getByTestId("3d-visualizer");
      expect(visualizer).toHaveAttribute("data-status", "real");
    }
  });
});
