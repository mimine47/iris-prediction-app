import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import IrisForm from './components/IrisForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Iris Predictor</h1>
      <IrisForm />
    </div>
  )
}

export default App
