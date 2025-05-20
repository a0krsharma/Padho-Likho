const express = require('express');
const auth = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/auth.middleware');
const dashboardController = require('../controllers/dashboard.controller');

const router = express.Router();

// Student dashboard
router.get('/student', auth, authorize('student'), dashboardController.getStudentDashboard);

// TODO: Add teacher and parent dashboard endpoints as needed

module.exports = router;
