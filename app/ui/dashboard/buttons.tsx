import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function CreateItemButton({
  buttonText,
  parentPath,
}: {
  buttonText: string;
  parentPath: string;
}) {
  return (
    <Link
      href={`/dashboard/${parentPath}/create`}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">{buttonText}</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateItemButton({
  id,
  parentPath,
}: {
  id: string;
  parentPath: string;
}) {
  return (
    <Link
      href={`/dashboard/${parentPath}/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteItemButton({
  id,
  onDelete,
}: {
  id: string;
  onDelete: (id: string) => Promise<unknown>;
}) {
  const onDeleteWithId = onDelete.bind(null, id);
  return (
    <form action={onDeleteWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
