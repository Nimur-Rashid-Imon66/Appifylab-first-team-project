import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Income from "./Expenses/Income";
import Expense from "./Expenses/Expense";
import ExpenseHome from "./Expenses/Home";
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

export const OnlineUserContext = createContext("");

interface UserData {
  userid: string;
  username: string;
  password: string;
}

const App: React.FC = () => {
  const [currentLoginUser, setCurrentLoginUser] = useState(0);
  const getdata: UserData[] = JSON.parse(
    localStorage.getItem("localhostUserData") || "[]"
  );
  const localhostUserData: UserData[] = getdata;

  const addUser = (userid: string, username: string, password: string) => {
    localhostUserData.push({ userid, username, password });
    localStorage.setItem(
      "localhostUserData",
      JSON.stringify(localhostUserData)
    );
    console.log(localhostUserData);
  };

  return (
    <>
      <OnlineUserContext.Provider
        value={{ currentLoginUser, setCurrentLoginUser }}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="/registration"
              element={<UserRegistration addUser={addUser} users={localhostUserData} />}
            />
            <Route
              path="/login"
              element={<UserLogIn users={localhostUserData} />}
            />
            <Route path="/" element={<Mainpage />} />
            <Route path="/expense-management" element={<ExpenseHome />} />
            <Route path='/income' element={<Income />} />
            <Route path='/expense' element={<Expense />} />
            <Route path="/mushahid" element={<Mushahid />} />
            

            <Route path="/todo" element={<TodoApps />} />
            <Route path="/todo-lists" element={<TodoLists />} />
            <Route path='/addProductCategory' element={<AddProductCategory />} />
          <Route path='/addProduct' element={<AddProduct />} />
          <Route path='/showProducts' element={<ShowProduct />} />
          <Route path='/editProduct/:id' element={<EditProduct  />} />
          </Routes>
        </BrowserRouter>
      </OnlineUserContext.Provider>
    </>
  );
};

export default App;
