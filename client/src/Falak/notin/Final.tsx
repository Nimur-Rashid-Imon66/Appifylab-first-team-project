import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Final = () => {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('id');



  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <select
            className="mr-2 px-2 py-1 border border-gray-300 bg-white rounded-md"
            value={searchBy}
       
          >
            <option value="id">Account ID</option>
            <option value="name">Name</option>
          </select>
          <input
            type="text"
            placeholder={`Search by ${searchBy}`}
            className="px-2 py-1 border border-gray-300 bg-white rounded-md"
            value={searchTerm}
           
          />
        </div>

        <Link className="btn bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-4" to='/AddUser'>Add User</Link>
      </div>
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Tags</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* {filteredData.map((user) => (
            <tr key={user.uuid} className="border">
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.uuid}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{parseFloat(user.AmountBDT).toFixed(2)}</td>
              <td className="border px-4 py-2 mx-auto">
                <div className='flex flex-row gap-2 justify-center '>
                  <Link to={`/transaction/${user.uuid}`} className="text-gray-500 hover:text-gray-700 bg-gray-200 px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-300">Transaction</Link>
                  <Link to={`/deposit/${user.uuid}`} className="text-gray-500 hover:text-gray-700 bg-gray-200 px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-300">Deposit</Link>
                  <Link to={`/withdraw/${user.uuid}`} className="text-gray-500 hover:text-gray-700 bg-gray-200 px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-300">Withdraw</Link>
                </div>
              </td>
              <td className="border px-4 py-2">
                <Link to={`/userDetails/${user.uuid}`}>Details</Link>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default Final;
