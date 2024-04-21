import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Income from "./Expenses/Income";
import Expense from "./Expenses/Expense";
import Homee from "./Expenses/Home";
import Mushahid from "./Mushahid";
import TodoApps from "./Falak/TodoApp";
import TodoLists from "./Falak/TodoLists";
import Mainpage from "./Authentication/Mainpage";
import UserRegistration from "./Authentication/UserRegistration";
import UserLogIn from "./Authentication/UserLogIn";
import AddProductCategory from "./Components/EMON/AddProductCategory";
import AddProduct from "./Components/EMON/AddProduct";
import ShowProduct from "./Components/EMON/ShowProduct";
import EditProduct from "./Components/EMON/EditProduct";
import NavBar from "./Navbar/NavBar";

export const OnlineUserContext = createContext({});

interface UserData {
  userid: string;
  username: string;
  email: string;
  password: string;
}

const App: React.FC = () => {
  const onlineUserFromLocalHost: UserData[] = JSON.parse(
    localStorage.getItem("localhostonlineusesr") || "{}"
  );
  const [currentLoginUser, setCurrentLoginUser] = useState(
    onlineUserFromLocalHost
  );
  const getdata: UserData[] = JSON.parse(
    localStorage.getItem("localhostUserData") || "[]"
  );
  const localhostUserData: UserData[] = getdata;

  const addUser = (
    userid: string,
    username: string,
    email: string,
    password: string
  ) => {
    localhostUserData.push({ userid, username, email, password });
    localStorage.setItem(
      "localhostUserData",
      JSON.stringify(localhostUserData)
    );
    console.log("user", localhostUserData);
  };

  return (
    <>
      <OnlineUserContext.Provider
        value={{ currentLoginUser, setCurrentLoginUser }}
      >
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route
              path="/registration"
              element={
                <UserRegistration addUser={addUser} users={localhostUserData} />
              }
            />
            <Route
              path="/login"
              element={<UserLogIn users={localhostUserData} />}
            />
            <Route path="/expensehome" element={<Homee />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
            {/* <Route path="/ahsan" element={<Ahsan />} /> */}
            <Route path="/mushahid" element={<Mushahid />} />
            <Route path="/mainpage" element={<Mainpage />} />
            <Route path="/todoapps" element={<TodoApps />} />
            <Route path="/todoLists" element={<TodoLists />} />
            <Route
              path="/addProductCategory"
              element={<AddProductCategory />}
            />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/showProducts" element={<ShowProduct />} />
            <Route path="/editProduct/:id" element={<EditProduct />} />
          </Routes>
        </BrowserRouter>
      </OnlineUserContext.Provider>
    </>
  );
};

export default App;
