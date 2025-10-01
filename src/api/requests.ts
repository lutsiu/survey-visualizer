import { http } from "./http";

import type {Difficulty, Category, GetQuestionsResponse,
GetQuestionsParams} from "../types/types";



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

// REQUEST TO GET ALL QUESTIONS WITH CUSTOM PARAMS

export async function getQuestionsByParams(params: GetQuestionsParams): Promise<GetQuestionsResponse> {
  const {amount, token, categoryId, difficulty} = params;
  const safeAmount = Math.min(Math.max(1, amount), 50);

  const res = await http.get<GetQuestionsResponse>(
    "/api.php",
    {
      params: {
        amount: safeAmount,
        token,
        ...(categoryId ? {category: categoryId} : {}),
        ...(difficulty ? {difficulty} : {}),
      }
    }
  )

  return res.data;
}

// FUNCTIONS BELOW ARE SIMPLE FUNCTIONS IF YOU'D LIKE TO USE A FEW ARGS INSTEAD OF OBJECT OF PARAMS

export async function getQuestions(amount: number, token?: string): Promise<GetQuestionsResponse> {
  const res = await http.get<GetQuestionsResponse>(
    "/api.php",
    {params: {amount, token}}
  )

  return res.data;
}

export async function getQuestionsByCategory(amount: number, category: number,
   token?: string): Promise<GetQuestionsResponse> {
  
  const res = await http.get<GetQuestionsResponse>(
    "/api.php",
    {params: {amount, category, token}}
  );
  return res.data;
}
export async function getQuestionsByDifficulty(amount: number, difficulty: Difficulty,
   token?: string): Promise<GetQuestionsResponse> {
  
  const res = await http.get<GetQuestionsResponse>(
    "/api.php",
    {params: {amount, difficulty, token}}
  );
  return res.data;
}

export async function getQuestionsByCategoryAndDifficulty(amount: number, category: number, difficulty: Difficulty,
   token?: string): Promise<GetQuestionsResponse> {
  
  const res = await http.get<GetQuestionsResponse>(
    "/api.php",
    {params: {amount, category, difficulty, token}}
  );
  return res.data;
}