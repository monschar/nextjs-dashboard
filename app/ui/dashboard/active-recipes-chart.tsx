"use client";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";
import {
  RecipeLocal,
  RecipeWithIngredient,
} from "@/app/lib/recipes/definitions";
import { ItemLevels } from "@/app/lib/consts";
import { categorizeRecipes } from "@/app/lib/utils";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { updateRecipeActive } from "@/lib/slices/rootSlice";
import { Add, Remove } from "@mui/icons-material";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { IngredientLocal } from "@/app/lib/ingredients/definitions";

const mapIngredientToRecipe = (
  ingredients: IngredientLocal[],
  recipes: RecipeLocal[]
): RecipeWithIngredient[] => {
  return recipes.map((r) => {
    return {
      ...r,
      ingredient1: ingredients.find((i) => i.name === r.ingredient1),
      ingredient2: ingredients.find((i) => i.name === r.ingredient2),
      ingredient3: ingredients.find((i) => i.name === r.ingredient3),
      ingredient4: ingredients.find((i) => i.name === r.ingredient4),
      ingredient5: ingredients.find((i) => i.name === r.ingredient5),
    };
  });
};

export default function ActiveRecipeChart() {
  const { recipes, ingredients } = useAppSelector((state) => state.rootState);
  const [mappedRecipes, setMappedRecipes] = useState<RecipeWithIngredient[]>(
    []
  );
  const [open, setOpen] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState<
    RecipeWithIngredient[]
  >([]);

  const activeRecipes = mappedRecipes.filter((r) => r.active);
  const categorizedActiveRecipes = categorizeRecipes(activeRecipes);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (query: string) => {
    setFilteredRecipes(
      mappedRecipes.filter((r) =>
        r.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  useEffect(() => {
    const result = mapIngredientToRecipe(ingredients, recipes);
    setMappedRecipes(result);
  }, [ingredients, recipes]);

  useEffect(() => {
    setFilteredRecipes(mappedRecipes);
  }, [mappedRecipes]);

  return (
    <div className="grid grid-cols-1">
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="flex justify-between mb-4 ">
          <h2 className={`${lusitana.className} text-xl md:text-2xl`}>
            Active Recipes
          </h2>
          <button
            onClick={handleOpen}
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <span className="hidden md:block">Add active recipes</span>
            <PlusIcon className="h-5 md:ml-4" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {categorizedActiveRecipes.map((car) => (
            <RecipeStructureCard
              key={car.title}
              recipes={car.list}
              title={car.title}
            />
          ))}
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
      >
        <DialogTitle>
          <p>All Recipes</p>
          <SearchBar handleSearch={handleSearch} />
        </DialogTitle>
        <DialogContent>
          {filteredRecipes.map((ar) => (
            <RecipeRecord key={ar.id} recipe={ar} />
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
}

const RecipeRecord = ({ recipe }: { recipe: RecipeWithIngredient }) => {
  const dispatch = useAppDispatch();
  const { ingredient1, ingredient2, ingredient3, ingredient4, ingredient5 } =
    recipe;
  const ingredient1Price = ingredient1?.price ?? 0;
  const ingredient2Price = ingredient2?.price ?? 0;
  const ingredient3Price = ingredient3?.price ?? 0;
  const ingredient4Price = ingredient4?.price ?? 0;
  const ingredient5Price = ingredient5?.price ?? 0;
  const profit =
    ingredient1Price < 0 ||
    ingredient2Price < 0 ||
    ingredient3Price < 0 ||
    ingredient4Price < 0 ||
    ingredient5Price < 0
      ? "?"
      : recipe.price -
        ingredient1Price -
        ingredient2Price -
        ingredient3Price -
        ingredient4Price -
        ingredient5Price;
  return (
    <div
      key={recipe.id}
      className={clsx(
        "flex items-center gap-2 p-1 rounded-md border border-1 border-white",
        {
          "hover:bg-sky-300 bg-sky-200": recipe.itemLevel === ItemLevels.COMMON,
          "hover:bg-teal-300 bg-teal-200": recipe.itemLevel === ItemLevels.RARE,
          "hover:bg-amber-300 bg-amber-200":
            recipe.itemLevel === ItemLevels.EPIC,
          "hover:bg-rose-300 bg-rose-200":
            recipe.itemLevel === ItemLevels.LEGENDARY,
        }
      )}
    >
      <Image
        src={recipe.imageUrl}
        height={25}
        width={25}
        alt={`${recipe.name}'s icon`}
        style={{ objectFit: "contain", height: "28px", width: "28px" }}
      />
      <p className="text-sm flex-1 items-center justify-center">
        {`${recipe.name}`}
      </p>
      <p className="text-sm items-center justify-center">{`+$${profit} ($${recipe.price} )`}</p>
      {recipe.active ? (
        <Remove
          className="hover:cursor-pointer"
          onClick={() => dispatch(updateRecipeActive({ id: recipe.id }))}
        />
      ) : (
        <Add
          className="hover:cursor-pointer"
          onClick={() => dispatch(updateRecipeActive({ id: recipe.id }))}
        />
      )}
    </div>
  );
};

const RecipeStructureCard = ({
  title,
  recipes,
}: {
  title: string;
  recipes: RecipeWithIngredient[];
}) => {
  return (
    <div className="justify-start rounded-xl bg-white p-4 shadow-sm">
      <h5 className={`${lusitana.className} mb-4 text-xl`}>{title}</h5>
      {recipes.map((ar) => (
        <RecipeRecord key={ar.id} recipe={ar} />
      ))}
    </div>
  );
};

const SearchBar = ({
  handleSearch,
}: {
  handleSearch: (query: string) => void;
}) => {
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={"Search recipes"}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
};
