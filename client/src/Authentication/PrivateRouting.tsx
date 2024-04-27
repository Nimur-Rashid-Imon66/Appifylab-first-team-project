import { useContext } from "react";
import { OnlineUserContext } from "../App";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRouting() {
  const { currentLoginUser, setCurrentLoginUser } =
    useContext(OnlineUserContext);
  return currentLoginUser.id != -1 ? <Outlet /> : <Navigate to={"/login"} />;
}

export default PrivateRouting;
