import React from 'react'

import './App.css'
import EmployeeForm from './components/EmployeeForm'

const App: React.FC = () => {
  
  return (
   <EmployeeForm submitter={(empl) => console.log(empl)}></EmployeeForm>
  )
}

export default App