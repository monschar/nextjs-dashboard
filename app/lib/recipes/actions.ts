"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DASHBOARD_PAGES } from "../consts";

const { PATH, NAME } = DASHBOARD_PAGES.RECIPES;

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.coerce.number(),
  type: z.string(),
  ingredient1: z.string().nullable(),
  ingredient2: z.string().nullable(),
  ingredient3: z.string().nullable(),
  ingredient4: z.string().nullable(),
  ingredient5: z.string().nullable(),
  active: z.boolean(),
});

const CreateRecipe = FormSchema.omit({ id: true });
const UpdateRecipe = FormSchema.omit({ id: true });

export async function createRecipe(formData: FormData) {
  const validatedFields = CreateRecipe.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    type: formData.get("type"),
    ingredient1: formData.get("ingredient1"),
    ingredient2: formData.get("ingredient2"),
    ingredient3: formData.get("ingredient3"),
    ingredient4: formData.get("ingredient4"),
    ingredient5: formData.get("ingredient5"),
    active: formData.get("active") === "TRUE",
  });
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: `Missing Fields. Failed to Create ${NAME}.`,
    };
  }

  const {
    name,
    price,
    type,
    ingredient1,
    ingredient2,
    ingredient3,
    ingredient4,
    ingredient5,
    active,
  } = validatedFields.data;

  try {
    await sql`
        INSERT INTO recipes (name, price, type, ingredient1, ingredient2, ingredient3, ingredient4, ingredient5, active)
        VALUES (${name},${price},${type}, ${ingredient1}, ${ingredient2}, ${ingredient3}, ${ingredient4}, ${ingredient5}, ${active})
      `;
  } catch (error) {
    console.log(error);
    return {
      message: `Database Error: Failed to Create ${NAME}.`,
    };
  }

  revalidatePath(`/dashboard/${PATH}`);
  redirect(`/dashboard/${PATH}`);
}

export async function updateRecipe(id: string, formData: FormData) {
  const {
    name,
    price,
    type,
    ingredient1,
    ingredient2,
    ingredient3,
    ingredient4,
    ingredient5,
    active,
  } = UpdateRecipe.parse({
    name: formData.get("name"),
    price: formData.get("price"),
    type: formData.get("type"),
    ingredient1: formData.get("ingredient1"),
    ingredient2: formData.get("ingredient2"),
    ingredient3: formData.get("ingredient3"),
    ingredient4: formData.get("ingredient4"),
    ingredient5: formData.get("ingredient5"),
    active: formData.get("active") === "TRUE",
  });

  try {
    await sql`
          UPDATE recipes
          SET name = ${name}, price = ${price}, type = ${type}, ingredient1 = ${ingredient1}, ingredient2 = ${ingredient2}, ingredient3 = ${ingredient3}, ingredient4 = ${ingredient4}, ingredient5 = ${ingredient5}, active = ${active}
          WHERE id = ${id}
        `;
  } catch (error) {
    return { message: `Database Error: Failed to Update ${NAME}.` };
    console.log(error);
  }

  revalidatePath(`/dashboard/${PATH}`);
  redirect(`/dashboard/${PATH}`);
}

export async function deleteRecipe(id: string) {
  try {
    await sql`DELETE FROM recipes WHERE id = ${id}`;
    revalidatePath(`/dashboard/${PATH}`);
    return { message: `Deleted ${NAME}.` };
  } catch (error) {
    return { message: `Database Error: Failed to Delete ${NAME}.` };
    console.log(error);
  }
}

export async function updateRecipeActive(id: string) {
  try {
    await sql`
          UPDATE recipes
          SET active = NOT active
          WHERE id = ${id}
        `;
  } catch (error) {
    return { message: `Database Error: Failed to Update ${NAME}.` };
    console.log(error);
  }
  revalidatePath(`/dashboard`);
}
