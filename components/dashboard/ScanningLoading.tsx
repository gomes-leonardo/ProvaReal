import React from "react";
import { Scan } from "lucide-react";

export function ScanningLoading() {
  return (
    <div className="w-full h-64 bg-neutral-900 rounded-lg overflow-hidden relative flex flex-col items-center justify-center border border-neutral-800">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Central Icon with Pulse */}
      <div className="relative z-10 mb-4">
        <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 animate-pulse" />
        <Scan className="w-12 h-12 text-blue-400 animate-pulse" />
      </div>

      {/* Scanning Line */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-scan" />
      </div>

      {/* Text */}
      <div className="z-10 text-center space-y-2">
        <h3 className="text-lg font-medium text-white">Analisando Imagem</h3>
        <div className="flex items-center gap-1 justify-center">
          <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" />
        </div>
        <p className="text-xs text-neutral-400 max-w-[200px] mx-auto">
          Verificando padrões de compressão e artefatos digitais...
        </p>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            top: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
        .animate-scan {
          position: absolute;
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
