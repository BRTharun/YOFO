// routes/suggestedDietRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const dietitianController = require('../controllers/dietitianController');
const suggestedDietController = require('../controllers/suggestedDietController');

// Protect all suggested diet routes
router.use(authMiddleware);

// Create a new suggested diet entry
router.post('/:userId', suggestedDietController.createSuggestedDiet);

// Get all suggested diet entries for the authenticated user
router.get('/', suggestedDietController.getSuggestedDiets);

router.get('/user/:userId', suggestedDietController.getSuggestedDietsForUser);

module.exports = router;
