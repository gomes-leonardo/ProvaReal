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
      <div className="relative w-full h-64 rounded-xl overflow-hidden border-2 border-dashed border-neutral-300 group">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className="object-cover"
          />
          {/* Overlay gradient for better contrast if needed */}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Remove Button */}
        <button
          onClick={onRemove}
          disabled={disabled || isAnalyzing}
          className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white text-neutral-600 hover:text-red-600 rounded-full shadow-sm transition-all z-10 backdrop-blur-sm"
          aria-label="Remover imagem"
        >
          <X size={20} />
        </button>

        {/* Analyze Button Overlay */}
        {onAnalyze && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <button
              onClick={onAnalyze}
              disabled={disabled || isAnalyzing}
              className={cn(
                "relative group overflow-hidden rounded-xl bg-gradient-to-b from-blue-500 to-blue-600 px-8 py-4 shadow-[0_4px_0_rgb(29,78,216),0_8px_16px_rgba(0,0,0,0.2)] transition-all active:shadow-none active:translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed hover:brightness-110",
                "border-t border-blue-400"
              )}
            >
              <div className="flex items-center space-x-3 text-white font-bold text-xl tracking-wide uppercase drop-shadow-md">
                <span>{isAnalyzing ? "Analisando..." : "Analisar Imagem"}</span>
                {!isAnalyzing && <Search size={24} strokeWidth={3} />}
              </div>
              
              {/* Glossy effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50 pointer-events-none" />
            </button>
          </div>
        )}
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
