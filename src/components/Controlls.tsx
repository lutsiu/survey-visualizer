import { useStore } from "zustand";
import { categoriesStore } from "../store/categoriesStore";
import { questionsStore } from "../store/questionsStore";

type Props = {
  selected: string;                       
  onChange: (name: string) => void;       
  token?: string;                         
};

export default function Controlls({ selected, onChange, token }: Props) {
  const cats     = useStore(categoriesStore, s => s.items);
  const loadQs   = useStore(questionsStore, s => s.load);
  const qsLoading= useStore(questionsStore, s => s.loading);

  const handleRefresh = async () => {
    if (!token) return;
    await loadQs(50, token);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center pt-[5rem] gap-[4rem] md:gap-[10rem]">
      {/* Category dropdown */}
      <label className="flex items-center gap-[1rem]">
        <span className="text-[1.4rem]">Category:</span>
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Category filter"
          className="bg-[#1e1e1e] text-white border border-gray-600 rounded-[0.5rem] px-[1.5rem] py-[0.8rem] text-[1.4rem]"
        >
          <option value="All" className="bg-[#1e1e1e] text-white">
            All
          </option>
          {cats.map((c) => (
            <option
              key={c.id}
              value={c.name}
              className="bg-[#1e1e1e] text-white"
            >
              {c.name}
            </option>
          ))}
        </select>
      </label>

      {/* Refresh button */}
      <button
        onClick={handleRefresh}
        disabled={!token || qsLoading}
        className="w-fit border border-gray-600 rounded-[0.5rem] px-[2rem] py-[1rem] text-[1.4rem] bg-[#1e1e1e] text-white hover:bg-[#2a2a2a] disabled:opacity-50"
      >
        {qsLoading ? "Refreshing…" : "Refresh Data"}
      </button>
    </div>
  );
}
