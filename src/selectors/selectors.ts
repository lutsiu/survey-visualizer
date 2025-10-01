import type {TriviaQuestion, Category, Difficulty} from "../types/types";
/* 
 I've found out that some categories include &amp,
 it's clearly an api bug and this function fixes issue, otherwise there would be quests 
 that would be ignored by this function since names of categs would be different
*/
function normalizeName(name: string): string {
  return name.replace(/&amp;/g, "&");
}

export function groupByCategory(qs: TriviaQuestion[], 
  cats: Category[]): Array<{name: string, count: number, id?: number}> {
  const counts = new Map<string, number>();

  for (const q of qs) {
    counts.set(normalizeName(q.category), (counts.get(normalizeName(q.category)) ?? 0) + 1);
  }

  if (cats?.length) {
    return cats.map((c) => ({
      id: c.id,
      name: normalizeName(c.name),
      count: counts.get(normalizeName(c.name)) ?? 0,
    }));
  }

  return Array.from(counts.entries()).map(([name, count]) => ({ name, count }));
}

export function groupByDifficulty(qs: TriviaQuestion[]):Array<{name: Difficulty, value: number}> {
  const counts: Record<Difficulty, number> = {easy: 0, medium: 0, hard:0};

  for (const q of qs) {
    counts[q.difficulty]++;
  }

  return (["easy", "medium", "hard"] as Difficulty[]).map((d) => ({
    name: d,
    value: counts[d]
  }));
}