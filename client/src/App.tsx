import { useState } from 'react'
import './App.css'
import Mushahid from './Mushahid'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="text-3xl text-red-500">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <Mushahid/>
      </div>
    </>
  )
}

export default App
