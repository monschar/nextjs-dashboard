"use client";

import { IngredientForm } from "@/app/lib/ingredients/definitions";
import {
  TagIcon,
  CurrencyDollarIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { updateIngredient } from "@/app/lib/ingredients/actions";
import { DASHBOARD_PAGES } from "@/app/lib/consts";

export default function EditIngredientForm({
  ingredient,
}: {
  ingredient: IngredientForm;
}) {
  const updateIngredientWithId = updateIngredient.bind(null, ingredient.id);

  return (
    <form action={updateIngredientWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Ingredient Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Choose a name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter name"
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                required
                defaultValue={ingredient.name}
              />
            </div>
          </div>
        </div>

        {/* Ingredient Stock */}
        <div className="mb-4">
          <label htmlFor="stock" className="mb-2 block text-sm font-medium">
            Choose an Stock
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="stock"
                name="stock"
                type="number"
                step="1"
                placeholder="Enter stock"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={ingredient.stock}
                required
              />
              <CubeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Ingredient Price */}
        <div className="mb-4">
          <label htmlFor="price" className="mb-2 block text-sm font-medium">
            Choose an price
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                placeholder="Enter price"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
                defaultValue={ingredient.price}
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Ingredient Tag */}
        <div className="mb-4">
          <label htmlFor="tag" className="mb-2 block text-sm font-medium">
            Tag
          </label>
          <div className="relative">
            <select
              id="tag"
              name="tag"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={ingredient.tag}
              required
            >
              <option value="" disabled>
                Select a tag
              </option>
              {[{ name: "N/A", value: "N/A" }].map((tag) => (
                <option key={tag.name} value={tag.value}>
                  {tag.name}
                </option>
              ))}
            </select>
            <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Ingredient Image Url */}
        <div className="mb-4">
          <label htmlFor="image-url" className="mb-2 block text-sm font-medium">
            Image Url
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="image-url"
                name="image-url"
                type="text"
                placeholder="Enter Image Url"
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={ingredient.image_url}
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/dashboard/${DASHBOARD_PAGES.INGREDIENTS.PATH}`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
