import { getIngredientsList } from "@/components/getIngredientsList";
import { fetchById } from "@/lib/meal-api";
import Image from "next/image";
import Link from "next/link";

const recipePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await fetchById(id);
  const recipe = data?.meals?.[0];
  const ingredients = getIngredientsList(recipe!);

  // If no recipe data
  if (!recipe) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Recipe not found</h1>
        <p>We couldn't find a meal with ID: {id}</p>
        <p>
          Return to
          <Link href={"/"}>homepage</Link>
        </p>
      </div>
    );
  }

  return (
    <main className="p-8 flex flex-col gap-6 md:10">
      <h1 className="text-3xl font-bold">{recipe.strMeal}</h1>
      <h1 className="text-2xl">{recipe.strCategory}</h1>
      <section className="grid grid-cols-2 gap-10 md:gap-20">
        <section className="flex flex-col gap-10">
          <ol>
            <h3>Ingredients</h3>
            {ingredients.map((item) => (
              <li key={item.id}>
                <span className="font-medium">{item.measure}</span> {item.name}
              </li>
            ))}
          </ol>
          <p className="flex flex-wrap">{recipe.strInstructions}</p>
        </section>
        <section className="flex flex-col gap-10 justify-center items-center">
          <Image
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            width={500}
            height={500}
            className="rounded-xl mt-4 w-100 h-auto"
          />
        </section>
      </section>
    </main>
  );
};

export default recipePage;
