// models/SuggestedDiet.js
const mongoose = require('mongoose');

const suggestedDietSchema = new mongoose.Schema({
  dietitian: { type: mongoose.Schema.Types.ObjectId, ref: 'Dietitian', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipe: { type: String, required: true },
  rasaState: { type: String, enum: ['kapha', 'pitha', 'vatha'], required: true },
  suggestedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SuggestedDiet', suggestedDietSchema);
