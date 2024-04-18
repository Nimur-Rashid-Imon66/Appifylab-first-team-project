import './App.css'
import Income from './Expenses/Income'
import Expense from './Expenses/Expense'
import Home from './Expenses/Home'
import {RouterProvider, createBrowserRouter } from 'react-router-dom'

function App() {
  const router = createBrowserRouter([
    {
      path : '/',
      element : <Home/>,
    },
    {
      path : '/income',
      element : <Income/>,
    },
    {
      path : '/expense',
      element : <Expense/>,
    }
  ])
  return (
    <RouterProvider router = {router}/>
  )
}

export default App
