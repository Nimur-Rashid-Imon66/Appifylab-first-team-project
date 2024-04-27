import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { OnlineUserContext } from "../App";
import axios from "axios";

interface Expense {
  // id: number;
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
  const { currentLoginUser } =
    useContext(OnlineUserContext);
  const loginUserID = currentLoginUser.userid;
  const [loginUserData, setLoginUserData] = useState<Expense>({
    // id: 0,
    balance: 0,
    history: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          axios.get(`http://localhost:3333/expenseManagement/${loginUserID}`),
          axios.get(`http://localhost:3333/history/${loginUserID}`)
        ]);
        // alert(response1.data)
        const userData: Expense = {
          
          balance: response1.data,
          history: response2.data
        };
        setLoginUserData(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [loginUserID]);
  console.log(loginUserData.history);

  // useEffect(() => {
  //   if (expenses.length > 0) {
  //     localStorage.setItem("expenses", JSON.stringify(expenses));
  //   }
  // }, [expenses]);

  // useEffect(() => {
  //   const loginUserData = expenses.find((user) => loginUserID === user.id);
  //   console.log(loginUserData);
  //   if (loginUserData) {
  //     setBalance(loginUserData.balance);
  //     setHistory(loginUserData.history);
  //   } else {
  //     setExpenses([...expenses, { id: loginUserID, balance: 0, history: [] }]);
  //   }
  // }, [loginUserID]);

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
