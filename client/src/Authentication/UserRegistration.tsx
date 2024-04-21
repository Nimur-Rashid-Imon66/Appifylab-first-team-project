import React, { useState, FormEvent, ChangeEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./UserRegistration.css";
import './UserRegistration.css'
import { v4 as uuidv4 } from "uuid";
interface UserData {
  username: string;
  password: string;
}

interface UserRegistrationProps {
  users: UserData[];
  addUser: (username: string, password: string) => void;
}

const UserRegistration: React.FC<UserRegistrationProps> = ({
  users,
  addUser,
}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username && password) {
      const userid = uuidv4();
      addUser(userid, username, password);
      navigate('/login');
    }
  };

  return (
    <div className="registration-container">
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      Already have an account? <Link to="/login">Log In</Link>
    </div>
  );
};

export default UserRegistration;
