import React, { useState } from "react";
import Coffee from "../model/Coffee";
import CoffeeObj from "../../config/coffee.json";
import { useForm } from "react-hook-form";

interface Props {
  submitter: (coffee: Coffee) => void;
}

const CoffeeForm: React.FC<Props> = ({ submitter }) => {
  const { register, handleSubmit, formState, reset } = useForm<Coffee>();
  const [coffeeType, setCoffeeType] = useState<string>("");
  function onSubmit(coffee: Coffee) {
    reset();
    submitter(coffee);
    setCoffeeType("");
  }

  function handleReset() {
    reset();
    setCoffeeType("");
  }

  return (
    <form
      className="d-flex flex-column align-items-center mt-5"
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <div className="mb-3">
        <label htmlFor="type" className="form-label">
          Type of coffee
        </label>
        <select
          className="form-select mb-3"
          id="type"
          {...register("type", { required: true })}
          onChange={(e) => {
            setCoffeeType(e.target.value);
          }}
        >
          <option value={""}>--select coffee--</option>
          {CoffeeObj.coffees.map((coffee) => (
            <option key={coffee.value} value={coffee.value}>
              {coffee.name}
            </option>
          ))}
        </select>
      </div>
      {coffeeType &&
        CoffeeObj.coffees.find((coffee) => coffee.value === coffeeType)
          ?.flavors && (
          <div className="mb-3">
            <label htmlFor="flavour" className="form-label">
              Flavour
            </label>
            <select
              className="form-select mb-3"
              id="flavour"
              {...register("flavour", { required: true })}
            >
              <option value={""}>--select flavor--</option>
              {CoffeeObj.coffees
                .find((coffee) => coffee.value === coffeeType)
                ?.flavors?.map((flavor) => (
                  <option key={flavor} value={flavor}>
                    {flavor}
                  </option>
                ))}
            </select>
          </div>
        )}

      {coffeeType && (
        <div className="mb-3">
          <label htmlFor="size" className="form-label">
            Size
          </label>
          <select
            className="form-select mb-3"
            id="size"
            {...register("size", { required: true })}
          >
            <option value={""}>--select size--</option>
            {coffeeType &&
              CoffeeObj.coffees
                .find((coffee) => coffee.value === coffeeType)
                ?.sizes?.map((flavor) => (
                  <option key={flavor} value={flavor}>
                    {flavor}
                  </option>
                ))}
          </select>
        </div>
      )}

      <div className="range">
        <label htmlFor="strength" className="form-label bold">
          Strength
        </label>
        <input
          className="form-range"
          min="0"
          max="10"
          type="range"
          id="strength"
          {...register("strength", { required: true })}
        />
      </div>
      {formState.errors.type?.type === "required" && (
        <p className="text-danger">Size must be selected</p>
      )}
      {formState.errors.flavour?.type === "required" && (
        <p className="text-danger">Flavour must be selected</p>
      )}
      {formState.errors.size?.type === "required" && (
        <p className="text-danger">Size must be selected</p>
      )}
      {formState.errors.strength?.type === "required" && (
        <p className="text-danger">Strength must be selected</p>
      )}

      <div className="d-flex justify-content-between w-25">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button type="reset" className="btn btn-primary" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default CoffeeForm;
