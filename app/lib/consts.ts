export const ITEMS_PER_PAGE = 100;

export const DASHBOARD_PAGES = {
  INVOICES: {
    NAME: "Invoices",
    PATH: "invoices",
    SINGLE: "Invoice",
    table: "invoices",
  },
  ITEM_LEVELS: {
    NAME: "Item Levels",
    PATH: "item-levels",
    SINGLE: "Item Level",
    TABLE: "item_levels",
  },
  INGREDIENTS: {
    NAME: "Ingredients",
    PATH: "ingredients",
    SINGLE: "Ingredient",
    TABLE: "ingredients",
  },
  RECIPES: {
    NAME: "Recipes",
    PATH: "recipes",
    SINGLE: "recipe",
    TABLE: "recipes",
  },
};

export enum FormActionType {
  Create,
  Edit,
}
