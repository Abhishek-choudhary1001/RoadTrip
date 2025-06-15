const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const API_KEY = process.env.IPSTACK_API_KEY;

async function getMyPublicIp() {
  const response = await axios.get('https://api.ipify.org?format=json');
  return response.data.ip;
}

router.get('/location', async (req, res) => {
    try {
      let ip = req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress;
      console.log('Using IP:', ip); // <-- Add this line
      if (ip === '::1' || ip === '127.0.0.1') { ip='106.223.152.113'
        // For local testing, fetch your real public IP
        ip = await getMyPublicIp();
        console.log('Fetched public IP:', ip); // <-- Add this line
      }
      const url = `http://api.ipstack.com/${ip}?access_key=${API_KEY}`;
      const response = await axios.get(url);
      res.json(response.data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
module.exports = router;
