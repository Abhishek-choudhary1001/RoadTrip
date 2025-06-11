const express = require('express');
const router = express.Router();
const RoadTrip = require('../models/RoadTrip');
const auth = require('../middleware/auth'); // <-- Add this line

// CREATE a road trip (protected)
router.post('/', auth, async (req, res) => {
  try {
    const roadTrip = await RoadTrip.create({
      ...req.body,
      createdBy: req.user.id
    });
    res.status(201).json(roadTrip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/roadtrips/my - Get trips created by the logged-in user
router.get('/my', auth, async (req, res) => {
  console.log("Current user id:",eq.user.id);
  try {
    const myTrips = await RoadTrip.find({ createdBy: req.user.id })
      .populate('createdBy', 'username')
      .populate('participants', 'username')
      .populate('reviews')
      .populate('likes', 'username');
    res.json({ trips: myTrips });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ all road trips (public)
router.get('/', async (req, res) => {
  try {
    const roadTrips = await RoadTrip.find()
      .populate('createdBy', 'username')
      .populate('participants', 'username')
      .populate('reviews')
      .populate('likes', 'username');
    res.json(roadTrips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ a single road trip by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const roadTrip = await RoadTrip.findById(req.params.id)
      .populate('createdBy', 'username')
      .populate('participants', 'username')
      .populate('reviews')
      .populate('likes', 'username');
    if (!roadTrip) return res.status(404).json({ error: 'Road trip not found' });
    res.json(roadTrip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a road trip (optionally add auth)
router.put('/:id', async (req, res) => {
  try {
    const roadTrip = await RoadTrip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!roadTrip) return res.status(404).json({ error: 'Road trip not found' });
    res.json(roadTrip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a road trip (optionally add auth)
router.delete('/:id', async (req, res) => {
  try {
    const roadTrip = await RoadTrip.findByIdAndDelete(req.params.id);
    if (!roadTrip) return res.status(404).json({ error: 'Road trip not found' });
    res.json({ message: 'Road trip deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
