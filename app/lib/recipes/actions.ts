"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DASHBOARD_PAGES } from "../consts";

const { PATH } = DASHBOARD_PAGES.RECIPES;

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.coerce.number(),
  ingredient1: z.string().nullable(),
  ingredient2: z.string().nullable(),
  ingredient3: z.string().nullable(),
  ingredient4: z.string().nullable(),
  ingredient5: z.string().nullable(),
  active: z.boolean(),
  itemLevel: z.string(),
  recipeStructure: z.string(),
  recipeType: z.string(),
  recipeLabel: z.string(),
  cookingAppliance: z.string(),
  imageUrl: z.string(),
});

const CreateRecipe = FormSchema.omit({ id: true });
const UpdateRecipe = FormSchema.omit({ id: true });

export async function createRecipe(formData: FormData) {
  const validatedFields = CreateRecipe.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    ingredient1: formData.get("ingredient1"),
    ingredient2: formData.get("ingredient2"),
    ingredient3: formData.get("ingredient3"),
    ingredient4: formData.get("ingredient4"),
    ingredient5: formData.get("ingredient5"),
    active: formData.get("active") === "TRUE",
    itemLevel: formData.get("item-level"),
    recipeStructure: formData.get("recipe-structure"),
    recipeType: formData.get("recipe-type"),
    recipeLabel: formData.get("recipe-label"),
    cookingAppliance: formData.get("cooking-appliance"),
  });
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return;
  }

  const {
    name,
    price,
    ingredient1,
    ingredient2,
    ingredient3,
    ingredient4,
    ingredient5,
    active,
    itemLevel,
    recipeStructure,
    recipeType,
    recipeLabel,
    cookingAppliance,
  } = validatedFields.data;

  const image_url = `/recipes/FA ${name}.png`

  try {
    await sql`
        INSERT INTO recipes (name, price, ingredient1, ingredient2, ingredient3, ingredient4, ingredient5, active, item_level, recipe_structure, recipe_type, recipe_label, cooking_appliance, image_url)
        VALUES (${name},${price}, ${ingredient1}, ${ingredient2}, ${ingredient3}, ${ingredient4}, ${ingredient5}, ${active}, ${itemLevel}, ${recipeStructure}, ${recipeType}, ${recipeLabel}, ${cookingAppliance}, ${image_url})
      `;
  } catch (error) {
    console.log(error);
  }

  revalidatePath(`/dashboard/${PATH}`);
  redirect(`/dashboard/${PATH}`);
}

export async function updateRecipe(id: string, formData: FormData) {
  const {
    name,
    price,
    ingredient1,
    ingredient2,
    ingredient3,
    ingredient4,
    ingredient5,
    active,
    itemLevel,
    recipeStructure,
    recipeType,
    recipeLabel,
    cookingAppliance,
    imageUrl
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
    itemLevel: formData.get("item-level"),
    recipeStructure: formData.get("recipe-structure"),
    recipeType: formData.get("recipe-type"),
    recipeLabel: formData.get("recipe-label"),
    cookingAppliance: formData.get("cooking-appliance"),
    imageUrl: formData.get("image-url"),
  });
  try {
    await sql`
          UPDATE recipes
          SET name = ${name}, price = ${price}, ingredient1 = ${ingredient1}, ingredient2 = ${ingredient2}, ingredient3 = ${ingredient3}, ingredient4 = ${ingredient4}, ingredient5 = ${ingredient5}, active = ${active}, item_level = ${itemLevel}, recipe_structure = ${recipeStructure}, recipe_type = ${recipeType}, recipe_label = ${recipeLabel}, cooking_appliance = ${cookingAppliance}, image_url=${imageUrl}
          WHERE id = ${id}
        `;
  } catch (error) {
    console.log(error);
  }

  revalidatePath(`/dashboard/${PATH}`);
  redirect(`/dashboard/${PATH}`);
}

export async function deleteRecipe(id: string) {
  try {
    await sql`DELETE FROM recipes WHERE id = ${id}`;
    revalidatePath(`/dashboard/${PATH}`);
  } catch (error) {
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
    console.log(error);
  }
  revalidatePath(`/dashboard`);
}
