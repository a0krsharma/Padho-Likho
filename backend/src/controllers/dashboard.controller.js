const Class = require('../models/class.model');
const Assessment = require('../models/assessment.model');
const Booking = require('../models/booking.model');

// Get student dashboard data
exports.getStudentDashboard = async (req, res) => {
  try {
    const userId = req.user.userId;
    // Upcoming classes (limit 5, sorted by next date)
    const classes = await Class.find({ students: userId })
      .sort({ nextSession: 1 })
      .limit(5);
    // Upcoming assessments (limit 5, sorted by due date)
    const assessments = await Assessment.find({ student: userId, status: 'pending' })
      .sort({ dueDate: 1 })
      .limit(5);
    // Upcoming bookings (limit 5, sorted by startDate)
    const bookings = await Booking.find({ student: userId, status: 'upcoming' })
      .sort({ startDate: 1 })
      .limit(5);
    res.json({
      classes,
      assessments,
      bookings
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching dashboard data', error: err.message });
  }
};

// You can add similar controllers for teacher and parent dashboards as needed.
