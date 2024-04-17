import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Ahsan from './Ahsan'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
          <Route path='/ahsan' element={<Ahsan/>}/>
         </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
