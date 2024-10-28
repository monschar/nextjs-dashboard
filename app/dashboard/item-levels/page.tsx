import Pagination from "@/app/ui/itemLevels/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/itemLevels/table";
import { CreateItemLevel } from "@/app/ui/itemLevels/buttons";
import { lusitana } from "@/app/ui/fonts";
import { ItemLevelsTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchItemLevelsPages } from "@/app/lib/itemLevels/data";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchItemLevelsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Item Levels</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search item levels..." />
        <CreateItemLevel />
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<ItemLevelsTableSkeleton />}
      >
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
