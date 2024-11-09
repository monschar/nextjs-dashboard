"use client";

import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowModel,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { formatCurrency } from "@/app/lib/utils";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateIngredientLocal } from "@/lib/slices/rootSlice";
import { IngredientLocal } from "@/app/lib/ingredients/definitions";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "string" },
  { field: "imageUrl", headerName: "Image Url", type: "string" },
  { field: "sequence", headerName: "Sequence", type: "number" },
  {
    field: "name",
    headerName: "Name",
    type: "string",
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
  { field: "itemLevel", headerName: "Item Level", type: "string", flex: 0.5 },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    valueFormatter: (value) => {
      return formatCurrency(value);
    },
    flex: 0.5,
    headerAlign: "left",
    align: "left",
    editable: true,
  },
  {
    field: "stock",
    headerName: "Stock",
    type: "number",
    flex: 0.5,
    headerAlign: "left",
    align: "left",
    editable: true,
  },
];

const paginationModel = { page: 0, pageSize: 100 };

export default function IngredientTable({}) {
  const { ingredients } = useAppSelector((state) => state.rootState);
  const dispatch = useAppDispatch();
  const handleProcessRowUpdate = (newRow: GridRowModel<IngredientLocal>) => {
    dispatch(updateIngredientLocal(newRow));
    return newRow;
  };
  return (
    <DataGrid
      sx={{ height: "60vh", width: "100%" }}
      rows={ingredients}
      columns={columns}
      columnVisibilityModel={{ id: false, imageUrl: false, sequence: false }}
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
