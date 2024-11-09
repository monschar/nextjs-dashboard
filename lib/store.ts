import { configureStore } from "@reduxjs/toolkit";
import ingredientReducer from "./slices/ingredientsSlice";
import recipeReducer from "./slices/recipesSlice";
import rootReducer from "./slices/rootSlice";
import logger from "redux-logger";

export const makeStore = () => {
  return configureStore({
    reducer: {
      ingredientsState: ingredientReducer,
      recipesState: recipeReducer,
      rootState: rootReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
