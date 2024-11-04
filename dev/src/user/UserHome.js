import React from 'react';

import './UserHome.css';
import Nav from './Nav';
import Yoga from './Yoga';
import Food from './Food';
import DietDataPage from './FoodInfo';

const UserHome = () => {
  return (
    <div className="home-section">
      <DietDataPage/>
      <Food/>
      <Yoga/>
    </div>

  );
};

export default UserHome;
