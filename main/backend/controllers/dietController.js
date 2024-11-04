// controllers/dietController.js
const Diet = require('../models/Diet');

// Create a new diet entry
exports.createDietEntry = async (req, res) => {
  try {
    const { dishName, servingSizeInGms, photo, time } = req.body;
    const dietEntry = new Diet({
      user: req.user.id, // Link to the authenticated user
      dishName,
      servingSizeInGms,
      photo,
      time,
    });
    await dietEntry.save();
    res.status(201).json({ message: 'Diet entry created successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a diet entry by ID
exports.updateDietEntry = async (req, res) => {
  try {
    const { dishName, servingSizeInGms, photo, time } = req.body;
    const dietEntry = await Diet.findByIdAndUpdate(
      req.params.id,
      {
        dishName,
        servingSizeInGms,
        photo,
        time,
      },
      { new: true }
    );

    if (!dietEntry) {
      return res.status(404).json({ message: 'Diet entry not found.' });
    }

    res.json({ message: 'Diet entry updated successfully.', dietEntry });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a diet entry by ID
exports.deleteDietEntry = async (req, res) => {
  try {
    const dietEntry = await Diet.findByIdAndRemove(req.params.id);

    if (!dietEntry) {
      return res.status(404).json({ message: 'Diet entry not found.' });
    }

    res.json({ message: 'Diet entry deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all diet entries for a user
exports.getDietEntries = async (req, res) => {
  try {
    const dietEntries = await Diet.find({ user: req.user.id });
    res.json(dietEntries);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
