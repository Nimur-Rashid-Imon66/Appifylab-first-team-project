import React, { useState, FormEvent, ChangeEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./UserRegistration.css";
import "./UserRegistration.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
interface UserData {
  username: string;
  email: string;
  id: string;
  password: string;
}

const UserRegistration: React.FC = () => {
  const navigate = useNavigate();
  // const [users, setUser] = useState([]);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(event.target.value));
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = {
      username,
      email,
      password,
    };
    if (isValidEmail) {
      try {
        const isUserExist = await axios.post(
          "http://127.0.0.1:3333/usersset",
          formData
        );

        setLoading(false);
        if (!Object.keys(isUserExist.data).length) {
          navigate("/login");
        } else {
          alert("email exist");
          setLoading(false);
        }
      } catch (e) {
        // console.error("Login failed:", error.message);
        setError("Registration failed. Please try again.");
        setLoading(false);
      }
    } else {
      setError("Email invalid");
      setLoading(false);
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
          <label htmlFor="username">Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
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
        <button type="submit" disabled={loading}>
          Register
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      Already have an account? <Link to="/login">Log In</Link>
    </div>
  );
};

export default UserRegistration;
