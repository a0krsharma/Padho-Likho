const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

// Import routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const teacherRoutes = require('./routes/teacher.routes');
const bookingRoutes = require('./routes/booking.routes');
const classRoutes = require('./routes/class.routes');
const assessmentRoutes = require('./routes/assessment.routes');
const paymentRoutes = require('./routes/payment.routes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://db_a0krsharma:db_70@Crore@cluster0.48gvmzc.mongodb.net/padho-likho?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/payments', paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// Socket.io connection for real-time features
io.on('connection', (socket) => {
  console.log('New client connected');
  
  // Join a room for specific class sessions
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', userId);
  });
  
  // Handle chat messages
  socket.on('send-message', (message, roomId) => {
    socket.to(roomId).emit('receive-message', message);
  });
  
  // Handle whiteboard data
  socket.on('whiteboard-data', (data, roomId) => {
    socket.to(roomId).emit('receive-whiteboard-data', data);
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
