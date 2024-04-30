import { useContext } from "react";
import { Link } from "react-router-dom";
import "./navbar.css"; // Import your CSS file
import { OnlineUserContext } from "../App";
import axios from "axios";

// interface UserData {
//   userid?: string;
//   username?: string;
//   email?: string;
//   password?: string;
//   id?: number;
// }

function NavBar() {
  const { currentLoginUser } = useContext<any>(OnlineUserContext);

  let tempTkn = localStorage.getItem("token")
  let token: {token:string};
  if (tempTkn) token = JSON.parse(tempTkn);
  
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
    localStorage.removeItem("category");
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
