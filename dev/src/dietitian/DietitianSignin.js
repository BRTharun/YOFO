import React, { useState } from 'react';

import axios from 'axios';
import DietitianHome from './DietitianHome';
import { Navigate } from 'react-router-dom';
import './DietitianSignin.css';

const DietitianSignin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [signinSuccess, setSigninSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/dietitian/signin', formData);
      console.log(response.data); // Handle successful signin

      localStorage.setItem('dietitianToken', response.data.token);
      console.log("sent",response.data.token)
      setSigninSuccess(true);
    } catch (error) {
      console.error('Signin failed', error);
      setError('Invalid credentials. Please check your username and password.');
    }finally {
      setLoading(false);
    }
  };

  const styles = {
    body: {
      height: '100vh',
      background: 'url(https://images.unsplash.com/photo-1622667042273-e0e54442440a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      fontFamily: 'poppins',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  return (
    <div style={styles.body}>
      {signinSuccess ? (
        <Navigate to="/dietitian/home" />
      ) : (
        <div>
          <form class="idlogin_form">
          <h2>Dietitian Signin</h2>
          <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
          <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
          <button onClick={handleSignin} disabled={loading}>
            {loading ? 'Signing in...' : 'Signin'}
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default DietitianSignin;