import { useEffect } from "react";
import { useCategoriesStore } from "../store/categoriesStore";
import { useQuestionsStore } from "../store/questionsStore";
import useToken from "./useToken";

export function useInit() {
  // fetch all data from useToken
  const {loading: tokenLoading, error: tokenError, token} = useToken();

  // fetch all data from categs store
  const { catsHaveLoaded, loading: catsLoading, error: catsError, load: loadCats } =
    useCategoriesStore(s => 
      ({ catsHaveLoaded: s.hasLoaded, loading: s.loading, error: s.error, load: s.load }));

  // fetch all data from quests store
  const { questsItems, loading: qsLoading, error: qsError, load: loadQs } =
    useQuestionsStore(s => ({ questsItems: s.items, loading: s.loading, error: s.error, load: s.load }));

  // useEffect with aim to load categories
  useEffect(() => {
    if (!catsHaveLoaded && !catsLoading) {
      loadCats();
    }
  }, [loadCats, catsHaveLoaded, catsLoading]); 

  // useEffect with aim to load questions
  useEffect(() => {
    if (!token || qsLoading || questsItems.length) return;
    loadQs(50, token);
  }, [token, qsLoading, questsItems.length, loadQs]);

  return {
    loading: tokenLoading || catsLoading || qsLoading,
    error: tokenError || catsError || qsError,
    token
  };
}