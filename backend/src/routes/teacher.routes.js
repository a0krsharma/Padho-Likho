const express = require('express');
const { body } = require('express-validator');
const teacherController = require('../controllers/teacher.controller');
const auth = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// Get all teachers with filtering
router.get('/', teacherController.getAllTeachers);

// Get teacher by ID
router.get('/:id', teacherController.getTeacherById);

// Update teacher profile
router.put(
  '/:id',
  auth,
  [
    body('qualifications').optional().isArray(),
    body('experience').optional().isNumeric(),
    body('subjects').optional().isArray(),
    body('classesOffered').optional().isArray(),
    body('languages').optional().isArray(),
    body('hourlyRate').optional().isObject()
  ],
  teacherController.updateTeacherProfile
);

// Submit teacher verification documents
router.post(
  '/:id/verification',
  auth,
  [
    body('documentType').notEmpty().withMessage('Document type is required'),
    body('documentUrl').notEmpty().withMessage('Document URL is required')
  ],
  teacherController.submitVerificationDocuments
);

// Verify teacher documents (admin only)
router.put(
  '/:id/verification',
  auth,
  authorize('admin'),
  [
    body('documentId').notEmpty().withMessage('Document ID is required'),
    body('isVerified').isBoolean().withMessage('Verification status must be a boolean')
  ],
  teacherController.verifyTeacherDocuments
);

// Get teacher availability
router.get('/:id/availability', teacherController.getTeacherAvailability);

// Update teacher availability
router.put(
  '/:id/availability',
  auth,
  [body('availability').isArray().withMessage('Availability must be an array')],
  teacherController.updateTeacherAvailability
);

module.exports = router;
