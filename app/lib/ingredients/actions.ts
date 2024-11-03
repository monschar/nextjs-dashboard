"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.coerce.number(),
  imageUrl: z.string(),
  stock: z.coerce.number(),
  sequence: z.coerce.number(),
  itemLevel: z.string(),
});

const CreateIngredient = FormSchema.omit({ id: true });
const UpdateIngredient = FormSchema.omit({ id: true });

export async function createIngredient(formData: FormData) {
  const validatedFields = CreateIngredient.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    imageUrl: formData.get("image-url"),
    stock: formData.get("stock"),
    sequence: formData.get("sequence"),
    itemLevel: formData.get("item-level"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return;
  }
  const { name, price, stock, sequence, itemLevel } = validatedFields.data;
  const imageUrl = `/ingredients/Ingredients Set_${sequence}.png`;
  try {
    await sql`
        INSERT INTO ingredients (name, price, image_url, stock, sequence, item_level)
        VALUES (${name}, ${price}, ${imageUrl}, ${stock}, ${sequence}, ${itemLevel})
      `;
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/dashboard/ingredients");
  redirect("/dashboard/ingredients");
}

export async function updateIngredient(id: string, formData: FormData) {
  const { name, price, stock, sequence, itemLevel, imageUrl } =
    UpdateIngredient.parse({
      name: formData.get("name"),
      price: formData.get("price"),
      imageUrl: formData.get("image-url"),
      stock: formData.get("stock"),
      sequence: formData.get("sequence"),
      itemLevel: formData.get("item-level"),
    });
  try {
    await sql`
          UPDATE ingredients
          SET name = ${name}, price = ${price}, image_url = ${imageUrl}, stock = ${stock}, sequence = ${sequence}, item_level = ${itemLevel}
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

export async function updateIngredientStock(id: string, stock: number) {
  try {
    await sql`
          UPDATE ingredients
          SET stock = ${stock}
          WHERE id = ${id}
        `;
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/dashboard`);
}
