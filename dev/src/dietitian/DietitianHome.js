import React from 'react';
import { Link } from 'react-router-dom';

const DietitianHome = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/dietitian/home">Home</Link></li>
          <li><Link to="/dietitian/suggest-food">Suggest Food</Link></li>
          <li><Link to="/dietitian/get-users">Get Users</Link></li>
        </ul>
      </nav>
      <h1>Welcome, Dietitian!</h1>
      {/* Add your main content here */}
    </div>
  );
};

export default DietitianHome;
