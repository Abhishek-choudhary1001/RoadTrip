const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Review = require('../models/Review');
const auth = require('../middleware/auth');

// Get all reviews for a trip
router.get('/:tripId', async (req, res) => {
  try {
    const { tripId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(tripId)) {
      return res.status(400).json({ error: 'Invalid trip ID format' });
    }
    const reviews = await Review.find({ trip: tripId })
      .populate('user', 'username')
      .sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (err) {
    console.error('Failed to fetch reviews:', err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Post a new review for a trip
router.post('/:tripId', auth, async (req, res) => {
  try {
    const { text } = req.body;
    const { tripId } = req.params;

    if (!text) return res.status(400).json({ error: 'Text is required' });

    if (!mongoose.Types.ObjectId.isValid(tripId)) {
      return res.status(400).json({ error: 'Invalid trip ID format' });
    }

    const review = new Review({
      trip: new mongoose.Types.ObjectId(tripId),
      user: req.user.id,
      text
    });
    await review.save();
    await review.populate('user', 'username');
    res.json({ review });
  } catch (err) {
    console.error('Failed to add review:', err);
    res.status(500).json({ error: 'Failed to add review' });
  }
});

module.exports = router;
