const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

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

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this email' 
      });
    }

    // Create user based on role
    const userData = {
      name: `${firstName} ${lastName}`.trim(),
      email,
      password,
      role: role || 'student',
      phone: phone || '',
      address: {
        street: typeof address === 'object' ? address.street : address || '',
        city: city || '',
        state: state || '',
        pincode: zipCode || '',
        country: country || ''
      }
    };
    
    console.log('Processed user data:', userData);

    // Add role-specific details
    if (role === 'teacher') {
      userData.teacherDetails = {
        qualifications: qualifications ? (Array.isArray(qualifications) ? qualifications : [qualifications]) : [],
        experience: experience ? Number(experience) : 0,
        subjects: Array.isArray(subjects) ? subjects : (subjects ? [subjects] : []),
        hourlyRate: {
          individual: 2999,
          twoStudents: 1499,
          fiveStudents: 599,
          tenStudents: 299
        }
      };
      console.log('Teacher details:', userData.teacherDetails);
    } else if (role === 'student') {
      // Flatten the subjects array if it's nested
      const flattenedSubjects = Array.isArray(subjects) 
        ? subjects.flat() 
        : subjects 
          ? [subjects]
          : [];
      
      userData.studentDetails = {
        class: classGrade ? Number(classGrade) : 1,
        subjects: flattenedSubjects
      };
      console.log('Student details:', userData.studentDetails);
    } else if (role === 'parent') {
      userData.parentDetails = {
        childrenIds: []
      };
      console.log('Parent details:', userData.parentDetails);
    }

    // Create new user
    const user = new User(userData);
    
    // Generate email verification token
    const verificationToken = user.generateVerificationToken();
    
    try {
      // Save user with verification token
      await user.save();
      console.log('User saved successfully');
    } catch (saveError) {
      console.error('Error saving user:', saveError);
      // If there's a validation error, throw it to be caught by the outer catch block
      if (saveError.name === 'ValidationError') {
        throw saveError;
      }
      // For other errors, provide a more specific message
      throw new Error('Failed to save user: ' + saveError.message);
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'padho_likho_jwt_secret_key',
      { expiresIn: '7d' }
    );

    // In a production app, you would send an email with the verification link
    // For now, just include it in the response

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: user.getPublicProfile(),
      verificationToken // This would normally be sent via email
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

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
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

    // Return role-specific data
    const userData = user.getPublicProfile();
    
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
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }
    
    res.json({ 
      success: true,
      user: user.getPublicProfile() 
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Server error while fetching user profile' });
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
