import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Employee from "../model/Employee";
interface Props {
  submitter: (empl: Employee) => void;
}
const EmployeeForm: React.FC<Props> = ({ submitter }) => {
  const { register, handleSubmit, formState, reset } = useForm<Employee>();
  const [isLangField, setLangField] = useState<boolean>(false);
  function onSubmit(empl: Employee) {
    reset();
    setLangField(false);
    submitter(empl);
  }
  return (
    <form
      className="d-flex flex-column align-items-center mt-5"
      onSubmit={handleSubmit((data) => onSubmit(data))}
      onReset={() => setLangField(false)}
    >
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Employee name
        </label>
        <input
          className="form-control"
          type="text"
          id="name"
          {...register("name", {
            required: true,
            pattern: /[A-Z][a-z]+/,
            minLength: 3,
          })}
        />
        {formState.errors.name?.type === "required" && (
          <p className="text-danger">Employee name is required</p>
        )}
        {formState.errors.name?.type === "minLength" && (
          <p className="text-danger">
            Employee name must have more than 2 letters
          </p>
        )}
        {formState.errors.name?.type === "pattern" && (
          <p className="text-danger">Employee name must be capitalized</p>
        )}
      </div>
      <div className="mb-3 form-floating">
        <input
          className="form-control"
          placeholder="salary"
          {...register("salary", { required: true, min: 5000, max: 50000 })}
          type="number"
          id="salary"
        />
        <label htmlFor="salary">Salary</label>
        {formState.errors.salary?.type === "required" && (
          <p className="text-danger">The salary must be specified</p>
        )}
        {formState.errors.salary?.type === "min" && (
          <p className="text-danger">The salary cannot be less than 5000</p>
        )}
        {formState.errors.salary?.type === "max" && (
          <p className="text-danger">The salary cannot be more than 50000</p>
        )}
      </div>
      <select
        className="mb-3 form-select"
        {...register("department", {
          required: true,
          onChange: (event) =>
            setLangField(event.target.value === "Development"),
        })}
      >
        <option value="">--Select Department--</option>
        <option value="QA">QA</option>
        <option value="Development">Development</option>
        <option value="Audit">Audit</option>
      </select>
      {formState.errors.department?.type === "required" && (
        <p className="text-danger">Department must be selected</p>
      )}
      {isLangField && (
        <select
          className="mb-3 form-select"
          multiple
          {...register("programmingLanguages")}
        >
          <option value={""}>--select language--</option>
          <option value={"C++"}>C++</option>
          <option value={"JAVA"}>JAVA</option>
          <option value={"JavaScript"}>JavaScript</option>
          <option value={"Python"}>Python</option>
        </select>
      )}
      <div className="d-flex justify-content-between w-25">
        <button
          type="submit"
          disabled={!formState.isValid}
          className="btn btn-primary"
        >
          Submit
        </button>
        <button type="reset" className="btn btn-primary">
          Reset
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
