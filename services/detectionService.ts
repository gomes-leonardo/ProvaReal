import { AnalysisResult } from "@/lib/types";
import { useAnalysisStore } from "@/store/useAnalysisStore";

// Mock delay helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Serviço de análise de imagens - MOCK
 */
export async function analyzeImage(file: File): Promise<AnalysisResult> {
  await delay(2000); // Simular processamento pesado

  // Gerar resultado aleatório
  const isReal = Math.random() > 0.5;
  const score = isReal
    ? Math.floor(Math.random() * 30) + 70
    : Math.floor(Math.random() * 40);

  return {
    id: Math.random().toString(36).substr(2, 9),
    filename: file.name,
    createdAt: new Date(),
    score: score,
    label: isReal ? "REAL" : "SINTETICA",
    explanation: getExplanation(score, isReal ? "REAL" : "SINTETICA"),
    imageUrl: URL.createObjectURL(file),
  };
}

/**
 * Buscar histórico de análises do usuário - MOCK
 * Preserva análises do store que já têm imageUrl
 */
export async function getAnalysisHistory(params?: {
  page?: number;
  pageSize?: number;
}): Promise<{
  analyses: AnalysisResult[];
  total: number;
  page: number;
  pageSize: number;
}> {
  await delay(500);

  // Tentar buscar análises do store primeiro (que podem ter imageUrl)
  let storeAnalyses: AnalysisResult[] = [];
  if (typeof window !== "undefined") {
    try {
      const state = useAnalysisStore.getState();
      storeAnalyses = state.analyses || [];
    } catch (e) {
      // Ignorar erro se store não estiver disponível
    }
  }

  // Se houver análises no store, usar elas (preservando imageUrl)
  if (storeAnalyses.length > 0) {
    return {
      analyses: storeAnalyses,
      total: storeAnalyses.length,
      page: params?.page || 1,
      pageSize: params?.pageSize || 20,
    };
  }

  // Caso contrário, gerar dados mockados
  const mockAnalyses: AnalysisResult[] = Array.from({ length: 5 }).map(
    (_, i) => ({
      id: `mock-${i}`,
      filename: `imagem_teste_${i}.jpg`,
      createdAt: new Date(Date.now() - i * 86400000), // Dias atrás
      score: Math.floor(Math.random() * 100),
      label: Math.random() > 0.5 ? "REAL" : "SINTETICA",
      explanation: "Análise simulada.",
      imageUrl: undefined,
    })
  );

  return {
    analyses: mockAnalyses,
    total: 15,
    page: params?.page || 1,
    pageSize: params?.pageSize || 20,
  };
}

/**
 * Gerar explicação baseada no score
 */
function getExplanation(score: number, label: string): string {
  if (score >= 70) {
    return "A imagem apresenta características típicas de imagens reais capturadas por câmeras. Alta probabilidade de autenticidade.";
  } else if (score >= 40) {
    return "A análise não foi conclusiva. A imagem pode ser real ou sintética. Considere outras fontes de verificação.";
  } else {
    return "A imagem apresenta características consistentes com geração por IA. Recomendamos verificação adicional antes de usar em contexto oficial.";
  }
}
