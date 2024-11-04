// pages/UploadedDataPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UploadedDataCard from './UploadedDataCard';
import Nav from './Nav';


const UploadedDataPage = () => {
  const [uploadedData, setUploadedData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUploadedData = async () => {
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

      setUploadedData(responseUploadedData.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching uploaded data', error);
    }
  };

  useEffect(() => {
    fetchUploadedData();
  }, []);

  return (
    <div className="uploaded-data-page">
      <Nav/>
      <h1>Uploaded Data Page</h1>
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : (
        <div className="card-container">
          {uploadedData.map((data) => (
            <UploadedDataCard key={data._id} data={data} />
          ))}
        </div>
      )}
    </div>
  );
};


export default UploadedDataPage;
