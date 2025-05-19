import React, { useState } from "react";
import CoffeeOrder from "../model/CoffeeOrder";
import { useForm } from "react-hook-form";
import typesFlavorsSizes from "../../config/coffeetypes.json";
interface Props {
  submitter: (order: CoffeeOrder) => void;
}
type CoffeeType = typeof typesFlavorsSizes;
function getOptionElement(opt: string): React.ReactNode {
  return (
    <option key={opt} value={opt}>
      {opt}
    </option>
  );
}
function getOptions(): React.ReactNode {
  return Object.keys(typesFlavorsSizes).map(getOptionElement);
}
function getFlavorOptions(
  coffee: keyof CoffeeType
): React.ReactNode[] | undefined {
  return typesFlavorsSizes[coffee].flavors.map(getOptionElement);
}
function getSizeOptions(coffee: keyof CoffeeType): React.ReactNode[] {
  return typesFlavorsSizes[coffee].sizes.map(getOptionElement);
}
const CoffeeOrderForm: React.FC<Props> = ({ submitter }) => {
  const { register, formState, handleSubmit, reset } = useForm<CoffeeOrder>();
  const [coffee, setCoffee] = useState<keyof CoffeeType | undefined>();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        submitter(data);
        reset();
        setCoffee(undefined);
      })}
      onReset={() => {
        setCoffee(undefined);
        reset();
      }}
    >
      <select
        {...register("type", {
          required: true,
          onChange: (event) => {
            setCoffee(event.target.value);
          },
        })}
        className="form-select mb-3"
      >
        <option value="">--Select Type--</option>
        {getOptions()}
      </select>
      {formState.errors?.type?.type === "required" && (
        <p className="error form-text">Type of Coffe should be selected</p>
      )}
      {coffee && typesFlavorsSizes[coffee].flavors.length > 0 && (
        <select
          {...register("flavor", { required: true })}
          className="form-select mb-3"
        >
          <option value="">--Select flavor--</option>
          {getFlavorOptions(coffee)}
        </select>
      )}
      {formState.errors?.flavor?.type === "required" && (
        <p className="error form-text">Flavor of Coffe should be selected</p>
      )}
      {coffee && (
        <select
          {...register("size", { required: true })}
          className="form-select mb-3"
        >
          <option value="">--Select size--</option>
          {getSizeOptions(coffee)}
        </select>
      )}
      {formState.errors?.size?.type === "required" && (
        <p className="error">Size should be selected</p>
      )}
      <div className="mb-3">
        <label htmlFor="strength" className="form-label mb-1">
          Strength
        </label>
        <input
          type="range"
          defaultValue={50}
          min={0}
          max={100}
          step={1}
          {...register("strength", { required: true })}
          id="strength"
          className="form-range"
        />
      </div>
      {formState.errors?.strength?.type === "required" && (
        <p className="error">Strength should be selected</p>
      )}
      <div className="d-flex justify-content-between mt-4">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button type="reset" className="btn btn-primary">
          Reset
        </button>
      </div>
    </form>
  );
};

export default CoffeeOrderForm;
