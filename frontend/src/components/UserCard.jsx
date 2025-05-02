import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function UserCard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  useEffect(() => {
    axios.get("https://bongshi-19-backend-80v1.onrender.com/users")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.error("Axios fetch error:", err);
        setError("An error occurred while fetching users.");
      });
  }, []);

  // Pagination calculations
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">User List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentUsers.length === 0 ? (
          <p className="col-span-full text-center text-lg">No users found.</p>
        ) : (
          currentUsers.map((user) => (
            <div key={user._id} className="bg-gradient-to-b from-gray-200 to-transparent h-64 w-full shadow-lg rounded-lg p-4 flex flex-col items-center">
              <img
                src={`https://bongshi-19-backend-80v1.onrender.com${user.photo}`}
                alt={user.name}
                className="w-24 h-24 object-cover rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h3>
              <p className="text-gray-600 text-sm">{user.department}</p>
              <div className='p-3'>
                <button className="text-white bg-cyan-500 hover:bg-cyan-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                  <Link to={user._id}>Profile</Link>
                </button>
                <button className="text-white bg-purple-600 hover:bg-purple-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                  <Link to={user.facebook}>Connect</Link>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 space-x-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-sm rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Previous
        </button>

        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num + 1}
            onClick={() => goToPage(num + 1)}
            className={`px-3 py-1 text-sm rounded ${currentPage === num + 1 ? 'bg-blue-700 text-white' : 'bg-gray-200 hover:bg-blue-400'}`}
          >
            {num + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 text-sm rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UserCard;
