import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OnlineUserContext } from "../App";


const Mainpage = () => {
  const navigate = useNavigate();
  const { currentLoginUser, setCurrentLoginUser } =
    useContext(OnlineUserContext);
  console.log(currentLoginUser);
  return (
    <div>
      <h1>sadf {currentLoginUser.userid}</h1>
      <table>
        <tr className="text-2xl bg-white">
          <th className="">User ID</th>
          <td>{currentLoginUser.userid}</td>
        </tr>
        <tr>
          <th>User Email</th>
          <td>{currentLoginUser.email}</td>
        </tr>
        <tr>
          <th>User Name</th>
          <td>{currentLoginUser.username}</td>
        </tr>
      </table>
    </div>
  );
};

export default Mainpage;
