import React, { useState, useEffect, useContext } from 'react';
import './form.css';
import { useNavigate } from 'react-router-dom';
import { OnlineUserContext } from '../App';
import axios from 'axios';

interface Transaction {
  description: string;
  amount: number;
  type: string;
}

const Income: React.FC = () => {
  const navigate = useNavigate();
  const { currentLoginUser } = useContext(OnlineUserContext);
  const loginUserID = currentLoginUser.userid;
  
  const [balance, setBalance] = useState<number>(0);
  const [amountdesc, setAmountDesc] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<number>(`http://localhost:3333/expenseManagement/${loginUserID}`);
        setBalance(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [loginUserID]);

  const handleIncome = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    if (!amountdesc.trim()) {
      alert('Please enter a description.');
      return;
    }
    const newBalance = balance + amount;
    const historyData: Transaction = {
      amount: amount,
      description: amountdesc,
      type: 'Income'
    };

    try {
      await Promise.all([

        axios.post(`http://localhost:3333/expenseManagement/${loginUserID}`, { balance: newBalance }),
        axios.post(`http://localhost:3333/history/${loginUserID}`, historyData)
      ]);
      setTimeout(() => {
        alert('Income added successfully!');
        navigate("/expense-management");
      }, 300);
    } catch (errors) {
      console.error("Errors occurred:", errors);
      if (errors[0] && errors[0].response) {
        console.error("Error updating balance:", errors[0].response.data);
        alert('An error occurred while updating balance.');
      }
      if (errors[1] && errors[1].response) {
        console.error("Error adding income to history:", errors[1].response.data);
        alert('An error occurred while adding income to history.');
      }
    }
  };

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
  };
  const handleAmountDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountDesc(e.target.value);
  };
  return (
    <div className="container">
      <div className="incomeContainer centered">
        <form onSubmit={handleIncome}>
          <div className="input-group">
            <label>Description:</label>
            <input
              type="text"
              name="income_description"
              value={amountdesc}
              onChange={handleAmountDesc}
              placeholder="Enter description"
              required
            />
          </div>
          <div className="input-group">
            <label>Amount:</label>
            <input
              type='number'
              name="income_amount"
              value={amount}
              onChange={handleAmount}
              placeholder="Enter amount"
              min="0"
              step="0.01"
              required />
          </div>
          <button type="submit" className="inc">
            {" "}
            Add{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Income;
