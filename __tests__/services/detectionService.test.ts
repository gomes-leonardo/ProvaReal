import { describe, it, expect, vi, beforeEach } from "vitest";
import { analyzeImage, getAnalysisHistory } from "@/services/detectionService";
import { AnalysisResult, AnalysisLabel } from "@/lib/types";

describe("detectionService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve retornar score mockado entre 0 e 100", async () => {
    const file = new File(["test"], "test.png", { type: "image/png" });

    const result = await analyzeImage(file);

    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it("deve gerar o label correto baseado no score", async () => {
    const file = new File(["test"], "test.png", { type: "image/png" });

    // Executa múltiplas vezes para testar diferentes scores
    const results: AnalysisLabel[] = [];
    for (let i = 0; i < 10; i++) {
      const result = await analyzeImage(file);
      results.push(result.label);
    }

    // Verifica que os labels são válidos
    results.forEach((label) => {
      expect(["REAL", "SINTETICA"]).toContain(label);
    });
  });

  it("deve gerar score > 50 para label REAL", async () => {
    const file = new File(["test"], "test.png", { type: "image/png" });

    // Executa até encontrar um resultado REAL
    let result: AnalysisResult;
    let attempts = 0;
    do {
      result = await analyzeImage(file);
      attempts++;
      if (attempts > 20) break; // Evita loop infinito
    } while (result.label !== "REAL");

    if (result.label === "REAL") {
      expect(result.score).toBeGreaterThan(50);
    }
  });

  it("deve gerar score <= 50 para label SINTETICA", async () => {
    const file = new File(["test"], "test.png", { type: "image/png" });

    // Executa até encontrar um resultado SINTETICA
    let result: AnalysisResult;
    let attempts = 0;
    do {
      result = await analyzeImage(file);
      attempts++;
      if (attempts > 20) break; // Evita loop infinito
    } while (result.label !== "SINTETICA");

    if (result.label === "SINTETICA") {
      expect(result.score).toBeLessThanOrEqual(50);
    }
  });

  it("deve retornar um objeto AnalysisResult completo", async () => {
    const file = new File(["test"], "test-image.png", { type: "image/png" });

    const result = await analyzeImage(file);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("filename", "test-image.png");
    expect(result).toHaveProperty("createdAt");
    expect(result).toHaveProperty("score");
    expect(result).toHaveProperty("label");
    expect(result).toHaveProperty("explanation");
    expect(result).toHaveProperty("imageUrl");
    expect(result.imageUrl).toContain("data:image");
  });

  it("deve gerar ID único para cada análise", async () => {
    const file = new File(["test"], "test.png", { type: "image/png" });

    const result1 = await analyzeImage(file);
    const result2 = await analyzeImage(file);

    expect(result1.id).not.toBe(result2.id);
  });

  it("deve gerar explicação baseada no label", async () => {
    const file = new File(["test"], "test.png", { type: "image/png" });

    const result = await analyzeImage(file);

    expect(result.explanation).toBeTruthy();
    expect(typeof result.explanation).toBe("string");
    expect(result.explanation.length).toBeGreaterThan(0);

    if (result.label === "REAL") {
      expect(result.explanation).toMatch(/real/i);
    } else {
      expect(result.explanation).toMatch(/sintética|sintetizada/i);
    }
  });

  it("deve incluir imageUrl como base64", async () => {
    const file = new File(["test"], "test.png", { type: "image/png" });

    const result = await analyzeImage(file);

    expect(result.imageUrl).toBeTruthy();
    expect(result.imageUrl).toContain("data:");
  });

  it("deve simular delay de 1-2 segundos", async () => {
    const file = new File(["test"], "test.png", { type: "image/png" });

    const startTime = Date.now();
    await analyzeImage(file);
    const endTime = Date.now();

    const duration = endTime - startTime;
    // Deve levar pelo menos 1 segundo (com margem de erro)
    expect(duration).toBeGreaterThanOrEqual(900);
    // Não deve levar mais que 3 segundos (margem de segurança)
    expect(duration).toBeLessThan(3000);
  });

  it("getAnalysisHistory deve retornar array vazio por padrão", async () => {
    const history = await getAnalysisHistory();

    expect(Array.isArray(history)).toBe(true);
    expect(history.length).toBe(0);
  });
});
