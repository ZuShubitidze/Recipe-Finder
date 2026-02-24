import { CategoryButton } from "@/components/search/CategoryButton";
import { SearchBox } from "@/components/search/SearchBox";
import { Suspense } from "react";
import { fetchByCategory, fetchByKeyWord } from "@/lib/meal-api";
import Link from "next/link";
import Image from "next/image";
import { fetchById } from "@/lib/meal-api";

type SearchParams = {
  query?: string;
  category?: string;
  id?: string;
};

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { query, category, id } = await searchParams;

  // Decide which data to fetch
  const data = id
    ? await fetchById(id)
    : category
      ? await fetchByCategory(category)
      : await fetchByKeyWord(query || "");

  const categories = ["Beef", "Chicken", "Dessert", "Vegetarian"];

  return (
    <main>
      <Suspense fallback={<div>Loading search...</div>}>
        <SearchBox />
      </Suspense>
      <section className="flex gap-2 my-4">
        {categories.map((cat) => (
          <CategoryButton key={cat} category={cat} />
        ))}
      </section>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-20">
        {data.meals?.map(({ idMeal, strCategory, strMeal, strMealThumb }) => (
          <li key={idMeal}>
            <Link href={`/recipes/${idMeal}`}>
              <h3 className="text-lg font-bold line-clamp-1">{strMeal}</h3>
              <h4 className="font-bold line-clamp-1">
                Category - {strCategory}
              </h4>
              <Image
                src={strMealThumb}
                alt={strMeal}
                width={500}
                height={500}
                className="rounded-xl mt-4 w-100 h-auto"
              />
            </Link>
          </li>
        )) || <p>No meals found.</p>}
      </ul>
    </main>
  );
}
