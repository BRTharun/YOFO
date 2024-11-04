// controllers/suggestedDietController.js
const { request } = require('express');
const SuggestedDiet = require('../models/SuggestedDiet');
const mongoose = require('mongoose');


// Create a new suggested diet entry
exports.createSuggestedDiet = async (req, res) => {
  try {
    const { recipe, rasaState } = req.body;
    const suggestedDiet = new SuggestedDiet({
      dietitian: req.userId, // Use req.userId to get the authenticated user's ID
      user: req.params.userId, // Link to the user for whom the diet is suggested
      recipe,
      rasaState,
    });
    await suggestedDiet.save();
    console.log('Suggested diet created successfully.'); // Added server log
    res.status(201).json({ message: 'Suggested diet created successfully.' });
    console.log("dfsdskf",request.userId)
  } catch (error) {
    console.error('Error creating suggested diet:', error); // Added server log
    res.status(500).json({ error: 'Server error' });
    console.log("fsdf",request.userId)
  }
};

// Get all suggested diet entries for the authenticated user (dietitian)
exports.getSuggestedDiets = async (req, res) => {
  try {
    const suggestedDiets = await SuggestedDiet.find({ dietitian: req.userId }); // Use req.userId here as well
    console.log('Retrieved suggested diets successfully.'); // Added server log
    res.json(suggestedDiets);
  } catch (error) {
    console.error('Error retrieving suggested diets:', error); // Added server log
    res.status(500).json({ error: 'Server error' });
  }
};

;

const { ObjectId } = require('mongoose').mongo;


exports.getSuggestedDietsForUser = async (req, res) => {
  const { userId } = req.params;
  console.log('User ID from URL:', userId);
  try {
    // Create an ObjectId instance
    const userObjectId = new ObjectId(userId);

    const suggestedDiets = await SuggestedDiet.find({ user: userObjectId, dietitian: req.userId });
    console.log(`Retrieved suggested diets for user ${userId} successfully.`, suggestedDiets);
    res.json(suggestedDiets);
  } catch (error) {
    console.error(`Error retrieving suggested diets for user ${userId}:`, error);
    res.status(500).json({ error: 'Server error' });
  }
};

