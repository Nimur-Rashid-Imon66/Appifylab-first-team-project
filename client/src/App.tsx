import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Ahsan from './Ahsan'
import Mushahid from './Mushahid'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
          <Route path='/ahsan' element={<Ahsan />} />
          <Route path='/mushahid' element={<Mushahid/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
