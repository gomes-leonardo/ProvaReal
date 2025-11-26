"use client";

import React, { useCallback, useState } from "react";
import { Camera, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onRemove: () => void;
  onAnalyze?: () => void;
  isAnalyzing?: boolean;
  disabled?: boolean;
}

/**
 * Componente de área de upload com drag & drop
 * Suporta arrastar/soltar e clique para selecionar arquivo
 */
export const UploadArea: React.FC<UploadAreaProps> = ({
  onFileSelect,
  selectedFile,
  onRemove,
  onAnalyze,
  isAnalyzing = false,
  disabled = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) setIsDragging(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled) return;

      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        onFileSelect(file);
      }
    },
    [onFileSelect, disabled]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const previewUrl = React.useMemo(() => {
    if (selectedFile) {
      return URL.createObjectURL(selectedFile);
    }
    return "";
  }, [selectedFile]);

  // Cleanup object URL on unmount or when file changes
  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  if (selectedFile) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Image Preview */}
          <div className="relative flex-1 min-h-[300px] lg:min-h-[400px] rounded-xl overflow-hidden bg-neutral-100 shadow-inner">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-contain p-2"
            />
            {/* Remove Button */}
            <button
              onClick={onRemove}
              disabled={disabled || isAnalyzing}
              className="absolute top-3 right-3 p-2.5 bg-white hover:bg-red-50 text-neutral-500 hover:text-red-600 rounded-full shadow-md transition-all z-10 border border-neutral-200 hover:border-red-200"
              aria-label="Remover imagem"
            >
              <X size={18} />
            </button>
          </div>

          {/* Info and Action Panel */}
          <div className="lg:w-72 flex flex-col justify-between gap-4">
            {/* File Info */}
            <div className="space-y-4">
              <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-100">
                <p className="text-xs text-neutral-500 uppercase tracking-wide font-medium mb-1">
                  Arquivo selecionado
                </p>
                <p
                  className="text-sm font-semibold text-neutral-800 truncate"
                  title={selectedFile.name}
                >
                  {selectedFile.name}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <p className="text-sm text-blue-800 font-medium mb-1">
                  Pronto para análise
                </p>
                <p className="text-xs text-blue-600">
                  Nossa IA irá verificar se esta imagem foi gerada
                  artificialmente ou é uma foto real.
                </p>
              </div>
            </div>

            {/* Analyze Button */}
            {onAnalyze && (
              <button
                onClick={onAnalyze}
                disabled={disabled || isAnalyzing}
                className={cn(
                  "w-full relative overflow-hidden rounded-xl py-5 px-6 font-bold text-lg transition-all",
                  "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500",
                  "shadow-[0_6px_20px_rgba(59,130,246,0.4)]",
                  "hover:shadow-[0_8px_30px_rgba(59,130,246,0.5)] hover:scale-[1.02]",
                  "active:scale-[0.98] active:shadow-[0_4px_15px_rgba(59,130,246,0.4)]",
                  "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                )}
              >
                <div className="flex items-center justify-center gap-3 text-white">
                  <Search size={22} strokeWidth={2.5} />
                  <span>
                    {isAnalyzing ? "Analisando..." : "Analisar Imagem"}
                  </span>
                </div>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() =>
          !disabled && document.getElementById("file-input")?.click()
        }
        className={cn(
          "border-2 border-dashed rounded-xl h-64 flex flex-col items-center justify-center text-center transition-colors cursor-pointer",
          isDragging
            ? "border-primary-500 bg-primary-50"
            : "border-neutral-200 hover:border-primary-400 hover:bg-neutral-50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          disabled={disabled}
        />
        <div className="mb-4">
          <Camera size={48} className="text-neutral-400 mx-auto" />
        </div>
        <p className="text-lg font-medium text-neutral-700 mb-2">
          Arraste uma imagem aqui ou clique para selecionar
        </p>
        <p className="text-sm text-neutral-500">
          Formatos suportados: JPG, PNG, GIF, WEBP
        </p>
      </div>
    </div>
  );
};
