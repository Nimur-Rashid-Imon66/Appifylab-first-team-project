
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TodoApps from './Falak/TodoApp';
import TodoLists from './Falak/TodoLists';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/todoapp" element={<TodoApps />} />
            <Route path="/todolists" element={<TodoLists />} />
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
