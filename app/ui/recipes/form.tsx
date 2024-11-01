"use client";

import { RecipeForm as RecipeFormType } from "@/app/lib/recipes/definitions";
import { TagIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { createRecipe, updateRecipe } from "@/app/lib/recipes/actions";
import { DASHBOARD_PAGES, FormActionType } from "@/app/lib/consts";
import {
  iconClassName,
  NumberInput,
  RadioInput,
  SelectInput,
  TextInput,
} from "../dashboard/form/inputs";

type CreateFormProps = {
  formActionType: FormActionType.Create;
  options?: {
    [key: string]: { value: string | number; label: string }[];
  };
};

type EditFormProps = {
  formActionType: FormActionType.Edit;
  initialFormValues: RecipeFormType;
  options?: {
    [key: string]: { value: string | number; label: string }[];
  };
};

const defaultValues: RecipeFormType = {
  id: "",
  name: "",
  price: 0,
  type: "Appetizer",
  ingredient1: "",
  ingredient2: "",
  ingredient3: "",
  ingredient4: "",
  ingredient5: "",
  active: false,
};

export default function RecipesForm({
  formProps,
}: {
  formProps: CreateFormProps | EditFormProps;
}) {
  const { PATH } = DASHBOARD_PAGES.RECIPES;
  let currentFormValues = defaultValues;
  let currentFormAction = createRecipe;
  if (
    formProps.formActionType === FormActionType.Edit &&
    formProps.initialFormValues.id
  ) {
    currentFormValues = formProps.initialFormValues;
    currentFormAction = updateRecipe.bind(null, currentFormValues.id);
  }
  const ingredientsList = formProps.options?.ingredientsList || [];
  return (
    <form action={currentFormAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <TextInput
          label="Name"
          id="name"
          name="name"
          defaultValue={currentFormValues.name}
        />

        <NumberInput
          label="Price"
          id="price"
          name="price"
          defaultValue={currentFormValues.price}
          icon={<CurrencyDollarIcon className={iconClassName} />}
        />

        <TextInput
          label="Type"
          id="type"
          name="type"
          defaultValue={currentFormValues.type}
        />

        <SelectInput
          label="Ingredient1"
          id="ingredient1"
          name="ingredient1"
          options={ingredientsList}
          defaultValue={currentFormValues.ingredient1 ?? ""}
          icon={<TagIcon className={iconClassName} />}
        />
        <SelectInput
          label="Ingredient2"
          id="ingredient2"
          name="ingredient2"
          options={ingredientsList}
          defaultValue={currentFormValues.ingredient2 ?? ""}
          icon={<TagIcon className={iconClassName} />}
        />
        <SelectInput
          label="Ingredient3"
          id="ingredient3"
          name="ingredient3"
          options={ingredientsList}
          defaultValue={currentFormValues.ingredient3 ?? ""}
          icon={<TagIcon className={iconClassName} />}
        />
        <SelectInput
          label="Ingredient4"
          id="ingredient4"
          name="ingredient4"
          options={ingredientsList}
          defaultValue={currentFormValues.ingredient4 ?? ""}
          icon={<TagIcon className={iconClassName} />}
        />

        <SelectInput
          label="Ingredient5"
          id="ingredient5"
          name="ingredient5"
          options={ingredientsList}
          defaultValue={currentFormValues.ingredient5 ?? ""}
          icon={<TagIcon className={iconClassName} />}
        />

        <RadioInput
          label="Active"
          id="active"
          name="active"
          defaultValue={currentFormValues.active ? "TRUE" : "FALSE"}
          options={[
            { label: "True", value: "TRUE" },
            { label: "False", value: "FALSE" },
          ]}
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/dashboard/${PATH}`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}