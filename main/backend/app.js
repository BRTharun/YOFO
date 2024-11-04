// app.js
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('../backend/routes/userRoutes');
const db = require('./db');
const dietRoutes = require('./routes/dietRoutes');
const dietitianRoutes = require('./routes/dietitianRoutes');
const suggestedDietRoutes = require('./routes/suggestedDietRoutes');

require('dotenv').config();

const cors = require('cors');

const app = express();

const multer = require('multer');

// Increase maximum file size
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Increase maximum file size for multer
const upload = multer({ limits: { fileSize: 50 * 1024 * 1024 } });

// Enable CORS for all routes
app.use(cors());

app.use(cors({
  exposedHeaders: ['x-auth-token'], // Allow the 'x-auth-token' header
}));

// Your other routes and middleware...

app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/diet', dietRoutes);
app.use('/dietitian', dietitianRoutes);
app.use('/suggested-diet', suggestedDietRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
