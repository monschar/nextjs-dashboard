"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: "Please enter a name.",
  }),
  date: z.string(),
});

export type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

const CreateItemLevel = FormSchema.omit({ id: true, date: true });
const UpdateItemLevel = FormSchema.omit({ id: true, date: true });

export async function createItemLevel(formData: FormData) {
  const validatedFields = CreateItemLevel.safeParse({
    name: formData.get("name"),
  });
  if (!validatedFields.success) {
    return;
  }

  const { name } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
        INSERT INTO item_levels (name, date)
        VALUES (${name},${date})
      `;
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/dashboard/item-levels");
  redirect("/dashboard/item-levels");
}

export async function updateItemLevel(id: string, formData: FormData) {
  const { name } = UpdateItemLevel.parse({
    name: formData.get("name"),
  });

  try {
    await sql`
          UPDATE item_levels
          SET name = ${name}
          WHERE id = ${id}
        `;
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/dashboard/item-levels");
  redirect("/dashboard/item-levels");
}

export async function deleteItemLevel(id: string) {
  try {
    await sql`DELETE FROM item_levels WHERE id = ${id}`;
    revalidatePath("/dashboard/item-levels");
  } catch (error) {
    console.log(error);
  }
}
