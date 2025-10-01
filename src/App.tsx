import { useStore } from "zustand";
import { useInit } from "./hooks/useInit";
import { categoriesStore } from "./store/categoriesStore";
import { questionsStore } from "./store/questionsStore";
import { useEffect } from "react";


function App() {
  const {loading, error, token} = useInit();
  const cats = useStore(categoriesStore, s => s.items);
  const qs   = useStore(questionsStore, s => s.items);
  console.log(cats, qs);
  return (
    <div>
      Hi
    </div>
  );
}

export default App;
