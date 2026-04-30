const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    // Expanded categories to match predefined skills library
    enum: ['Frontend', 'Backend', 'Database', 'AI & ML', 'DevOps', 'Cloud', 'Tools', 'Mobile', 'Design', 'Other']
  },
  icon: { type: String, required: true }, // Icon name from react-icons/simple-icons
  color: { type: String }, // Brand color
  proficiency: { type: Number, min: 0, max: 100 }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
