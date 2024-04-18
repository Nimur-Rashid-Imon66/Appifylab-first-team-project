import { useContext } from "react";
import { OnlineUserContext } from "./App";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { currentLoginUser, setCurrentLoginUser } =
    useContext(OnlineUserContext);
  const navigate = useNavigate();
  const logingout = () => {
    setCurrentLoginUser(-1);
    navigate("/login");
  };
  return (
    <>
      <h1>Hello I am user Number</h1>
      {currentLoginUser}
      <button onClick={logingout}>Log Out</button>
    </>
  );
};
export default Home;
