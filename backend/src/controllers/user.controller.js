const User = require('../models/user.model');

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden: Admins only' });
    }
    const users = await User.find({}, '-password -resetPasswordToken -resetPasswordExpires -emailVerificationToken -emailVerificationExpires');
    res.json({ success: true, users });
  } catch (err) {
    console.error('Get all users error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
};

// Placeholder implementations for required routes:
exports.getUserProfile = (req, res) => {
  res.json({ message: 'Get user profile endpoint - to be implemented' });
};

exports.updateUserProfile = (req, res) => {
  res.json({ message: 'Update user profile endpoint - to be implemented' });
};

exports.getStudentDashboard = (req, res) => {
  res.json({ message: 'Get student dashboard endpoint - to be implemented' });
};

exports.getParentDashboard = (req, res) => {
  res.json({ message: 'Get parent dashboard endpoint - to be implemented' });
};

exports.getTeacherDashboard = (req, res) => {
  res.json({ message: 'Get teacher dashboard endpoint - to be implemented' });
};
