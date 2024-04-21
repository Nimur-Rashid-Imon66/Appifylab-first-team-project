import React from 'react'
import { useNavigate } from 'react-router-dom'

const Mainpage = () => {
const navigate = useNavigate()
  return (
    <div>
      <div onClick={() => navigate("/todoapp")}>Todo</div>
      <div onClick={() => navigate("/expense-management")}>Expense Mangement</div>
      <div onClick={() => navigate("/mushahid")}>Blog post</div>
      <div onClick={() => navigate("/addProductCategory")}> Add Product Cata</div>
    </div>
  );
}

export default Mainpage