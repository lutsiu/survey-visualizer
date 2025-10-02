import { useStore } from "zustand";
import { questionsStore } from "../store/questionsStore";
import { categoriesStore } from "../store/categoriesStore";

export function useLoading() {
  const qsLoading   = useStore(questionsStore,  s => s.loading);
  const catsLoading = useStore(categoriesStore, s => s.loading);

  const loading = qsLoading || catsLoading;
  return { loading, qsLoading, catsLoading };
}
