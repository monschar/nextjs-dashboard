import { lusitana } from "@/app/ui/fonts";
import { fetchActiveRecipes } from "@/app/lib/recipes/data";
import { fetchAllIngredients } from "@/app/lib/ingredients/data";
import Image from "next/image";
import { generateActiveIngredients } from "@/app/lib/utils";
import clsx from "clsx";

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function IngredientChart() {
  const activeRecipes = await fetchActiveRecipes(); // Fetch data inside the component
  const allIngredients = await fetchAllIngredients();
  const activeIngredients = generateActiveIngredients(
    activeRecipes,
    allIngredients
  );
  const rowHeight = 25;
  // NOTE: Uncomment this code in Chapter 7

  if (!activeIngredients || activeIngredients.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="md:col-span-4">
      {/* NOTE: Uncomment this code in Chapter 7 */}

      <div className="rounded-xl bg-gray-50 p-4">
        <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Active Ingredients
        </h2>
        <div className="flex-col mt-0 items-end gap-2 rounded-md bg-white p-4">
          {activeIngredients.map((i) => (
            <div key={i.id} className={clsx("flex flex-1 items-center gap-2")}>
              <div
                className={clsx("flex w-1/6 gap-2", {
                  "bg-rose-100": i.stock < i.frequency * 5,
                })}
              >
                <Image
                  src={i.imageUrl}
                  height={rowHeight}
                  width={rowHeight}
                  alt={`${i.name}'s icon`}
                  style={{ objectFit: "contain", maxHeight: "28px" }}
                />
                <p className="text-sm flex items-center justify-center">
                  {`${i.name} - ${i.stock}`}
                </p>
              </div>
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  width: `${
                    (i.frequency / activeIngredients[0].frequency) * 70
                  }%`,
                  height: `${rowHeight * 0.8}px`,
                }}
              ></div>
              <p className="text-sm text-wrap">{i.frequency}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
