// backend/routes/userroutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

// READ all users (admin only, optional)
router.get('/', auth, async (req, res) => {
  try {
    // Optionally, check if req.user is admin here
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ a single user by ID (authenticated)
router.get('/:id', auth, async (req, res) => {
  try {
    // Only allow user to see their own profile, or add admin logic
    if (req.user.id !== req.params.id /* && !req.user.isAdmin */) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a user (authenticated, only self)
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.user.id !== req.params.id /* && !req.user.isAdmin */) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const updateData = { ...req.body };
    // If password is being updated, hash it
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a user (authenticated, only self)
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.id !== req.params.id /* && !req.user.isAdmin */) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
