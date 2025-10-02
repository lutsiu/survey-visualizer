import { useInit } from "./hooks/useInit";
import { useState } from "react";
import Header from "./components/Header";
import Controlls from "./components/Controlls";
import QuestionsList from "./components/QuestionsList";
import QuestionsByCategoriesChart from "./components/QuestionsByCategoriesChart";
import QuestionsByDifficultyChart from "./components/QuestionsByDifficultyChart";


function App() {
  const {error, token} = useInit();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
 
  return (
    <main className="flex flex-col min-h-screen w-full py-[5rem]">
      <header>
        <Header/>
        <Controlls token={token} onChange={setSelectedCategory} selected={selectedCategory  }/>
      </header>
      <section className="flex flex-col justify-center items-center gap-[5rem] pt-[5rem]">
        <QuestionsByCategoriesChart selected={selectedCategory} onSelect={setSelectedCategory}/>
        <QuestionsByDifficultyChart selected={selectedCategory}/>
        <QuestionsList/>
      </section>
    </main>
  );
}

export default App;
