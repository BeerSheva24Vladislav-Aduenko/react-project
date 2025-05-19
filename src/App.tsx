import React from "react";
import "./App.css";
// import EmployeeForm from "./components/EmployeeForm";
import CoffeeForm from "./components/CoffeeForm";

const App: React.FC = () => {
  return (
    //  <EmployeeForm submitter={(empl) => console.log(empl)}></EmployeeForm>
    <CoffeeForm submitter={(coffee) => console.log(coffee)}></CoffeeForm>
  );
};

export default App;
