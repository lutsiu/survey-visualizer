import { useStore } from "zustand";
import { questionsStore } from "../store/questionsStore";
import { badgeTone, itemTone } from "../data/colors";
import { filterByCategoryName } from "../selectors/selectors";
import { useMemo } from "react";
import { useLoading } from "../hooks/useLoading";

interface Props {
  selected?: string;
}

export default function QuestionsList({selected}: Props) {
  const qs         = useStore(questionsStore, s => s.items);
  const {loading} = useLoading(); 
  const items = useMemo(() => filterByCategoryName(qs, selected), [qs, selected]);

  return (
    <section className="w-full max-w-[80rem] mx-auto">
      <h5 className="text-[1.6rem] font-semibold mb-[1.2rem]">Questions</h5>

      {loading && (
        <p className="text-[1.4rem] opacity-75 mb-[1.2rem]">Loading questions…</p>
      )}

      {/* empty */}
      {!loading && items.length === 0 && (
        <p className="text-[1.4rem] opacity-75">No questions to show for {selected}.</p>
      )}

      <ul className="grid gap-[1.2rem] max-h-[60rem] overflow-auto pr-[0.6rem]">
        {items.map((q, i) => (
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
