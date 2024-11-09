import { ItemLevels, RecipeStructure } from "./consts";
import { Revenue } from "./definitions";
import { IngredientLocal, IngredientChart } from "./ingredients/definitions";
import { RecipeLocal, RecipeWithIngredient } from "./recipes/definitions";

export const formatCurrency = (amount: number) => {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const constToReadable = (str: string) => {
  return str
    .split("_")
    .map(
      (e: string) =>
        String(e).charAt(0).toUpperCase() +
        String(e).slice(1).toLocaleLowerCase()
    )
    .join(" ");
};

export const getOptionsFromEnum = (e: object) => {
  const res = Object.values(e).map((i) => ({
    value: i,
    label: constToReadable(i),
  }));
  return res;
};

export const getActiveIngredients = (
  recipes: RecipeLocal[],
  ingredients: IngredientLocal[]
): IngredientChart[] => {
  const ingredientsMap = new Map();
  ingredients.forEach((i) => ingredientsMap.set(i.name, i));
  const activeIngredientMap = new Map();
  recipes
    .filter((r) => r.active)
    .forEach((r) => {
      const ingredients = [
        r.ingredient1,
        r.ingredient2,
        r.ingredient3,
        r.ingredient4,
        r.ingredient5,
      ].filter((i) => i);
      for (const i of ingredients) {
        if (!activeIngredientMap.has(i)) activeIngredientMap.set(i, 0);
        activeIngredientMap.set(i, activeIngredientMap.get(i) + 1);
      }
    });
  return Array.from(activeIngredientMap.keys())
    .map((k) => ({
      ...ingredientsMap.get(k),
      key: k,
      frequency: activeIngredientMap.get(k),
    }))
    .sort((a, b) => b.frequency - a.frequency || a.name - b.name);
};

export const categorizeRecipes = (recipes: RecipeWithIngredient[]) => {
  const itemLevelKeys = Object.keys(ItemLevels);
  return Object.keys(RecipeStructure).map((k) => ({
    title: constToReadable(k),
    list: recipes
      .filter((r) => r.recipeStructure === k)
      .sort(
        (a, b) =>
          itemLevelKeys.indexOf(a.itemLevel ?? "") -
          itemLevelKeys.indexOf(b.itemLevel ?? "")
      ),
  }));
};
