import Form from "@/app/ui/recipes/form";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import { fetchRecipeById } from "@/app/lib/recipes/data";
import { notFound } from "next/navigation";
import { DASHBOARD_PAGES, FormActionType } from "@/app/lib/consts";
import { fetchAllIngredients } from "@/app/lib/ingredients/data";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const item = await fetchRecipeById(id);
  const ingredientsList = await fetchAllIngredients();
  const { NAME, PATH } = DASHBOARD_PAGES.INGREDIENTS;
  if (!item) {
    notFound();
  }
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
            href: `/dashboard/${PATH}/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form
        formProps={{
          formActionType: FormActionType.Edit,
          initialFormValues: item,
          options: {
            ingredientsList: ingredientsList.map((i) => ({
              label: i.name,
              value: i.id,
            })),
          },
        }}
      />
    </main>
  );
}
