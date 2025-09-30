import { http } from "./http";

import type {Difficulty, Category, TriviaQuestion} from "../types/types";

type getQuestionsResponse = {
  response_code: number, 
  results: TriviaQuestion[]
}

export async function getRequestToken(): Promise<string> {

  const res = await http.get<{response_code: number, token: string}>(
    "/api_token.php", { params: { command: "request" } }
  ); 
  if (res.data.response_code !==0) throw new Error("Failed to get token");
  return res.data.token;
}

export async function getCategories(): Promise<Category[]> {
  const res = await http.get<{trivia_categories: Category[]}>(
    "/api_category.php"
  );

  return res.data.trivia_categories;
}

export async function getQuestions(amount: number, token?: string): Promise<getQuestionsResponse> {
  const res = await http.get<getQuestionsResponse>(
    "/api.php",
    {params: {amount, token}}
  )

  return res.data;
}