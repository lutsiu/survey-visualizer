import { useStore } from "zustand"
import { questionsStore } from "../store/questionsStore";

export default function Header() {

  const count = useStore(questionsStore, s => s.items.length);

  return (
    <nav className="flex flex-col items-center gap-[2rem] pt-[5rem]">
      <h2>OpenTDB Visualizer by lutsiu</h2>
      <h3>Loaded: {count} questions</h3>
    </nav>

  )
}