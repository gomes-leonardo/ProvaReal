"use client";

import { Card } from "@/components/ui/Card";
import { AlertTriangle, HelpCircle, CheckCircle2 } from "lucide-react";

/**
 * Componente que explica como interpretar o score de confiança
 * Ajuda o usuário a entender os resultados da análise
 */
export const ScoreGuide: React.FC = () => {
  const ranges = [
    {
      range: "0–40",
      label: "Provavelmente Sintética",
      description:
        "A imagem apresenta características consistentes com geração por IA. Recomendamos verificação adicional antes de usar em contexto oficial.",
      icon: AlertTriangle,
      color: "text-error-600",
      bgColor: "bg-error-50",
      borderColor: "border-error-200",
    },
    {
      range: "40–70",
      label: "Zona de incerteza",
      description:
        "A análise não foi conclusiva. A imagem pode ser real ou sintética. Considere outras fontes de verificação.",
      icon: HelpCircle,
      color: "text-warning-600",
      bgColor: "bg-warning-50",
      borderColor: "border-warning-200",
    },
    {
      range: "70–100",
      label: "Provavelmente Real",
      description:
        "A imagem apresenta características típicas de imagens reais capturadas por câmeras. Alta probabilidade de autenticidade.",
      icon: CheckCircle2,
      color: "text-success-600",
      bgColor: "bg-success-50",
      borderColor: "border-success-200",
    },
  ];

  return (
    <Card>
      <h3 className="text-xl font-semibold text-neutral-900 mb-6">
        Como interpretar o score
      </h3>

      <div className="space-y-4">
        {ranges.map((range) => {
          const Icon = range.icon;
          return (
            <div
              key={range.range}
              className={`border-2 ${range.borderColor} ${range.bgColor} rounded-lg p-4 flex items-start space-x-4`}
            >
              <div
                className={`w-10 h-10 rounded-lg ${range.bgColor} flex items-center justify-center flex-shrink-0`}
              >
                <Icon className={range.color} size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-neutral-900">
                    {range.range}
                  </span>
                  <span className="text-neutral-500">→</span>
                  <span className={`font-semibold ${range.color}`}>
                    {range.label}
                  </span>
                </div>
                <p className="text-sm text-neutral-700">{range.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
