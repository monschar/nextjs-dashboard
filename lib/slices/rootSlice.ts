import { LocalStorageKeys } from "@/app/lib/consts";
import { IngredientLocal } from "@/app/lib/ingredients/definitions";
import { RecipeLocal } from "@/app/lib/recipes/definitions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type rootState = {
  loading: boolean;
  ingredients: IngredientLocal[];
  recipes: RecipeLocal[];
};

const initialState: rootState = {
  loading: false,
  ingredients: [],
  recipes: [],
};

const rootSlice = createSlice({
  name: "rootState",
  initialState,
  reducers: {
    setRootLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateIngredientLocal: (state, action: PayloadAction<IngredientLocal>) => {
      const { id } = action.payload;
      const index = state.ingredients.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.ingredients[index] = action.payload;
        localStorage.setItem(
          LocalStorageKeys.INGREDIENTS,
          JSON.stringify(state.ingredients)
        );
      }
    },

    updateIngredientStock: (
      state,
      action: PayloadAction<{ id: string; stock: number }>
    ) => {
      const { id, stock } = action.payload;
      const index = state.ingredients.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.ingredients[index].stock = stock;
        localStorage.setItem(
          LocalStorageKeys.INGREDIENTS,
          JSON.stringify(state.ingredients)
        );
      }
    },
    updateIngredientPrice: (
      state,
      action: PayloadAction<{ id: string; price: number }>
    ) => {
      const { id, price } = action.payload;
      const index = state.ingredients.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.ingredients[index].price = price;
        localStorage.setItem(
          LocalStorageKeys.INGREDIENTS,
          JSON.stringify(state.ingredients)
        );
      }
    },
    updateRecipeActive: (
      state,
      action: PayloadAction<{ id: string | undefined }>
    ) => {
      const { id } = action.payload;
      const index = state.recipes.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.recipes[index].active = !state.recipes[index].active;
        localStorage.setItem(
          LocalStorageKeys.RECIPES,
          JSON.stringify(state.recipes)
        );
      }
    },
    setIngredients: (state, action) => {
      state.ingredients = action.payload;
    },
    setRecipes: (state, action) => {
      state.recipes = action.payload;
    },
  },
});

export const {
  setRootLoading,
  updateIngredientLocal,
  updateRecipeActive,
  setIngredients,
  setRecipes,
} = rootSlice.actions;
export default rootSlice.reducer;
