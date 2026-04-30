const express = require('express');
const router = express.Router();
const { getAbout, updateAbout } = require('../controllers/aboutController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getAbout);
router.post('/', protect, admin, updateAbout);

module.exports = router;
