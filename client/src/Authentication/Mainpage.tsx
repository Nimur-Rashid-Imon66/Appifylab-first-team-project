import { useContext } from "react";
import { OnlineUserContext } from "../App";


const Mainpage = () => {
  const { currentLoginUser, setCurrentLoginUser } =
    useContext(OnlineUserContext);
  
  if (currentLoginUser.username) {
    console.log('ok')
  }

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