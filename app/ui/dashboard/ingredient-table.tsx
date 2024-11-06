"use client";

import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridPreProcessEditCellProps,
  GridRenderCellParams,
  GridRowModel,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { formatCurrency } from "@/app/lib/utils";
import Image from "next/image";
import { Ingredient } from "@/app/lib/ingredients/definitions";
import { updateIngredientStock } from "@/app/lib/ingredients/actions";

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
          height={25}
          width={25}
          alt={`${params.value}'s icon`}
          style={{ objectFit: "contain", maxHeight: "25px" }}
        />
        {params.value}
      </div>
    ),
  },
  {
    field: "price",
    headerName: "Price",
    valueGetter: (value) => {
      return formatCurrency(value);
    },
    flex: 1,
    headerAlign: "left",
    align: "left",
    sortComparator: (v1, v2) =>
      Number.parseInt(v1.slice(1)) - Number.parseInt(v2.slice(1)),
    editable: true,
  },
  {
    field: "stock",
    headerName: "Stock",
    flex: 1,
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const hasError = Number.isNaN(params.props.value);
      return { ...params.props, error: hasError };
    },
  },
];

const paginationModel = { page: 0, pageSize: 100 };

const handleProcessRowUpdate = (newRow: GridRowModel) => {
  const stock = Number.parseInt(newRow.stock);
  if (!Number.isInteger(stock)) {
    throw new Error("Stock must be an integer");
  }
  updateIngredientStock(newRow.id, newRow.stock);
  return newRow;
};

export default function IngredientTable({
  ingredientData,
}: {
  ingredientData: Ingredient[];
}) {
  return (
    <DataGrid
      sx={{ height: 1400, width: "100%" }}
      rows={ingredientData}
      columns={columns}
      columnVisibilityModel={{ id: false, imageUrl: false }}
      initialState={{
        sorting: {
          sortModel: [{ field: "name", sort: "asc" }],
        },
        pagination: { paginationModel },
      }}
      processRowUpdate={handleProcessRowUpdate}
      onProcessRowUpdateError={(error) => {
        alert(error.message);
      }}
    />
  );
}
