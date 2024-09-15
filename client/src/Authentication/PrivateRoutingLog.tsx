import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { OnlineUserContext } from "../App";

const PrivateRoutingLog = () => {
  const { currentLoginUser, setCurrentLoginUser } =
    useContext(OnlineUserContext);
  // console.log(currentLoginUser);
  return currentLoginUser.id == -1 ? <Outlet /> : <Navigate to={"/"} />;
};

export default PrivateRoutingLog;
