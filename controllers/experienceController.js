const Experience = require('../models/experienceModel');

// @desc    Get all experience
// @route   GET /api/experience
// @access  Public
const getExperience = async (req, res) => {
  try {
    const experience = await Experience.find({}).sort({ startDate: -1 });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create experience
// @route   POST /api/experience
// @access  Private/Admin
const createExperience = async (req, res) => {
  try {
    const experience = new Experience(req.body);
    const createdExperience = await experience.save();
    res.status(201).json(createdExperience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update experience
// @route   PUT /api/experience/:id
// @access  Private/Admin
const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (experience) {
      Object.assign(experience, req.body);
      const updatedExperience = await experience.save();
      res.json(updatedExperience);
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete experience
// @route   DELETE /api/experience/:id
// @access  Private/Admin
const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (experience) {
      await experience.deleteOne();
      res.json({ message: 'Experience removed' });
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience
};
