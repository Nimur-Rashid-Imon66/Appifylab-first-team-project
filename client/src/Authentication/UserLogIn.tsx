import React, { useState, FormEvent, ChangeEvent, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./UserRegistration.css";
import './UserRegistration.css'
import { OnlineUserContext } from "../App";
interface UserData {
  username: string;
  password: string;
}
interface UserRegistrationProps {}

const UserLogIn: React.FC<UserRegistrationProps> = ({ users }) => {
  const { currentLoginUser, setCurrentLoginUser } =
    useContext(OnlineUserContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isUserExist = users.findIndex(
      (e: UserData) => e.username == username
    );
    console.log(isUserExist);
    if (
      isUserExist != -1 &&
      users[isUserExist].username == username &&
      users[isUserExist].password == password
    ) {
      setCurrentLoginUser(isUserExist);
      navigate("/");
    } else alert("username and password wrong");
  };

  return (
    <div className="registration-container">
      <h1>User Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
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
