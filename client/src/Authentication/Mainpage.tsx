import React from "react";
import { useNavigate } from "react-router-dom";

const Mainpage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div onClick={() => navigate("/todoapps")}>Todo</div>
      <div onClick={() => navigate("/expensehome")}>Expense Mangement</div>
      <div onClick={() => navigate("/mushahid")}>Blog post</div>
      <div>Product</div>
    </div>
  );
};

export default Mainpage;
