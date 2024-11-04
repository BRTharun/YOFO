import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SuggestFood = () => {
  const { userId } = useParams();
  const [recipe, setRecipe] = useState('');
  const [rasaState, setRasaState] = useState('');
  const [storedToken, setStoredToken] = useState('');

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem('dietitianToken');
    console.log('Stored Token in useEffect:', token);
    setStoredToken(token);
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  const handleSuggestFood = () => {
    // Use the stored token
    console.log('Using Stored Token:', storedToken);

    // Send data to the API with the Authorization header
    axios.post(`http://localhost:3000/suggested-diet/${userId}`, {
      recipe,
      rasaState,
    }, {
      headers: {
        'x-auth-token': localStorage.getItem('dietitianToken'),
      },
    })
      .then(response => {
        console.log('Suggested food sent successfully:', response.data);
        // Handle success as needed
      })
      .catch(error => {
        console.error('Error suggesting food:', error);
        // Handle error as needed
      });
  };

  console.log('Stored Token before return:', storedToken);

  return (
    <div>
      <h1>Suggest Food</h1>
      <label>
        Recipe:
        <input type="text" value={recipe} onChange={e => setRecipe(e.target.value)} />
      </label>
      <br />
      <label>
        Rasa State:
        <input type="text" value={rasaState} onChange={e => setRasaState(e.target.value)} />
      </label>
      <br />
      <button onClick={handleSuggestFood}>Submit</button>
    </div>
  );
};

export default SuggestFood;
