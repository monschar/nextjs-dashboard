"use client";

import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { RecipesTable } from "@/app/lib/recipes/definitions";
import { formatCurrency } from "@/app/lib/utils";
import { Checkbox } from "@mui/material";
import { updateRecipeActive } from "@/app/lib/recipes/actions";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name", flex: 1 },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    valueGetter: (value) => {
      return formatCurrency(value);
    },
    flex: 1,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "ingredient1",
    headerName: "Ingredient1",
    valueGetter: (value) => {
      return value ?? "-";
    },
    flex: 1,
  },
  {
    field: "ingredient2",
    headerName: "Ingredient2",
    valueGetter: (value) => {
      return value ?? "-";
    },
    flex: 1,
  },
  {
    field: "ingredient3",
    headerName: "Ingredient3",
    valueGetter: (value) => {
      return value ?? "-";
    },
    flex: 1,
  },
  {
    field: "ingredient4",
    headerName: "Ingredient4",
    valueGetter: (value) => {
      return value ?? "-";
    },
    flex: 1,
  },
  {
    field: "ingredient5",
    headerName: "Ingredient5",
    valueGetter: (value) => {
      return value ?? "-";
    },
    flex: 1,
  },
  {
    field: "active",
    type: "boolean",
    headerName: "Active",
    renderCell: (params: GridRenderCellParams<GridValidRowModel, boolean>) => (
      <Checkbox
        checked={params.value}
        onClick={() => updateRecipeActive(params.row.id)}
      />
    ),
    flex: 1,
    headerAlign: "left",
    align: "left",
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function MegaTable({
  recipeData,
}: {
  recipeData: RecipesTable[];
}) {
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={recipeData}
        columns={columns}
        pageSizeOptions={[5, 10]}
        columnVisibilityModel={{ id: false }}
        initialState={{
          sorting: {
            sortModel: [{ field: "active", sort: "desc" }],
          },
          pagination: { paginationModel },
        }}
      />
    </Paper>
  );
}
