import Form from "@/app/ui/itemLevels/create-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Item Levels", href: "/dashboard/item-levels" },
          {
            label: "Create Invoice",
            href: "/dashboard/item-levels/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
