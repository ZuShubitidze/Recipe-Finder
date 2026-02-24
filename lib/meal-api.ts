import { MealResponse } from "@/types/meal.interface";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// Dynamic fetch function
async function mealFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`MealDB Error: ${res.statusText}`);

  const data = await res.json();
  return data as T;
}

export const fetchByKeyWord = (query: string) =>
  mealFetch<MealResponse>(`search.php?s=${query}`);

export const fetchByCategory = (category: string) =>
  mealFetch<MealResponse>(`filter.php?c=${category}`);

export const fetchById = (id: string) =>
  mealFetch<MealResponse>(`lookup.php?i=${id}`);
