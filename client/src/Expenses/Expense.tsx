import React, { useState } from 'react';
import './form.css'


const Expense: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [ammountdesc, setAmmountDesc] = useState<string>('');
  const [ammount, setAmmount] = useState<string>('');

  const hanldeExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBalance(prevBalance => prevBalance - parseFloat(ammount));
  };
  const handleAmmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmmount(e.target.value);
  };
  const handleAmmountDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmmountDesc(e.target.value);
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
              value={ammountdesc}
              onChange={handleAmmountDesc}
              placeholder="Enter description" />
          </div>
          <div className="input-group">
            <label>Amount:</label>
            <input
              type='text'
              name='income_amount'
              value={ammount}
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
