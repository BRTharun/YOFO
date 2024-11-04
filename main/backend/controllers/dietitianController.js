// controllers/dietitianController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Dietitian = require('../models/Dietitian');
const User = require('../models/User');
const Diet = require('../models/Diet');

// Dietitian Signup
exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const dietitian = new Dietitian({ username, password: hashedPassword });
    await dietitian.save();
    res.status(201).json({ message: 'Dietitian registered successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Dietitian Signin
exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const dietitian = await Dietitian.findOne({ username });

    if (!dietitian) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isPasswordValid = await bcrypt.compare(password, dietitian.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ dietitian: { id: dietitian._id } }, process.env.JWT_SECRET || 'default-secret-key');
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get the profile of a normal user by ID (for dietitians)
exports.getNormalUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get the diet details of a normal user by ID (for dietitians)
exports.getNormalUserDiet = async (req, res) => {
  try {
    const dietEntries = await Diet.find({ user: req.params.userId });

    if (!dietEntries) {
      return res.status(404).json({ message: 'Diet entries not found.' });
    }

    res.json(dietEntries);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
