const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
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
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'ongoing', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  roomId: {
    type: String,
    required: true,
    unique: true
  },
  resources: [{
    type: {
      type: String,
      enum: ['document', 'image', 'video', 'link'],
      required: true
    },
    title: String,
    url: String,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  recordings: [{
    url: String,
    duration: Number,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  whiteboard: {
    savedState: String
  },
  chat: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    message: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  attendance: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    present: {
      type: Boolean,
      default: false
    },
    joinTime: Date,
    leaveTime: Date,
    duration: Number // in minutes
  }],
  assignments: [{
    title: String,
    description: String,
    dueDate: Date,
    attachments: [String],
    submissions: [{
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      submittedAt: Date,
      files: [String],
      grade: Number,
      feedback: String
    }]
  }]
}, {
  timestamps: true
});

// Index for faster queries
classSchema.index({ teacher: 1, startTime: 1 });
classSchema.index({ 'students': 1, startTime: 1 });
classSchema.index({ booking: 1 });

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
