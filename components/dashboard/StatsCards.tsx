"use client";

import React, { useMemo, useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { useAnalysisStore } from "@/store/useAnalysisStore";
import { useAuthStore } from "@/store/useAuthStore";
import { getAnalysisHistory } from "@/services/detectionService";
import { BarChart3, CheckCircle2, XCircle, Clock } from "lucide-react";
import { formatPercentage } from "@/lib/utils";
import { AnalysisResult } from "@/lib/types";

/**
 * Componente que exibe cards de estatísticas resumidas do dashboard.
 * Mostra o total de análises, percentuais de imagens reais/sintéticas e análises recentes.
 */
export const StatsCards: React.FC = () => {
  const { analyses } = useAnalysisStore();
  const { user } = useAuthStore();
  const [allAnalyses, setAllAnalyses] = useState<AnalysisResult[]>(analyses);

  // Carregar todas as análises para estatísticas
  useEffect(() => {
    const loadAllAnalyses = async () => {
      try {
        const history = await getAnalysisHistory({ page: 1, pageSize: 1000 });
        setAllAnalyses(history.analyses);
      } catch (error) {
        console.error("Erro ao carregar análises:", error);
        // Usar análises do store como fallback
        setAllAnalyses(analyses);
      }
    };
    loadAllAnalyses();
  }, [analyses]);

  const stats = useMemo(() => {
    const totalAnalyses = allAnalyses.length;
    const realAnalyses = allAnalyses.filter((a) => a.label === "REAL").length;
    const syntheticAnalyses = allAnalyses.filter(
      (a) => a.label === "SINTETICA"
    ).length;

    const percentReal =
      totalAnalyses > 0 ? (realAnalyses / totalAnalyses) * 100 : 0;
    const percentSynthetic =
      totalAnalyses > 0 ? (syntheticAnalyses / totalAnalyses) * 100 : 0;

    // Análises das últimas 24h
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const analysesLast24h = allAnalyses.filter(
      (a) => a.createdAt >= yesterday
    ).length;

    return {
      totalAnalyses,
      percentReal,
      percentSynthetic,
      analysesLast24h,
    };
  }, [allAnalyses]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-neutral-600 mb-1">
              Total de imagens analisadas
            </p>
            <p className="text-2xl font-bold text-neutral-900">
              {stats.totalAnalyses}
            </p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center">
            <BarChart3 className="text-primary-700" size={24} />
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-neutral-600 mb-1">
              % Provavelmente Reais
            </p>
            <p className="text-2xl font-bold text-neutral-900">
              {formatPercentage(stats.percentReal)}
            </p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-secondary-50 flex items-center justify-center">
            <CheckCircle2 className="text-secondary-600" size={24} />
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-neutral-600 mb-1">
              % Provavelmente Sintéticas
            </p>
            <p className="text-2xl font-bold text-neutral-900">
              {formatPercentage(stats.percentSynthetic)}
            </p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-error-50 flex items-center justify-center">
            <XCircle className="text-error-600" size={24} />
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-neutral-600 mb-1">
              Análises nas últimas 24h
            </p>
            <p className="text-2xl font-bold text-neutral-900">
              {stats.analysesLast24h}
            </p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-info-50 flex items-center justify-center">
            <Clock className="text-info-600" size={24} />
          </div>
        </div>
      </Card>
    </div>
  );
};
