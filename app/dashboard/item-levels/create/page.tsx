import Form from "@/app/ui/itemLevels/create-form";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Item Levels", href: "/dashboard/item-levels" },
          {
            label: "Create Item Level",
            href: "/dashboard/item-levels/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
