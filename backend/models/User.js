const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email:    { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar:   { type: String },
    createdAt:{ type: Date, default: Date.now },
    roadTrips:[{ type: mongoose.Schema.Types.ObjectId, ref: 'RoadTrip' }],
    favorites:[{ type: mongoose.Schema.Types.ObjectId, ref: 'RoadTrip' }],
    bio:      { type: String }
  });
  module.exports = mongoose.model('User', UserSchema);