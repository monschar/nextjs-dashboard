"use client";

import { IngredientForm as IngredientFormType } from "@/app/lib/ingredients/definitions";
import {
  TagIcon,
  CurrencyDollarIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import {
  createIngredient,
  updateIngredient,
} from "@/app/lib/ingredients/actions";
import { DASHBOARD_PAGES, FormActionType, ItemLevels } from "@/app/lib/consts";
import {
  iconClassName,
  NumberInput,
  SelectInput,
  TextInput,
} from "../dashboard/form/inputs";
import { getOptionsFromEnum } from "@/app/lib/utils";

type CreateFormProps = {
  formActionType: FormActionType.Create;
};

type EditFormProps = {
  formActionType: FormActionType.Edit;
  initialFormValues: IngredientFormType;
};

const defaultValues: IngredientFormType = {
  name: "",
  id: "",
  price: 0,
  stock: 0,
  imageUrl: "",
  sequence: -1,
  itemLevel: undefined,
};

export default function IngredientForm({
  formProps,
}: {
  formProps: CreateFormProps | EditFormProps;
}) {
  let currentFormValues = defaultValues;
  let currentFormAction = createIngredient;
  if (formProps.formActionType === FormActionType.Edit) {
    currentFormValues = formProps.initialFormValues;
    currentFormAction = updateIngredient.bind(null, currentFormValues.id);
  }

  return (
    <form action={currentFormAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <TextInput
          label="Name"
          id="name"
          name="name"
          defaultValue={currentFormValues.name}
        />

        <SelectInput
          label="Level"
          id="item-level"
          name="item-level"
          options={getOptionsFromEnum(ItemLevels)}
          defaultValue={currentFormValues.itemLevel ?? ""}
          icon={<TagIcon className={iconClassName} />}
          required
        />

        <NumberInput
          label="Sequence"
          id="sequence"
          name="sequence"
          defaultValue={currentFormValues.sequence}
          icon={<CubeIcon className={iconClassName} />}
        />

        <NumberInput
          label="Stock"
          id="stock"
          name="stock"
          defaultValue={currentFormValues.stock}
          icon={<CubeIcon className={iconClassName} />}
        />

        <NumberInput
          label="Price"
          id="price"
          name="price"
          defaultValue={currentFormValues.price}
          icon={<CurrencyDollarIcon className={iconClassName} />}
        />

        <TextInput
          label="Image Url"
          id="image-url"
          name="image-url"
          defaultValue={`/ingredients/Large Ingredients Set_${currentFormValues.sequence}.png`}
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/dashboard/${DASHBOARD_PAGES.INGREDIENTS.PATH}`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
