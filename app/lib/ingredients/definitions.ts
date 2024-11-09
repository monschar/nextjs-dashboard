import { ItemLevels } from "../consts";

export type Ingredient = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  sequence: number;
  itemLevel: ItemLevels | undefined;
};

export type IngredientData = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  sequence: number;
  itemLevel: ItemLevels;
};

export type IngredientLocal = IngredientData & {
  stock: number;
};

export type IngredientChart = IngredientLocal & { frequency: number };

export type IngredientForm = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  sequence: number;
  itemLevel: ItemLevels | undefined;
};
