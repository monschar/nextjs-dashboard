"use client";

import { LocalStorageKeys } from "@/app/lib/consts";
import {
  IngredientData,
  IngredientLocal,
} from "@/app/lib/ingredients/definitions";
import { RecipeData, RecipeLocal } from "@/app/lib/recipes/definitions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setIngredients, setRecipes } from "@/lib/slices/rootSlice";
import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";

export default function UseData() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.rootState);

  useEffect(() => {
    const fetchData = async () => {
      const ingredientDataResponse = await axios.get<IngredientData[]>(
        `/api/ingredients`
      );
      const ingredientData = ingredientDataResponse.data;
      const localIngredientJson = localStorage.getItem(
        LocalStorageKeys.INGREDIENTS
      );
      if (localIngredientJson == null) {
        const localizedIngredientData: IngredientLocal[] = ingredientData.map(
          (i) => ({
            ...i,
            stock: 0,
          })
        );
        localStorage.setItem(
          LocalStorageKeys.INGREDIENTS,
          JSON.stringify(localizedIngredientData)
        );
        dispatch(setIngredients(localizedIngredientData));
      } else {
        const localIngredientData: IngredientLocal[] =
          JSON.parse(localIngredientJson);
        const localIngredientMap = new Map<
          string,
          { stock: number; price: number }
        >();
        localIngredientData.forEach((i) =>
          localIngredientMap.set(i.id, { stock: i.stock, price: i.price })
        );
        const newLocalIngredientData: IngredientLocal[] = [];
        ingredientData.forEach((i) => {
          const { stock, price } = localIngredientMap.get(i.id) ?? {
            stock: 0,
            price: 0,
          };
          newLocalIngredientData.push({ ...i, stock, price });
        });
        localStorage.setItem(
          LocalStorageKeys.INGREDIENTS,
          JSON.stringify(newLocalIngredientData)
        );
        dispatch(setIngredients(newLocalIngredientData));
      }

      const recipeDataResponse = await axios.get<RecipeData[]>(`/api/recipes`);
      const recipeData = recipeDataResponse.data;
      const localRecipeJson = localStorage.getItem(LocalStorageKeys.RECIPES);
      if (localRecipeJson == null) {
        const localizedRecipeData: RecipeLocal[] = recipeData.map((r) => ({
          ...r,
          active: false,
        }));
        localStorage.setItem(
          LocalStorageKeys.RECIPES,
          JSON.stringify(localizedRecipeData)
        );
        dispatch(setRecipes(localizedRecipeData));
      } else {
        const localRecipeData: RecipeLocal[] = JSON.parse(localRecipeJson);
        const localRecipeMap = new Map<string, { active: boolean }>();
        localRecipeData.forEach((r) => {
          localRecipeMap.set(r.id, { active: r.active });
        });

        const newLocalRecipeData: RecipeLocal[] = [];
        recipeData.forEach((r) => {
          const { active } = localRecipeMap.get(r.id) ?? {
            active: false,
          };
          newLocalRecipeData.push({ ...r, active });
        });
        localStorage.setItem(
          LocalStorageKeys.RECIPES,
          JSON.stringify(newLocalRecipeData)
        );
        dispatch(setRecipes(newLocalRecipeData));
      }
    };

    fetchData();
  }, [dispatch]);
  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
