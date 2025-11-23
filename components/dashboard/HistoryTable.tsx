import React from "react";
import { AnalysisResult } from "@/lib/types";
import { formatDate, formatPercentage } from "@/lib/utils";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";

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
      <div className="text-center py-12">
        <p className="text-neutral-500">Nenhuma análise realizada ainda.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-neutral-200">
            <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">
              Data/Hora
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">
              Arquivo
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">
              Resultado
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">
              Score
            </th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-neutral-700">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {analyses.map((analysis) => (
            <tr
              key={analysis.id}
              className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
            >
              <td className="py-3 px-4 text-sm text-neutral-600">
                {formatDate(analysis.createdAt)}
              </td>
              <td className="py-3 px-4 text-sm text-neutral-900 font-medium">
                {analysis.filename}
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center space-x-2">
                  {analysis.label === "REAL" ? (
                    <>
                      <CheckCircle2 className="text-success-600" size={16} />
                      <span className="text-sm text-neutral-900">Real</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="text-error-600" size={16} />
                      <span className="text-sm text-neutral-900">
                        Sintética
                      </span>
                    </>
                  )}
                </div>
              </td>
              <td className="py-3 px-4">
                <span className="text-sm font-medium text-neutral-900">
                  {formatPercentage(analysis.score)}
                </span>
              </td>
              <td className="py-3 px-4 text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(analysis)}
                >
                  Ver detalhes
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
