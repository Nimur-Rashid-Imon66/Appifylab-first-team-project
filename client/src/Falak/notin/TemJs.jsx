import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function TemJs() {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("id");

  useEffect(() => {
    const dataFromLocalStorage = Object.entries(localStorage).map(
      ([key, value]) => {
        // console.log('from user table key,value',key,value);
        return { uuid: key, ...JSON.parse(value) };
      }
    );
    //todo : jar uuid history take filter kore bad dia
    // aro ek ta id nite hobe
    setUserData(dataFromLocalStorage);
  }, []);

  //   const handleTransaction = (uuid) => {
  //     //TODO Laterrr
  //     console.log(`Transaction UUID: ${uuid}`);
  //   };

  const filteredData = userData.filter((user) => {
    if (searchBy === "id") {
      return user?.uuid?.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchBy === "name") {
      return user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  //   const handleAddUser = () => {
  //    // TODO
  //     console.log('Add User clicked');
  //   };
  const typedata = {
    deposit: "deposit",
    withdraw: "withdraw",
    history: "history",
  };
  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <select
            className="mr-2 px-2 py-1 border border-gray-300 bg-white rounded-md"
            value={searchBy}
            onChange={handleSearchByChange}
          >
            <option value="id">Acount ID</option>
            <option value="name">Name</option>
          </select>
          <input
            type="text"
            placeholder={`Search by ${searchBy}`}
            className="px-2 py-1 border border-gray-300 bg-white rounded-md"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <Link
          className="btn bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-4"
          to="AddUser"
        >
          Add User
        </Link>
      </div>
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Account ID</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">AmountBDT</th>
            <th className="border px-4 py-2">Action</th>
            <th className="border px-4 py-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(
            (user) =>
              user.uuid !== typedata.history &&
              user.uuid !== typedata.withdraw &&
              user.uuid !== typedata.deposit &&
              localStorage.getItem(user.uuid) && (
                <tr key={user.uuid} className="border">
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.uuid}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">
                    {parseFloat(user.AmountBDT).toFixed(2)}
                  </td>
                  <td className="border px-4 py-2 mx-auto">
                    <div className="flex flex-row gap-2 justify-center ">
                      <Link
                        to={`/transaction/${user.uuid}`}
                        className="text-gray-500 hover:text-gray-700 bg-gray-200 px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-300"
                      >
                        Transaction
                      </Link>
                      <Link
                        to={`/deposit/${user.uuid}`}
                        className="text-gray-500 hover:text-gray-700 bg-gray-200 px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-300"
                      >
                        Deposit
                      </Link>
                      <Link
                        to={`/withdraw/${user.uuid}`}
                        className="text-gray-500 hover:text-gray-700 bg-gray-200 px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-300"
                      >
                        Withdraw
                      </Link>
                    </div>
                  </td>
                  <td className="border px-4 py-2">
                    <Link to={`/userDelails/${user.uuid}`}>Delails</Link>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
}
