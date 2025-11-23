import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AnalysisVisualizer3D } from "@/components/three/AnalysisVisualizer3D";

// Mock do @react-three/fiber e @react-three/drei
vi.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="three-canvas">{children}</div>
  ),
  useFrame: vi.fn((callback: (state: any) => void) => {
    // Simula useFrame - não executa o callback automaticamente
    // O callback será chamado apenas se o componente realmente usar useFrame
    if (typeof callback === "function") {
      // Não executa automaticamente para evitar erros com refs não inicializados
    }
  }),
}));

vi.mock("@react-three/drei", () => ({
  OrbitControls: () => <div data-testid="orbit-controls" />,
}));

vi.mock("three", () => ({
  Mesh: class MockMesh {},
  PlaneGeometry: class MockPlaneGeometry {},
  BufferGeometry: class MockBufferGeometry {},
  PointsMaterial: class MockPointsMaterial {},
  Points: class MockPoints {},
  Vector3: class MockVector3 {},
  Color: class MockColor {},
}));

describe("AnalysisVisualizer3D", () => {
  it("deve renderizar quando status é 'analyzing'", () => {
    render(<AnalysisVisualizer3D status="analyzing" />);

    expect(screen.getByTestId("three-canvas")).toBeInTheDocument();
  });

  it("NÃO deve renderizar quando status é 'idle'", () => {
    render(<AnalysisVisualizer3D status="idle" />);

    expect(screen.queryByTestId("three-canvas")).not.toBeInTheDocument();
  });

  it("NÃO deve renderizar quando status é 'real'", () => {
    render(<AnalysisVisualizer3D status="real" />);

    expect(screen.queryByTestId("three-canvas")).not.toBeInTheDocument();
  });

  it("NÃO deve renderizar quando status é 'synthetic'", () => {
    render(<AnalysisVisualizer3D status="synthetic" />);

    expect(screen.queryByTestId("three-canvas")).not.toBeInTheDocument();
  });

  it("deve aceitar diferentes estados de análise", () => {
    const { rerender } = render(<AnalysisVisualizer3D status="idle" />);
    expect(screen.queryByTestId("three-canvas")).not.toBeInTheDocument();

    rerender(<AnalysisVisualizer3D status="analyzing" />);
    expect(screen.getByTestId("three-canvas")).toBeInTheDocument();

    rerender(<AnalysisVisualizer3D status="real" />);
    expect(screen.queryByTestId("three-canvas")).not.toBeInTheDocument();

    rerender(<AnalysisVisualizer3D status="synthetic" />);
    expect(screen.queryByTestId("three-canvas")).not.toBeInTheDocument();
  });
});
