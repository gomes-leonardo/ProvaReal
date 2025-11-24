import { create } from "zustand";
import { AnalysisResult, AnalysisFilter } from "@/lib/types";

interface AnalysisState {
  analyses: AnalysisResult[];
  selectedImageForAnalysis: File | null;
  addAnalysis: (analysis: AnalysisResult) => void;
  setAnalyses: (analyses: AnalysisResult[]) => void;
  setSelectedImageForAnalysis: (file: File | null) => void;
  clearHistory: () => void;
  getAnalysesByFilter: (filter: AnalysisFilter) => AnalysisResult[];
}

export const useAnalysisStore = create<AnalysisState>((set, get) => ({
  analyses: [],
  selectedImageForAnalysis: null,
  addAnalysis: (analysis) => {
    set((state) => ({
      analyses: [analysis, ...state.analyses],
    }));
  },
  setAnalyses: (analyses) => {
    set({ analyses });
  },
  setSelectedImageForAnalysis: (file) => {
    set({ selectedImageForAnalysis: file });
  },
  clearHistory: () => {
    set({ analyses: [] });
  },
  getAnalysesByFilter: (filter) => {
    const { analyses } = get();
    let filtered = [...analyses];

    if (filter.period === "today") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      filtered = filtered.filter((a) => a.createdAt >= today);
    } else if (filter.period === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      filtered = filtered.filter((a) => a.createdAt >= weekAgo);
    } else if (filter.period === "month") {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      filtered = filtered.filter((a) => a.createdAt >= monthAgo);
    }

    if (filter.type && filter.type !== "all") {
      filtered = filtered.filter((a) => a.label === filter.type);
    }

    return filtered;
  },
}));
