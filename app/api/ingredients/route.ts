import {
  createIngredient,
  deleteIngredient,
  updateIngredient,
} from "@/app/lib/ingredients/actions";
import {
  fetchAllIngredients,
  fetchIngredientById,
} from "@/app/lib/ingredients/data";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      const data = await fetchAllIngredients();
      return Response.json(data);
    } else {
      const data = await fetchIngredientById(id);
      return Response.json(data);
    }
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
export async function POST(request: Request) {
  try {
    const { ingredient } = await request.json();
    await createIngredient(ingredient);
    return Response.json({ ingredient }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { ingredient } = await request.json();
    await updateIngredient(ingredient);
    return Response.json({ ingredient }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await deleteIngredient(id);
    return Response.json({ id }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
