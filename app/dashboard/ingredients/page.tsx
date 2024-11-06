import Search from "@/app/ui/search";
import Table from "@/app/ui/ingredients/table";
import { lusitana } from "@/app/ui/fonts";
import { TableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { CreateItemButton } from "@/app/ui/dashboard/buttons";
import { DASHBOARD_PAGES } from "@/app/lib/consts";

export default async function Page() {
  return (
    <div className="w-full h-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>
          {DASHBOARD_PAGES.INGREDIENTS.NAME}
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder={`Search ${DASHBOARD_PAGES.INGREDIENTS.NAME}...`} />
        <CreateItemButton
          parentPath={DASHBOARD_PAGES.INGREDIENTS.PATH}
          buttonText={`Create ${DASHBOARD_PAGES.INGREDIENTS.NAME}`}
        />
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <Table/>
      </Suspense>
    </div>
  );
}
