import React, { useState, useEffect, useContext } from 'react';
import './form.css'
import { useNavigate } from 'react-router-dom';
import { OnlineUserContext } from '../App';

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

const Expense: React.FC = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const storedExpenses = localStorage.getItem('expenses');
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  }); 

  const { currentLoginUser, setCurrentLoginUser } =
    useContext(OnlineUserContext);
  const loginUserID = parseInt(currentLoginUser);
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const User: Expense[] = expenses.filter((usr) => usr.id === loginUserID);
  const [balance, setBalance] = useState<number>(User.length > 0 ? User[0].balance : 0);
  const [amountdesc, setAmountDesc] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const hanldeExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newBalance = balance - parseFloat(amount);
    setBalance(newBalance);
    const updatedExpenses = expenses.map(expense => {
      if (expense.id === loginUserID) {
        expense.history.push({
          amount: parseFloat(amount),
          desc: amountdesc,
          type: 'Expense'
        })
        return { ...expense, balance: newBalance };
      }
      return expense;
    });
    setExpenses(updatedExpenses);
    setTimeout(() => {
      alert('Done!');
      navigate("/expense-management");
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
      <div className='expenseContainer centered'>
        <form onSubmit={hanldeExpense}>
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
          <button type="submit" className='exp'> Expense </button>
        </form>
      </div>
    </div>
  );
};

export default Expense;
