import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css"; // Import your CSS file
import { OnlineUserContext } from "../App";
import axios from "axios";

function NavBar() {
  const [logout, setLogout] = useState(true);
  const { currentLoginUser, setCurrentLoginUser } =
    useContext(OnlineUserContext);

  const token = JSON.parse(localStorage.getItem("token"));
  const handleOnlineId = async () => {
    localStorage.setItem("localhostonlineusesr", JSON.stringify({ id: -1 }));
    await axios.post(
      "http://127.0.0.1:3333/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/todoapps">To DO</Link>
        </li>
        <li>
          <Link to="/expense-management">Expense Mangement</Link>
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
          {currentLoginUser.id == -1 ? (
            ""
          ) : (
            <Link to="/login" onClick={handleOnlineId}>
              Log Out
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
