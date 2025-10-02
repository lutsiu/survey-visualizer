import { useStore } from "zustand";
import { categoriesStore } from "../store/categoriesStore";
import { questionsStore } from "../store/questionsStore";
import { useMemo } from "react";
import { groupByCategory } from "../selectors/selectors";
import {
  Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

interface Props {
  selected?: string;
  onSelect?: (name: string) => void;
}

export default function QuestionsByCategoriesChart({ selected = "All", onSelect }: Props) {
  const cats = useStore(categoriesStore, (s) => s.items);
  const qs   = useStore(questionsStore, (s) => s.items);

  const data = useMemo(() => groupByCategory(qs, cats), [qs, cats]);

  if (!data.length) {
    return (
      <div className="w-full max-w-[80rem] h-[32rem] rounded-[1.2rem] border border-white/10 bg-white/5 flex items-center justify-center">
        <p className="opacity-70">No data yet</p>
      </div>
    );
  }

  function formattedText(s: string) {
    if (s.length <= 10) {
      return s
    } else {
      return s.slice(0,10) + "...";
    }
  }

  return (
    <div className="w-full max-w-[80rem] h-[32rem] rounded-[1.2rem] border border-white/10 bg-white/5 p-[1.6rem]">
      <h3 className="text-[1.6rem] font-semibold mb-[1.2rem]">Questions by Category</h3>

      <div className="w-full h-[26rem]"> 
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, bottom: 30, left: 10 }} barCategoryGap={16}>
            <CartesianGrid strokeOpacity={0.1} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "currentColor", opacity: 0.8 }}
              tickFormatter={formattedText}
              interval={0}
              angle={-35}
              textAnchor="end"
              height={50}
            />
            <YAxis allowDecimals={false} tick={{ fontSize: 14, fill: "currentColor", opacity: 0.8 }} />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.06)" }}
              contentStyle={{ background: "#111", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8 }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#fff" }}
              formatter={(value) => [value as number, "Count"]}
            />
            <Bar
              dataKey="count"
              radius={[8, 8, 0, 0]}
              onClick={(_, index) => onSelect?.(data[index].name)}
              isAnimationActive={false} 
            >
              {data.map((entry, i) => {
                const isSelected = selected === "All" || entry.name === selected;
                return (
                  <Cell
                    key={`cell-${i}`}
                    fill={isSelected ? "#8b5cf6" : "rgba(156,163,175,0.7)"} 
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
