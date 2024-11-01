import { sql } from "@vercel/postgres";
import { RecipeForm, RecipesTable } from "./definitions";
import { ITEMS_PER_PAGE } from "../consts";

export async function fetchAllRecipes() {
  try {
    const recipes = await sql<RecipesTable>`
      SELECT 
          r.id AS id,
          r.name AS name,
          r.price AS price,
          r.active AS active,
          i1.name AS ingredient1,
          i2.name AS ingredient2,
          i3.name AS ingredient3,
          i4.name AS ingredient4,
          i5.name AS ingredient5,
          r.item_level AS "itemLevel",
          r.recipe_structure AS "recipeStructure",
          r.recipe_type AS "recipeType",
          r.recipe_label AS "recipeLabel",
          r.cooking_appliance AS "cookingAppliance"
      FROM 
          recipes r
      LEFT JOIN 
          ingredients i1 ON r.ingredient1 = i1.id
      LEFT JOIN 
          ingredients i2 ON r.ingredient2 = i2.id
      LEFT JOIN 
          ingredients i3 ON r.ingredient3 = i3.id
      LEFT JOIN 
          ingredients i4 ON r.ingredient4 = i4.id
      LEFT JOIN 
          ingredients i5 ON r.ingredient5 = i5.id
      ORDER BY r.name ASC
    `;
    return recipes.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch recipes.");
  }
}

export async function fetchFilteredRecipes(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const recipes = await sql<RecipesTable>`
      SELECT 
          r.id AS id,
          r.name AS name,
          r.price AS price,
          r.active AS active,
          i1.name AS ingredient1,
          i2.name AS ingredient2,
          i3.name AS ingredient3,
          i4.name AS ingredient4,
          i5.name AS ingredient5,
          r.item_level AS "itemLevel",
          r.recipe_structure AS "recipeStructure",
          r.recipe_type AS "recipeType",
          r.recipe_label AS "recipeLabel",
          r.cooking_appliance AS "cookingAppliance"
      FROM 
          recipes r
      LEFT JOIN 
          ingredients i1 ON r.ingredient1 = i1.id
      LEFT JOIN 
          ingredients i2 ON r.ingredient2 = i2.id
      LEFT JOIN 
          ingredients i3 ON r.ingredient3 = i3.id
      LEFT JOIN 
          ingredients i4 ON r.ingredient4 = i4.id
      LEFT JOIN 
          ingredients i5 ON r.ingredient5 = i5.id
      WHERE
          r.name ILIKE ${`%${query}%`}
      ORDER BY r.name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return recipes.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch recipes.");
  }
}

export async function fetchRecipesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM recipes r
    WHERE
      r.name ILIKE ${`%${query}%`}
    `;
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of recipes.");
  }
}

export async function fetchRecipeById(id: string) {
  try {
    const data = await sql<RecipeForm>`
      SELECT 
          r.id AS id,
          r.name AS name,
          r.price AS price,
          r.active AS active,
          r.ingredient1 AS ingredient1,
          r.ingredient2 AS ingredient2,
          r.ingredient3 AS ingredient3,
          r.ingredient4 AS ingredient4,
          r.ingredient5 AS ingredient5,
          r.item_level AS "itemLevel",
          r.recipe_structure AS "recipeStructure",
          r.recipe_type AS "recipeType",
          r.recipe_label AS "recipeLabel",
          r.cooking_appliance AS "cookingAppliance"
      FROM 
          recipes r
      WHERE r.id = ${id};
    `;

    const recipes = data.rows;

    return recipes[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch recipe.");
  }
}

export async function fetchActiveRecipes() {
  try {
    const result = await sql<RecipesTable>`
    SELECT 
        r.id AS id,
        r.name AS name,
        r.price AS price,
        r.active AS active,
        i1.name AS ingredient1,
        i2.name AS ingredient2,
        i3.name AS ingredient3,
        i4.name AS ingredient4,
        i5.name AS ingredient5,
        r.item_level AS "itemLevel",
        r.recipe_structure AS "recipeStructure",
        r.recipe_type AS "recipeType",
        r.recipe_label AS "recipeLabel",
        r.cooking_appliance AS "cookingAppliance"
    FROM 
        recipes r
    LEFT JOIN 
        ingredients i1 ON r.ingredient1 = i1.id
    LEFT JOIN 
        ingredients i2 ON r.ingredient2 = i2.id
    LEFT JOIN 
        ingredients i3 ON r.ingredient3 = i3.id
    LEFT JOIN 
        ingredients i4 ON r.ingredient4 = i4.id
    LEFT JOIN 
        ingredients i5 ON r.ingredient5 = i5.id
    WHERE
        r.active = true
    `;
    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of active recipes.");
  }
}
