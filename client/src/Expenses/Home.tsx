import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { OnlineUserContext } from "../App";
import "./home.css";


interface Expense {
  balance: number;
  history: Transaction[];
}

interface Transaction {
  description: string;
  amount: number;
  type: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { currentLoginUser, setCurrentLoginUser } = useContext(OnlineUserContext);
  const loginUserID = currentLoginUser.userid;
  const [loginUserData, setLoginUserData] = useState<Expense>({
    balance: 0,
    history: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/expenseManagement/${loginUserID}`);
        const userData: Expense = {
          balance: response.data.balance,
          history: response.data.history
        };

        setLoginUserData(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [loginUserID]);

  return (
    <div className="container">
      <div className="innerContainer">
        <h2 style={{ paddingBottom: "20px", color: "white" }}>
          Expense Management
        </h2>
        <div className="currentBalance">
          <h3 className="bal">Current Balance</h3>
          <h1>{loginUserData.balance}</h1>
          <h3 className="tk">TK.</h3>
        </div>
        <div className="income-expense">
          <div className="income" onClick={() => navigate("/income")}>
            <h3>Income</h3>
          </div>
          <div className="expense" onClick={() => navigate("/expense")}>
            <h3>Expense</h3>
          </div>
        </div>
        <div className="history">
          <h3>
            <u>History</u>
          </h3>
          <table className="naz">
            <thead>
              <tr>
                <th>S. No</th>
                <th>Description</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {loginUserData.history.length > 0 ? (
                loginUserData.history.map((data, ind) => (
                  <tr key={ind}>
                    <td>{ind + 1}</td>
                    <td>{data.description}</td>
                    <td>{data.type}</td>
                    <td>{data.amount} TK</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No History</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
