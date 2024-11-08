import { sql } from "@vercel/postgres";
import { Ingredient, IngredientForm } from "./definitions";

export async function fetchIngredientById(id: string) {
  try {
    const data = await sql<IngredientForm>`
        SELECT
          id,
          name,
          price,
          image_url as "imageUrl",
          sequence,
          item_level as "itemLevel"
        FROM ingredients
        WHERE ingredients.id = ${id};
      `;

    const ingredients = data.rows;

    return ingredients[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Ingredients.");
  }
}

export async function fetchAllIngredients() {
  try {
    const ingredients = await sql<Ingredient>`
      SELECT
          id,
          name,
          price,
          image_url as "imageUrl",
          sequence,
          item_level as "itemLevel"
      FROM ingredients
      ORDER BY ingredients.name ASC
    `;
    return ingredients.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Ingredients.");
  }
}
