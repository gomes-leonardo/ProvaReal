import React, { useMemo } from "react";
import { CheckCircle2, AlertTriangle, HelpCircle } from "lucide-react";
import { AnalysisResult } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatDate, formatPercentage } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  result: AnalysisResult;
}

/**
 * Componente que exibe o resultado da análise de uma imagem
 * Mostra score, label e explicação de forma clara e visual
 * Melhorado com textos explicativos baseados na faixa do score
 */
export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const {
    label,
    icon: Icon,
    color,
    bgColor,
    explanationText,
  } = useMemo(() => {
    const score = result.score;

    if (score >= 70) {
      return {
        label: "Provavelmente REAL",
        icon: CheckCircle2,
        color: "text-success-600",
        bgColor: "bg-success-50",
        explanationText:
          "A imagem apresenta características típicas de imagens reais capturadas por câmeras. Alta probabilidade de autenticidade.",
      };
    } else if (score >= 40) {
      return {
        label: "Zona de incerteza",
        icon: HelpCircle,
        color: "text-warning-600",
        bgColor: "bg-warning-50",
        explanationText:
          "A análise não foi conclusiva. A imagem pode ser real ou sintética. Considere outras fontes de verificação.",
      };
    } else {
      return {
        label: "Provavelmente SINTÉTICA",
        icon: AlertTriangle,
        color: "text-error-600",
        bgColor: "bg-error-50",
        explanationText:
          "A imagem apresenta características consistentes com geração por IA. Recomendamos verificação adicional antes de usar em contexto oficial.",
      };
    }
  }, [result.score]);

  return (
    <Card className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
          <Icon className={cn(color, "flex-shrink-0")} size={24} />
          <div className="min-w-0 flex-1">
            <h3 className={cn("text-xl sm:text-2xl font-bold", color)}>
              {label}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Análise realizada em {formatDate(result.createdAt)}
            </p>
          </div>
        </div>
      </div>

      <ProgressBar value={result.score} />

      <div className={cn("rounded-lg p-4 border", bgColor)}>
        <p className="text-sm text-neutral-700 leading-relaxed">
          {explanationText}
        </p>
      </div>

      {result.imageUrl && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-neutral-700">
              Imagem Analisada
            </h4>
            <span className="text-xs text-neutral-500">{result.filename}</span>
          </div>
          <div className="border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50 shadow-sm">
            <div className="relative w-full flex items-center justify-center min-h-[200px] sm:min-h-[300px] max-h-[70vh] p-4 sm:p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={result.imageUrl}
                alt={`Imagem analisada: ${result.filename}`}
                className="max-w-full max-h-[70vh] w-auto h-auto object-contain rounded"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="flex flex-col items-center justify-center p-8 text-center">
                        <p class="text-neutral-500 text-sm">Imagem não disponível</p>
                        <p class="text-neutral-400 text-xs mt-1">A imagem pode ter sido removida</p>
                      </div>
                    `;
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-neutral-200">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-neutral-500">Arquivo:</span>
            <p className="font-medium text-neutral-900 mt-1">
              {result.filename}
            </p>
          </div>
          <div>
            <span className="text-neutral-500">Score:</span>
            <p className="font-medium text-neutral-900 mt-1">
              {formatPercentage(result.score)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
