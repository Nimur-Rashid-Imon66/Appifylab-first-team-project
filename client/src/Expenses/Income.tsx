import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './form.css'

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

const Income: React.FC = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const storedExpenses = localStorage.getItem('expenses');
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });
  const [loginUserID, setLoginUserID] = useState<number>(3);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const User: Expense[] = expenses.filter((usr) => usr.id === loginUserID);
  const [balance, setBalance] = useState<number>(User.length > 0 ? User[0].balance : 0);
  const [amountdesc, setAmountDesc] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const handleIncome = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newBalance = balance + parseFloat(amount);
    setBalance(newBalance);
    const updatedExpenses = expenses.map(expense => {
      if (expense.id === loginUserID) {
        expense.history.push({
          amount: parseFloat(amount),
          desc: amountdesc,
          type: 'Income'
        })
        return { ...expense, balance: newBalance };
      }
      return expense;
    });
    setExpenses(updatedExpenses);
    setTimeout(() => {
      alert('Done!');
      navigate('/');
    }, 300);
  };

  const handleAmmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };
  const handleAmmountDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountDesc(e.target.value);
  };
  return (
    <div className="container">
      <div className='incomeContainer centered'>
        <form onSubmit={handleIncome}>
          <div className="input-group">
            <label>Description:</label>
            <input
              type='text'
              name='income_description'
              value={amountdesc}
              onChange={handleAmmountDesc}
              placeholder="Enter description" />
          </div>
          <div className="input-group">
            <label>Amount:</label>
            <input
              type='text'
              name='income_amount'
              value={amount}
              onChange={handleAmmount}
              placeholder="Enter amount" />
          </div>
          <button type="submit" className='inc'> Add </button>

        </form>
      </div>
    </div>
  )
}

export default Income


