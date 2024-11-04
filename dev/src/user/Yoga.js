import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Yoga.css';

const SeeProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const [predictedAsanas, setPredictedAsanas] = useState([]);
  
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
  
          // Step 3: Send the first disease to the yoga recommendation API
          if (Array.isArray(responseProfile.data.user.diseases) && responseProfile.data.user.diseases.length > 0) {
            const firstDisease = responseProfile.data.user.diseases[0];
            const firstWordBeforeComma = firstDisease.split(',')[0].trim();
            console.log("dlk",firstWordBeforeComma);
            const yogaRecommendationResponse = await fetch('http://localhost:8000/asana-predict', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ user_input_words: firstWordBeforeComma.split(' ') }),
            });
  
            const data = await yogaRecommendationResponse.json();
            setPredictedAsanas(data.predicted_asanas);
          }
        } catch (error) {
          console.error('Error fetching user profile', error);
        }
      };
  
      fetchUserProfile();
    }, []);
  
    return (
      
      <div>
        {/* ... (previous code) */}
        {predictedAsanas.length > 0 && (
          <div>
            <h3 style={{textAlign:'center'}}>Predicted Yoga Asanas:</h3>
            <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
  {predictedAsanas.map((asana, index) => (
    <li
      key={index}
      className="asana-card"
    >
      {asana}
    </li>
  ))}
</ul>
          </div>
        )}
      </div>
    );
  };
  
  export default SeeProfile;