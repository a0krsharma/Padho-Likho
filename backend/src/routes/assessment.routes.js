const express = require('express');
const auth = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/auth.middleware');
const assessmentController = require('../controllers/assessment.controller');

const router = express.Router();

// Get all assessments
router.get('/', auth, assessmentController.getAssessments);

// Note: Commenting out unimplemented routes to prevent errors
// These can be uncommented and implemented later

// Create a new assessment
// router.post('/', auth, authorize('teacher'), assessmentController.createAssessment);

// Get assessment by ID
// router.get('/:id', auth, assessmentController.getAssessmentById);

// Update assessment
// router.put('/:id', auth, authorize('teacher'), assessmentController.updateAssessment);

// Start assessment attempt - Temporarily disabled
// router.post('/:id/start', auth, assessmentController.startAssessment);

// Submit assessment attempt - Temporarily disabled
// router.post('/:id/submit', auth, assessmentController.submitAssessment);

module.exports = router;
