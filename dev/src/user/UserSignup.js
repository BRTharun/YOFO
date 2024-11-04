import React, { useState } from 'react';
import axios from 'axios';
import SignupSuccess from './SignupSuccess';
import "./UserSignup.css"

const UserSignup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    age: '',
    sex: '',
    height: '',
    weight: '',
    diseases: [],
  });
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/user/signup', formData);
      console.log(response.data); // Handle successful signup
      setSignupSuccess(true);
    } catch (error) {
      console.error('Signup failed', error);
      setError('Invalid credentials. Please check your username and password.');
    }finally {
      setLoading(false);
    }
  };

  const styles = {
    body: {
      height: '100%',
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
      {signupSuccess ? (
        <SignupSuccess />
      ) : (
        
        <div>
          
          <form class="llogin_form">
          <h1>User Signup</h1>
          <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
          <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
          <input type="text" name="name" placeholder="Name" onChange={handleInputChange} />
          <input type="text" name="age" placeholder="Age" onChange={handleInputChange} />
          <input type="text" name="sex" placeholder="Sex" onChange={handleInputChange} />
          <input type="text" name="height" placeholder="Height" onChange={handleInputChange} />
          <input type="text" name="weight" placeholder="Weight" onChange={handleInputChange} />
          <input type="text" name="diseases" placeholder="Diseases (comma-separated)" onChange={handleInputChange} />
          
          <button onClick={handleSignup} disabled={loading}>
            {loading ? 'Signing up...' : 'Signup'}
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
          
        </div>
      )}
    </div>
  );
};

export default UserSignup;
