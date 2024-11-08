"use client";
import Form from "@/app/ui/recipes/form";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import { useSearchParams } from "next/navigation";
import { DASHBOARD_PAGES, FormActionType } from "@/app/lib/consts";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { fetchRecipeById } from "@/lib/slices/recipesSlice";
import { FormSkeleton } from "@/app/ui/skeletons";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id") || "";
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.recipesState);
  const { NAME, PATH } = DASHBOARD_PAGES.RECIPES;

  useEffect(() => {
    dispatch(fetchRecipeById(id));
  }, [dispatch, id]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: `${NAME}`,
            href: `/dashboard/${PATH}`,
          },
          {
            label: `Edit ${NAME}`,
            href: `/dashboard/${PATH}/edit?id=${id}`,
            active: true,
          },
        ]}
      />
      {loading ? (
        <FormSkeleton />
      ) : (
        <Form formActionType={FormActionType.Edit} />
      )}
    </main>
  );
}
