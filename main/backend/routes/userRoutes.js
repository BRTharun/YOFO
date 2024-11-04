// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const dietitianController = require('../controllers/dietitianController');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);

// Protected route
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// Get user profile by user ID
router.get('/profile/:userId', userController.getUserProfile);


// Your route with Multer middleware
router.post('/upload/:userId', userController.uploadUserData);


router.get('/upload/:userId', userController.getUploadedData);

// Update user profile by user ID
router.put('/profile/:userId', userController.updateUserProfile);


router.get('/profile/:userId', dietitianController.getNormalUserProfile);

router.get('/dietitian/all-users', dietitianController.getAllUsers);

// Get the diet details of a normal user by ID (for dietitians)
router.get('/diet/:userId', dietitianController.getNormalUserDiet);

module.exports = router;


