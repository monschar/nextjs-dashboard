import { sql } from "@vercel/postgres";
import { IngredientsTable, IngredientForm } from "./definitions";
import { ITEMS_PER_PAGE } from "../consts";

export async function fetchIngredientsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM ingredients
    WHERE
      ingredients.name ILIKE ${`%${query}%`}
  `;
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of Ingredients.");
  }
}

export async function fetchIngredientById(id: string) {
  try {
    const data = await sql<IngredientForm>`
        SELECT
          id,
          name,
          price,
          image_url as "imageUrl",
          stock,
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

export async function fetchFilteredIngredients(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const ingredients = await sql<IngredientsTable>`
      SELECT
          id,
          name,
          price,
          image_url as "imageUrl",
          stock,
          sequence,
          item_level as "itemLevel"
      FROM ingredients
      WHERE
        ingredients.name ILIKE ${`%${query}%`}
      ORDER BY ingredients.name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return ingredients.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Ingredients.");
  }
}

export async function fetchAllIngredients() {
  try {
    const ingredients = await sql<IngredientsTable>`
      SELECT
          id,
          name,
          price,
          image_url as "imageUrl",
          stock,
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
