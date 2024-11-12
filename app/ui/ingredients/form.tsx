"use client";

import Link from "next/link";
import { Button } from "@/app/ui/button";
import { DASHBOARD_PAGES, FormActionType, ItemLevels } from "@/app/lib/consts";
import { getOptionsFromEnum } from "@/app/lib/utils";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  updateCurrentIngredient,
  updateIngredient,
  createIngredient,
} from "@/lib/slices/ingredientsSlice";
import {
  Autocomplete,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import {
  Abc,
  AttachMoney,
  FormatListNumbered,
  InsertPhoto,
  StarHalf,
} from "@mui/icons-material";
import { Ingredient } from "@/app/lib/ingredients/definitions";

const formatIngredient = (currentIngredient: Ingredient): Ingredient => ({
  name: currentIngredient.name,
  id: currentIngredient.id,
  price: currentIngredient.price,
  imageUrl: currentIngredient.imageUrl,
  itemLevel: currentIngredient.itemLevel,
  sequence: currentIngredient.sequence,
  deliverable: currentIngredient.deliverable,
});

export default function IngredientForm({
  formActionType,
}: {
  formActionType: FormActionType;
}) {
  const { PATH } = DASHBOARD_PAGES.INGREDIENTS;
  const dispatch = useAppDispatch();
  const { currentIngredient } = useAppSelector(
    (state) => state.ingredientsState
  );

  const onUpdateIngredient = () => {
    const formattedIngredient = formatIngredient(currentIngredient);
    dispatch(updateIngredient(formattedIngredient));
  };

  const onCreateIngredient = () => {
    const formattedIngredient = formatIngredient(currentIngredient);
    dispatch(createIngredient(formattedIngredient));
  };

  const onChange = (name: string, value: string, isNumber: boolean = false) => {
    let parsed;
    if (isNumber) {
      parsed = Number.parseInt(value);
      if (Number.isNaN(parsed)) return;
    } else {
      parsed = value;
    }
    dispatch(updateCurrentIngredient({ [name]: parsed }));
  };

  return (
    <>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Name</label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <TextField
                value={currentIngredient.name}
                onChange={(event) => onChange("name", event.target.value)}
                className="bg-white"
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Abc />
                      </InputAdornment>
                    ),
                    classes: {
                      input: "focus:ring-0",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="tag" className="mb-2 block text-sm font-medium">
            Item Level
          </label>
          <div className="relative">
            <Autocomplete
              disablePortal
              options={getOptionsFromEnum(ItemLevels)}
              value={
                getOptionsFromEnum(ItemLevels).find(
                  (o) => o.value === currentIngredient.itemLevel
                ) || null
              }
              onChange={(event, value) => onChange("itemLevel", value?.value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="bg-white"
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      padding: "9px 14px",
                    },
                    classes: {
                      input: "focus:ring-0",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <StarHalf />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Sequence</label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <TextField
                value={currentIngredient.sequence}
                onChange={(event) =>
                  onChange("sequence", event.target.value, true)
                }
                className="bg-white"
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <FormatListNumbered />
                      </InputAdornment>
                    ),
                    classes: {
                      input: "focus:ring-0",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Price</label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <TextField
                value={currentIngredient.price}
                onChange={(event) =>
                  onChange("price", event.target.value, true)
                }
                className="bg-white"
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoney />
                      </InputAdornment>
                    ),
                    classes: {
                      input: "focus:ring-0",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Deliverable</label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={currentIngredient.deliverable}
                onChange={(event) =>
                  onChange("deliverable", event?.target.value)
                }
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Image Url</label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <TextField
                value={currentIngredient.imageUrl}
                onChange={(event) => onChange("imageUrl", event.target.value)}
                className="bg-white"
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <InsertPhoto />
                      </InputAdornment>
                    ),
                    classes: {
                      input: "focus:ring-0",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href={`/dashboard/${PATH}`}
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button
            onClick={
              formActionType === FormActionType.Create
                ? onCreateIngredient
                : onUpdateIngredient
            }
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
