const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/auth.middleware');

const router = express.Router();

const classController = require('../controllers/class.controller');

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
