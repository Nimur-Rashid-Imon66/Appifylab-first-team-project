import { useContext } from "react";
import { Link } from "react-router-dom";
import "./navbar.css"; // Import your CSS file
import { OnlineUserContext } from "../App";
import port from "../Port";
import axios from "axios";

function NavBar() {
  const { currentLoginUser } =
    useContext<any>(OnlineUserContext);
  const handleOnlineId =async () => {
    await axios.get(`${port}/logout`);
    localStorage.setItem("localhostonlineusesr", JSON.stringify({ id: -1 }));
  };
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
