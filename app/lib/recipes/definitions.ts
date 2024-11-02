import {
  CookingAppliances,
  ItemLevels,
  RecipeLabels,
  RecipeStructure,
  RecipeTypes,
} from "../consts";

export type Recipe = {
  id: string;
  name: string;
  price: number;
  ingredient1: string;
  ingredient2: string;
  ingredient3: string;
  ingredient4: string;
  ingredient5: string;
  active: boolean;
  itemLevel: ItemLevels;
  recipeStructure: RecipeStructure;
  recipeType: RecipeTypes;
  recipeLabel: RecipeLabels;
  cookingAppliance: CookingAppliances;
  imageUrl: string;
};

export type RecipesTable = {
  id: string;
  name: string;
  price: number;
  ingredient1: string;
  ingredient2: string;
  ingredient3: string;
  ingredient4: string;
  ingredient5: string;
  active: boolean;
  itemLevel: ItemLevels;
  recipeStructure: RecipeStructure;
  recipeType: RecipeTypes;
  recipeLabel: RecipeLabels;
  cookingAppliance: CookingAppliances;
  imageUrl: string;
};

export type RecipeForm = {
  id: string;
  name: string;
  price: number;
  ingredient1: string;
  ingredient2: string;
  ingredient3: string;
  ingredient4: string;
  ingredient5: string;
  active: boolean;
  itemLevel: ItemLevels | undefined;
  recipeStructure: RecipeStructure | undefined;
  recipeType: RecipeTypes | undefined;
  recipeLabel: RecipeLabels | undefined;
  cookingAppliance: CookingAppliances | undefined;
  imageUrl: string;
};
