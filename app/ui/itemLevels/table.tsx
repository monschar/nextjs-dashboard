import { formatDateToLocal } from "@/app/lib/utils";
import { fetchFilteredItemLevels } from "@/app/lib/itemLevels/data";
import { DeleteItemButton, UpdateItemButton } from "../dashboard/buttons";
import { deleteItemLevel } from "@/app/lib/itemLevels/actions";
import { ItemLevelsTable as ItemLevelsTableType } from "@/app/lib/itemLevels/definitions";

export default async function ItemLevelsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const itemLevels = await fetchFilteredItemLevels(query, currentPage);

  const TableItem = ({ item }: { item: ItemLevelsTableType }) => (
    <tr
      key={item.id}
      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
    >
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <p>{item.name}</p>
        </div>
      </td>
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <UpdateItemButton id={item.id} parentPath="item-levels" />
          <DeleteItemButton
            id={item.id}
            onDelete={deleteItemLevel.bind(null, item.id)}
          />
        </div>
      </td>
    </tr>
  );

  const TableMobileItem = ({ item }: { item: ItemLevelsTableType }) => (
    <div key={item.id} className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <div className="mb-2 flex items-center">
            <p>{item.name}</p>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div className="flex justify-end gap-2">
          <UpdateItemButton id={item.id} parentPath="item-levels" />
          <DeleteItemButton
            id={item.id}
            onDelete={deleteItemLevel.bind(null, item.id)}
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
            {itemLevels?.map((itemLevel) => (
              <TableMobileItem key={itemLevel.id} item={itemLevel} />
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {itemLevels?.map((itemLevel) => (
                <TableItem key={itemLevel.id} item={itemLevel} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
