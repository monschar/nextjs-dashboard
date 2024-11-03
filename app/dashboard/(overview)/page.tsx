import CardWrapper from "@/app/ui/dashboard/cards";
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import {
  RevenueChartSkeleton,
  CardsSkeleton,
} from "@/app/ui/skeletons";
import MegaTable from "@/app/ui/dashboard/megatable";
import { fetchAllRecipes } from "@/app/lib/recipes/data";
import IngredientChart from "@/app/ui/dashboard/ingredient-chart";

export default async function Page() {
  const recipeData = await fetchAllRecipes();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <IngredientChart />
        </Suspense>
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 w-100">
        <MegaTable recipeData={recipeData} />
      </div>
      {/* <div className="mt-6 grid grid-cols-1 gap-6">
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div> */}
    </main>
  );
}
