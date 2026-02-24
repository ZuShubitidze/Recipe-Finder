import { Meal } from "@/types/meal.interface";

export const getIngredientsList = (meal: Meal) => {
  const list = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      list.push({
        id: i,
        name: ingredient,
        measure: measure || "to taste",
      });
    }
  }

  return list;
};
