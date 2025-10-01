import { useEffect, useRef } from "react";
import { useStore } from "zustand";
import { categoriesStore } from "../store/categoriesStore";
import { questionsStore } from "../store/questionsStore";
import useToken from "./useToken";

export function useInit() {
  const { loading: tokenLoading, error: tokenError, token } = useToken();

  const catsHaveLoaded = useStore(categoriesStore, s => s.hasLoaded);
  const catsLoading    = useStore(categoriesStore, s => s.loading);
  const catsError      = useStore(categoriesStore, s => s.error);
  const loadCats       = useStore(categoriesStore, s => s.load);

  const questsCount    = useStore(questionsStore, s => s.items.length);
  const qsLoading      = useStore(questionsStore, s => s.loading);
  const qsError        = useStore(questionsStore, s => s.error);
  const loadQs         = useStore(questionsStore, s => s.load);

  const startedCats = useRef(false);
  const startedQs   = useRef(false);

  useEffect(() => {
    if (startedCats.current) return;
    if (!catsHaveLoaded && !catsLoading) {
      startedCats.current = true;
      loadCats();
    }
    console.log("cats loading successful")
  }, [catsHaveLoaded, catsLoading, loadCats]);

  useEffect(() => {
    if (startedQs.current) return;
    if (!token || qsLoading || questsCount) return;
    startedQs.current = true;
    loadQs(50, token);
    console.log('loading successful');
  }, [token, qsLoading, questsCount, loadQs]);

  return {
    loading: tokenLoading || catsLoading || qsLoading,
    error:   tokenError   || catsError   || qsError,
    token,
    
  };
}
