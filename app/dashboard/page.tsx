"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { UploadArea } from "@/components/dashboard/UploadArea";
import { ResultCard } from "@/components/dashboard/ResultCard";
import { HistoryTable } from "@/components/dashboard/HistoryTable";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ScoreGuide } from "@/components/dashboard/ScoreGuide";
import { ScanningLoading } from "@/components/dashboard/ScanningLoading";
import { Modal } from "@/components/ui/Modal";
import { analyzeImage, getAnalysisHistory } from "@/services/detectionService";
import { useAnalysisStore } from "@/store/useAnalysisStore";
import { useAuthStore } from "@/store/useAuthStore";
import { AnalysisResult } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Dashboard principal
 * Permite upload de imagens, análise e visualização de histórico
 */
export default function DashboardPage() {
  const { analyses, addAnalysis, setAnalyses, selectedImageForAnalysis, setSelectedImageForAnalysis } = useAnalysisStore();
  const { refreshUser } = useAuthStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [selectedAnalysis, setSelectedAnalysis] =
    useState<AnalysisResult | null>(null);
  const [hasAutoAnalyzed, setHasAutoAnalyzed] = useState(false);

  const loadHistory = async () => {
    try {
      const history = await getAnalysisHistory({ page: 1, pageSize: 5 });
      setAnalyses(history.analyses);
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
    }
  };

  // Carregar histórico ao montar componente
  useEffect(() => {
    loadHistory();
    refreshUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Detectar imagem pré-selecionada da landing page e iniciar análise automaticamente
  useEffect(() => {
    if (selectedImageForAnalysis && !hasAutoAnalyzed && !isAnalyzing) {
      setSelectedFile(selectedImageForAnalysis);
      setHasAutoAnalyzed(true);
      // Limpar a imagem do store após usar
      setSelectedImageForAnalysis(null);
      // Iniciar análise automaticamente após um pequeno delay para garantir que o componente está pronto
      setTimeout(() => {
        handleAnalyzeWithFile(selectedImageForAnalysis);
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImageForAnalysis, hasAutoAnalyzed, isAnalyzing]);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setResult(null); // Limpa resultado anterior
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setResult(null);
  };

  const handleAnalyzeWithFile = async (file: File) => {
    setIsAnalyzing(true);
    setResult(null);
    const startTime = Date.now();

    try {
      const analysisResult = await analyzeImage(file);

      // Garantir tempo mínimo de 5 segundos
      const elapsed = Date.now() - startTime;
      const minDuration = 5000; // 5 segundos
      const remainingTime = Math.max(0, minDuration - elapsed);

      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime));
      }

      // Após garantir o tempo mínimo, exibir resultado
      setResult(analysisResult);
      addAnalysis(analysisResult);
      // Recarregar histórico e dados do usuário
      await loadHistory();
      await refreshUser();
    } catch (error: unknown) {
      console.error("Erro ao analisar imagem:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao analisar imagem. Tente novamente.";
      alert(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    await handleAnalyzeWithFile(selectedFile);
  };

  const recentAnalyses = analyses.slice(0, 5); // Últimas 5 análises

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
          Análise de Imagens
        </h1>
        <p className="text-sm sm:text-base text-neutral-600">
          Envie uma imagem para verificar se é real ou gerada por IA
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <StatsCards />

      {/* Upload e Análise */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900">
          Enviar imagem para análise
        </h2>

        {/* Upload e Análise - Só exibe se não houver resultado */}
        {!result && (
          <UploadArea
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
            onRemove={handleRemoveFile}
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
            disabled={isAnalyzing}
          />
        )}

        {/* Loading State */}
        {isAnalyzing && <ScanningLoading />}

        {/* Resultado e Ação de Nova Análise */}
        {result && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setResult(null);
                  setSelectedFile(null);
                }}
              >
                Nova Análise
              </Button>
            </div>
            <ResultCard result={result} />
          </div>
        )}
      </div>

      {/* Guia de Interpretação do Score */}
      <ScoreGuide />

      {/* Histórico Recente */}
      {analyses.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-neutral-900">
              Histórico recente de verificações
            </h2>
            <Link href="/dashboard/history">
              <Button variant="ghost" size="sm">
                Ver tudo
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>

          <HistoryTable
            analyses={recentAnalyses}
            onViewDetails={setSelectedAnalysis}
          />
        </div>
      )}

      {/* Modal de Detalhes */}
      {selectedAnalysis && (
        <Modal
          isOpen={!!selectedAnalysis}
          onClose={() => setSelectedAnalysis(null)}
          title="Detalhes da Análise"
          size={selectedAnalysis.imageUrl ? "lg" : "md"}
        >
          <ResultCard result={selectedAnalysis} />
        </Modal>
      )}
    </div>
  );
}
