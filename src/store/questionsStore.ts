import {create} from "zustand";
import type { TriviaQuestion, GetQuestionsParams } from "../types/types";
import { getQuestions, getQuestionsByParams } from "../api/requests";


type QuestionsState = {
  items: TriviaQuestion[],
  loading: boolean,
  error?: string;
  
  set: (q: TriviaQuestion[]) => void;
  clear: () => void;

  load: (amount: number, token?: string) => Promise<void>;
  loadByParams: (params: GetQuestionsParams) => Promise<void>
};

export const useQuestionsStore = create<QuestionsState>((set) => ({
  items: [],
  loading: false,
  error: undefined,

  set: (qs) => set({items: qs}),
  clear: () => set({items: []}),
  load: async (amount, token) => {
    set({loading: true, error: undefined});
    try {
        const res = await getQuestions(amount, token);
        set({items: res.results, loading: false});
    } catch (err: any) {
      set({loading: false, error: err?.message ?? "Failed to load questions"});
    }
  },
  loadByParams: async (params) => {
    set({loading: true, error: undefined});
    try {
      const res = await getQuestionsByParams(params);
      set({items: res.results, loading: false});
    } catch (err: any) {
      set({loading: false, error: err?.message ?? "Failed to load questions"})
    }
  }
}));