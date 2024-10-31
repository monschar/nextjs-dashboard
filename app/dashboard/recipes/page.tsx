import Pagination from "@/app/ui/dashboard/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/recipes/table";
import { lusitana } from "@/app/ui/fonts";
import { TableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchRecipesPages } from "@/app/lib/recipes/data";
import { CreateItemButton } from "@/app/ui/dashboard/buttons";
import { DASHBOARD_PAGES } from "@/app/lib/consts";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchRecipesPages(query);

  const { NAME, PATH } = DASHBOARD_PAGES.RECIPES;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>{NAME}</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder={`Search ${NAME}...`} />
        <CreateItemButton parentPath={PATH} buttonText={`Create ${NAME}`} />
      </div>
      <Suspense key={query + currentPage} fallback={<TableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
