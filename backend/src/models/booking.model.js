const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  classGrade: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  bookingType: {
    type: String,
    enum: ['individual', 'twoStudents', 'fiveStudents', 'tenStudents'],
    required: true
  },
  duration: {
    type: String,
    enum: ['weekly', 'monthly', 'yearly'],
    required: true
  },
  isEmergencyBooking: {
    type: Boolean,
    default: false
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  schedule: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    startTime: String,
    endTime: String
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentId: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  cancellationReason: {
    type: String
  },
  groupMembers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for faster queries
bookingSchema.index({ student: 1, teacher: 1, startDate: 1 });
bookingSchema.index({ teacher: 1, status: 1 });
bookingSchema.index({ student: 1, status: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
