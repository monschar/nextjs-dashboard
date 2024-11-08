"use server";

import { sql } from "@vercel/postgres";
import { Recipe } from "./definitions";

export async function createRecipe(recipe: Recipe) {
  const {
    name,
    price,
    ingredient1,
    ingredient2,
    ingredient3,
    ingredient4,
    ingredient5,
    itemLevel,
    recipeStructure,
    recipeType,
    recipeLabel,
    cookingAppliance,
  } = recipe;

  const image_url = `/recipes/FA ${name}.png`;

  try {
    await sql`
        INSERT INTO recipes (name, price, ingredient1, ingredient2, ingredient3, ingredient4, ingredient5, item_level, recipe_structure, recipe_type, recipe_label, cooking_appliance, image_url)
        VALUES (${name}, ${price}, ${ingredient1}, ${ingredient2}, ${ingredient3}, ${ingredient4}, ${ingredient5}, ${itemLevel}, ${recipeStructure}, ${recipeType}, ${recipeLabel}, ${cookingAppliance}, ${image_url})
      `;
  } catch (error) {
    console.log(error);
  }
}

export async function updateRecipe(recipe: Recipe) {
  const {
    id,
    name,
    price,
    ingredient1,
    ingredient2,
    ingredient3,
    ingredient4,
    ingredient5,
    itemLevel,
    recipeStructure,
    recipeType,
    recipeLabel,
    cookingAppliance,
    imageUrl,
  } = recipe;
  try {
    await sql`
          UPDATE recipes
          SET name = ${name}, price = ${price}, ingredient1 = ${ingredient1}, ingredient2 = ${ingredient2}, ingredient3 = ${ingredient3}, ingredient4 = ${ingredient4}, ingredient5 = ${ingredient5}, item_level = ${itemLevel}, recipe_structure = ${recipeStructure}, recipe_type = ${recipeType}, recipe_label = ${recipeLabel}, cooking_appliance = ${cookingAppliance}, image_url=${imageUrl}
          WHERE id = ${id}
        `;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteRecipe(id: string) {
  try {
    await sql`DELETE FROM recipes WHERE id = ${id}`;
  } catch (error) {
    console.log(error);
  }
}
