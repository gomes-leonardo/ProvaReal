"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/Card";
import { HistoryTable } from "@/components/dashboard/HistoryTable";
import { ResultCard } from "@/components/dashboard/ResultCard";
import { Modal } from "@/components/ui/Modal";
import { getAnalysisHistory } from "@/services/detectionService";
import { AnalysisResult } from "@/lib/types";
import { Button } from "@/components/ui/Button";

/**
 * Página de histórico completo de análises
 * Busca dados reais do backend
 */
export default function HistoryPage() {
  const [analyses, setAnalyses] = useState<AnalysisResult[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] =
    useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<"all" | "REAL" | "SINTETICA">("all");
  const pageSize = 20;

  const loadHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const history = await getAnalysisHistory({ page, pageSize });
      setAnalyses(history.analyses);
      setTotal(history.total);
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const filteredAnalyses =
    filter === "all" ? analyses : analyses.filter((a) => a.label === filter);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Histórico de Verificações
        </h1>
        <p className="text-neutral-600">
          Visualize todas as análises realizadas
        </p>
      </div>

      {/* Filtros */}
      <Card>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-neutral-700">Filtrar:</span>
          <Button
            variant={filter === "all" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            Todos
          </Button>
          <Button
            variant={filter === "REAL" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setFilter("REAL")}
          >
            Reais
          </Button>
          <Button
            variant={filter === "SINTETICA" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setFilter("SINTETICA")}
          >
            Sintéticas
          </Button>
        </div>
      </Card>

      {/* Tabela */}
      <Card>
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-neutral-600">Carregando histórico...</p>
          </div>
        ) : filteredAnalyses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-neutral-600">Nenhuma análise encontrada.</p>
          </div>
        ) : (
          <>
            <HistoryTable
              analyses={filteredAnalyses}
              onViewDetails={setSelectedAnalysis}
            />

            {/* Paginação */}
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-neutral-600">
                Mostrando {filteredAnalyses.length} de {total} análises
              </p>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Anterior
                </Button>
                <span className="px-4 py-2 text-sm text-neutral-700">
                  Página {page}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page * pageSize >= total}
                >
                  Próxima
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>

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
