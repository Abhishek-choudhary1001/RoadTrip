const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  coordinates: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    }
  },
  description: {
    type: String,
  },
  address: {
    type: String,
  },
  photos: [{
    type: String, // URLs to images
  }],
  poi: [{
    name: String,
    type: String, // e.g., 'restaurant', 'park'
    coordinates: {
      lat: Number,
      lng: Number,
    },
    description: String,
    photos: [String]
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Location', LocationSchema);
