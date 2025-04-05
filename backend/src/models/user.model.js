const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Fields specific to students
  studentDetails: {
    class: {
      type: Number,
      min: 1,
      max: 10
    },
    school: String,
    subjects: [String],
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
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
    experience: Number, // in years
    bio: String,
    subjects: [String],
    classesOffered: [{
      type: Number,
      min: 1,
      max: 10
    }],
    languages: [String],
    hourlyRate: {
      individual: Number, // 1:1 - ₹2999
      twoStudents: Number, // 1:2 - ₹1499
      fiveStudents: Number, // 1:5 - ₹599
      tenStudents: Number // 1:10 - ₹299
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
  return userObject;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
