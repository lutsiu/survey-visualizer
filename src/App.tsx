import { useStore } from "zustand";
import { useInit } from "./hooks/useInit";
import { categoriesStore } from "./store/categoriesStore";
import { questionsStore } from "./store/questionsStore";
import { groupByCategory, groupByDifficulty } from "./selectors/selectors";
import { useEffect } from "react";


function App() {
  const {loading, error, token} = useInit();
  const cats = useStore(categoriesStore, s => s.items);
  const qs   = useStore(questionsStore, s => s.items);

  useEffect(() => {
    if (token && !loading && !error) {
      console.log(cats);
      console.log(qs)
      console.log(groupByCategory(qs, cats));
      console.log(groupByCategory(qs, cats).map((cs) => cs.count).reduce((a, b) => a + b, 0));
      console.log(groupByDifficulty(qs));
    }
  }, [loading, error, token, qs,cats]);
  return (
    <div>
      Hi
    </div>
  );
}

export default App;
