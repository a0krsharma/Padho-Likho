const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Mock user data for testing without MongoDB
const mockUsers = [
  {
    _id: '1',
    email: 'student@example.com',
    password: 'password123',
    firstName: 'Student',
    lastName: 'User',
    role: 'student',
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
    phone: '9876543210',
    address: '123 Student Street',
    city: 'Delhi',
    state: 'Delhi',
    zipCode: '110001',
    country: 'India',
    isVerified: true,
    createdAt: new Date(),
    studentDetails: {
      class: 10,
      subjects: ['Mathematics', 'Science', 'English']
    }
  },
  {
    _id: '2',
    email: 'teacher@example.com',
    password: 'password123',
    firstName: 'Teacher',
    lastName: 'User',
    role: 'teacher',
    profilePicture: 'https://randomuser.me/api/portraits/women/1.jpg',
    phone: '9876543211',
    address: '456 Teacher Avenue',
    city: 'Mumbai',
    state: 'Maharashtra',
    zipCode: '400001',
    country: 'India',
    isVerified: true,
    createdAt: new Date(),
    teacherDetails: {
      subjects: ['Mathematics', 'Science'],
      qualifications: ['M.Sc. Mathematics', 'B.Ed.'],
      experience: 5,
      hourlyRate: 500
    }
  },
  {
    _id: '3',
    email: 'parent@example.com',
    password: 'password123',
    firstName: 'Parent',
    lastName: 'User',
    role: 'parent',
    profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
    phone: '9876543212',
    address: '789 Parent Road',
    city: 'Bangalore',
    state: 'Karnataka',
    zipCode: '560001',
    country: 'India',
    isVerified: true,
    createdAt: new Date(),
    parentDetails: {
      children: [
        {
          name: 'Child One',
          age: 12,
          class: 7
        },
        {
          name: 'Child Two',
          age: 9,
          class: 4
        }
      ]
    }
  }
];

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Authentication required' 
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'padho_likho_jwt_secret_key');
    
    // Find user by id from mock data instead of MongoDB
    const user = mockUsers.find(u => u._id === decoded.userId.toString());
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'User not found' 
      });
    }
    
    // Add user info to request
    req.user = {
      userId: user._id,
      role: user.role,
      // Add the full user object for easy access
      userDetails: user
    };
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ 
      success: false,
      message: 'Invalid or expired token' 
    });
  }
};

// Role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false,
        message: 'You do not have permission to perform this action' 
      });
    }
    next();
  };
};

module.exports = auth;
module.exports.authorize = authorize;
module.exports.mockUsers = mockUsers;
