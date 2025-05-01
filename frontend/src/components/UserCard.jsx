import React, { useEffect, useState } from 'react';
import axios from 'axios';
import{Link} from "react-router-dom"

function UserCard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    axios.get("http://localhost:3000/users")
      .then((res) => {
        console.log("Fetched data:", res.data.users); // Ensure we get "users"
        setUsers(res.data.users);  // Set the users array
      })
      .catch((err) => {
        console.error("Axios fetch error:", err);
        setError("An error occurred while fetching users.");
      });
  }, []);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>; // Show error if fetch fails
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">User List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.length === 0 ? (
          <p className="col-span-full text-center text-lg">No users found.</p>
        ) : (
          users.map((user) => (
            <div key={user._id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
              <img
                src={`http://localhost:3000${user.photo}`}
                alt={user.name}
                className="w-24 h-24 object-cover rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h3>
              <p className="text-gray-600 text-sm">{user.department}</p>
              <p className="text-gray-600 text-sm">{user._id}</p>
              <button>
                <Link to={user._id} >Profile</Link>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserCard;
