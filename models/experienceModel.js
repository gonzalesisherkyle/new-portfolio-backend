const mongoose = require('mongoose');

const experienceSchema = mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  location: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date }, // null if current
  current: { type: Boolean, default: false },
  description: [{ type: String }], // Bullet points
  techStack: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
