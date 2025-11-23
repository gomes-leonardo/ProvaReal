import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  showLabel?: boolean;
}

/**
 * Componente de barra de progresso para exibir score de confiança
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  className,
  showLabel = true,
}) => {
  const clampedValue = Math.max(0, Math.min(100, value));

  // Determina a cor baseada no valor
  const getColorClass = () => {
    if (clampedValue >= 70) return "bg-success-500";
    if (clampedValue >= 40) return "bg-warning-500";
    return "bg-error-500";
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-neutral-700">
            Score de confiança
          </span>
          <span className="text-sm font-bold text-neutral-900">
            {Math.round(clampedValue)}%
          </span>
        </div>
      )}
      <div
        className="w-full bg-neutral-200 rounded-full h-3 overflow-hidden"
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn(
            "h-full transition-all duration-500 ease-out rounded-full",
            getColorClass()
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};
