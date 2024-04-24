import React, { useState, FormEvent, ChangeEvent, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserRegistration.css";
import "./UserRegistration.css";
import { OnlineUserContext } from "../App";
import axios from "axios";
interface UserData {
  email: string;
  password: string;
}
interface UserRegistrationProps {}

const UserLogIn: React.FC<UserRegistrationProps> = () => {
  let users: [];
  const fetchData = async () => {
    await axios
      .get("http://127.0.0.1:3333/usersget")
      .then((e) => (users = e.data));
  };
  const { currentLoginUser, setCurrentLoginUser } =
    useContext(OnlineUserContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await fetchData();
    
    const isUserExist = users.filter((e: UserData) => e.email == email);
    
    if (
      isUserExist.length > 0 &&
      isUserExist[0].email == email &&
      isUserExist[0].password == password
    ) {

      localStorage.setItem('whoIsLoggedIn', JSON.stringify(isUserExist));
      setCurrentLoginUser(isUserExist);

      console.log(isUserExist[0]);
      setCurrentLoginUser(isUserExist[0]);
      localStorage.setItem(
        "localhostonlineusesr",
        JSON.stringify(isUserExist[0])
      );

      navigate("/mainpage");
    } else alert("username and password wrong");
  };

  return (
    <div className="registration-container">
      <h1>User Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Email:</label>
          <input
            type="email"
            id="username"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      create a new acount . <Link to={"/registration"}>Sign Up</Link>
    </div>
  );
};

export default UserLogIn;
