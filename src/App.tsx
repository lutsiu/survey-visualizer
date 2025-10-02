import { useStore } from "zustand";
import { useInit } from "./hooks/useInit";
import { categoriesStore } from "./store/categoriesStore";
import { questionsStore } from "./store/questionsStore";
import { groupByCategory, groupByDifficulty } from "./selectors/selectors";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Controlls from "./components/Controlls";
import QuestionsList from "./components/QuestionsList";


function App() {
  const {loading, error, token} = useInit();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
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
    <main className="flex flex-col min-h-screen w-full py-[5rem]">
      <header>
        <Header/>
        <Controlls token={token} onChange={setSelectedCategory} selected={selectedCategory  }/>
      </header>
      <section className="flex justify-center items-center">
        <QuestionsList/>
      </section>
    </main>
  );
}

export default App;
