"use client";

import React, { useCallback, useState } from "react";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onRemove: () => void;
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
      <div className="relative">
        <div className="border-2 border-dashed border-primary-300 rounded-xl p-6 bg-primary-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-neutral-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={onRemove}
              disabled={disabled}
              className="p-2 text-neutral-400 hover:text-error-600 transition-colors disabled:opacity-50"
              aria-label="Remover imagem"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer",
        isDragging
          ? "border-primary-500 bg-primary-50"
          : "border-neutral-300 hover:border-primary-400 hover:bg-neutral-50",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={() =>
        !disabled && document.getElementById("file-input")?.click()
      }
    >
      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
        disabled={disabled}
      />
      <Upload
        size={48}
        className={cn(
          "mx-auto mb-4",
          isDragging ? "text-primary-600" : "text-neutral-400"
        )}
      />
      <p className="text-lg font-medium text-neutral-700 mb-2">
        Arraste uma imagem aqui ou clique para selecionar
      </p>
      <p className="text-sm text-neutral-500">
        Formatos suportados: JPG, PNG, GIF, WEBP
      </p>
    </div>
  );
};
