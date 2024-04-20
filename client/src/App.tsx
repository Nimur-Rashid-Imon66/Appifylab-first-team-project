import Income from "./Expenses/Income";
import Expense from "./Expenses/Expense";
import Homee from "./Expenses/Home";
import Ahsan from "./Ahsan";
import Mushahid from "./Mushahid";
import TodoApps from "./Falak/TodoApp";
import TodoLists from "./Falak/TodoLists";
import Mainpage from "./Authentication/Mainpage";
import React, { createContext, useState } from "react";
import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import UserRegistration from "./Authentication/UserRegistration";
import UserLogIn from "./Authentication/UserLogIn";
// import Home from "./Home";

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
  const router = createBrowserRouter([
    {
      path: "/expensehome",
      element: <Homee />,
    },
    {
      path: "/income",
      element: <Income />,
    },
    {
      path: "/expense",
      element: <Expense />,
    },
  ]);
  return (
    <>
      <OnlineUserContext.Provider
        value={{ currentLoginUser, setCurrentLoginUser }}
      >
        <RouterProvider router={router} />
        <BrowserRouter>
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
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/ahsan" element={<Ahsan />} />
            <Route path="/mushahid" element={<Mushahid />} />
            <Route path="/mainpage" element={<Mainpage />} />

            <Route path="/todoapps" element={<TodoApps />} />
            <Route path="/todoLists" element={<TodoLists />} />
          </Routes>
        </BrowserRouter>
      </OnlineUserContext.Provider>
    </>
  );
};

export default App;
