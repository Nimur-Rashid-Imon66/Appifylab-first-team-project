import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"; // Import your CSS file

function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/mainpage">Home</Link>
        </li>
        <li>
          <Link to="/todoapps">To DO</Link>
        </li>
        <li>
          <Link to="/expensehome">Expense Mangement</Link>
        </li>
        <li>
          <Link to="/mushahid">Blog Post</Link>
        </li>
        <li>
          <Link to="/addProductCategory">Add Product Category</Link>
        </li>
        <li>
          <Link to="/addProduct">Add Product</Link>
        </li>
        <li>
          <Link to="/showProducts">Show Products</Link>
        </li>
        <li>
          <Link to="/login">Log Out</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
