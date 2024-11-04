// controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User Signup
exports.signup = async (req, res) => {
  try {
    const { username, password, name, age, sex, height, weight, diseases, rasaState } = req.body;

    // Validate request body fields here...

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      name,
      age,
      sex,
      height,
      weight,
      diseases,
      rasaState
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

// User Signin
exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate request body fields here...

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET || 'default-secret-key');
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // You may choose to exclude sensitive information like password before sending the response
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

// Update user profile by user ID
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, age, sex, height, weight, diseases,rasaState} = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name,
          age,
          sex,
          height,
          weight,
          diseases,
          rasaState
        },
      },
      { new: true } // Return the updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // You may choose to exclude sensitive information like password before sending the response
    res.json({ message: 'User profile updated successfully.', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};


exports.uploadUserData = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('Request Payload:', req.body);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User found:', user);

    const {
      pic,
      quantity,
      date,
      time,
      Prediction,
      'Protein (g)': Protein,
      'Carbohydrates (g)': Carbohydrates,
      'Fat (g)': Fat,
      'Total_Calories': TotalCalories,
      Rasa,
      Guna,
      Virya,
    } = req.body;

    const newData = {
      pic,
      quantity,
      date,
      time,
      Prediction,
      'Protein (g)': Protein,
      'Carbohydrates (g)': Carbohydrates,
      'Fat (g)': Fat,
      'Total_Calories': TotalCalories,
      Rasa,
      Guna,
      Virya,
    };

    

    user.uploadedData.push(newData);

    console.log('Saving user...');
    await user.save();

    // Check if the file is saved
    if (req.file) {
      console.log('File saved successfully:', req.file.filename);
    } else {
      console.log('No file saved.');
    }

    console.log('User saved successfully');
    res.status(200).json({ message: 'Data uploaded successfully' });
  } catch (error) {
    console.error('Error uploading user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getUploadedData = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.uploadedData);
  } catch (error) {
    console.error('Error fetching uploaded data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};