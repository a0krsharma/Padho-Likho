const Booking = require('../models/booking.model');
const User = require('../models/user.model');
const Class = require('../models/class.model');
const { validationResult } = require('express-validator');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      teacherId,
      subject,
      classGrade,
      bookingType,
      duration,
      startDate,
      endDate,
      schedule,
      isEmergencyBooking,
      groupMembers
    } = req.body;

    // Check if teacher exists
    const teacher = await User.findOne({ _id: teacherId, role: 'teacher' });
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Validate booking type and get price
    if (!teacher.teacherDetails.hourlyRate || !teacher.teacherDetails.hourlyRate[bookingType]) {
      return res.status(400).json({ message: 'Invalid booking type' });
    }

    // Calculate total amount based on booking type, duration, and schedule
    const hourlyRate = teacher.teacherDetails.hourlyRate[bookingType];
    const sessionsPerWeek = schedule.length;
    
    // Calculate number of weeks based on duration
    let weeks = 0;
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    
    if (duration === 'weekly') {
      weeks = 1;
    } else if (duration === 'monthly') {
      weeks = 4;
    } else if (duration === 'yearly') {
      weeks = 52;
    } else {
      // Calculate based on actual dates
      const diffTime = Math.abs(endDateObj - startDateObj);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      weeks = Math.ceil(diffDays / 7);
    }
    
    // Calculate total sessions and amount
    const totalSessions = sessionsPerWeek * weeks;
    let totalAmount = hourlyRate * totalSessions;
    
    // Apply emergency booking premium if applicable
    if (isEmergencyBooking) {
      totalAmount *= 1.2; // 20% premium for emergency bookings
    }

    // Create booking
    const booking = new Booking({
      student: req.user.userId,
      teacher: teacherId,
      subject,
      classGrade,
      bookingType,
      duration,
      startDate: startDateObj,
      endDate: endDateObj,
      schedule,
      isEmergencyBooking,
      totalAmount,
      groupMembers: groupMembers || [],
      createdBy: req.user.userId,
      status: 'pending'
    });

    await booking.save();

    // Create class sessions based on the booking schedule
    const classSessions = [];
    let currentDate = new Date(startDateObj);
    
    while (currentDate <= endDateObj) {
      const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][currentDate.getDay()];
      
      // Check if this day is in the schedule
      const daySchedule = schedule.find(s => s.day === dayOfWeek);
      
      if (daySchedule) {
        // Create a class for this day
        const classStartTime = new Date(currentDate);
        const [hours, minutes] = daySchedule.startTime.split(':');
        classStartTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        
        const classEndTime = new Date(currentDate);
        const [endHours, endMinutes] = daySchedule.endTime.split(':');
        classEndTime.setHours(parseInt(endHours), parseInt(endMinutes), 0, 0);
        
        const classSession = new Class({
          booking: booking._id,
          teacher: teacherId,
          students: [req.user.userId, ...groupMembers],
          subject,
          classGrade,
          title: `${subject} Class - Grade ${classGrade}`,
          startTime: classStartTime,
          endTime: classEndTime,
          status: 'scheduled',
          roomId: `class-${booking._id}-${classStartTime.getTime()}`
        });
        
        await classSession.save();
        classSessions.push(classSession);
      }
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    res.status(201).json({
      message: 'Booking created successfully',
      booking,
      classSessions
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Server error while creating booking' });
  }
};

// Get all bookings for a user (student or teacher)
exports.getUserBookings = async (req, res) => {
  try {
    const { status, fromDate, toDate } = req.query;
    
    // Build query based on user role
    let query = {};
    
    if (req.user.role === 'student' || req.user.role === 'parent') {
      query.student = req.user.userId;
    } else if (req.user.role === 'teacher') {
      query.teacher = req.user.userId;
    }
    
    // Filter by status if provided
    if (status) {
      query.status = status;
    }
    
    // Filter by date range if provided
    if (fromDate || toDate) {
      query.startDate = {};
      if (fromDate) query.startDate.$gte = new Date(fromDate);
      if (toDate) query.startDate.$lte = new Date(toDate);
    }
    
    const bookings = await Booking.find(query)
      .populate('teacher', 'name email profilePicture teacherDetails')
      .populate('student', 'name email profilePicture')
      .sort({ createdAt: -1 });
    
    res.json({ bookings });
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('teacher', 'name email profilePicture teacherDetails')
      .populate('student', 'name email profilePicture')
      .populate('groupMembers', 'name email profilePicture');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if user is authorized to view this booking
    if (
      req.user.role !== 'admin' &&
      booking.student.toString() !== req.user.userId.toString() &&
      booking.teacher.toString() !== req.user.userId.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized to view this booking' });
    }
    
    // Get associated class sessions
    const classSessions = await Class.find({ booking: booking._id })
      .sort({ startTime: 1 });
    
    res.json({ booking, classSessions });
  } catch (error) {
    console.error('Get booking by ID error:', error);
    res.status(500).json({ message: 'Server error while fetching booking' });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status, cancellationReason } = req.body;
    
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if user is authorized to update this booking
    if (
      req.user.role !== 'admin' &&
      booking.student.toString() !== req.user.userId.toString() &&
      booking.teacher.toString() !== req.user.userId.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized to update this booking' });
    }
    
    // Update booking status
    booking.status = status;
    
    // If cancelling, add reason
    if (status === 'cancelled' && cancellationReason) {
      booking.cancellationReason = cancellationReason;
    }
    
    await booking.save();
    
    // If confirmed or cancelled, update associated class sessions
    if (status === 'confirmed' || status === 'cancelled') {
      await Class.updateMany(
        { booking: booking._id },
        { status: status === 'confirmed' ? 'scheduled' : 'cancelled' }
      );
    }
    
    res.json({
      message: `Booking ${status} successfully`,
      booking
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ message: 'Server error while updating booking status' });
  }
};

// Add student to group booking
exports.addStudentToBooking = async (req, res) => {
  try {
    const { studentId } = req.body;
    
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if booking is a group booking
    if (booking.bookingType === 'individual') {
      return res.status(400).json({ message: 'Cannot add students to individual booking' });
    }
    
    // Check if booking is already at capacity
    const maxStudents = {
      twoStudents: 2,
      fiveStudents: 5,
      tenStudents: 10
    };
    
    if (booking.groupMembers.length >= maxStudents[booking.bookingType] - 1) {
      return res.status(400).json({ message: 'Booking is already at maximum capacity' });
    }
    
    // Check if student is already in the group
    if (
      booking.student.toString() === studentId ||
      booking.groupMembers.includes(studentId)
    ) {
      return res.status(400).json({ message: 'Student is already in this booking' });
    }
    
    // Add student to group
    booking.groupMembers.push(studentId);
    await booking.save();
    
    // Add student to associated class sessions
    await Class.updateMany(
      { booking: booking._id },
      { $addToSet: { students: studentId } }
    );
    
    res.json({
      message: 'Student added to booking successfully',
      booking
    });
  } catch (error) {
    console.error('Add student to booking error:', error);
    res.status(500).json({ message: 'Server error while adding student to booking' });
  }
};
