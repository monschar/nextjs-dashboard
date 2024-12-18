import { Ingredient } from "@/app/lib/ingredients/definitions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { redirect } from "next/navigation";

export const fetchIngredients = createAsyncThunk(
  "data/fetchIngredients",
  async (): Promise<Ingredient[]> => {
    try {
      const response = await axios.get<Ingredient[]>(`/api/ingredients`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch");
    }
  }
);

export const fetchIngredientById = createAsyncThunk(
  "data/fetchIngredientById",
  async (id: string): Promise<Ingredient> => {
    try {
      const response = await axios.get<Ingredient>(`/api/ingredients?id=${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch");
    }
  }
);

export const deleteIngredientById = createAsyncThunk(
  "data/deleteIngredientById",
  async (id: string) => {
    try {
      await axios.delete(`/api/ingredients`, {
        data: {
          id,
        },
      });
      return id;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch");
    }
  }
);

export const createIngredient = createAsyncThunk(
  "data/createIngredient",
  async (ingredient: Ingredient) => {
    try {
      await axios.post(`/api/ingredients`, { ingredient });
      return ingredient;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch");
    }
  }
);

export const updateIngredient = createAsyncThunk(
  "data/updateIngredient",
  async (ingredient: Ingredient) => {
    try {
      await axios.put(`/api/ingredients`, { ingredient });
      return ingredient;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch");
    }
  }
);

type IngredientsState = {
  loading: boolean;
  error: string;
  ingredients: Ingredient[];
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
    imageUrl: "",
    sequence: -1,
    itemLevel: undefined,
    deliverable: false,
  },
};

const ingredientsSlice = createSlice({
  name: "ingredientsState",
  initialState,
  reducers: {
    updateCurrentIngredient: (
      state,
      action: PayloadAction<Partial<Ingredient>>
    ) => {
      state.currentIngredient = {
        ...state.currentIngredient,
        ...action.payload,
      };
    },
    resetCurrentIngredient: (state) => {
      state.currentIngredient = initialState.currentIngredient;
    },
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
      .addCase(fetchIngredientById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchIngredientById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentIngredient = action.payload;
      })
      .addCase(fetchIngredientById.rejected, (state, action) => {
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
      })
      .addCase(createIngredient.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createIngredient.fulfilled, (state) => {
        state.loading = false;
        redirect("/dashboard/ingredients");
      })
      .addCase(createIngredient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateIngredient.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.currentIngredient = initialState.currentIngredient;
      })
      .addCase(updateIngredient.fulfilled, (state) => {
        state.loading = false;
        redirect("/dashboard/ingredients");
      })
      .addCase(updateIngredient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateCurrentIngredient, resetCurrentIngredient } =
  ingredientsSlice.actions;
export default ingredientsSlice.reducer;
