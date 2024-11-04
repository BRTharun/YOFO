import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const UserHome = () => {
  return (
    <div className="navbar-section">
      <h1 className="navbar-title">
        <Link to="/">
          YOFO <span className="navbar-sign">+</span>
        </Link>
      </h1>
      <ul className="navbar-items">
        <li><Link to="/user/home" className="navbar-links">Home</Link></li>
        <li><Link to="/user/food" className="navbar-links">Suggested Food</Link></li>
        <li><Link to="/user/yoga" className="navbar-links">Suggested Yoga</Link></li>
        <li><Link to="/user/fooddata" className="navbar-links">Your Food Calories</Link></li>
        <li><Link to="/user/rasa" className="navbar-links">Get Rasa</Link></li>
        <li><Link to="/user/photo" className="navbar-links">Upload Food</Link></li>
        <li className="dropdown">
          <span className="navbar-links">Profile</span>
          <ul className="dropdown-content">
            <li><Link to="/user/see-profile" className="navbar-links">See Profile</Link></li>
            <li><Link to="/user/update-profile" className="navbar-links">Update Profile</Link></li>
            <li><Link to="/user/logout" className="navbar-links">Logout</Link></li>
          </ul>
        </li>
      </ul>
      {/* Add your main content here */}
    </div>
  );
};

export default UserHome;
