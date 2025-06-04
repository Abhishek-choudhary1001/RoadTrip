const express = require('express');
const router = express.Router();
const RoadTrip = require('../models/RoadTrip');

// CREATE a road trip
router.post('/', async (req, res) => {
  try {
    const roadTrip = await RoadTrip.create(req.body);
    res.status(201).json(roadTrip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all road trips
router.get('/', async (req, res) => {
  try {
    const roadTrips = await RoadTrip.find().populate('locations').populate('createdBy', 'username');
    res.json(roadTrips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ a single road trip by ID
router.get('/:id', async (req, res) => {
  try {
    const roadTrip = await RoadTrip.findById(req.params.id).populate('locations').populate('createdBy', 'username');
    if (!roadTrip) return res.status(404).json({ error: 'RoadTrip not found' });
    res.json(roadTrip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a road trip
router.put('/:id', async (req, res) => {
  try {
    const roadTrip = await RoadTrip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!roadTrip) return res.status(404).json({ error: 'RoadTrip not found' });
    res.json(roadTrip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a road trip
router.delete('/:id', async (req, res) => {
  try {
    const roadTrip = await RoadTrip.findByIdAndDelete(req.params.id);
    if (!roadTrip) return res.status(404).json({ error: 'RoadTrip not found' });
    res.json({ message: 'RoadTrip deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
