import { ItemLevels } from "../consts";

export type Ingredient = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  sequence: number;
  itemLevel: ItemLevels | undefined;
};

export type IngredientsChart = Ingredient & { frequency: number };

export type IngredientForm = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  sequence: number;
  itemLevel: ItemLevels | undefined;
};
