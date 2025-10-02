import type { Difficulty } from "../types/types";

export const itemTone: Record<Difficulty, string> = {
    easy:   "border-emerald-500/30 hover:border-emerald-400/40 bg-emerald-500/5",
    medium: "border-amber-500/30  hover:border-amber-400/40  bg-amber-500/5",
    hard:   "border-rose-500/30    hover:border-rose-400/40    bg-rose-500/5",
  };

export  const badgeTone: Record<Difficulty, string> = {
    easy:   "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
    medium: "bg-amber-500/15  border-amber-500/30  text-amber-300",
    hard:   "bg-rose-500/15   border-rose-500/30   text-rose-300",
  };

export  const DIFF_COLORS: Record<Difficulty, string> = {
  easy:   "#10b981", // emerald-500
  medium: "#f59e0b", // amber-500
  hard:   "#ef4444", // rose/red-500
};