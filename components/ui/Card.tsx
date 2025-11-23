import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Componente de card reutilizável
 */
export const Card: React.FC<CardProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-soft border border-neutral-200 p-6 transition-shadow hover:shadow-medium",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
