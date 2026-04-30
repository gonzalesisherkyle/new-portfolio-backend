const mongoose = require('mongoose');

const settingsSchema = mongoose.Schema({
  email: { type: String, default: 'hello@devportfolio.com' },
  phone: { type: String, default: '+1 (555) 123-4567' },
  location: { type: String, default: 'San Francisco, CA' },
  githubUrl: { type: String, default: '' },
  linkedinUrl: { type: String, default: '' },
  footerTagline: { type: String, default: 'Building the future, one pixel at a time.' },
  footerLogoText: { type: String, default: 'DEVPORTFOLIO' }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
