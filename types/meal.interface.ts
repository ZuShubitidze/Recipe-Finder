export interface Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strSource: string;
  strYoutube: string;
  [key: string]: string | null;
}

export interface MealResponse {
  meals: Meal[] | null;
}
