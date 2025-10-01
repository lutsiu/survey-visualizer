import { createStore } from "zustand/vanilla";
import type { TriviaQuestion, GetQuestionsParams } from "../types/types";
import { getQuestions, getQuestionsByParams } from "../api/requests";

type QuestionsState = {
  items: TriviaQuestion[];
  loading: boolean;
  error?: string;
  set: (q: TriviaQuestion[]) => void;
  clear: () => void;
  load: (amount: number, token?: string) => Promise<void>;
  loadByParams: (params: GetQuestionsParams) => Promise<void>;
};

export const questionsStore = createStore<QuestionsState>()((set) => ({
  items: [],
  loading: false,
  error: undefined,

  set: (qs) => set({ items: qs }),
  clear: () => set({ items: [] }),

  load: async (amount, token) => {
    set({ loading: true, error: undefined });
    try {
      const res = await getQuestions(amount, token);
      set({ items: res.results, loading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to load questions";
      set({ loading: false, error: message });
    }
  },

  loadByParams: async (params) => {
    set({ loading: true, error: undefined });
    try {
      const res = await getQuestionsByParams(params);
      set({ items: res.results, loading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to load questions";
      set({ loading: false, error: message });
    }
  },
}));
