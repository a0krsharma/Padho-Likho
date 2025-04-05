const User = require('../models/user.model');
const { validationResult } = require('express-validator');

// Get all teachers with filtering
exports.getAllTeachers = async (req, res) => {
  try {
    const {
      subject,
      classGrade,
      gender,
      language,
      minRating,
      maxPrice,
      availability
    } = req.query;

    // Build filter query
    const query = { role: 'teacher' };

    // Filter by subject
    if (subject) {
      query['teacherDetails.subjects'] = { $in: [subject] };
    }

    // Filter by class grade
    if (classGrade) {
      query['teacherDetails.classesOffered'] = { $in: [parseInt(classGrade)] };
    }

    // Filter by gender
    if (gender) {
      query.gender = gender;
    }

    // Filter by language
    if (language) {
      query['teacherDetails.languages'] = { $in: [language] };
    }

    // Filter by minimum rating
    if (minRating) {
      query['teacherDetails.ratings.average'] = { $gte: parseFloat(minRating) };
    }

    // Filter by maximum price (individual rate)
    if (maxPrice) {
      query['teacherDetails.hourlyRate.individual'] = { $lte: parseInt(maxPrice) };
    }

    // Find teachers based on filters
    const teachers = await User.find(query)
      .select('-password')
      .sort({ 'teacherDetails.ratings.average': -1 });

    // Filter by availability if needed (this is more complex and done in memory)
    let filteredTeachers = teachers;
    if (availability) {
      const [day, timeSlot] = availability.split(',');
      filteredTeachers = teachers.filter(teacher => {
        if (!teacher.teacherDetails || !teacher.teacherDetails.availability) return false;
        
        const dayAvailability = teacher.teacherDetails.availability.find(a => a.day === day);
        if (!dayAvailability) return false;
        
        return dayAvailability.slots.some(slot => {
          return !slot.isBooked && timeSlot >= slot.startTime && timeSlot <= slot.endTime;
        });
      });
    }

    res.json({
      count: filteredTeachers.length,
      teachers: filteredTeachers
    });
  } catch (error) {
    console.error('Get all teachers error:', error);
    res.status(500).json({ message: 'Server error while fetching teachers' });
  }
};

// Get teacher by ID
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await User.findOne({
      _id: req.params.id,
      role: 'teacher'
    }).select('-password');

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.json({ teacher });
  } catch (error) {
    console.error('Get teacher by ID error:', error);
    res.status(500).json({ message: 'Server error while fetching teacher' });
  }
};

// Update teacher profile
exports.updateTeacherProfile = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Ensure user is updating their own profile or is an admin
    if (req.user.userId.toString() !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this profile' });
    }

    const {
      name,
      phone,
      address,
      qualifications,
      experience,
      bio,
      subjects,
      classesOffered,
      languages,
      hourlyRate,
      availability,
      sampleVideoUrl
    } = req.body;

    // Build update object
    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;

    // Teacher specific details
    const teacherDetails = {};
    if (qualifications) teacherDetails.qualifications = qualifications;
    if (experience) teacherDetails.experience = experience;
    if (bio) teacherDetails.bio = bio;
    if (subjects) teacherDetails.subjects = subjects;
    if (classesOffered) teacherDetails.classesOffered = classesOffered;
    if (languages) teacherDetails.languages = languages;
    if (hourlyRate) teacherDetails.hourlyRate = hourlyRate;
    if (availability) teacherDetails.availability = availability;
    if (sampleVideoUrl) teacherDetails.sampleVideoUrl = sampleVideoUrl;

    // Only update teacher details if there are changes
    if (Object.keys(teacherDetails).length > 0) {
      updateData.$set = { 'teacherDetails': teacherDetails };
    }

    // Update teacher profile
    const teacher = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.json({
      message: 'Teacher profile updated successfully',
      teacher
    });
  } catch (error) {
    console.error('Update teacher profile error:', error);
    res.status(500).json({ message: 'Server error while updating teacher profile' });
  }
};

// Submit teacher verification documents
exports.submitVerificationDocuments = async (req, res) => {
  try {
    const { documentType, documentUrl } = req.body;

    // Ensure user is submitting their own documents
    if (req.user.userId.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Not authorized to submit documents for this profile' });
    }

    const teacher = await User.findById(req.params.id);
    if (!teacher || teacher.role !== 'teacher') {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Add new document to verification documents array
    if (!teacher.teacherDetails.verificationDocuments) {
      teacher.teacherDetails.verificationDocuments = [];
    }

    teacher.teacherDetails.verificationDocuments.push({
      documentType,
      documentUrl,
      isVerified: false
    });

    await teacher.save();

    res.json({
      message: 'Verification document submitted successfully',
      documents: teacher.teacherDetails.verificationDocuments
    });
  } catch (error) {
    console.error('Submit verification documents error:', error);
    res.status(500).json({ message: 'Server error while submitting verification documents' });
  }
};

// Verify teacher documents (admin only)
exports.verifyTeacherDocuments = async (req, res) => {
  try {
    const { documentId, isVerified } = req.body;

    const teacher = await User.findById(req.params.id);
    if (!teacher || teacher.role !== 'teacher') {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Find and update the specific document
    const documentIndex = teacher.teacherDetails.verificationDocuments.findIndex(
      doc => doc._id.toString() === documentId
    );

    if (documentIndex === -1) {
      return res.status(404).json({ message: 'Document not found' });
    }

    teacher.teacherDetails.verificationDocuments[documentIndex].isVerified = isVerified;

    // If all documents are verified, mark the teacher as verified
    const allVerified = teacher.teacherDetails.verificationDocuments.every(doc => doc.isVerified);
    if (allVerified) {
      teacher.isVerified = true;
    }

    await teacher.save();

    res.json({
      message: 'Teacher verification status updated',
      isVerified: teacher.isVerified,
      documents: teacher.teacherDetails.verificationDocuments
    });
  } catch (error) {
    console.error('Verify teacher documents error:', error);
    res.status(500).json({ message: 'Server error while verifying teacher documents' });
  }
};

// Get teacher availability
exports.getTeacherAvailability = async (req, res) => {
  try {
    const teacher = await User.findById(req.params.id);
    if (!teacher || teacher.role !== 'teacher') {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.json({
      availability: teacher.teacherDetails.availability || []
    });
  } catch (error) {
    console.error('Get teacher availability error:', error);
    res.status(500).json({ message: 'Server error while fetching teacher availability' });
  }
};

// Update teacher availability
exports.updateTeacherAvailability = async (req, res) => {
  try {
    const { availability } = req.body;

    // Ensure user is updating their own availability
    if (req.user.userId.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Not authorized to update this availability' });
    }

    const teacher = await User.findById(req.params.id);
    if (!teacher || teacher.role !== 'teacher') {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    teacher.teacherDetails.availability = availability;
    await teacher.save();

    res.json({
      message: 'Availability updated successfully',
      availability: teacher.teacherDetails.availability
    });
  } catch (error) {
    console.error('Update teacher availability error:', error);
    res.status(500).json({ message: 'Server error while updating teacher availability' });
  }
};
