import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import LoginPage from "@/app/auth/login/page";
import * as authService from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";

// Mock do Next.js router
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

// Mock do store
vi.mock("@/store/useAuthStore");
vi.mock("@/services/authService");

describe("Página /auth/login", () => {
  const mockPush = vi.fn();
  const mockLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({ push: mockPush });
    (useAuthStore as any).mockReturnValue({
      login: mockLogin,
    });
  });

  it("deve renderizar os campos de email e senha", () => {
    render(<LoginPage />);

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Entrar/i })).toBeInTheDocument();
  });

  it("deve validar campos vazios", async () => {
    const user = userEvent.setup();

    render(<LoginPage />);

    const submitButton = screen.getByRole("button", { name: /Entrar/i });
    await user.click(submitButton);

    // HTML5 validation deve impedir o submit
    const emailInput = screen.getByLabelText(/E-mail/i) as HTMLInputElement;
    expect(emailInput.validity.valueMissing).toBe(true);
  });

  it("deve chamar o serviço de login fake com credenciais corretas", async () => {
    const user = userEvent.setup();
    const mockLoginService = vi.spyOn(authService, "login").mockResolvedValue({
      user: { id: "1", name: "Test", email: "test@test.com" },
      token: "token123",
    });

    render(<LoginPage />);

    await user.type(screen.getByLabelText(/E-mail/i), "test@test.com");
    await user.type(screen.getByLabelText(/Senha/i), "password123");
    await user.click(screen.getByRole("button", { name: /Entrar/i }));

    await waitFor(() => {
      expect(mockLoginService).toHaveBeenCalledWith({
        email: "test@test.com",
        password: "password123",
      });
    });

    expect(mockLogin).toHaveBeenCalledWith(
      { id: "1", name: "Test", email: "test@test.com" },
      "token123"
    );
  });

  it("deve exibir mensagem de erro se email/senha forem inválidos", async () => {
    const user = userEvent.setup();
    vi.spyOn(authService, "login").mockRejectedValue(
      new Error("Credenciais inválidas")
    );

    render(<LoginPage />);

    await user.type(screen.getByLabelText(/E-mail/i), "invalid@test.com");
    await user.type(screen.getByLabelText(/Senha/i), "wrong");
    await user.click(screen.getByRole("button", { name: /Entrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/Credenciais inválidas/i)).toBeInTheDocument();
    });
  });

  it("deve redirecionar para dashboard após login bem-sucedido", async () => {
    const user = userEvent.setup();
    vi.spyOn(authService, "login").mockResolvedValue({
      user: { id: "1", name: "Test", email: "test@test.com" },
      token: "token123",
    });

    render(<LoginPage />);

    await user.type(screen.getByLabelText(/E-mail/i), "test@test.com");
    await user.type(screen.getByLabelText(/Senha/i), "password123");
    await user.click(screen.getByRole("button", { name: /Entrar/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("deve mostrar link para criar conta", () => {
    render(<LoginPage />);

    const link = screen.getByRole("link", { name: /Criar conta/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/auth/register");
  });

  it("deve mostrar loading durante o login", async () => {
    const user = userEvent.setup();
    vi.spyOn(authService, "login").mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              user: { id: "1", name: "Test", email: "test@test.com" },
              token: "token123",
            });
          }, 500);
        })
    );

    render(<LoginPage />);

    await user.type(screen.getByLabelText(/E-mail/i), "test@test.com");
    await user.type(screen.getByLabelText(/Senha/i), "password123");
    await user.click(screen.getByRole("button", { name: /Entrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/Carregando/i)).toBeInTheDocument();
    });
  });
});
