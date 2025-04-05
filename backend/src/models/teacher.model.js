const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Teacher schema - this is a reference model that points to User model
// The actual teacher data is stored in the User model's teacherDetails field
const teacherSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // This model exists primarily for reference purposes
  // All teacher-specific data is stored in the User model's teacherDetails field
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);
