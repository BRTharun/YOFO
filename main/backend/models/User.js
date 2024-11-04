// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String },
  age: { type: Number },
  sex: { type: String },
  height: { type: Number },
  weight: { type: Number },
  diseases: [{ type: String }],
  rasaState: { type: String },
  uploadedData: [
    {
      pic: Buffer,
      quantity: String,
      date: Date,
      time: String,
      Prediction: String,
      'Protein (g)': String,
      'Carbohydrates (g)': String,
      'Fat (g)': String,
      'Total_Calories': String,
      Rasa: String,
      Guna: String,
      Virya: String,
      // Add more fields as needed
    },
  ],
  // Add more user fields as needed
});

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, age, sex, height, weight, diseases, rasaState, photos } = req.body;

    const updatedFields = {
      name,
      age,
      sex,
      height,
      weight,
      diseases,
      rasaState,
      photos,
    };

    const user = await User.findByIdAndUpdate(req.user.id, { $set: updatedFields }, { new: true });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

module.exports = mongoose.model('User', userSchema);
