"use client";

import { ItemLevelForm } from "@/app/lib/itemLevels/definitions";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { updateItemLevel } from "@/app/lib/itemLevels/actions";

export default function EditItemLevelForm({
  itemLevel,
}: {
  itemLevel: ItemLevelForm;
}) {
  const updateItemLevelWithId = updateItemLevel.bind(null, itemLevel.id);

  return (
    <form action={updateItemLevelWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Item level name */}
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
                defaultValue={itemLevel.name}
                placeholder="Enter item level name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/item-levels"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
