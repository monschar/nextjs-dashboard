"use client";
import { UpdateItemButton } from "../dashboard/buttons";
import { IngredientsTable as IngredientsTableType } from "@/app/lib/ingredients/definitions";
import { DASHBOARD_PAGES, ICON_SIZE } from "@/app/lib/consts";
import { formatCurrency } from "@/app/lib/utils";
import Image from "next/image";

import { useEffect } from "react";
import {
  fetchIngredients,
  deleteIngredientById,
} from "@/lib/slices/ingredientsSlice";
import { useSearchParams } from "next/navigation";
import { TableSkeleton } from "../skeletons";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function IngredientsTable() {
  const { ingredients, loading } = useAppSelector(
    (state) => state.ingredientsState
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") || "";
  const filteredIngredients = ingredients.filter((i) =>
    i.name.toLowerCase().includes(query.toLowerCase())
  );
  const iconSize = ICON_SIZE.MD;
  const onDeleteIngredient = (id: string) => () =>
    dispatch(deleteIngredientById(id));

  const TableItem = ({ item }: { item: IngredientsTableType }) => (
    <tr
      key={item.id}
      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
    >
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          {item.imageUrl !== "none" && (
            <Image
              src={item.imageUrl}
              height={iconSize}
              width={iconSize}
              alt={`${item.name}'s icon`}
              style={{ objectFit: "contain" }}
            />
          )}
          <p>{item.name}</p>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        {formatCurrency(item.price)}
      </td>
      <td className="whitespace-nowrap px-3 py-3">{item.stock}</td>
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <UpdateItemButton
            id={item.id}
            parentPath={DASHBOARD_PAGES.INGREDIENTS.PATH}
          />
          <button
            className="rounded-md border p-2 hover:bg-gray-100"
            onClick={onDeleteIngredient(item.id)}
          >
            <span className="sr-only">Delete</span>
            <TrashIcon className="w-5" />
          </button>
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
          <p>{item.stock}</p>
        </div>
        <div className="flex justify-end gap-2">
          <UpdateItemButton
            id={item.id}
            parentPath={DASHBOARD_PAGES.INGREDIENTS.PATH}
          />
          <button
            className="rounded-md border p-2 hover:bg-gray-100"
            onClick={onDeleteIngredient(item.id)}
          >
            <span className="sr-only">Delete</span>
            <TrashIcon className="w-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return loading ? (
    <TableSkeleton />
  ) : (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {filteredIngredients?.map((item) => (
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
                  Stock
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredIngredients?.map((item) => (
                <TableItem key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
