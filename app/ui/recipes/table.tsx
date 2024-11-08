"use client";

import { Recipe as RecipeTableType } from "@/app/lib/recipes/definitions";
import { DASHBOARD_PAGES, ICON_SIZE } from "@/app/lib/consts";
import { formatCurrency } from "@/app/lib/utils";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  deleteRecipeById,
  fetchRecipes,
  updateCurrentRecipe,
} from "@/lib/slices/recipesSlice";
import Link from "next/link";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { TableSkeleton } from "../skeletons";

const iconSize = ICON_SIZE.L;

export default function RecipesTable() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { PATH } = DASHBOARD_PAGES.RECIPES;

  const { recipes, loading } = useAppSelector((state) => state.recipesState);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const query = searchParams?.get("query") || "";
  const filteredRecipes = recipes.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  const onDeleteRecipe = (id: string) => () => dispatch(deleteRecipeById(id));

  const onEditRecipe = (ingredient: RecipeTableType) => () =>
    dispatch(updateCurrentRecipe(ingredient));

  const TableItem = ({ item }: { item: RecipeTableType }) => (
    <tr
      key={item.id}
      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
    >
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <Image
            src={item.imageUrl}
            height={iconSize}
            width={iconSize}
            alt={`${item.name}'s icon`}
            style={{ objectFit: "contain", maxHeight: iconSize }}
          />
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
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <Link
            href={`/dashboard/${PATH}/edit?id=${item.id}`}
            className="rounded-md border p-2 hover:bg-gray-100"
            onClick={onEditRecipe(item)}
          >
            <PencilIcon className="w-5" />
          </Link>
          <button
            className="rounded-md border p-2 hover:bg-gray-100"
            onClick={onDeleteRecipe(item.id)}
          >
            <span className="sr-only">Delete</span>
            <TrashIcon className="w-5" />
          </button>
        </div>
      </td>
    </tr>
  );

  const TableMobileItem = ({ item }: { item: RecipeTableType }) => (
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
          <p>{item.ingredient1 ?? "-"}</p>
          <p>{item.ingredient2 ?? "-"}</p>
          <p>{item.ingredient3 ?? "-"}</p>
          <p>{item.ingredient4 ?? "-"}</p>
          <p>{item.ingredient5 ?? "-"}</p>
        </div>
        <div className="flex justify-end gap-2">
          <Link
            href={`/dashboard/${PATH}/${item.id}/edit`}
            className="rounded-md border p-2 hover:bg-gray-100"
            onClick={onEditRecipe(item)}
          >
            <PencilIcon className="w-5" />
          </Link>
          <button
            className="rounded-md border p-2 hover:bg-gray-100"
            onClick={onDeleteRecipe(item.id)}
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
            {filteredRecipes?.map((item) => (
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
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredRecipes?.map((item) => (
                <TableItem key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
