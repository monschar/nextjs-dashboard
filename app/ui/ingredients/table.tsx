import { fetchFilteredIngredients } from "@/app/lib/ingredients/data";
import { DeleteItemButton, UpdateItemButton } from "../dashboard/buttons";
import { deleteIngredient } from "@/app/lib/ingredients/actions";
import { IngredientsTable as IngredientsTableType } from "@/app/lib/ingredients/definitions";
import { DASHBOARD_PAGES } from "@/app/lib/consts";
import { formatCurrency } from "@/app/lib/utils";

export default async function IngredientsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const ingredients = await fetchFilteredIngredients(query, currentPage);

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
        {" "}
        {formatCurrency(item.price)}
      </td>
      <td className="whitespace-nowrap px-3 py-3">{item.tag}</td>
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <UpdateItemButton
            id={item.id}
            parentPath={DASHBOARD_PAGES.INGREDIENTS.PATH}
          />
          <DeleteItemButton
            id={item.id}
            onDelete={deleteIngredient.bind(null, item.id)}
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
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <p className="text-xl font-medium">{formatCurrency(item.price)}</p>
          <p>{item.tag}</p>
        </div>
        <div className="flex justify-end gap-2">
          <UpdateItemButton
            id={item.id}
            parentPath={DASHBOARD_PAGES.INGREDIENTS.PATH}
          />
          <DeleteItemButton
            id={item.id}
            onDelete={deleteIngredient.bind(null, item.id)}
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
            {ingredients?.map((item) => (
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
                  Tag
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {ingredients?.map((item) => (
                <TableItem key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}