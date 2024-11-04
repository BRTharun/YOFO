import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Food.css';

const SeeRecommendedRecipes = () => {
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [recipeResults, setRecipeResults] = useState([]);
  

  useEffect(() => {
    const fetchRecommendedRecipes = async () => {
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
    
            
      
          // Step 2: Use the obtained first disease to fetch recommended recipes
          if (Array.isArray(responseProfile.data.user.diseases) && responseProfile.data.user.diseases.length > 0) {
            const firstDisease = responseProfile.data.user.diseases[0];
            const firstWordBeforeComma = firstDisease.split(',')[0].trim();
            console.log("firstdisease",firstWordBeforeComma);
      
            const response = await axios.post('http://localhost:8000/recipe-recommend/', {
                disease1: firstWordBeforeComma,
                disease2: '', // Keep disease2 as an empty string
                veg: '', // Keep veg as an empty string
              });
      
            console.log('API Response:', response.data);
      
            if (response.data && response.data.recommended_recipes) {
              const recommendedRecipesData = response.data.recommended_recipes;
              setRecommendedRecipes(recommendedRecipesData);
      
              // Call the function to fetch recipes from Edamam API for each recommended recipe
              fetchRecipesFromEdamam(recommendedRecipesData);
            } else {
              console.error('No recommended recipes found in the API response.');
            }
      
            if (response.data && response.data.recipeResults) {
              const recipeResultsData = response.data.recipeResults;
              setRecipeResults(recipeResultsData);
            } else {
              console.error('No recipe results found in the API response.');
            }
          } else {
            console.error('No diseases found in the user profile.');
          }
        } catch (error) {
          console.error('Error fetching recommended recipes', error);
        }
      };
      
      

    const fetchRecipesFromEdamam = async (recipes) => {
      try {
        const recipeResultsArray = [];

        // Loop through each recommended recipe and fetch recipes from Edamam API
        for (const recipe of recipes) {
          const query = encodeURIComponent(recipe); // Encode recipe name for URL
          const response = await axios.get(
            `https://api.edamam.com/search?q=${query}&app_id=a99bd604&app_key=801b3f6953e413a5d229de1043ba6dbd`
          );

          // Push the recipe data into the array
          if (response.data && response.data.hits) {
            recipeResultsArray.push(response.data.hits);
          }
        }

        // Update the recipeResults state with fetched recipes
        setRecipeResults(recipeResultsArray);
        console.log('Recipe Results:', recipeResultsArray);
      } catch (error) {
        console.error('Error fetching recipes from Edamam:', error);
      }
    };

    fetchRecommendedRecipes();
  }, []);

  return (
    <div className={styles.frecipe}>
      <h2>Recommended Recipes</h2>
      <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
  {recommendedRecipes.map((recipe, index) => (
    <li
      key={index}
      className="f-card"
    >
      {recipe}
    </li>
  ))}
</ul>
      <h2>Recipe Results</h2>
      <div className="recipe-card-container">
        {recipeResults.map((recipeResult, index) => {
          if (recipeResult[0]) {
            // Render the card only if recipe data is available
            return (
              <div key={index} className="recipe-card" style={recipeCardStyle}>
                <>
                  <h3 style={recipeTitleStyle}>{recipeResult[0].recipe.label}</h3>
                  <p style={recipeDetailStyle}>Calories: {Math.round(recipeResult[0].recipe.calories)}</p>
                  <p style={recipeDetailStyle}>Carbs: {Math.round(recipeResult[0].recipe.totalDaily.CHOCDF.quantity)}g</p>
                  <p style={recipeDetailStyle}>Fat: {Math.round(recipeResult[0].recipe.totalDaily.FAT.quantity)}g</p>
                  <p style={recipeDetailStyle}>Protein: {Math.round(recipeResult[0].recipe.totalDaily.PROCNT.quantity)}g</p>
                  <div className="recipe-image" style={recipeImageStyle}>
                    <img src={recipeResult[0].recipe.image} alt={recipeResult[0].recipe.label} style={recipeImageStyle} />
                  </div>
                  <a className='form_button' href={recipeResult[0].recipe.url} target="_blank" rel="noopener noreferrer" style={recipeLinkStyle}>
                    View Recipe
                  </a>
                </>
              </div>
            );
          }
          // Don't render the card if no recipe data is available
          return null;
        })}
      </div>
    </div>
  );
};


export default SeeRecommendedRecipes;

const recipeCardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '20px',
  margin: '10px',
  maxWidth: '300px',
  textAlign: 'center',
};

const recipeTitleStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  margin: '10px 0',
};

const recipeDetailStyle = {
  fontSize: '1rem',
  margin: '5px 0',
};

const recipeImageStyle = {
  maxWidth: '100%',
  height: 'auto',
  margin: '10px 0',
};

const recipeIngredientsTitleStyle = {
  fontSize: '1.2rem',
  margin: '10px 0',
};

const recipeIngredientsListStyle = {
  listStyleType: 'disc',
  paddingLeft: '20px',
  margin: '10px 0',
};

const recipeIngredientStyle = {
  fontSize: '0.9rem',
  margin: '5px 0',
};

const recipeLinkStyle = {
  display: 'block',
  fontSize: '1rem',
  textDecoration: 'none',
  color: '#007BFF',
  marginTop: '10px',
};

const recipeNoDataStyle = {
  fontSize: '1rem',
  fontStyle: 'italic',
  color: '#888',
  margin: '10px 0',
};
