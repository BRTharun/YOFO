// components/UploadedDataCard.js
import React from 'react';
import './UploadedDataCard.css'; // Adjust the path based on your project structure

const UploadedDataCard = ({ data }) => {

  const PIC = data.pic.substring(data.pic.indexOf(',') + 1);
  console.log(PIC)
  
  return (
    <div className="uploaded-data-card">
      <h3>Uploaded Data</h3>
      <div className="card-content">
        <div className="image-container">
          <p>Image:</p>
          <img src={data.pic} alt="Uploaded Food" />
          <img src={`PIC:image/jpeg;base64,${PIC}`} alt="Uploaded Food" />
        
        </div>
        <div className="data-details">
          <p>Quantity: {data.quantity} grams</p>
          <p>Date: {new Date(data.date).toLocaleDateString()}</p>
          <p>Time: {data.time}</p>
          <p>Prediction: {data.Prediction}</p>
          <p>Protein (g): {data['Protein (g)']}</p>
          <p>Carbohydrates (g): {data['Carbohydrates (g)']}</p>
          <p>Fat (g): {data['Fat (g)']}</p>
          <p>Total Calories: {data['Total_Calories']}</p>
          <p>Rasa: {data.Rasa}</p>
          <p>Guna: {data.Guna}</p>
          <p>Virya: {data.Virya}</p>
          {/* Add other data fields as needed */}
        </div>
      </div>
    </div>
  );
};

export default UploadedDataCard;
