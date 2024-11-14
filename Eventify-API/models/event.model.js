// models/event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  hour: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  maxCapacity: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Event', eventSchema);
