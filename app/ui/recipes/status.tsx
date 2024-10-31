import { CheckIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function RecipeStatus({ active }: { active: boolean }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-green-500 text-white": active,
        }
      )}
    >
      {active ? (
        <>
          <CheckIcon className="w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
