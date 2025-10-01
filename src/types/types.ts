export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Category {
  id: number,
  name: string;
}

export interface TriviaQuestion {
  type: "multiple" | "boolean",
  difficulty: Difficulty,
  category: string,
  question: string,
  correct_answer: string,
  incorrect_answers: string[];
}

export type GetQuestionsResponse = {
  response_code: number, 
  results: TriviaQuestion[]
}

export type GetQuestionsParams = {
  amount: number;
  token?: string,
  categoryId?:number,
  difficulty: Difficulty
}