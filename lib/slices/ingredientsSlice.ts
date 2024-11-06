import {
  Ingredient,
  IngredientsTable,
} from "@/app/lib/ingredients/definitions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchIngredients = createAsyncThunk(
  "data/fetchIngredients",
  async (): Promise<IngredientsTable[]> => {
    try {
      const response = await axios.get<IngredientsTable[]>(`/api/ingredients`);
      return response.data;
    } catch (error) {
      console.log(error)
      throw new Error("Failed to fetch");
    }
  }
);

export const deleteIngredientById = createAsyncThunk(
  "data/deleteIngredientById",
  async (id: string) => {
    try {
      await axios.post(`/api/ingredients`, { id });
      return id;
    } catch (error) {
      console.log(error)
      throw new Error("Failed to fetch");
    }
  }
);

type IngredientsState = {
  loading: boolean;
  error: string;
  ingredients: IngredientsTable[];
  currentIngredient: Ingredient;
};

const initialState: IngredientsState = {
  loading: false,
  error: "",
  ingredients: [],
  currentIngredient: {
    name: "",
    id: "",
    price: 0,
    stock: 0,
    imageUrl: "",
    sequence: -1,
    itemLevel: undefined,
  },
};

const ingredientsSlice = createSlice({
  name: "ingredientsState",
  initialState,
  reducers: {
    updateCurrentIngredient: (state, action: PayloadAction<Ingredient>) => {
      state.currentIngredient = {...state.currentIngredient, ...action.payload}
    },
    resetCurrentIngredient: (state) => {
      state.currentIngredient = initialState.currentIngredient
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteIngredientById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteIngredientById.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = state.ingredients.filter(
          (i) => i.id !== action.payload
        );
      })
      .addCase(deleteIngredientById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
