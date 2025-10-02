import { useStore } from "zustand";
import { questionsStore } from "../store/questionsStore";
import { groupDifficultyForCategory } from "../selectors/selectors";
import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { Difficulty } from "../types/types";
import { DIFF_COLORS } from "../data/colors";

interface Props {
  selected?: string;
}

const RADIAN = Math.PI / 180;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderInsideLabel(props: any) {
  const { cx, cy, midAngle, innerRadius, outerRadius, name, value } = props;
  const r = (innerRadius + outerRadius) / 2;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#ffffff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={14}
      style={{ pointerEvents: "none" }}
    >
      <tspan x={x} dy="-0.2em">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </tspan>
      <tspan x={x} dy="1.2em">
        {value}
      </tspan>
    </text>
  );
}

export default function QuestionsByDifficultyChart({ selected = "All" }: Props) {
  const qs = useStore(questionsStore, (s) => s.items);

  // 1) base data for the (filtered) category
  const data = useMemo(() => groupDifficultyForCategory(qs, selected), [qs, selected]);

  // 2) remove zero-value slices so they don't clutter the chart
  const nonZeroData = useMemo(() => data.filter((d) => d.value > 0), [data]);

  const showEmpty = nonZeroData.length === 0;

  return (
    <div className="w-full max-w-[80rem] h-[32rem] rounded-[1.2rem] border border-white/10 bg-white/5 p-[1.6rem]">
      <h3 className="text-[1.6rem] font-semibold mb-[1.2rem]">Questions by Difficulty</h3>

      <div className="w-full h-[26rem]">
        {showEmpty ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="opacity-70 text-[1.4rem]">No data for {selected}.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={nonZeroData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                labelLine={false}
                label={renderInsideLabel}
                isAnimationActive={false}
              >
                {nonZeroData.map((entry, i) => (
                  <Cell key={i} fill={DIFF_COLORS[entry.name as Difficulty]} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  background: "#111",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 8,
                }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#fff" }}
                formatter={(value) => [value as number, "Count"]}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
