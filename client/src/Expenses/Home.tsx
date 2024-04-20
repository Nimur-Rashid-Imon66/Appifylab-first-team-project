import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

interface Expense {
  id: number;
  balance: number;
  history: Transaction[];
}

interface Transaction {
  desc: string;
  amount: number;
  type: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [loginUserID, setLoginUserID] = useState<number>(3);
  const [balance, setBalance] = useState<number>(0);
  const [history, setHistory] = useState<Transaction[]>([]);

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const storedExpenses = localStorage.getItem('expenses');
    return storedExpenses ? JSON.parse(storedExpenses) : (
      []
    )
  });
  console.log(expenses);
  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  }, [expenses]);


  useEffect(() => {
    const loginUserData = expenses.find((user) => loginUserID === user.id);
    console.log(loginUserData)
    if (loginUserData) {
      setBalance(loginUserData.balance);
      setHistory(loginUserData.history);
    } else {
      setExpenses(
        [...expenses,
        { id: loginUserID, balance: 0, history: [] }
        ])
    }
  }, [loginUserID]);

  return (
    <div className="container">
      <div className="innerContainer">
        <h2 style={{ paddingBottom: '20px', color: 'white' }}>Expense Management</h2>
        <div className="currentBalance">
          <h3 className="bal">Current Balance</h3>
          <h1>{balance}</h1>
          <h3 className="tk">TK.</h3>
        </div>
        <div className="income-expense">
          <div className="income" onClick={() => navigate('/income')}>
            <h3>Income</h3>
          </div>
          <div className="expense" onClick={() => navigate('/expense')}>
            <h3>Expense</h3>
          </div>
        </div>
        <div className="history">
          <h3>
            <u>History</u>
          </h3>
          <table>
            <thead>
              <tr>
                <th>S. No</th>
                <th>Description</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {history.length > 0 ? (
                history.map((data, ind) => (
                  <tr key={ind}>
                    <td>{ind + 1}</td>
                    <td>{data.desc}</td>
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
