// models/Diet.js
const mongoose = require('mongoose');

const dietSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dishName: { type: String, required: true },
  servingSizeInGms: { type: Number, required: true },
  photo: String, // You can store the photo URL or use a file storage service
  time: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Diet', dietSchema);
