// routes/dietitianRoutes.js
const express = require('express');
const router = express.Router();
const dietitianController = require('../controllers/dietitianController');

router.post('/signup', dietitianController.signup);
router.post('/signin', dietitianController.signin);

module.exports = router;
