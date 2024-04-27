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

const Expense: React.FC = () => {
  const navigate = useNavigate();
  const { currentLoginUser } = useContext(OnlineUserContext);
  const loginUserID = currentLoginUser.userid;

  const [balance, setBalance] = useState<number>(0);
  const [amountdesc, setAmountDesc] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<number>(`http://localhost:3333/expenseManagement/${loginUserID}/balance`);
        setBalance(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [loginUserID]);

  const handleExpense = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    if (!amountdesc.trim()) {
      alert('Please enter a description.');
      return;
    }
    setIsLoading(true);
    const newBalance = balance - amount;
    console.log(balance, newBalance)
    const historyData: Transaction = {
      amount: amount,
      description: amountdesc,
      type: 'Expense'
    };

    try {
      await Promise.all([
        axios.post(`http://localhost:3333/expenseManagement/${loginUserID}`, { balance: newBalance }),
        axios.post(`http://localhost:3333/history/${loginUserID}`, historyData)
      ]);
    } catch (errors) {
      console.error("Errors occurred:", errors);
      if (errors[0] && errors[0].response) {
        console.error("Error updating balance:", errors[0].response.data);
        alert('An error occurred while updating balance.');
      }
      if (errors[1] && errors[1].response) {
        console.error("Error adding expense to history:", errors[1].response.data);
        alert('An error occurred while adding expense to history.');
      }
    } finally {
      setIsLoading(false);
      alert('Income added successfully!');
      navigate("/expense-management");
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
      <div className='expenseContainer centered'>
        <form onSubmit={handleExpense}>
          <div className="input-group">
            <label>Description:</label>
            <input
              type='text'
              name='expense_description'
              value={amountdesc}
              onChange={handleAmountDesc}
              placeholder="Enter description"
              required />
          </div>
          <div className="input-group">
            <label>Amount:</label>
            <input
              type='number'
              name="income_amount"
              value={amount !== 0 ? amount : ''}
              onChange={handleAmount}
              placeholder="Enter amount"
              required />
          </div>
          <button type="submit" className='exp' disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Add Income'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Expense;
