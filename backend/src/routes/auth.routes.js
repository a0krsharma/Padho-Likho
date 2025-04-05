const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

// Register user
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('role')
      .isIn(['student', 'parent', 'teacher'])
      .withMessage('Role must be either student, parent, or teacher')
  ],
  authController.register
);

// Login user
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  authController.login
);

// Get current user profile
router.get('/me', auth, authController.getCurrentUser);

// Verify email
router.get('/verify-email/:token', authController.verifyEmail);

// Forgot password
router.post(
  '/forgot-password',
  [body('email').isEmail().withMessage('Please provide a valid email')],
  authController.forgotPassword
);

// Reset password
router.post(
  '/reset-password',
  [
    body('token').notEmpty().withMessage('Token is required'),
    body('newPassword')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ],
  authController.resetPassword
);

module.exports = router;
