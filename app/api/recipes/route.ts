import {
  createRecipe,
  deleteRecipe,
  updateRecipe,
} from "@/app/lib/recipes/actions";
import { fetchAllRecipes, fetchRecipeById } from "@/app/lib/recipes/data";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      const data = await fetchAllRecipes();
      return Response.json(data);
    } else {
      const data = await fetchRecipeById(id);
      return Response.json(data);
    }
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
export async function POST(request: Request) {
  try {
    const { recipe } = await request.json();
    await createRecipe(recipe);
    return Response.json({ recipe }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { recipe } = await request.json();
    await updateRecipe(recipe);
    return Response.json({ recipe }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await deleteRecipe(id);
    return Response.json({ id }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
