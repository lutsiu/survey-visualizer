import { useStore } from "zustand";
import { questionsStore } from "../store/questionsStore";
import { categoriesStore } from "../store/categoriesStore";
import type { Difficulty } from "../types/types";

export default function QuestionsList() {
  const qs         = useStore(questionsStore, s => s.items);
  const qsLoading  = useStore(questionsStore, s => s.loading);
  const catsLoading= useStore(categoriesStore, s => s.loading);

  const itemTone: Record<Difficulty, string> = {
    easy:   "border-emerald-500/30 hover:border-emerald-400/40 bg-emerald-500/5",
    medium: "border-amber-500/30  hover:border-amber-400/40  bg-amber-500/5",
    hard:   "border-rose-500/30    hover:border-rose-400/40    bg-rose-500/5",
  };

  const badgeTone: Record<Difficulty, string> = {
    easy:   "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
    medium: "bg-amber-500/15  border-amber-500/30  text-amber-300",
    hard:   "bg-rose-500/15   border-rose-500/30   text-rose-300",
  };

  return (
    <section className="w-full max-w-[80rem] mx-auto">
      <h5 className="text-[1.6rem] font-semibold mb-[1.2rem]">Questions</h5>

      {/* loading */}
      {(qsLoading || catsLoading) && (
        <p className="text-[1.4rem] opacity-75 mb-[1.2rem]">Loading questions…</p>
      )}

      {/* empty */}
      {!qsLoading && !catsLoading && qs.length === 0 && (
        <p className="text-[1.4rem] opacity-75">No questions to show.</p>
      )}

      <ul className="grid gap-[1.2rem] max-h-[60rem] overflow-auto pr-[0.6rem]">
        {qs.map((q, i) => (
          <li
            key={i}
            className={[
              "rounded-[1rem] border transition-colors",
              "p-[1.4rem] md:p-[1.6rem]",
              itemTone[q.difficulty],
            ].join(" ")}
          >
            <div className="flex items-center justify-between gap-[1rem] mb-[0.8rem]">
              <span className="text-[1.2rem] opacity-70">{q.category}</span>
              <span
                className={[
                  "text-[1.1rem] uppercase tracking-wide",
                  "px-[0.8rem] py-[0.2rem] rounded-[0.6rem] border",
                  badgeTone[q.difficulty],
                ].join(" ")}
              >
                {q.difficulty}
              </span>
            </div>

            <p
              className="text-[1.5rem] leading-[2.2rem]"
              dangerouslySetInnerHTML={{ __html: q.question }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
