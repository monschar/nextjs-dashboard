"use client";

import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel,
} from "@mui/x-data-grid";
import {
  calculateProfit,
  formatCurrency,
  mapIngredientToRecipe,
} from "@/app/lib/utils";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import { RecipeWithIngredient } from "@/app/lib/recipes/definitions";
import { IngredientLocal } from "@/app/lib/ingredients/definitions";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "string" },
  { field: "imageUrl", headerName: "Image Url", type: "string" },
  {
    field: "name",
    headerName: "Name",
    flex: 2,
    renderCell: (params: GridRenderCellParams<GridValidRowModel, string>) => (
      <div className="flex items-center gap-3">
        <Image
          src={params.row.imageUrl}
          height={44}
          width={44}
          alt={`${params.value}'s icon`}
          style={{ objectFit: "contain", width: "45px", height: "45px" }}
        />
        {params.value}
      </div>
    ),
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    valueFormatter: (value) => {
      return formatCurrency(value);
    },
    flex: 1,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "profit",
    headerName: "Profit",
    type: "number",
    valueFormatter: (value) => {
      return formatCurrency(value);
    },
    flex: 1,
    headerAlign: "left",
    align: "left",
  },
  { field: "recipeType", headerName: "Recipe Type", type: "string" },
  {
    field: "ingredient1",
    headerName: "Ingredient1",
    valueGetter: (value: IngredientLocal) => {
      return value?.name ?? "-";
    },
    flex: 1,
  },
  {
    field: "ingredient2",
    headerName: "Ingredient2",
    valueGetter: (value: IngredientLocal) => {
      return value?.name ?? "-";
    },
    flex: 1,
  },
  {
    field: "ingredient3",
    headerName: "Ingredient3",
    valueGetter: (value: IngredientLocal) => {
      return value?.name ?? "-";
    },
    flex: 1,
  },
  {
    field: "ingredient4",
    headerName: "Ingredient4",
    valueGetter: (value: IngredientLocal) => {
      return value?.name ?? "-";
    },
    flex: 1,
  },
  {
    field: "ingredient5",
    headerName: "Ingredient5",
    valueGetter: (value: IngredientLocal) => {
      return value?.name ?? "-";
    },
    flex: 1,
  },
];

const paginationModel = { page: 0, pageSize: 50 };

export default function MegaTable() {
  const { recipes, ingredients } = useAppSelector((state) => state.rootState);
  const [mappedRecipes, setMappedRecipes] = React.useState<
    RecipeWithIngredient[]
  >([]);
  React.useEffect(() => {
    const result = mapIngredientToRecipe(ingredients, recipes);
    setMappedRecipes(result);
  }, [ingredients, recipes]);

  const tableData = mappedRecipes.map((r) => ({
    ...r,
    profit: calculateProfit(r),
  }));
  return (
    <DataGrid
      sx={{ height: 1000, width: "100%" }}
      rows={tableData}
      columns={columns}
      columnVisibilityModel={{ id: false, imageUrl: false }}
      initialState={{
        sorting: {
          sortModel: [],
        },
        pagination: { paginationModel },
      }}
    />
  );
}
