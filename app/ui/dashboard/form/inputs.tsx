export const TextInput = (inputProps: TextInputPropsType) => {
  return (
    <div className="mb-4">
      <label htmlFor="name" className="mb-2 block text-sm font-medium">
        {inputProps.label}
      </label>
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <input
            id={inputProps.id}
            name={inputProps.name}
            type="text"
            placeholder={inputProps.placeholder}
            className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
            required={inputProps.required}
            defaultValue={inputProps.defaultValue}
          />
          {inputProps.icon}
        </div>
      </div>
    </div>
  );
};

export const NumberInput = (inputProps: NumberInputPropsType) => {
  return (
    <div className="mb-4">
      <label htmlFor="stock" className="mb-2 block text-sm font-medium">
        {inputProps.label}
      </label>
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <input
            id={inputProps.id}
            name={inputProps.name}
            type="number"
            step={inputProps.step}
            placeholder="Enter stock"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            required={inputProps.required}
            defaultValue={inputProps.defaultValue}
          />
          {inputProps.icon}
        </div>
      </div>
    </div>
  );
};

export const SelectInput = (inputProps: SelectInputProsType) => {
  const options = inputProps.options.length
    ? inputProps.options
    : [{ label: "N/A", value: "N/A" }];
  return (
    <div className="mb-4">
      <label htmlFor="tag" className="mb-2 block text-sm font-medium">
        {inputProps.label}
      </label>
      <div className="relative">
        <select
          id={inputProps.id}
          name={inputProps.name}
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          defaultValue={inputProps.defaultValue}
          required={inputProps.required}
        >
          <option value="" disabled>
            {`Select a ${inputProps.label}`}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {inputProps.icon}
      </div>
    </div>
  );
};

export const RadioInput = (inputProps: RadioInputProsType) => {
  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-medium">
        {inputProps.label}
      </legend>

      <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
        <div className="flex gap-4">
          {inputProps.options.map((o) => {
            return (
              <div className="flex items-center" key={o.value}>
                <input
                  id={o.value.toString()}
                  name={inputProps.name}
                  type="radio"
                  value={o.value}
                  defaultChecked={inputProps.defaultValue === o.value}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  id={o.value.toString()}
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  {o.label} {o.icon}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </fieldset>
  );
};

type InputPropsType = {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  icon?: React.ReactElement;
};

type TextInputPropsType = InputPropsType & {
  defaultValue?: string;
  placeholder?: string;
};

type NumberInputPropsType = InputPropsType & {
  defaultValue?: number;
  placeholder?: number;
  step?: number;
};

type SelectInputProsType = InputPropsType & {
  defaultValue?: string | number;
  options: Array<{ label: string; value: string | number }>;
};

type RadioInputProsType = InputPropsType & {
  defaultValue?: string | number;
  options: Array<{
    label: string;
    value: string | number;
    icon?: React.ReactElement;
  }>;
};

export const iconClassName =
  "pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900";
