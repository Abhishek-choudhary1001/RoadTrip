const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:location', async (req, res) => {
  try {
    const response = await axios.get(
      `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${req.params.location}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/save', async (req, res) => {
  try {
    const { location } = req.body;
    // Here you could save the location to a database or process it
    res.json({
      success: true,
      message: 'Location received',
      location: location
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
