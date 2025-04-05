const express = require('express');
const { body } = require('express-validator');
const bookingController = require('../controllers/booking.controller');
const auth = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// Create a new booking
router.post(
  '/',
  auth,
  [
    body('teacherId').notEmpty().withMessage('Teacher ID is required'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('classGrade').isInt({ min: 1, max: 10 }).withMessage('Class grade must be between 1 and 10'),
    body('bookingType')
      .isIn(['individual', 'twoStudents', 'fiveStudents', 'tenStudents'])
      .withMessage('Invalid booking type'),
    body('duration')
      .isIn(['weekly', 'monthly', 'yearly'])
      .withMessage('Invalid duration'),
    body('startDate').isISO8601().withMessage('Start date must be a valid date'),
    body('endDate').isISO8601().withMessage('End date must be a valid date'),
    body('schedule').isArray().withMessage('Schedule must be an array')
  ],
  bookingController.createBooking
);

// Get all bookings for a user (student or teacher)
router.get('/', auth, bookingController.getUserBookings);

// Get booking by ID
router.get('/:id', auth, bookingController.getBookingById);

// Update booking status
router.put(
  '/:id/status',
  auth,
  [
    body('status')
      .isIn(['pending', 'confirmed', 'cancelled', 'completed'])
      .withMessage('Invalid status')
  ],
  bookingController.updateBookingStatus
);

// Add student to group booking
router.post(
  '/:id/students',
  auth,
  [
    body('studentId').notEmpty().withMessage('Student ID is required')
  ],
  bookingController.addStudentToBooking
);

module.exports = router;
