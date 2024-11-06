import { deleteIngredient } from "@/app/lib/ingredients/actions";
import { fetchAllIngredients } from "@/app/lib/ingredients/data";

export async function GET() {
  try {
    const data = await fetchAllIngredients();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { id } = await request.json();
    await deleteIngredient(id);
    return Response.json({ id }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
