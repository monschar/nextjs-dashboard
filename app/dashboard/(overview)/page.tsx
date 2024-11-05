import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import { RevenueChartSkeleton } from "@/app/ui/skeletons";
import MegaTable from "@/app/ui/dashboard/megatable";
import { fetchAllRecipes } from "@/app/lib/recipes/data";
import IngredientChart from "@/app/ui/dashboard/ingredient-chart";
import IngredientTable from "@/app/ui/dashboard/ingredient-table";
import { fetchAllIngredients } from "@/app/lib/ingredients/data";
import ActiveRecipeChart from "@/app/ui/dashboard/active-recipes-chart";

export default async function Page() {
  const recipeData = await fetchAllRecipes();
  const ingredientData = await fetchAllIngredients();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Suspense fallback={<RevenueChartSkeleton />}>
            <IngredientChart />
            <ActiveRecipeChart />
          </Suspense>
        </div>
        <div>
          <IngredientTable ingredientData={ingredientData} />
        </div>
      </div>
      <div className="mt-6 w-100">
        <MegaTable recipeData={recipeData} />
      </div>
      {/* <Suspense fallback={<CardsSkeleton />}>
        <CardWrapper />
      </Suspense> */}
      {/* <div className="mt-6 grid grid-cols-1 gap-6">
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div> */}
    </main>
  );
}
