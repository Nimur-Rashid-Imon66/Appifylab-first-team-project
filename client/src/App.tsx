import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddProductCategory from './Components/EMON/AddProductCategory'
import AddProduct from './Components/EMON/AddProduct'
import ShowProduct from './Components/EMON/ShowProduct'
import EditProduct from './Components/EMON/EditProduct'
import { createContext } from 'react'

export const OnlineUserContext = createContext("");
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
          <Route path='/showProducts' element={<ShowProduct />} />
          <Route path='/editProduct/:id' element={<EditProduct  />} />
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
