const express = require('express');
const router = express.Router();
const { 
  sendContactMessage, 
  getContactMessages, 
  updateMessageStatus, 
  deleteMessage 
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', sendContactMessage);

router.get('/', protect, admin, getContactMessages);
router.put('/:id', protect, admin, updateMessageStatus);
router.delete('/:id', protect, admin, deleteMessage);

module.exports = router;
