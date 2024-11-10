import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import { RevenueChartSkeleton } from "@/app/ui/skeletons";
import ActiveIngredientChart from "@/app/ui/dashboard/active-ingredient-chart";
import IngredientTable from "@/app/ui/dashboard/ingredient-table";
import ActiveRecipeChart from "@/app/ui/dashboard/active-recipes-chart";
import MegaTable from "@/app/ui/dashboard/megatable";

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="mt-6 gap-6">
        <ActiveRecipeChart />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-6">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <ActiveIngredientChart />
        </Suspense>
        <IngredientTable />
      </div>
      <div className="mt-6 w-100">
        <MegaTable />
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
