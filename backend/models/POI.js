const mongoose = require('mongoose');

const poiSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  type: String,
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('POI', poiSchema);
