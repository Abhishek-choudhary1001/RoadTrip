const mongoose = require('mongoose');
const RoadTripSchema = new mongoose.Schema({
    name:        { type: String, required: true },
    description: { type: String },
    createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startDate:   { type: Date },
    endDate:     { type: Date },
    locations:   [{ /* Location subdocument or ObjectId */ }],
    stops:       [{ type: String }],
    photos:      [{ type: String }],
    participants:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    reviews:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    likes:       [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt:   { type: Date, default: Date.now },
    updatedAt:   { type: Date, default: Date.now }
  });
  module.exports = mongoose.model('RoadTrip', RoadTripSchema);