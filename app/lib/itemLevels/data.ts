import { sql } from "@vercel/postgres";
import { ItemLevelForm, ItemLevelsTable } from "./definitions";
const ITEMS_PER_PAGE = 6;

export async function fetchItemLevelsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM item_levels
    WHERE
      item_levels.name ILIKE ${`%${query}%`} OR
      item_levels.date::text ILIKE ${`%${query}%`}
  `;
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of item levels.");
  }
}

export async function fetchItemLevelById(id: string) {
  try {
    const data = await sql<ItemLevelForm>`
        SELECT
          item_levels.id,
          item_levels.name
        FROM item_levels
        WHERE item_levels.id = ${id};
      `;

    const itemLevels = data.rows;

    return itemLevels[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch item levels.");
  }
}

export async function fetchFilteredItemLevels(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const itemLevels = await sql<ItemLevelsTable>`
      SELECT
        item_levels.id,
        item_levels.date,
        item_levels.name
      FROM item_levels
      WHERE
        item_levels.name ILIKE ${`%${query}%`} OR
        item_levels.date::text ILIKE ${`%${query}%`}
      ORDER BY item_levels.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return itemLevels.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch item levels.");
  }
}
