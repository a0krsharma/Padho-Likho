const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/auth.middleware');

const router = express.Router();

const assessmentController = require('../controllers/assessment.controller');

// Create a new assessment
router.post('/', auth, authorize('teacher'), assessmentController.createAssessment);

// Get all assessments
router.get('/', auth, assessmentController.getAssessments);

// Get assessment by ID
router.get('/:id', auth, assessmentController.getAssessmentById);

// Update assessment
router.put('/:id', auth, authorize('teacher'), assessmentController.updateAssessment);

// Start assessment attempt
router.post('/:id/start', auth, assessmentController.startAssessment);

// Submit assessment attempt
router.post('/:id/submit', auth, assessmentController.submitAssessment);

module.exports = router;
