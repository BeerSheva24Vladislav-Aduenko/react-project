import React from 'react'
import './App.css'
import Timer from './components/Timer'
const App: React.FC = () => {
  return (
    <div className="container"><Timer interval={1000}/>
    <Timer interval={3000}></Timer></div>
  )
}

export default App