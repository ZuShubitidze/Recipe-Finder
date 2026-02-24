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
  isFavorite: boolean;
  [key: string]: string | null | boolean;
}

export interface MealResponse {
  meals: Meal[] | null;
}
