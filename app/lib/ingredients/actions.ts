"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  date: z.string(),
  tag: z.string(),
  imageUrl: z.string(),
});

const CreateIngredient = FormSchema.omit({ id: true, date: true });
const UpdateIngredient = FormSchema.omit({ id: true, date: true });

export async function createIngredient(formData: FormData) {
  const validatedFields = CreateIngredient.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    tag: formData.get("tag"),
    imageUrl: formData.get("image-url"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Ingredient.",
    };
  }

  const { name, price, tag, imageUrl } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
        INSERT INTO ingredients (name, price, tag, image_url, date)
        VALUES (${name},${price},${tag}, ${imageUrl}, ${date})
      `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Ingredient.",
    };
    console.log(error);
  }

  revalidatePath("/dashboard/ingredients");
  redirect("/dashboard/ingredients");
}

export async function updateIngredient(id: string, formData: FormData) {
  const { name, price, tag, imageUrl } = UpdateIngredient.parse({
    name: formData.get("name"),
    price: formData.get("price"),
    tag: formData.get("tag"),
    imageUrl: formData.get("image-url"),
  });

  try {
    await sql`
          UPDATE ingredients
          SET name = ${name}, price = ${price}, tag = ${tag}, image_url = ${imageUrl}
          WHERE id = ${id}
        `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Ingredient." };
    console.log(error);
  }

  revalidatePath("/dashboard/ingredients");
  redirect("/dashboard/ingredients");
}

export async function deleteIngredient(id: string) {
  try {
    await sql`DELETE FROM ingredients WHERE id = ${id}`;
    revalidatePath("/dashboard/ingredients");
    return { message: "Deleted Ingredient." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Ingredient." };
    console.log(error);
  }
}
