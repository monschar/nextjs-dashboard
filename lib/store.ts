import { configureStore } from "@reduxjs/toolkit";
import ingredientReducer from "./slices/ingredientsSlice";
import recipeReducer from "./slices/recipesSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      ingredientsState: ingredientReducer,
      recipesState: recipeReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
