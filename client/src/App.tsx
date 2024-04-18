
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TodoLists from './Falak/TodoLists'
import Add from './Falak/notin/Add';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/todolists" element={<TodoLists />} />
            <Route path="/addtodo" element={<Add />} />
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
