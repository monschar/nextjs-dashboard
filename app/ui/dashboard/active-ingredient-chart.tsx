"use client";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";
import { getActiveIngredients } from "@/app/lib/utils";
import clsx from "clsx";
import { useAppSelector } from "@/lib/hooks";
import { LocalShipping } from "@mui/icons-material";

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default function ActiveIngredientChart() {
  const { recipes, ingredients } = useAppSelector((state) => state.rootState);
  const activeIngredients = getActiveIngredients(recipes, ingredients);
  const rowHeight = 25;
  return (
    <div className="">
      <div className="rounded-xl bg-gray-50 p-4">
        <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Active Ingredients
        </h2>
        <div className="flex-col mt-0 items-end gap-2 rounded-md bg-white p-4">
          {activeIngredients.map((i) => (
            <div key={i.id} className={clsx("flex flex-1 items-center gap-2")}>
              <div
                className={clsx("flex w-40 gap-2 items-center", {
                  "bg-rose-100": i.stock < i.frequency * 5,
                })}
              >
                <p className="w-5 text-sm flex items-center justify-center">
                  {`${i.stock}`}
                </p>
                <Image
                  src={i.imageUrl}
                  height={rowHeight}
                  width={rowHeight}
                  alt={`${i.name}'s icon`}
                  style={{ objectFit: "contain", maxHeight: "28px" }}
                />
                <p className="text-sm flex items-center justify-center">
                  {`${i.name}`}
                </p>
              </div>
              <div
                className="w-full rounded-md bg-blue-300 pl-2 flex items-center"
                style={{
                  width: `calc((100% - 12rem) * ${
                    i.frequency / activeIngredients[0].frequency
                  })`,
                  height: `${rowHeight * 0.8}px`,
                }}
              >
                {i.deliverable && (
                  <LocalShipping className="text-gray-500" fontSize="small" />
                )}
              </div>
              <p className="text-sm text-wrap">{i.frequency}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
