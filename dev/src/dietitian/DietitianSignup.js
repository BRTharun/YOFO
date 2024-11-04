import React, { useState } from 'react';

import axios from 'axios';
import SignupSuccess from './SignupSuccess';
import './DietitianSignup.css';

import { Navigate } from 'react-router-dom';

const DietitianSignup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/dietitian/signup', formData);
      console.log(response.data); // Handle successful signup
      setSignupSuccess(true);

      // Set the token in local storage
      localStorage.setItem('dietitianToken', response.data.token);
      console.log("dfjs", response.data.token)
      setToken(response.data.token);
      console.log("stored",token);
    } catch (error) {
      console.error('Signup failed', error);
      setError('Invalid credentials. Please check your username and password.');
    }finally {
      setLoading(false);
    }
  };

  // Redirect if signup was successful
  if (signupSuccess) {
    return <SignupSuccess />;
  }

  // Redirect if token is present
  if (token) {
    return <Navigate to="/dietitian/home" />;
  }

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
      <form class="dlogin_form">
      <h2>Dietitian Signup</h2>
      
      <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
      <button onClick={handleSignup} disabled={loading}>
            {loading ? 'Signing up...' : 'Signup'}
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
      
    </div>
  );
};

export default DietitianSignup;