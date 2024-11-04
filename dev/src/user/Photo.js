import React, { useState } from 'react';
import axios from 'axios';
import Nav from './Nav';
import './Photo.css';



function App() {
  const [image, setImage] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [result, setResult] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    // Display image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      console.error('No image selected.');
      return;
    }

    const imageUrl = encodeURIComponent(image.name); 
    const originalImageName = decodeURIComponent(imageUrl);
    console.log(originalImageName)// Encode the image name to be part of the URL

    try {

      const formData = new FormData();
      formData.append('pic', image); // Append the image file to FormData

      // Other form data fields
      formData.append('quantity', quantity);
      // Send image to the server for prediction
      const predictionResponse = await axios.post(`http://localhost:8000/food-predict/?image_path=${imageUrl}&quantity=${quantity}`);
      const predictionResult = predictionResponse.data;
      console.log("dfj",predictionResult)
      // Store the result in the state

      setResult(predictionResult);

      // Send the data to the server for storage

      const fetchUserProfile = async () => {
        try {
          const storedToken = localStorage.getItem('token');
          console.log('Stored Token:', storedToken);
          if (!storedToken) {
            console.error('No token found. User is not authenticated.');
            return;
          }
      
          const responseUserId = await axios.get('http://localhost:3000/user/profile', {
            headers: {
              'x-auth-token': storedToken,
            },
          });
      
          console.log('User ID Response:', responseUserId.data);
      
          const userId = responseUserId.data.user.id;
          console.log('User ID:', userId);
      
          const responseProfile = await axios.get(`http://localhost:3000/user/profile/${userId}`, {
            headers: {
              'x-auth-token': storedToken,
            },
          });
      
          return responseUserId.data.user.id;
        } catch (error) {
          console.error('Error fetching user profile', error);
          throw error;
        }
      };

      const userId =await fetchUserProfile();
  
      const uploadResponse = await axios.post(
        `http://localhost:3000/user/upload/${userId}`,
        {
          pic: imagePreview,
          quantity,
          date: new Date(),
          time: new Date().toLocaleTimeString(),
          Prediction: predictionResult.Prediction,
          'Protein (g)': predictionResult['Protein (g)'],
          'Carbohydrates (g)': predictionResult['Carbohydrates (g)'],
          'Fat (g)': predictionResult['Fat (g)'],
          'Total_Calories': predictionResult['Total_Calories'],
          Rasa: predictionResult.Rasa,
          Guna: predictionResult.Guna,
          Virya: predictionResult.Virya,
        },
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        }
      );

      console.log('Upload Successful:', uploadResponse.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Nav />
    <div className="app-container">
      
      <h1 className="app-heading">Food Calorie Calculator</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="image" className="label">Upload Image:</label>
          <input type="file" accept="image/*" id="image" onChange={handleImageChange} required className="file-input" />
        </div>
        <div className="form-group">
          <label htmlFor="quantity" className="label">Quantity (grams):</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="quantity-input"
          />
        </div>
        <button type="submit" className="calculate-button">Calculate</button>
      </form>
      {result && (
        <div className="result-container">
          <h2 className="result-heading">Result</h2>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Prediction: {result.Prediction}</h5>
              <p className="card-text">Quantity: {result.Quantity} grams</p>
              <p className="card-text">Protein (g): {result['Protein (g)']}</p>
              <p className="card-text">Carbohydrates (g): {result['Carbohydrates (g)']}</p>
              <p className="card-text">Fat (g): {result['Fat (g)']}</p>
              <p className="card-text">Total Calories: {result['Total_Calories']}</p>
              <p className="card-text">Rasa: {result.Rasa}</p>
              <p className="card-text">Guna: {result.Guna}</p>
              <p className="card-text">Virya: {result.Virya}</p>
              {imagePreview && <img src={imagePreview} alt="Food Preview" className="food-preview" />}
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default App;
