import React from "react";
import Image from "next/image";
import { AnalysisResult } from "@/lib/types";
import { formatDate, formatPercentage } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

interface HistoryTableProps {
  analyses: AnalysisResult[];
  onViewDetails: (analysis: AnalysisResult) => void;
}

/**
 * Componente de tabela para exibir histórico de análises
 * Responsivo e com ações para ver detalhes
 */
export const HistoryTable: React.FC<HistoryTableProps> = ({
  analyses,
  onViewDetails,
}) => {
  if (analyses.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-neutral-200">
        <p className="text-neutral-500">Nenhuma análise realizada ainda.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {analyses.map((analysis) => {
        const isReal = analysis.label === "REAL";
        const scoreColor = isReal ? "text-green-600 bg-green-50 border-green-200" : "text-red-600 bg-red-50 border-red-200";

        return (
          <div
            key={analysis.id}
            className="bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => onViewDetails(analysis)}
          >
            {/* Thumbnail Area */}
            <div className="relative h-32 w-full overflow-hidden">
              {analysis.imageUrl ? (
                <Image
                  src={analysis.imageUrl}
                  alt="Thumbnail"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                  <span className="text-neutral-400 text-xs">Sem imagem</span>
                </div>
              )}
              
              {/* Score Badge */}
              <div className={`absolute bottom-2 right-2 px-2 py-1 rounded-md text-xs font-bold border ${scoreColor}`}>
                {formatPercentage(analysis.score)}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-neutral-900 truncate flex-1" title={analysis.filename}>
                  {analysis.filename}
                </h4>
              </div>
              
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>{formatDate(analysis.createdAt)}</span>
                <span className={isReal ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                  {isReal ? "Real" : "Sintética"}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
