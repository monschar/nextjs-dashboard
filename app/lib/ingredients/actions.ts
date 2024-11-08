"use server";

import { sql } from "@vercel/postgres";
import { Ingredient } from "./definitions";

export async function createIngredient(ingredient: Ingredient) {
  const { name, price, sequence, itemLevel } = ingredient;
  const imageUrl = `/ingredients/Ingredients Set_${sequence}.png`;
  try {
    await sql`
        INSERT INTO ingredients (name, price, image_url, sequence, item_level)
        VALUES (${name}, ${price}, ${imageUrl}, ${sequence}, ${itemLevel})
      `;
  } catch (error) {
    console.log(error);
  }
}

export async function updateIngredient(ingredient: Ingredient) {
  const { id, name, price, sequence, itemLevel, imageUrl } = ingredient;
  try {
    await sql`
          UPDATE ingredients
          SET name = ${name}, price = ${price}, image_url = ${imageUrl}, sequence = ${sequence}, item_level = ${itemLevel}
          WHERE id = ${id}
        `;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteIngredient(id: string) {
  try {
    await sql`DELETE FROM ingredients WHERE id = ${id}`;
  } catch (error) {
    console.log(error);
  }
}
