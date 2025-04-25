const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { mockUsers } = require('../middleware/auth.middleware');

// Register a new user
exports.register = async (req, res) => {
  try {
    console.log('Registration request body:', JSON.stringify(req.body, null, 2));
    
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ 
        success: false,
        errors: errors.array(),
        message: 'Validation failed'
      });
    }

    const { 
      email, 
      password, 
      firstName, 
      lastName, 
      role, 
      phone, 
      address, 
      city, 
      state, 
      zipCode, 
      country,
      class: classGrade,
      subjects,
      qualifications,
      experience
    } = req.body;

    // Check if user already exists in mock data
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this email' 
      });
    }

    // Create new user ID (incremental from last user)
    const newUserId = (mockUsers[mockUsers.length - 1]?._id || 0) + 1;
    
    // Create user data
    const userData = {
      _id: newUserId.toString(),
      email,
      password,
      firstName,
      lastName,
      role: role || 'student',
      phone: phone || '',
      address: address || '',
      city: city || '',
      state: state || '',
      zipCode: zipCode || '',
      country: country || '',
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    console.log('Processed user data:', userData);

    // Add role-specific details
    if (role === 'teacher') {
      userData.teacherDetails = {
        subjects: Array.isArray(subjects) ? subjects : (subjects ? [subjects] : []),
        qualifications: Array.isArray(qualifications) ? qualifications : (qualifications ? [qualifications] : []),
        experience: experience ? Number(experience) : 0,
        hourlyRate: {
          individual: 2999,
          twoStudents: 1499,
          fiveStudents: 599,
          tenStudents: 299
        }
      };
      console.log('Teacher details:', userData.teacherDetails);
    } else if (role === 'student') {
      userData.studentDetails = {
        class: classGrade ? Number(classGrade) : 1,
        subjects: Array.isArray(subjects) ? subjects : (subjects ? [subjects] : [])
      };
      console.log('Student details:', userData.studentDetails);
    } else if (role === 'parent') {
      userData.parentDetails = {
        childrenIds: []
      };
      console.log('Parent details:', userData.parentDetails);
    }

    // Add user to mock data
    mockUsers.push(userData);
    
    // Create JWT token
    const token = jwt.sign(
      { userId: newUserId.toString(), role: userData.role },
      process.env.JWT_SECRET || 'padho_likho_jwt_secret_key',
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        _id: userData._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.role,
        phone: userData.phone,
        address: userData.address,
        city: userData.city,
        state: userData.state,
        zipCode: userData.zipCode,
        country: userData.country,
        isVerified: userData.isVerified,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    console.error('Error stack:', error.stack);
    
    let statusCode = 500;
    let errorMessage = 'Server error during registration';
    let errorDetails = null;
    
    // Handle specific MongoDB errors
    if (error.name === 'ValidationError') {
      statusCode = 400;
      errorMessage = Object.values(error.errors).map(err => err.message).join(', ');
      errorDetails = error.errors;
      console.error('Validation error details:', errorDetails);
    } else if (error.code === 11000) { // Duplicate key error
      statusCode = 400;
      errorMessage = 'Email already in use';
    } else {
      // For other errors, provide more details
      console.error('Unexpected error type:', error.name);
      if (error.message) {
        console.error('Error message:', error.message);
      }
    }
    
    res.status(statusCode).json({ 
      success: false,
      message: errorMessage,
      details: errorDetails
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array(),
        message: 'Validation failed'
      });
    }

    const { email, password } = req.body;

    // Find user by email in mock data
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    // Check password (simple comparison for mock data)
    const isMatch = user.password === password;
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'padho_likho_jwt_secret_key',
      { expiresIn: '7d' }
    );

    // Create user data to return
    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
      city: user.city,
      state: user.state,
      zipCode: user.zipCode,
      country: user.country,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
    
    // Add role-specific data
    if (user.role === 'teacher' && user.teacherDetails) {
      userData.teacherDetails = user.teacherDetails;
    } else if (user.role === 'student' && user.studentDetails) {
      userData.studentDetails = user.studentDetails;
    } else if (user.role === 'parent' && user.parentDetails) {
      userData.parentDetails = user.parentDetails;
    }
    
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: userData
    });
  } catch (error) {
    console.error('Login error:', error);
    let statusCode = 500;
    let errorMessage = 'Server error during login';
    
    // Handle specific errors
    if (error.name === 'ValidationError') {
      statusCode = 400;
      errorMessage = Object.values(error.errors).map(err => err.message).join(', ');
    }
    
    res.status(statusCode).json({ 
      success: false,
      message: errorMessage 
    });
  }
};

// Get current user profile
exports.getCurrentUser = async (req, res) => {
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
    
    // Find user by id from mock data
    const user = mockUsers.find(u => u._id === decoded.userId.toString());
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Return user data without sensitive info
    const { password, ...userData } = user;
    // Add role-specific data
    if (user.role === 'student' && user.studentDetails) {
      userData.studentDetails = user.studentDetails;
    } else if (user.role === 'teacher' && user.teacherDetails) {
      userData.teacherDetails = user.teacherDetails;
    } else if (user.role === 'parent' && user.parentDetails) {
      userData.parentDetails = user.parentDetails;
    }
    
    res.json({ 
      success: true,
      user: userData 
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(401).json({ 
      success: false,
      message: 'Invalid or expired token' 
    });
  }
};

// Verify email
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    
    // Find user with this verification token and token not expired
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ 
        success: false,
        message: 'Email verification token is invalid or has expired' 
      });
    }
    
    // Update user verification status
    user.isVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();
    
    res.json({ 
      success: true,
      message: 'Email verified successfully' 
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ message: 'Invalid or expired verification token' });
  }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found with this email' 
      });
    }
    
    // Generate password reset token using the method from user model
    const resetToken = user.generatePasswordResetToken();
    await user.save();
    
    // In a real app, send email with reset link
    // For now, just return the token
    res.json({
      success: true,
      message: 'Password reset link sent to your email',
      resetToken // This would normally be sent via email
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error during password reset request' });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    // Find user with this reset token and token not expired
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ 
        success: false,
        message: 'Password reset token is invalid or has expired' 
      });
    }
    
    // Set the new password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    
    res.json({ 
      success: true,
      message: 'Password reset successful' 
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Invalid or expired reset token' });
  }
};
