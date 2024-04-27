import { useContext, useEffect, useState } from "react";
import { OnlineUserContext } from "../App";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Mainpage = () => {
  const { currentLoginUser, setCurrentLoginUser } =
    useContext(OnlineUserContext);

  const token = JSON.parse(localStorage.getItem("token"));
  const [onlineUser, setOnlinuser] = useState();
  const nav = useNavigate();
  // console.log(token.token);
  const [user, setUser] = useState();
  useEffect(() => {
    try {
      (async () => {
        const res = await axios.post(
          "http://127.0.0.1:3333/profile",
          {},
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setUser(res.data);
      })();
    } catch (error) {
      nav("/login");
    }
  },[]);
  // console.log(user);
  return (
    <div className="flex flex-col justify-center items-center min-h-[95vh]">
      {/* <h1>sadf {currentLoginUser.userid}</h1> */}
      <div className="w-[150px] h-[150px] border border-black mb-4 rounded-3xl flex flex-col justify-center items-center">
        <h1>{currentLoginUser.username}</h1>
      </div>
      <table>
        <tr className="">
          <th className="border px-2">User ID</th>
          <td className="border px-2">{currentLoginUser.userid}</td>
        </tr>
        <tr>
          <th className="border px-2">User Email</th>
          <td className="border px-2">{currentLoginUser.email}</td>
        </tr>
        <tr>
          <th className="border px-2">User Name</th>
          <td className="border px-2">{currentLoginUser.username}</td>
        </tr>
      </table>
    </div>
  );
};

export default Mainpage;
