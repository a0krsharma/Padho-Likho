const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * User Schema
 * Represents all users in the system (students, teachers, parents, admins)
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  role: {
    type: String,
    enum: ['student', 'parent', 'teacher', 'admin'],
    default: 'student'
  },
  profilePicture: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    trim: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Fields specific to students
  studentDetails: {
    class: {
      type: Number,
      min: 1,
      max: 10,
      default: 1,
      required: false
    },
    school: String,
    subjects: [String],
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    }
  },
  // Fields specific to parents
  parentDetails: {
    childrenIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  // Fields specific to teachers
  teacherDetails: {
    qualifications: [String],
    experience: {
      type: Number, // in years
      default: 0,
      required: false
    },
    bio: String,
    subjects: [String],
    classesOffered: [{
      type: Number,
      min: 1,
      max: 10,
      required: false
    }],
    languages: [String],
    hourlyRate: {
      individual: {
        type: Number,
        default: 2999
      },
      twoStudents: {
        type: Number,
        default: 1499
      },
      fiveStudents: {
        type: Number,
        default: 599
      },
      tenStudents: {
        type: Number,
        default: 299
      }
    },
    availability: [{
      day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      },
      slots: [{
        startTime: String,
        endTime: String,
        isBooked: {
          type: Boolean,
          default: false
        }
      }]
    }],
    ratings: {
      average: {
        type: Number,
        default: 0
      },
      count: {
        type: Number,
        default: 0
      }
    },
    verificationDocuments: [{
      documentType: String,
      documentUrl: String,
      isVerified: {
        type: Boolean,
        default: false
      }
    }],
    sampleVideoUrl: String
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Method to compare password for login
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Method to get public profile (without sensitive info)
userSchema.methods.getPublicProfile = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.emailVerificationToken;
  delete userObject.emailVerificationExpires;
  delete userObject.resetPasswordToken;
  delete userObject.resetPasswordExpires;
  return userObject;
};

// Method to generate email verification token
userSchema.methods.generateVerificationToken = function() {
  const verificationToken = jwt.sign(
    { userId: this._id },
    process.env.JWT_SECRET || 'padho_likho_jwt_secret_key',
    { expiresIn: '24h' }
  );
  
  this.emailVerificationToken = verificationToken;
  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  
  return verificationToken;
};

// Method to generate password reset token
userSchema.methods.generatePasswordResetToken = function() {
  const resetToken = jwt.sign(
    { userId: this._id },
    process.env.JWT_SECRET || 'padho_likho_jwt_secret_key',
    { expiresIn: '1h' }
  );
  
  this.resetPasswordToken = resetToken;
  this.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
  
  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
