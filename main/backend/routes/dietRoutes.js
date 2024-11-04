// routes/dietRoutes.js
const express = require('express');
const router = express.Router();
const dietController = require('../controllers/dietController');
const authMiddleware = require('../middleware/auth');

// Protect all diet routes
router.use(authMiddleware);

// Create a new diet entry
router.post('/', dietController.createDietEntry);

// Update a diet entry by ID
router.put('/:id', dietController.updateDietEntry);

// Delete a diet entry by ID
router.delete('/:id', dietController.deleteDietEntry);

// Get all diet entries for the authenticated user
router.get('/', dietController.getDietEntries);

module.exports = router;
