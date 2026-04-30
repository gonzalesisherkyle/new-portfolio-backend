const About = require('../models/aboutModel');

// @desc    Get about content
// @route   GET /api/about
// @access  Public
const getAbout = async (req, res) => {
  try {
    const about = await About.findOne({});
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update about content
// @route   POST /api/about
// @access  Private/Admin
const updateAbout = async (req, res) => {
  try {
    let about = await About.findOne({});
    
    if (about) {
      Object.assign(about, req.body);
      about = await about.save();
    } else {
      about = await About.create(req.body);
    }
    
    res.json(about);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAbout,
  updateAbout
};
