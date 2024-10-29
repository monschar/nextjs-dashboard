import Form from "@/app/ui/itemLevels/edit-form";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import { fetchItemLevelById } from "@/app/lib/itemLevels/data";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const itemLevel = await fetchItemLevelById(id);

  if (!itemLevel) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Item Levels", href: "/dashboard/item-levels" },
          {
            label: "Edit Item Level",
            href: `/dashboard/item-levels/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form itemLevel={itemLevel} />
    </main>
  );
}
