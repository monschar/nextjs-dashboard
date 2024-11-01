import { fetchFilteredRecipes } from "@/app/lib/recipes/data";
import { DeleteItemButton, UpdateItemButton } from "../dashboard/buttons";
import { deleteRecipe } from "@/app/lib/recipes/actions";
import { RecipesTable as IngredientsTableType } from "@/app/lib/recipes/definitions";
import { DASHBOARD_PAGES } from "@/app/lib/consts";
import { formatCurrency } from "@/app/lib/utils";
import RecipeStatus from "./status";

export default async function RecipesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const { PATH } = DASHBOARD_PAGES.RECIPES;
  const data = await fetchFilteredRecipes(query, currentPage);
  const TableItem = ({ item }: { item: IngredientsTableType }) => (
    <tr
      key={item.id}
      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
    >
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <p>{item.name}</p>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        {formatCurrency(item.price)}
      </td>
      <td className="whitespace-nowrap px-3 py-3">{item.ingredient1 ?? "-"}</td>
      <td className="whitespace-nowrap px-3 py-3">{item.ingredient2 ?? "-"}</td>
      <td className="whitespace-nowrap px-3 py-3">{item.ingredient3 ?? "-"}</td>
      <td className="whitespace-nowrap px-3 py-3">{item.ingredient4 ?? "-"}</td>
      <td className="whitespace-nowrap px-3 py-3">{item.ingredient5 ?? "-"}</td>
      <td className="whitespace-nowrap px-3 py-3">
        <RecipeStatus active={item.active} />
      </td>
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <UpdateItemButton id={item.id} parentPath={PATH} />
          <DeleteItemButton
            id={item.id}
            onDelete={deleteRecipe.bind(null, item.id)}
          />
        </div>
      </td>
    </tr>
  );

  const TableMobileItem = ({ item }: { item: IngredientsTableType }) => (
    <div key={item.id} className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <div className="mb-2 flex items-center">
            <p>{item.name}</p>
          </div>
        </div>
        <RecipeStatus active={item.active} />
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <p className="text-xl font-medium">{formatCurrency(item.price)}</p>
          <p>{item.ingredient1 ?? "-"}</p>
          <p>{item.ingredient2 ?? "-"}</p>
          <p>{item.ingredient3 ?? "-"}</p>
          <p>{item.ingredient4 ?? "-"}</p>
          <p>{item.ingredient5 ?? "-"}</p>
        </div>
        <div className="flex justify-end gap-2">
          <UpdateItemButton id={item.id} parentPath={PATH} />
          <DeleteItemButton
            id={item.id}
            onDelete={deleteRecipe.bind(null, item.id)}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {data?.map((item) => (
              <TableMobileItem key={item.id} item={item} />
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Price
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Ingredient1
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Ingredient2
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Ingredient3
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Ingredient4
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Ingredient5
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Active
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data?.map((item) => (
                <TableItem key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
