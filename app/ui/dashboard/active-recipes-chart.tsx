import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";
import { Recipe } from "@/app/lib/recipes/definitions";
import { ItemLevels } from "@/app/lib/consts";
import { categorizeActiveRecipes } from "@/app/lib/utils";
import clsx from "clsx";
import { fetchAllRecipes } from "@/app/lib/recipes/data";

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

const ActiveRecipeRecord = ({ recipe }: { recipe: Recipe }) => (
  <div
    key={recipe.id}
    className={clsx(
      "flex flex-1 items-center gap-2 p-1 rounded-md border border-1 border-white",
      {
        "hover:bg-sky-300 bg-sky-200": recipe.itemLevel === ItemLevels.COMMON,
        "hover:bg-teal-300 bg-teal-200": recipe.itemLevel === ItemLevels.RARE,
        "hover:bg-amber-300 bg-amber-200": recipe.itemLevel === ItemLevels.EPIC,
        "hover:bg-rose-300 bg-rose-200":
          recipe.itemLevel === ItemLevels.LEGENDARY,
      }
    )}
  >
    <Image
      src={recipe.imageUrl}
      height={25}
      width={25}
      alt={`${recipe.name}'s icon`}
      style={{ objectFit: "contain", height: "28px", width: "28px" }}
    />
    <p className="text-sm flex items-center justify-center">
      {`${recipe.name}`}
    </p>
  </div>
);

const ActiveRecipeStructureCard = ({
  title,
  recipes,
}: {
  title: string;
  recipes: Recipe[];
}) => {
  return (
    <div className="justify-start rounded-xl bg-white p-4 shadow-sm">
      <h5 className={`${lusitana.className} mb-4 text-xl`}>{title}</h5>
      {recipes.map((ar) => (
        <ActiveRecipeRecord key={ar.id} recipe={ar} />
      ))}
    </div>
  );
};

export default async function ActiveRecipeChart() {
  const activeRecipes = await fetchAllRecipes(); // Fetch data inside the component
  const categorizedActiveRecipes = categorizeActiveRecipes(activeRecipes);

  return (
    <div className="">
      {/* NOTE: Uncomment this code in Chapter 7 */}

      <div className="rounded-xl bg-gray-50 p-4">
        <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Active Recipes
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {categorizedActiveRecipes.map((car) => (
            <ActiveRecipeStructureCard
              key={car.title}
              recipes={car.list}
              title={car.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
