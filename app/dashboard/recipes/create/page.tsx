import Form from "@/app/ui/recipes/form";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import { DASHBOARD_PAGES, FormActionType } from "@/app/lib/consts";
import { fetchAllIngredients } from "@/app/lib/ingredients/data";

export default async function Page() {
  const { NAME, PATH } = DASHBOARD_PAGES.INGREDIENTS;
  const ingredientsList = await fetchAllIngredients();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: `${NAME}`,
            href: `/dashboard/${PATH}`,
          },
          {
            label: `Create ${NAME}`,
            href: `/dashboard/${PATH}/create`,
            active: true,
          },
        ]}
      />
      <Form
        formProps={{
          formActionType: FormActionType.Create,
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
