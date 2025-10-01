import { create } from "zustand";
import type { Category } from "../types/types";
import { getCategories } from "../api/requests";

type CategoryState = {
  items: Category[];
  loading: boolean;
  error?: string;
  hasLoaded: boolean;      
  loadedAt?: number;       

  setItems: (cats: Category[]) => void;
  clear: () => void;
  load: () => Promise<void>;
};

export const useCategoriesStore = create<CategoryState>((set, get) => ({
  items: [],
  loading: false,
  error: undefined,
  hasLoaded: false,
  loadedAt: undefined,

  setItems: (cats) => set({ items: cats }),

  clear: () => set({ items: [], hasLoaded: false, loadedAt: undefined }),

  load: async () => {
    if (get().loading) return;
    set({ loading: true, error: undefined });

    try {
      const res = await getCategories();

      const sorted = [...res].sort((a, b) => a.name.localeCompare(b.name));

      set({
        items: sorted,
        loading: false,
        hasLoaded: true,
        loadedAt: Date.now(),
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to fetch categories";
      set({ loading: false, error: message });
    }
  },
}));
