
import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRegistration from "./Authentication/UserRegistration";
import UserLogIn from "./Authentication/UserLogIn";
import Home from "./Home";
import Ahsan from "./Ahsan";
import Mushahid from "./Mushahid";


function App() {
=======
interface UserData {
  username: string;
  password: string;
}

export const OnlineUserContext = createContext("");

const App: React.FC = () => {
  const [currentLoginUser, setCurrentLoginUser] = useState(0);
  const getdata: UserData[] = JSON.parse(
    localStorage.getItem("localhostUserData") || "[]"
  );
  const localhostUserData: UserData[] = getdata;

  const addUser = (username: string, password: string) => {
    localhostUserData.push({ username, password });
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
          </Routes>
        </BrowserRouter>
      </OnlineUserContext.Provider>

    </>
  );
};

export default App;
