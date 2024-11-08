"use client";

import { Recipe } from "@/app/lib/recipes/definitions";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import {
  CookingAppliances,
  DASHBOARD_PAGES,
  FormActionType,
  ItemLevels,
  RecipeLabels,
  RecipeStructure,
  RecipeTypes,
} from "@/app/lib/consts";
import { getOptionsFromEnum } from "@/app/lib/utils";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  createRecipe,
  updateRecipe,
  updateCurrentRecipe,
} from "@/lib/slices/recipesSlice";
import {
  Abc,
  AttachMoney,
  Blender,
  InsertPhoto,
  KebabDining,
  Kitchen,
  LocalDining,
  Sell,
  StarHalf,
} from "@mui/icons-material";
import { fetchIngredients } from "@/lib/slices/ingredientsSlice";
import { useEffect } from "react";

const formatRecipe = (currentRecipe: Recipe): Recipe => ({
  id: currentRecipe.id,
  name: currentRecipe.name,
  price: currentRecipe.price,
  ingredient1:
    currentRecipe.ingredient1 === "" ? null : currentRecipe.ingredient1,
  ingredient2:
    currentRecipe.ingredient2 === "" ? null : currentRecipe.ingredient2,
  ingredient3:
    currentRecipe.ingredient3 === "" ? null : currentRecipe.ingredient3,
  ingredient4:
    currentRecipe.ingredient4 === "" ? null : currentRecipe.ingredient4,
  ingredient5:
    currentRecipe.ingredient5 === "" ? null : currentRecipe.ingredient5,
  imageUrl: currentRecipe.imageUrl,
  itemLevel: currentRecipe.itemLevel,
  cookingAppliance: currentRecipe.cookingAppliance,
  recipeLabel: currentRecipe.recipeLabel,
  recipeStructure: currentRecipe.recipeStructure,
  recipeType: currentRecipe.recipeType,
});

export default function RecipesForm({
  formActionType,
}: {
  formActionType: FormActionType;
}) {
  const { PATH } = DASHBOARD_PAGES.RECIPES;
  const dispatch = useAppDispatch();

  const { currentRecipe } = useAppSelector((state) => state.recipesState);

  const { ingredients } = useAppSelector((state) => state.ingredientsState);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients]);

  const ingredientOptions = ingredients.map((i) => ({
    label: i.name,
    value: i.id,
  }));

  const {} = useAppDispatch();

  const onUpdateRecipe = () => {
    const formattedRecipe = formatRecipe(currentRecipe);
    dispatch(updateRecipe(formattedRecipe));
  };

  const onCreateRecipe = () => {
    const formattedRecipe = formatRecipe(currentRecipe);
    dispatch(createRecipe(formattedRecipe));
  };

  const onChange = (
    name: string,
    value: string | undefined,
    isNumber: boolean = false
  ) => {
    let parsed;
    if (isNumber) {
      if (value == undefined) return;
      parsed = Number.parseInt(value);
      if (Number.isNaN(parsed)) return;
    } else {
      parsed = value;
    }
    dispatch(updateCurrentRecipe({ [name]: parsed }));
  };

  return (
    <>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Name</label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <TextField
                value={currentRecipe.name}
                onChange={(event) => onChange("name", event.target.value)}
                className="bg-white"
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Abc />
                      </InputAdornment>
                    ),
                    classes: {
                      input: "focus:ring-0",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="tag" className="mb-2 block text-sm font-medium">
            Item Level
          </label>
          <div className="relative">
            <Autocomplete
              disablePortal
              options={getOptionsFromEnum(ItemLevels)}
              value={
                getOptionsFromEnum(ItemLevels).find(
                  (o) => o.value === currentRecipe.itemLevel
                ) || null
              }
              onChange={(event, value) => onChange("itemLevel", value?.value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="bg-white"
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      padding: "9px 14px",
                    },
                    classes: {
                      input: "focus:ring-0",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <StarHalf />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="tag" className="mb-2 block text-sm font-medium">
            Recipe Structure
          </label>
          <div className="relative">
            <Autocomplete
              disablePortal
              options={getOptionsFromEnum(RecipeStructure)}
              value={
                getOptionsFromEnum(RecipeStructure).find(
                  (o) => o.value === currentRecipe.recipeStructure
                ) || null
              }
              onChange={(event, value) =>
                onChange("recipeStructure", value?.value)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="bg-white"
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      padding: "9px 14px",
                    },
                    classes: {
                      input: "focus:ring-0",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalDining />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="tag" className="mb-2 block text-sm font-medium">
            Cooking Appliance
          </label>
          <div className="relative">
            <Autocomplete
              disablePortal
              options={getOptionsFromEnum(CookingAppliances)}
              value={
                getOptionsFromEnum(CookingAppliances).find(
                  (o) => o.value === currentRecipe.cookingAppliance
                ) || null
              }
              onChange={(event, value) =>
                onChange("cookingAppliance", value?.value)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="bg-white"
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      padding: "9px 14px",
                    },
                    classes: {
                      input: "focus:ring-0",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <Blender />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="tag" className="mb-2 block text-sm font-medium">
            Recipe Type
          </label>
          <div className="relative">
            <Autocomplete
              disablePortal
              options={getOptionsFromEnum(RecipeTypes)}
              value={
                getOptionsFromEnum(RecipeTypes).find(
                  (o) => o.value === currentRecipe.recipeType
                ) || null
              }
              onChange={(event, value) => onChange("recipeType", value?.value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="bg-white"
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      padding: "9px 14px",
                    },
                    classes: {
                      input: "focus:ring-0",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <KebabDining />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="tag" className="mb-2 block text-sm font-medium">
            Recipe Label
          </label>
          <div className="relative">
            <Autocomplete
              disablePortal
              options={getOptionsFromEnum(RecipeLabels)}
              value={
                getOptionsFromEnum(RecipeLabels).find(
                  (o) => o.value === currentRecipe.recipeLabel
                ) || null
              }
              onChange={(event, value) => onChange("recipeLabel", value?.value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="bg-white"
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      padding: "9px 14px",
                    },
                    classes: {
                      input: "focus:ring-0",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <Sell />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Price</label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <TextField
                value={currentRecipe.price}
                onChange={(event) =>
                  onChange("price", event.target.value, true)
                }
                className="bg-white"
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoney />
                      </InputAdornment>
                    ),
                    classes: {
                      input: "focus:ring-0",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="tag" className="mb-2 block text-sm font-medium">
            Ingredient1
          </label>
          <div className="relative">
            <Autocomplete
              disablePortal
              options={ingredientOptions}
              value={
                ingredientOptions.find(
                  (o) => o.value === currentRecipe.ingredient1
                ) || null
              }
              onChange={(event, value) => onChange("ingredient1", value?.value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="bg-white"
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      padding: "9px 14px",
                    },
                    classes: {
                      input: "focus:ring-0",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <Kitchen />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="tag" className="mb-2 block text-sm font-medium">
            Ingredient2
          </label>
          <div className="relative">
            <Autocomplete
              disablePortal
              options={ingredientOptions}
              value={
                ingredientOptions.find(
                  (o) => o.value === currentRecipe.ingredient2
                ) || null
              }
              onChange={(event, value) => onChange("ingredient2", value?.value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="bg-white"
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      padding: "9px 14px",
                    },
                    classes: {
                      input: "focus:ring-0",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <Kitchen />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="tag" className="mb-2 block text-sm font-medium">
            Ingredient3
          </label>
          <div className="relative">
            <Autocomplete
              disablePortal
              options={ingredientOptions}
              value={
                ingredientOptions.find(
                  (o) => o.value === currentRecipe.ingredient3
                ) || null
              }
              onChange={(event, value) => onChange("ingredient3", value?.value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="bg-white"
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      padding: "9px 14px",
                    },
                    classes: {
                      input: "focus:ring-0",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <Kitchen />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="tag" className="mb-2 block text-sm font-medium">
            Ingredient4
          </label>
          <div className="relative">
            <Autocomplete
              disablePortal
              options={ingredientOptions}
              value={
                ingredientOptions.find(
                  (o) => o.value === currentRecipe.ingredient4
                ) || null
              }
              onChange={(event, value) => onChange("ingredient4", value?.value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="bg-white"
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      padding: "9px 14px",
                    },
                    classes: {
                      input: "focus:ring-0",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <Kitchen />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="tag" className="mb-2 block text-sm font-medium">
            Ingredient5
          </label>
          <div className="relative">
            <Autocomplete
              disablePortal
              options={ingredientOptions}
              value={
                ingredientOptions.find(
                  (o) => o.value === currentRecipe.ingredient5
                ) || null
              }
              onChange={(event, value) => onChange("ingredient5", value?.value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="bg-white"
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      padding: "9px 14px",
                    },
                    classes: {
                      input: "focus:ring-0",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <Kitchen />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Image Url</label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <TextField
                value={currentRecipe.imageUrl}
                onChange={(event) => onChange("imageUrl", event.target.value)}
                className="bg-white"
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <InsertPhoto />
                      </InputAdornment>
                    ),
                    classes: {
                      input: "focus:ring-0",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href={`/dashboard/${PATH}`}
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button
            onClick={
              formActionType === FormActionType.Create
                ? onCreateRecipe
                : onUpdateRecipe
            }
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
