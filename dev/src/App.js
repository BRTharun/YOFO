import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import HomePage from './HomePage';
import UserSignup from './user/UserSignup';
import UserSignin from './user/UserSignin';
import UserHome from './user/UserHome';
import DietitianSignup from './dietitian/DietitianSignup';
import DietitianSignin from './dietitian/DietitianSignin';
import DietitianHome from './dietitian/DietitianHome';
import SeeProfile from './user/SeeProfile';
import UpdateProfile from './user/UpdateProfile';
import Logout from './user/Logout';
import Rasa from './user/Rasa';
import Yoga from './user/YogaHome';
import Food from './user/FoodHome'
import Photo from './user/Photo';
import FoodData from './user/FoodData';
import GetUsers from './dietitian/GetUsers';
import SuggestFood from './dietitian/SuggestFood';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/signin" element={<UserSignin />} />
        <Route path="/user/home" element={<UserHome />} />
        <Route path="/dietitian/signup" element={<DietitianSignup />}  />
        <Route path="/dietitian/signin" element={<DietitianSignin />} />
        <Route path="/dietitian/home" element={<DietitianHome />}  />
        <Route path="/user/see-profile" element={<SeeProfile />} />
        <Route path="/user/update-profile" element={<UpdateProfile />} />
        <Route path="/user/logout" element={<Logout />}  />
        <Route path="/user/rasa" element={<Rasa/>}  />
        <Route path="/user/yoga" element={<Yoga/>}  />
        <Route path="/user/food" element={<Food/>}  />
        <Route path="/user/photo" element={<Photo/>}  />
        <Route path="/user/fooddata" element={<FoodData/>}  />
        <Route path="/dietitian/suggest-food/:userId" element={<SuggestFood/>}  />
        <Route path="/dietitian/get-users" element={<GetUsers/>}  />
      </Routes>
    </Router>
  );
};

export default App;
