const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// Import controller (will implement later)
const userController = {
  getUserProfile: (req, res) => {
    res.json({ message: 'Get user profile endpoint - to be implemented' });
  },
  updateUserProfile: (req, res) => {
    res.json({ message: 'Update user profile endpoint - to be implemented' });
  },
  getStudentDashboard: (req, res) => {
    res.json({ message: 'Get student dashboard endpoint - to be implemented' });
  },
  getParentDashboard: (req, res) => {
    res.json({ message: 'Get parent dashboard endpoint - to be implemented' });
  },
  getTeacherDashboard: (req, res) => {
    res.json({ message: 'Get teacher dashboard endpoint - to be implemented' });
  }
};

// Get user profile
router.get('/profile', auth, userController.getUserProfile);

// Update user profile
router.put('/profile', auth, userController.updateUserProfile);

// Get student dashboard
router.get('/dashboard/student', auth, authorize('student'), userController.getStudentDashboard);

// Get parent dashboard
router.get('/dashboard/parent', auth, authorize('parent'), userController.getParentDashboard);

// Get teacher dashboard
router.get('/dashboard/teacher', auth, authorize('teacher'), userController.getTeacherDashboard);

module.exports = router;
