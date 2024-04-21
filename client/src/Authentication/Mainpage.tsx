import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OnlineUserContext } from "../App";

const Mainpage = () => {
  const { currentLoginUser, setCurrentLoginUser } =
    useContext(OnlineUserContext);
  
  if (currentLoginUser.username) {
    console.log('ok')
  }

  return (
    <>
      <div>
        <h1>User Name: {currentLoginUser.username}</h1>
        <h1>User Email: {currentLoginUser.email}</h1>
        <h1>User Id: {currentLoginUser.userid}</h1>
        <div>Product</div>
      </div>
    </>

  );
};

export default Mainpage;