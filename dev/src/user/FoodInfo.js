// pages/DietDataPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UploadedDataCard from './UploadedDataCard';
import Nav from './Nav';
import './FoodInfo.css';

const DietDataPage = () => {
  const [dietData, setDietData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDietData = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        console.error('No token found. User is not authenticated.');
        return;
      }

      // Fetch user ID
      const responseUserId = await axios.get('http://localhost:3000/user/profile', {
        headers: {
          'x-auth-token': storedToken,
        },
      });
      const userId = responseUserId.data.user.id;

      // Fetch uploaded data using the user ID
      const responseUploadedData = await axios.get(`http://localhost:3000/user/upload/${userId}`, {
        headers: {
          'x-auth-token': storedToken,
        },
      });

      setDietData(responseUploadedData.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching diet data', error);
    }
  };

  useEffect(() => {
    fetchDietData();
  }, []);

  // Aggregate data date-wise
  const aggregatedData = dietData.reduce((acc, data) => {
    const date = new Date(data.date).toLocaleDateString();

    if (!acc[date]) {
      acc[date] = {
        data: [],
        totalCalories: 0,
        totalProtein: 0,
        totalFat: 0,
        totalCarbohydrates: 0,
      };
    }

    acc[date].data.push(data);
    acc[date].totalCalories += parseFloat(data['Total_Calories'] || 0);
    acc[date].totalProtein += parseFloat(data['Protein (g)'] || 0);
    acc[date].totalFat += parseFloat(data['Fat (g)'] || 0);
    acc[date].totalCarbohydrates += parseFloat(data['Carbohydrates (g)'] || 0);

    return acc;
  }, {});

  // Sort dates in reverse order (from latest to oldest)
  const sortedDates = Object.keys(aggregatedData).sort((a, b) => new Date(b) - new Date(a));

  return (
    <div className="diet-data-page">
      <Nav />
      <h1>Diet Data </h1>
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : (
        <div>
          {sortedDates.map((date) => {
            const data = aggregatedData[date];
  
            return (
              <div key={date} className="circular-trackers-container">
                <h3>{date}</h3>
                <div className="circular-tracker">
                  <div className="circular-progress" style={{ transform: `rotate(${(data.totalCalories / 2000) * 360}deg)` }}></div>
                  <div className="circular-number">{data.totalCalories.toFixed(2)} Cal</div>
                  <div className="circular-label">Calories</div>
                </div>
  
                <div className="circular-tracker">
                  <div className="circular-progress" style={{ transform: `rotate(${(data.totalProtein / 100) * 360}deg)` }}></div>
                  <div className="circular-number">{data.totalProtein.toFixed(2)} g</div>
                  <div className="circular-label">Protein</div>
                </div>
  
                <div className="circular-tracker">
                  <div className="circular-progress" style={{ transform: `rotate(${(data.totalFat / 70) * 360}deg)` }}></div>
                  <div className="circular-number">{data.totalFat.toFixed(2)} g</div>
                  <div className="circular-label">Fat</div>
                </div>
  
                <div className="circular-tracker">
                  <div className="circular-progress" style={{ transform: `rotate(${(data.totalCarbohydrates / 300) * 360}deg)` }}></div>
                  <div className="circular-number">{data.totalCarbohydrates.toFixed(2)} g</div>
                  <div className="circular-label">Carbs</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};



export default DietDataPage;
