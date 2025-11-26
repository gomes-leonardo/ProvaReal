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
import { ArrowRight, ImageIcon, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Dashboard principal
 * Permite upload de imagens, análise e visualização de histórico
 */
export default function DashboardPage() {
  const {
    analyses,
    addAnalysis,
    setAnalyses,
    selectedImageForAnalysis,
    setSelectedImageForAnalysis,
  } = useAnalysisStore();
  const { refreshUser, user } = useAuthStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [selectedAnalysis, setSelectedAnalysis] =
    useState<AnalysisResult | null>(null);
  const [hasAutoAnalyzed, setHasAutoAnalyzed] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

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
        error instanceof Error
          ? error.message
          : "Erro ao analisar imagem. Tente novamente.";
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
      {/* Header com saudação */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-1">
            {user?.name
              ? `Olá, ${user.name.split(" ")[0]}!`
              : "Análise de Imagens"}
          </h1>
          <p className="text-sm sm:text-base text-neutral-600">
            Envie uma imagem para verificar se é real ou gerada por IA
          </p>
        </div>
        {user?.plan && (
          <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-xl border border-primary-100">
            <Sparkles size={16} className="text-primary-600" />
            <span className="text-sm font-medium text-primary-700">
              {user.monthlyUsage || 0} /{" "}
              {user.plan.monthlyQuota === -1 ? "∞" : user.plan.monthlyQuota}{" "}
              análises
            </span>
          </div>
        )}
      </div>

      {/* Cards de Estatísticas */}
      <StatsCards />

      {/* Upload e Análise */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-neutral-900">
            {result ? "Resultado da análise" : "Enviar imagem para análise"}
          </h2>
          {result && (
            <Button
              variant="primary"
              onClick={() => {
                setResult(null);
                setSelectedFile(null);
              }}
            >
              <ImageIcon size={18} className="mr-2" />
              Nova Análise
            </Button>
          )}
        </div>

        {/* Upload e Análise - Só exibe se não houver resultado */}
        {!result && !isAnalyzing && (
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

        {/* Resultado */}
        {result && <ResultCard result={result} />}
      </div>

      {/* Guia de Interpretação do Score */}
      <ScoreGuide />

      {/* Histórico Recente */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-neutral-900">
            Histórico recente
          </h2>
          {analyses.length > 0 && (
            <Link href="/dashboard/history">
              <Button variant="ghost" size="sm">
                Ver tudo
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          )}
        </div>

        {isLoadingHistory ? (
          // Loading skeleton
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 animate-pulse">
                  <div className="w-12 h-12 bg-neutral-200 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-neutral-200 rounded w-1/3" />
                    <div className="h-3 bg-neutral-100 rounded w-1/4" />
                  </div>
                  <div className="h-6 w-20 bg-neutral-200 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        ) : analyses.length === 0 ? (
          // Estado vazio
          <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon size={32} className="text-neutral-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Nenhuma análise ainda
            </h3>
            <p className="text-neutral-600 mb-6 max-w-sm mx-auto">
              Envie sua primeira imagem para verificar se é real ou gerada por
              IA. O resultado aparecerá aqui.
            </p>
            <Button
              variant="outline"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ImageIcon size={18} className="mr-2" />
              Fazer primeira análise
            </Button>
          </div>
        ) : (
          <HistoryTable
            analyses={recentAnalyses}
            onViewDetails={setSelectedAnalysis}
          />
        )}
      </div>

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
