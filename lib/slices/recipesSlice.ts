import { Recipe } from "@/app/lib/recipes/definitions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { redirect } from "next/navigation";

export const fetchRecipes = createAsyncThunk(
  "data/fetchRecipes",
  async (): Promise<Recipe[]> => {
    try {
      const response = await axios.get<Recipe[]>(`/api/recipes`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch");
    }
  }
);

export const fetchRecipeById = createAsyncThunk(
  "data/fetchRecipeById",
  async (id: string): Promise<Recipe> => {
    try {
      const response = await axios.get<Recipe>(`/api/recipes?id=${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch");
    }
  }
);

export const deleteRecipeById = createAsyncThunk(
  "data/deleteRecipeById",
  async (id: string) => {
    try {
      await axios.delete(`/api/recipes`, {
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

export const createRecipe = createAsyncThunk(
  "data/createRecipe",
  async (recipe: Recipe) => {
    try {
      await axios.post(`/api/recipes`, { recipe });
      return recipe;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch");
    }
  }
);

export const updateRecipe = createAsyncThunk(
  "data/updateRecipe",
  async (recipe: Recipe) => {
    try {
      await axios.put(`/api/recipes`, { recipe });
      return recipe;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch");
    }
  }
);

type RecipesState = {
  loading: boolean;
  error: string;
  recipes: Recipe[];
  currentRecipe: Recipe;
};

const initialState: RecipesState = {
  loading: false,
  error: "",
  recipes: [],
  currentRecipe: {
    id: "",
    name: "",
    price: 0,
    ingredient1: "",
    ingredient2: "",
    ingredient3: "",
    ingredient4: "",
    ingredient5: "",
    itemLevel: undefined,
    recipeStructure: undefined,
    recipeType: undefined,
    recipeLabel: undefined,
    cookingAppliance: undefined,
    imageUrl: ``,
  },
};

const recipesSlice = createSlice({
  name: "recipesState",
  initialState,
  reducers: {
    updateCurrentRecipe: (state, action: PayloadAction<Partial<Recipe>>) => {
      state.currentRecipe = {
        ...state.currentRecipe,
        ...action.payload,
      };
    },
    resetCurrentRecipe: (state) => {
      state.currentRecipe = initialState.currentRecipe;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRecipeById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRecipe = action.payload;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteRecipeById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteRecipeById.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = state.recipes.filter((r) => r.id !== action.payload);
      })
      .addCase(deleteRecipeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createRecipe.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createRecipe.fulfilled, (state) => {
        state.loading = false;
        redirect("/dashboard/recipes");
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateRecipe.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.currentRecipe = initialState.currentRecipe;
      })
      .addCase(updateRecipe.fulfilled, (state) => {
        state.loading = false;
        redirect("/dashboard/recipes");
      })
      .addCase(updateRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateCurrentRecipe, resetCurrentRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;
