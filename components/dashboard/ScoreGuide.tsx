"use client";

import { AlertTriangle, HelpCircle, CheckCircle2 } from "lucide-react";

/**
 * Componente que explica como interpretar o score de confiança
 * Ajuda o usuário a entender os resultados da análise
 */
export const ScoreGuide: React.FC = () => {
  const ranges = [
    {
      range: "0-40",
      label: "Provavelmente Sintética",
      description:
        "A imagem apresenta características consistentes com geração por IA. Recomendamos verificação adicional antes de usar em contexto oficial.",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      badgeColor: "bg-red-100",
    },
    {
      range: "40-70",
      label: "Zona de Incerteza",
      description:
        "A análise não foi conclusiva. A imagem pode ser real ou sintética. Considere outras fontes de verificação.",
      icon: HelpCircle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      badgeColor: "bg-yellow-100",
    },
    {
      range: "70-100",
      label: "Provavelmente Real",
      description:
        "A imagem apresenta características típicas de imagens reais capturadas por câmeras. Alta probabilidade de autenticidade.",
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      badgeColor: "bg-green-100",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-neutral-900">
        Como interpretar o score
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ranges.map((range) => {
          const Icon = range.icon;
          return (
            <div
              key={range.range}
              className={`border ${range.borderColor} ${range.bgColor} rounded-xl p-6 flex flex-col h-full`}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-10 h-10 rounded-lg ${range.badgeColor} flex items-center justify-center`}
                >
                  <Icon className={range.color} size={20} />
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`font-bold text-lg ${range.color}`}>
                    {range.range}
                  </span>
                </div>
              </div>

              <h4 className={`font-semibold mb-2 ${range.color}`}>
                {range.label}
              </h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {range.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
