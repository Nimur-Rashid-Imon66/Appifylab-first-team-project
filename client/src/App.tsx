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
    console.log("localhostUserData");
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
          <Route path='/ahsan' element={<Ahsan />} />
          <Route path='/mushahid' element={<Mushahid/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
