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
    const formData = {
      email,
      password,
    };

    const isUserExist = await axios.post(
      "http://127.0.0.1:3333/login",
      formData
    );
    // console.log("usre", isUserExist.data);
    console.log("usre", Object.keys(isUserExist.data).length);
    if (Object.keys(isUserExist.data).length) {
      // localStorage.setItem("whoIsLoggedIn", JSON.stringify(isUserExist));
      setCurrentLoginUser(isUserExist.data);
      localStorage.setItem(
        "localhostonlineusesr",
        JSON.stringify(isUserExist.data)
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
