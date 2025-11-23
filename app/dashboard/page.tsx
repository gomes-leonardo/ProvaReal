"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { UploadArea } from "@/components/dashboard/UploadArea";
import { ResultCard } from "@/components/dashboard/ResultCard";
import { HistoryTable } from "@/components/dashboard/HistoryTable";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ScoreGuide } from "@/components/dashboard/ScoreGuide";
import {
  AnalysisVisualizer3D,
  AnalysisStatus,
} from "@/components/three/AnalysisVisualizer3D";
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
  const { analyses, addAnalysis, setAnalyses } = useAnalysisStore();
  const { refreshUser } = useAuthStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [selectedAnalysis, setSelectedAnalysis] =
    useState<AnalysisResult | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // Carregar histórico ao montar componente
  useEffect(() => {
    loadHistory();
    refreshUser();
  }, []);

  const loadHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const history = await getAnalysisHistory({ page: 1, pageSize: 5 });
      setAnalyses(history.analyses);
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setResult(null); // Limpa resultado anterior
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      const analysisResult = await analyzeImage(selectedFile);
      setResult(analysisResult);
      addAnalysis(analysisResult);
      // Recarregar histórico e dados do usuário
      await loadHistory();
      await refreshUser();
    } catch (error: any) {
      console.error("Erro ao analisar imagem:", error);
      const errorMessage =
        error.message || "Erro ao analisar imagem. Tente novamente.";
      alert(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const recentAnalyses = analyses.slice(0, 5); // Últimas 5 análises

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Análise de Imagens
        </h1>
        <p className="text-neutral-600">
          Envie uma imagem para verificar se é real ou gerada por IA
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <StatsCards />

      {/* Upload e Análise */}
      <Card>
        <h2 className="text-xl font-semibold text-neutral-900 mb-6">
          Enviar imagem para análise
        </h2>

        <div className="space-y-6">
          <UploadArea
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
            onRemove={handleRemoveFile}
            disabled={isAnalyzing}
          />

          {selectedFile && !result && (
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              isLoading={isAnalyzing}
              className="w-full sm:w-auto"
            >
              {isAnalyzing
                ? "Analisando padrões de gradiente..."
                : "Analisar imagem"}
            </Button>
          )}

          {/* Visualizador 3D */}
          {(() => {
            let status: AnalysisStatus = "idle";
            if (isAnalyzing) {
              status = "analyzing";
            } else if (result) {
              status = result.label === "REAL" ? "real" : "synthetic";
            }
            return <AnalysisVisualizer3D status={status} />;
          })()}

          {result && <ResultCard result={result} />}
        </div>
      </Card>

      {/* Guia de Interpretação do Score */}
      <ScoreGuide />

      {/* Histórico Recente */}
      {analyses.length > 0 && (
        <Card>
          <div className="flex items-center justify-between mb-6">
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
        </Card>
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
