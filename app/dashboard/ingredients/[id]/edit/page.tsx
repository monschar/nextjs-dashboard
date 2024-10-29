import Form from "@/app/ui/ingredients/edit-form";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import { fetchIngredientById } from "@/app/lib/ingredients/data";
import { notFound } from "next/navigation";
import { DASHBOARD_PAGES } from "@/app/lib/consts";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const ingredient = await fetchIngredientById(id);

  if (!ingredient) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: `${DASHBOARD_PAGES.INGREDIENTS.NAME}`,
            href: `/dashboard/${DASHBOARD_PAGES.INGREDIENTS.PATH}`,
          },
          {
            label: `Edit ${DASHBOARD_PAGES.INGREDIENTS.NAME}`,
            href: `/dashboard/${DASHBOARD_PAGES.INGREDIENTS.PATH}/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form ingredient={ingredient} />
    </main>
  );
}
