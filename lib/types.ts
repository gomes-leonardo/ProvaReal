/**
 * Tipos principais da aplicação ProvaReal
 */

export type AnalysisLabel = "REAL" | "SINTETICA";

export interface AnalysisResult {
  id: string;
  filename: string;
  createdAt: Date;
  score: number; // 0-100
  label: AnalysisLabel;
  explanation: string;
  imageUrl?: string; // URL da imagem (base64 ou blob)
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends AuthCredentials {
  name: string;
  confirmPassword: string;
}

export interface AnalysisFilter {
  period?: "today" | "week" | "month";
  type?: "REAL" | "SINTETICA" | "all";
}
