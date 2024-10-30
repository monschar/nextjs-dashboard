import Form from "@/app/ui/ingredients/form";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import { DASHBOARD_PAGES, FormActionType } from "@/app/lib/consts";

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: `${DASHBOARD_PAGES.INGREDIENTS.NAME}`,
            href: `/dashboard/${DASHBOARD_PAGES.INGREDIENTS.PATH}`,
          },
          {
            label: `Create ${DASHBOARD_PAGES.INGREDIENTS.NAME}`,
            href: "/dashboard/${DASHBOARD_PAGES.INGREDIENTS.PATH}/create",
            active: true,
          },
        ]}
      />
      <Form formProps={{ formActionType: FormActionType.Create }} />
    </main>
  );
}
