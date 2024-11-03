import { ItemLevels } from "../consts";

export type Ingredient = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
  sequence: number;
  itemLevel: ItemLevels | undefined;
};

export type IngredientsChart = Ingredient & {frequency: number}


export type IngredientsTable = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
  sequence: number;
  itemLevel: ItemLevels | undefined;
};

export type IngredientForm = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
  sequence: number;
  itemLevel: ItemLevels | undefined;
};
