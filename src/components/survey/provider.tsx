import { createContext, useContext } from "react";
import { SurveyData } from "./type";

export type SurveyContextValue = {
  surveys: SurveyData[];
  setSurveys: (s: SurveyData[]) => void;
  updateFill: (qIndex: number, value: string) => void;
  updateSingle: (qIndex: number, optIndex: number) => void;
  updateRate: (qIndex: number, optIndex: number) => void;
  toggleMulti: (qIndex: number, optIndex: number, checked: boolean) => void;
  updateSpecify: (qIndex: number, optIndex: number, value: string) => void;
  toggleSelectAll: (qIndex: number) => void;
};
export const SurveyContext = createContext<SurveyContextValue | null>(null);

export const useSurveyContext = () => {
  const ctx = useContext(SurveyContext);
  if (!ctx) throw new Error("SurveyContext is not available");
  return ctx;
};
