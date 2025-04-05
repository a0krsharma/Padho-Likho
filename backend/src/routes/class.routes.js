const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// Import controller (will implement later)
const classController = {
  createClass: (req, res) => {
    res.json({ message: 'Create class endpoint - to be implemented' });
  },
  getClasses: (req, res) => {
    res.json({ message: 'Get classes endpoint - to be implemented' });
  },
  getClassById: (req, res) => {
    res.json({ message: 'Get class by ID endpoint - to be implemented' });
  },
  updateClass: (req, res) => {
    res.json({ message: 'Update class endpoint - to be implemented' });
  },
  addResource: (req, res) => {
    res.json({ message: 'Add resource endpoint - to be implemented' });
  },
  joinClass: (req, res) => {
    res.json({ message: 'Join class endpoint - to be implemented' });
  }
};

// Create a new class
router.post('/', auth, authorize('teacher'), classController.createClass);

// Get all classes for a user
router.get('/', auth, classController.getClasses);

// Get class by ID
router.get('/:id', auth, classController.getClassById);

// Update class
router.put('/:id', auth, authorize('teacher'), classController.updateClass);

// Add resource to class
router.post('/:id/resources', auth, authorize('teacher'), classController.addResource);

// Join a class
router.post('/:id/join', auth, classController.joinClass);

module.exports = router;
