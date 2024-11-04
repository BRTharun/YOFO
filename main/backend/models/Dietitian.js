// models/Dietitian.js
const mongoose = require('mongoose');

const dietitianSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  // Add more dietitian fields as needed
});

module.exports = mongoose.model('Dietitian', dietitianSchema);
