import Form from "@/app/ui/ingredients/form";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import { DASHBOARD_PAGES, FormActionType } from "@/app/lib/consts";

export default async function Page() {
  const { NAME, PATH } = DASHBOARD_PAGES.INGREDIENTS;
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
      <Form formActionType={FormActionType.Create} />
    </main>
  );
}
