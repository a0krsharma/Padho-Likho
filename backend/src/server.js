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
// const dashboardRoutes = require('./routes/dashboard.routes'); // Temporarily commented out

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
const allowedOrigins = [
  'https://padho-likho.netlify.app',
  'https://padholikho.app',
  'https://padho-likho-4ky2.onrender.com',
  'http://localhost:3000',
  'http://localhost:3001'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      console.log('CORS blocked for origin:', origin);
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
// Ensure preflight requests are handled
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/padho-likho';
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
// app.use('/api/dashboard', dashboardRoutes); // Temporarily commented out

// Import error handling middleware
const errorHandler = require('./middleware/error.middleware');

// Test MongoDB connection
app.get('/test-db', async (req, res) => {
  try {
    // Try to ping the database
    await mongoose.connection.db.admin().ping();
    res.json({ 
      status: 'success',
      message: 'MongoDB connection is working',
      dbName: mongoose.connection.name,
      dbHost: mongoose.connection.host,
      dbPort: mongoose.connection.port
    });
  } catch (error) {
    console.error('MongoDB connection test failed:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'MongoDB connection failed',
      error: error.message 
    });
  }
});

// Root route for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Padho-Likho API', 
    status: 'running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Apply error handling middleware
app.use(errorHandler);

// Socket.io connection for real-time features
io.on('connection', (socket) => {
  console.log('New client connected');
  
  // Join a room for specific class sessions
  socket.on('join-class', (classId) => {
    socket.join(classId);
    console.log(`User joined class: ${classId}`);
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
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Available routes:');
  console.log(`- GET /`);
  console.log(`- POST /api/auth/register`);
  console.log(`- POST /api/auth/login`);
  console.log(`- GET /api/users`);
  console.log(`- GET /api/teachers`);
  console.log(`- GET /api/bookings`);
  console.log(`- GET /api/classes`);
  console.log(`- GET /api/assessments`);
  console.log(`- GET /api/payments`);
});
