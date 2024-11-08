import Search from "@/app/ui/search";
import Table from "@/app/ui/recipes/table";
import { lusitana } from "@/app/ui/fonts";
import { TableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { CreateItemButton } from "@/app/ui/dashboard/buttons";
import { DASHBOARD_PAGES } from "@/app/lib/consts";

export default async function Page() {
  const { NAME, PATH } = DASHBOARD_PAGES.RECIPES;

  return (
    <div className="w-full h-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>{NAME}</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Suspense fallback={<TableSkeleton />}>
          <Search placeholder={`Search ${NAME}...`} />
        </Suspense>
        <CreateItemButton parentPath={PATH} buttonText={`Create ${NAME}`} />
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <Table />
      </Suspense>
    </div>
  );
}
