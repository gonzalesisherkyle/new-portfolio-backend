const mongoose = require('mongoose');

const aboutSchema = mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  resumeUrl: { type: String },
  skills_summary: { type: String },
  experience_summary: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
