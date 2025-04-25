const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// Import controller (will implement later)
const userController = require('../controllers/user.controller');

// Admin: Get all users
router.get('/', auth, authorize('admin'), userController.getAllUsers);

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
