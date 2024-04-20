import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddProductCategory from './AddProductCategory'
import AddProduct from './AddProduct'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path='/ahsan' element={<Ahsan />} /> */}
          <Route path='/addProductCategory' element={<AddProductCategory />} />
          <Route path='/addProduct' element={<AddProduct />} />
          
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
