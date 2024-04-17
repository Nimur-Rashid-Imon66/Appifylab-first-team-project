import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRegistration from "./Authentication/UserRegistration";
import UserLogIn from "./Authentication/UserLogIn";
import Home from "./Home";

interface UserData {
  username: string;
  password: string;
}

// Create the context
export const OnlineUserContext = createContext("");

const App: React.FC = () => {
  const [currentLoginUser, setCurrentLoginUser] = useState(0);
  const getdata: UserData[] = JSON.parse(
    localStorage.getItem("localhostUserData") || "[]"
  );
  const localhostUserData: UserData[] = getdata;

  const addUser = (username: string, password: string) => {
    localhostUserData.push({ username, password });
    // Storing data
    localStorage.setItem(
      "localhostUserData",
      JSON.stringify(localhostUserData)
    );
    console.log(localhostUserData);
  };
  return (
    <>
      {/* Use the OnlineUserContext.Provider */}
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
          </Routes>
        </BrowserRouter>
      </OnlineUserContext.Provider>
    </>
  );
};

export default App;
