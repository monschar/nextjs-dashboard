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

export enum ItemLevels {
  COMMON = "COMMON",
  RARE = "RARE",
  EPIC = "EPIC",
  LEGENDARY = "LEGENDARY"
}

export enum RecipeStructure {
  APPETIZER = "APPETIZER",
  MAIN_COURSE = "MAIN_COURSE",
  DESSERT = "DESSERT",
  BEVERAGE = "BEVERAGE",
}

export enum RecipeTypes {
  BAKED = "BAKED",
  BBQ = "BBQ",
  MIXOLOGY = "MIXOLOGY",
  MOLECULAR = "MOLECULAR",
  SEAFOOD = "SEAFOOD",
  VEGI = "VEGI",
}

export enum RecipeLabels {
  MEAT = "MEAT",
  VEGAN = "VEGAN",
  VEGETARIAN = "VEGETARIAN",
}

export enum CookingAppliances {
  BARISTA_MACHINE = "BARISTA_MACHINE",
  BLENDER = "BLENDER",
  CHEF_COUNTER = "CHEF_COUNTER",
  FRIER = "FRIER",
  GRILL = "GRILL",
  ICE_CREAM_MACHINE = "ICE_CREAM_MACHINE",
  OVEN = "OVEN",
  STEAMER = "STEAMER",
  STOVE = "STOVE",
}
