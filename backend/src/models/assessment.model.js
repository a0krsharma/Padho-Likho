const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
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
  topics: [String],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['quiz', 'practice', 'weekly', 'monthly', 'custom'],
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  totalMarks: {
    type: Number,
    required: true
  },
  passingMarks: {
    type: Number,
    required: true
  },
  isRandomized: {
    type: Boolean,
    default: false
  },
  questions: [{
    questionText: {
      type: String,
      required: true
    },
    questionType: {
      type: String,
      enum: ['multiple-choice', 'true-false', 'short-answer', 'long-answer', 'match-the-following'],
      required: true
    },
    options: [{
      text: String,
      isCorrect: Boolean
    }],
    correctAnswer: String, // For short and long answer questions
    matchPairs: [{
      left: String,
      right: String
    }],
    marks: {
      type: Number,
      required: true
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium'
    },
    explanation: String
  }],
  isPublic: {
    type: Boolean,
    default: false
  },
  startDate: Date,
  endDate: Date,
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  attempts: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    startTime: {
      type: Date,
      default: Date.now
    },
    endTime: Date,
    answers: [{
      questionIndex: Number,
      selectedOptions: [Number], // For multiple choice
      textAnswer: String, // For short/long answer
      matchedPairs: [{
        leftIndex: Number,
        rightIndex: Number
      }],
      isCorrect: Boolean,
      marksObtained: Number
    }],
    totalScore: Number,
    percentage: Number,
    result: {
      type: String,
      enum: ['pass', 'fail', 'incomplete'],
      default: 'incomplete'
    },
    feedback: String
  }],
  badges: [{
    name: String,
    description: String,
    imageUrl: String,
    criteria: {
      minScore: Number,
      maxTime: Number // in minutes
    }
  }]
}, {
  timestamps: true
});

// Indexes for faster queries
assessmentSchema.index({ subject: 1, classGrade: 1 });
assessmentSchema.index({ creator: 1 });
assessmentSchema.index({ 'attempts.student': 1 });

const Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;
