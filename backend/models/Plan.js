const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 0 },
  rate: { type: Number, default: 0 }, // percentage or multiplier
  durationDays: { type: Number, default: 30 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Plan', planSchema);
