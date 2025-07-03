const Assessment = require('../models/assessment.model');

// Get all assessments for a user (student or teacher)
exports.getAssessments = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'student') {
      query.student = req.user.userId;
    } else if (req.user.role === 'teacher') {
      query.teacher = req.user.userId;
    }
    // Optionally, add more filters (subject, status, etc.)
    const assessments = await Assessment.find(query)
      .populate('teacher', 'name email profilePicture')
      .populate('student', 'name email profilePicture')
      .sort({ dueDate: 1 });
    res.json({ assessments });
  } catch (error) {
    console.error('Get assessments error:', error);
    res.status(500).json({ message: 'Server error while fetching assessments' });
  }
};

// Other assessment-related controller functions can be implemented here.
