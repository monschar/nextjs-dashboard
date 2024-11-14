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
    field: "recipeStructure",
    headerName: "Structure",
    type: "string",
    flex: 1,
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    valueFormatter: (value) => {
      return formatCurrency(value);
    },
    flex: 0.8,
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
    flex: 0.8,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "ingredient1",
    headerName: "Ingredient1",
    renderCell: (
      params: GridRenderCellParams<GridValidRowModel, IngredientLocal>
    ) => (
      <div className="flex items-center gap-3">
        {params.value?.imageUrl && (
          <Image
            src={params.value?.imageUrl}
            height={25}
            width={25}
            alt={`${params.value?.name}'s icon`}
            style={{ objectFit: "contain", width: "25px", height: "25px" }}
          />
        )}
        {params.value?.name ?? "-"}
      </div>
    ),
    flex: 1,
  },
  {
    field: "ingredient2",
    headerName: "Ingredient2",
    renderCell: (
      params: GridRenderCellParams<GridValidRowModel, IngredientLocal>
    ) => (
      <div className="flex items-center gap-3">
        {params.value?.imageUrl && (
          <Image
            src={params.value?.imageUrl}
            height={25}
            width={25}
            alt={`${params.value?.name}'s icon`}
            style={{ objectFit: "contain", width: "25px", height: "25px" }}
          />
        )}
        {params.value?.name ?? "-"}
      </div>
    ),
    flex: 1,
  },
  {
    field: "ingredient3",
    headerName: "Ingredient3",
    renderCell: (
      params: GridRenderCellParams<GridValidRowModel, IngredientLocal>
    ) => (
      <div className="flex items-center gap-3">
        {params.value?.imageUrl && (
          <Image
            src={params.value?.imageUrl}
            height={25}
            width={25}
            alt={`${params.value?.name}'s icon`}
            style={{ objectFit: "contain", width: "25px", height: "25px" }}
          />
        )}
        {params.value?.name ?? "-"}
      </div>
    ),
    flex: 1,
  },
  {
    field: "ingredient4",
    headerName: "Ingredient4",
    renderCell: (
      params: GridRenderCellParams<GridValidRowModel, IngredientLocal>
    ) => (
      <div className="flex items-center gap-3">
        {params.value?.imageUrl && (
          <Image
            src={params.value?.imageUrl}
            height={25}
            width={25}
            alt={`${params.value?.name}'s icon`}
            style={{ objectFit: "contain", width: "25px", height: "25px" }}
          />
        )}
        {params.value?.name ?? "-"}
      </div>
    ),
    flex: 1,
  },
  {
    field: "ingredient5",
    headerName: "Ingredient5",
    renderCell: (
      params: GridRenderCellParams<GridValidRowModel, IngredientLocal>
    ) => (
      <div className="flex items-center gap-3">
        {params.value?.imageUrl && (
          <Image
            src={params.value?.imageUrl}
            height={25}
            width={25}
            alt={`${params.value?.name}'s icon`}
            style={{ objectFit: "contain", width: "25px", height: "25px" }}
          />
        )}
        {params.value?.name ?? "-"}
      </div>
    ),
    flex: 1,
  },
  { field: "deliverable", headerName: "deliverable", type: "boolean" },
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
    deliverable:
      (r.ingredient1?.deliverable ?? true) &&
      (r.ingredient2?.deliverable ?? true) &&
      (r.ingredient3?.deliverable ?? true) &&
      (r.ingredient4?.deliverable ?? true) &&
      (r.ingredient5?.deliverable ?? true),
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
