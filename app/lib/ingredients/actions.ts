"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.coerce.number(),
  date: z.string(),
  tag: z.string(),
  imageUrl: z.string(),
  stock: z.coerce.number(),
});

const CreateIngredient = FormSchema.omit({ id: true, date: true });
const UpdateIngredient = FormSchema.omit({ id: true, date: true });

export async function createIngredient(formData: FormData) {
  const validatedFields = CreateIngredient.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    tag: formData.get("tag"),
    imageUrl: formData.get("image-url"),
    stock: formData.get("stock"),
  });

  if (!validatedFields.success) {
    return;
  }

  const { name, price, tag, imageUrl, stock } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
        INSERT INTO ingredients (name, price, tag, image_url, date, stock)
        VALUES (${name},${price},${tag}, ${imageUrl}, ${date}, ${stock})
      `;
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/dashboard/ingredients");
  redirect("/dashboard/ingredients");
}

export async function updateIngredient(id: string, formData: FormData) {
  const { name, price, tag, imageUrl, stock } = UpdateIngredient.parse({
    name: formData.get("name"),
    price: formData.get("price"),
    tag: formData.get("tag"),
    imageUrl: formData.get("image-url"),
    stock: formData.get("stock"),
  });

  try {
    await sql`
          UPDATE ingredients
          SET name = ${name}, price = ${price}, tag = ${tag}, image_url = ${imageUrl}, stock = ${stock}
          WHERE id = ${id}
        `;
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/dashboard/ingredients");
  redirect("/dashboard/ingredients");
}

export async function deleteIngredient(id: string) {
  try {
    await sql`DELETE FROM ingredients WHERE id = ${id}`;
    revalidatePath("/dashboard/ingredients");
  } catch (error) {
    console.log(error);
  }
}
