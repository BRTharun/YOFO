// GetUsers.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const GetUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user details from your API
    axios.get('http://localhost:3000/user//dietitian/all-users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <strong>Username:</strong> {user.username}<br />
            <strong>Name:</strong> {user.name || 'N/A'}<br />
            <strong>Age:</strong> {user.age || 'N/A'}<br />
            <strong>Sex:</strong> {user.sex || 'N/A'}<br />
            <strong>Height:</strong> {user.height || 'N/A'}<br />
            <strong>Weight:</strong> {user.weight || 'N/A'}<br />
            <strong>Diseases:</strong> {user.diseases.length > 0 ? user.diseases.join(', ') : 'None'}<br />
            <strong>Rasa State:</strong> {user.rasaState || 'N/A'}<br />
            {/* Add other user details */}
            <Link to={`/dietitian/suggest-food/${user._id}`}>
  <button>Suggest Food</button>
</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetUsers;
