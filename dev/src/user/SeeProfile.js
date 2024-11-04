import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SeeProfile.css';
import Nav from './Nav';


const SeeProfile = () => {
  const [profileData, setProfileData] = useState(null);

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
    
        setProfileData(responseProfile.data.user);
      } catch (error) {
        console.error('Error fetching user profile', error);
      }
    };
    
      

    fetchUserProfile();
  }, []);

  return (
    <div>
      <Nav/>
      <div className="see-profile-container">
      {profileData ? (
        <div className="profile-info">
          <div className="profile-info-header">User Profile</div>
          <div className="profile-info-body">
            <p className="profile-info-label">Name:</p>
            <p className="profile-info-value">{profileData.name}</p>

            <p className="profile-info-label">Age:</p>
            <p className="profile-info-value">{profileData.age}</p>

            <p className="profile-info-label">Sex:</p>
            <p className="profile-info-value">{profileData.sex}</p>

            <p className="profile-info-label">Height:</p>
            <p className="profile-info-value">{profileData.height}</p>

            <p className="profile-info-label">Weight:</p>
            <p className="profile-info-value">{profileData.weight}</p>

            <p className="profile-info-label">Diseases:</p>
            <p className="profile-info-value">
              {Array.isArray(profileData.diseases) ? profileData.diseases.join(', ') : 'No diseases'}
            </p>

            <p className="profile-info-label">Rasa State:</p>
            <p className="profile-info-value">{profileData.rasaState}</p>
          </div>
        </div>
      ) : (
        <p className="loading-text">Loading...</p>
      )}
    </div>
    </div>
  );
};

export default SeeProfile;
