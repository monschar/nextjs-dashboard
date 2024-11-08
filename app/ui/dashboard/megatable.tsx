"use client";

import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { RecipesTable } from "@/app/lib/recipes/definitions";
import { formatCurrency } from "@/app/lib/utils";
import Image from "next/image";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID" },
  { field: "imageUrl", headerName: "Image Url" },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
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
];

const paginationModel = { page: 0, pageSize: 50 };

export default function MegaTable({
  recipeData,
}: {
  recipeData: RecipesTable[];
}) {
  return (
    <DataGrid
      sx={{ height: 1000, width: "100%" }}
      rows={recipeData}
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
