import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRegistration from "./Authentication/UserRegistration";
import UserLogIn from "./Authentication/UserLogIn";
import Home from "./Home";

import Ahsan from "./Ahsan";
import Mushahid from "./Mushahid";
import TodoApps from "./Falak/TodoApp";
import TodoLists from "./Falak/TodoLists";

export const OnlineUserContext = createContext("");
interface UserData {
  userid : string;
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
              element={
                <UserRegistration addUser={addUser} users={localhostUserData} />
              }
            />
            <Route
              path="/login"
              element={<UserLogIn users={localhostUserData} />}
            />
            <Route path="/" element={<Home />} />
            <Route path="/ahsan" element={<Ahsan />} />
            <Route path="/mushahid" element={<Mushahid />} /> 
          
          <Route path='/todoapps' element={<TodoApps />} />
          <Route path='/todoLists' element={<TodoLists />} />
          </Routes>
        </BrowserRouter>
      </OnlineUserContext.Provider>
      
    </>
  );
};

export default App;
