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
  const expenses: Expense[] = [
    {
      id: 1,
      balance: 1000,
      history: [
        {
          desc: 'food',
          amount: 50,
          type: 'expense',
        },
        {
          desc: 'party',
          amount: 100,
          type: 'expense',
        },
        {
          desc: 'salary',
          amount: 3000,
          type: 'income',
        },
      ],
    },
    {
      id: 2,
      balance: 2000,
      history: [
        {
          desc: 'car',
          amount: 200,
          type: 'expense',
        },
        {
          desc: 'rent',
          amount: 500,
          type: 'expense',
        },
        {
          desc: 'salary',
          amount: 2000,
          type: 'income',
        },
      ],
    },
    {
      id: 3,
      balance: 3000,
      history: [
        {
          desc: 'food',
          amount: 30,
          type: 'expense',
        },
        {
          desc: 'groceries',
          amount: 70,
          type: 'expense',
        },
        {
          desc: 'freelance',
          amount: 600,
          type: 'income',
        },
      ],
    },
  ];

  const [loginUserID, setLoginUserID] = useState<number>(2);
  const [balance, setBalance] = useState<number>(0);
  const [history, setHistory] = useState<Transaction[]>([]);

  useEffect(() => {
    const loginUserData = expenses.find((user) => loginUserID === user.id);
    if (loginUserData) {
      setBalance(loginUserData.balance);
      setHistory(loginUserData.history);
    }
  }, [loginUserID]);

  return (
    <div className="container">
      <div className="innerContainer">
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
