import { useContext } from "react";
import { OnlineUserContext } from "./App";

const Home = () => {
  const { currentLoginUser, _ } = useContext(OnlineUserContext);
  return (
    <>
      <h1>Hello I am user Number</h1>
      {currentLoginUser}
    </>
  );
};
export default Home;
