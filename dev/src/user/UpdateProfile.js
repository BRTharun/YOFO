import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateProfile.css';
import Nav from './Nav';

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sex: '',
    height: '',
    weight: '',
    diseases: '',
    rasaState: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        console.log('Stored Token:', storedToken);
        if (!storedToken) {
          console.error('No token found. User is not authenticated.');
          return;
        }
    
        // Step 1: Get user ID
        const responseUserId = await axios.get('http://localhost:3000/user/profile', {
          headers: {
            'x-auth-token': storedToken,
          },
        });
    
        // Step 2: Use the obtained user ID to fetch the detailed profile
        const userId = responseUserId.data.user.id;
        const responseProfile = await axios.get(`http://localhost:3000/user/profile/${userId}`, {
          headers: {
            'x-auth-token': storedToken,
          },
        });
    
        const userProfile = responseProfile.data.user;
        setFormData({
          name: userProfile.name,
          age: userProfile.age,
          sex: userProfile.sex,
          height: userProfile.height,
          weight: userProfile.weight,
          diseases: Array.isArray(userProfile.diseases) ? userProfile.diseases.join(', ') : '',
          rasaState: userProfile.rasaState,
        });
      } catch (error) {
        console.error('Error fetching user profile', error);
      }
    };
    
    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      const userIdResponse = await axios.get('http://localhost:3000/user/profile', {
        headers: {
          'x-auth-token': storedToken,
        },
      });

      const userId = userIdResponse.data.user.id;

      await axios.put(`http://localhost:3000/user/profile/${userId}`, formData, {
        headers: {
          'x-auth-token': storedToken,
        },
      });

      console.log('Profile updated successfully');
      // Optionally, you can redirect the user or show a success message
    } catch (error) {
      console.error('Error updating user profile', error);
    }
  };

  return (
    <div>
      <Nav/>
    <div className="update-profile-container">
      <div className="profile-form">
        <h2>Update Profile</h2>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />

        <label>Age:</label>
        <input type="text" name="age" value={formData.age} onChange={handleInputChange} />

        <label>Sex:</label>
        <input type="text" name="sex" value={formData.sex} onChange={handleInputChange} />

        <label>Height:</label>
        <input type="text" name="height" value={formData.height} onChange={handleInputChange} />

        <label>Weight:</label>
        <input type="text" name="weight" value={formData.weight} onChange={handleInputChange} />

        <label>Diseases:</label>
        <input type="text" name="diseases" value={formData.diseases} onChange={handleInputChange} />

        <label>Rasa State:</label>
        <input type="text" name="rasaState" value={formData.rasaState} onChange={handleInputChange} />

        <button onClick={handleUpdateProfile}>Update Profile</button>
      </div>
    </div>
    </div>
  );
};

export default UpdateProfile;
