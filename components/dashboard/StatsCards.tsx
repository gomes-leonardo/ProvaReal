"use client";

import React, { useMemo, useEffect, useState } from "react";
import { useAnalysisStore } from "@/store/useAnalysisStore";
import { getAnalysisHistory } from "@/services/detectionService";
import { BarChart3, CheckCircle2, Target, Clock } from "lucide-react";
import { AnalysisResult } from "@/lib/types";

/**
 * Componente que exibe cards de estatísticas resumidas do dashboard.
 * Mostra o total de análises, percentuais de imagens reais/sintéticas e análises recentes.
 */
export const StatsCards: React.FC = () => {
  const { analyses } = useAnalysisStore();
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
      {/* Total de Imagens */}
      <div className="bg-blue-100 rounded-xl p-4 flex items-center justify-between border border-blue-200">
        <div>
          <p className="text-sm font-medium text-blue-800 mb-1">
            Total de Imagens Analisadas
          </p>
          <p className="text-3xl font-bold text-blue-900">
            {stats.totalAnalyses}
          </p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-blue-200 flex items-center justify-center">
          <BarChart3 className="text-blue-700" size={20} />
        </div>
      </div>

      {/* % Provavelmente Reais */}
      <div className="bg-green-100 rounded-xl p-4 flex items-center justify-between border border-green-200">
        <div>
          <p className="text-sm font-medium text-green-800 mb-1">
            % Provavelmente Reais
          </p>
          <p className="text-3xl font-bold text-green-900">
            {Math.round(stats.percentReal)}%
          </p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-green-200 flex items-center justify-center">
          <CheckCircle2 className="text-green-700" size={20} />
        </div>
      </div>

      {/* % Provavelmente Sintéticas */}
      <div className="bg-red-100 rounded-xl p-4 flex items-center justify-between border border-red-200">
        <div>
          <p className="text-sm font-medium text-red-800 mb-1">
            % Provavelmente Sintéticas
          </p>
          <p className="text-3xl font-bold text-red-900">
            {Math.round(stats.percentSynthetic)}%
          </p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-red-200 flex items-center justify-center">
          <Target className="text-red-700" size={20} />
        </div>
      </div>

      {/* Análises nas últimas 24h */}
      <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-between border border-gray-200">
        <div>
          <p className="text-sm font-medium text-gray-800 mb-1">
            Análises nas últimas 24h
          </p>
          <p className="text-3xl font-bold text-gray-900">
            {stats.analysesLast24h}
          </p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
          <Clock className="text-gray-700" size={20} />
        </div>
      </div>
    </div>
  );
};
