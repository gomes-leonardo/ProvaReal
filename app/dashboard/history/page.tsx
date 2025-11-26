"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/Card";
import { HistoryTable } from "@/components/dashboard/HistoryTable";
import { ResultCard } from "@/components/dashboard/ResultCard";
import { Modal } from "@/components/ui/Modal";
import { getAnalysisHistory } from "@/services/detectionService";
import { AnalysisResult } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import {
  ImageIcon,
  Filter,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import Link from "next/link";

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

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-1">
            Histórico de Verificações
          </h1>
          <p className="text-neutral-600">
            {total > 0
              ? `${total} análises realizadas`
              : "Visualize todas as análises realizadas"}
          </p>
        </div>
        <Link href="/dashboard">
          <Button variant="primary">
            <Search size={18} className="mr-2" />
            Nova Análise
          </Button>
        </Link>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-neutral-600">
            <Filter size={18} />
            <span className="text-sm font-medium">Filtrar por:</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === "all"
                  ? "bg-primary-600 text-white shadow-sm"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter("REAL")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === "REAL"
                  ? "bg-green-600 text-white shadow-sm"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              ✓ Reais
            </button>
            <button
              onClick={() => setFilter("SINTETICA")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === "SINTETICA"
                  ? "bg-red-600 text-white shadow-sm"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              ⚠ Sintéticas
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      {isLoading ? (
        // Loading skeleton
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
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
      ) : filteredAnalyses.length === 0 ? (
        // Estado vazio
        <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ImageIcon size={32} className="text-neutral-400" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            {filter === "all"
              ? "Nenhuma análise encontrada"
              : `Nenhuma imagem ${filter === "REAL" ? "real" : "sintética"} encontrada`}
          </h3>
          <p className="text-neutral-600 mb-6 max-w-sm mx-auto">
            {filter === "all"
              ? "Você ainda não realizou nenhuma análise. Comece verificando uma imagem agora!"
              : "Tente mudar o filtro ou realize mais análises."}
          </p>
          {filter === "all" ? (
            <Link href="/dashboard">
              <Button variant="primary">
                <Search size={18} className="mr-2" />
                Fazer primeira análise
              </Button>
            </Link>
          ) : (
            <Button variant="outline" onClick={() => setFilter("all")}>
              Ver todas as análises
            </Button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          <HistoryTable
            analyses={filteredAnalyses}
            onViewDetails={setSelectedAnalysis}
          />

          {/* Paginação melhorada */}
          <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-neutral-600">
                Mostrando{" "}
                <span className="font-medium">{filteredAnalyses.length}</span>{" "}
                de <span className="font-medium">{total}</span> análises
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3"
                >
                  <ChevronLeft size={18} />
                </Button>

                <div className="flex items-center gap-1">
                  {/* Mostrar páginas */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                          page === pageNum
                            ? "bg-primary-600 text-white"
                            : "text-neutral-600 hover:bg-neutral-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page >= totalPages}
                  className="px-3"
                >
                  <ChevronRight size={18} />
                </Button>
              </div>
            </div>
          </div>
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
