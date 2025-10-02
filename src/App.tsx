import { useInit } from "./hooks/useInit";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Controlls from "./components/Controlls";
import QuestionsList from "./components/QuestionsList";
import QuestionsByCategoriesChart from "./components/QuestionsByCategoriesChart";
import QuestionsByDifficultyChart from "./components/QuestionsByDifficultyChart";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const {error, token} = useInit();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
 
  useEffect(() => {
    if (!error) return;
    toast.error(error, {
      duration: 4000,
      position: "top-right",
    });
  }, [error]);

  return (
    <main className="flex flex-col min-h-screen w-full py-[5rem] px-[3rem]">
      <Toaster
        toastOptions={{
          style: { background: "#111", color: "#fff", border: "1px solid rgba(255,255,255,0.12)" },
        }}
      />
      <header>
        <Header/>
        <Controlls token={token} onChange={setSelectedCategory} selected={selectedCategory  }/>
      </header>
      <section className="flex flex-col justify-center items-center gap-[5rem] pt-[5rem]">
        <QuestionsByCategoriesChart selected={selectedCategory} onSelect={setSelectedCategory}/>
        <QuestionsByDifficultyChart selected={selectedCategory}/>
        <QuestionsList selected={selectedCategory} />
      </section>
    </main>
  );
}

export default App;
/* 
I'd create it as a module (smthg like features/trivial-visualizer) with API dir, Zustand stores, selectors, compoennts, maybe some data (like colors, etc). I'd create visualizer dashboard component and keep data contracts type Category, TriviaQuestion, etc. I'd also hook theme/system tokens so Recharts would keep same styles for UI. 

For perfomance i'd memoize selectors and data like arrays.

For data structure i'd use Zustand stores, and align data structures with existing domain models.

Challenges: ensure UI consistency, performance, especially considering slow internet connection, align data structures with existing domain models. */