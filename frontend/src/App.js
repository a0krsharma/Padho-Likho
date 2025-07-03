import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from './context/AuthContext';
import jwt_decode from 'jwt-decode';

// Layout components
import MainLayout from './components/layouts/MainLayout';
import AuthLayout from './components/layouts/AuthLayout';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Public pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import FindTeachers from './pages/FindTeachers';
import TeacherProfile from './pages/TeacherProfile';
import BookTeacher from './pages/BookTeacher';
import ProfileImageUploader from './pages/ProfileImageUploader';

// Teacher pages
import TeacherDashboard from './pages/teacher/Dashboard';
import ManageClasses from './pages/teacher/ManageClasses';
import ManageBookings from './pages/teacher/ManageBookings';
import TeacherAssessments from './pages/teacher/Assessments';
import CreateAssessment from './pages/teacher/CreateAssessment';
import Verification from './pages/teacher/Verification';

// Student pages
import StudentDashboard from './pages/student/Dashboard';
import StudentAssessments from './pages/student/Assessments';
import StudentHelp from './pages/student/Help';

// Profile page
import Profile from './pages/profile/Profile';

// Context
import { AuthProvider } from './context/AuthContext';



// Simple placeholder component for not-yet-implemented pages
const PlaceholderComponent = ({ title }) => (
  <Box sx={{ p: 5, textAlign: 'center' }}>
    <Typography variant="h4" color="text.secondary">{title} (Coming Soon)</Typography>
  </Box>
);

// Student pages placeholders (only for pages not yet implemented)
const MyBookings = () => <PlaceholderComponent title="My Bookings" />;
const MyClasses = () => <PlaceholderComponent title="My Classes" />;

// Parent pages placeholders
const ParentDashboard = () => <PlaceholderComponent title="Parent Dashboard" />;
const ChildProgress = () => <PlaceholderComponent title="Child Progress" />;

// Shared pages placeholders
const ClassRoom = () => <PlaceholderComponent title="Class Room" />;
const BookingDetails = () => <PlaceholderComponent title="Booking Details" />;
const AssessmentDetails = () => <PlaceholderComponent title="Assessment Details" />;
const TakeAssessment = () => <PlaceholderComponent title="Take Assessment" />;





// Protected route component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let role = null;
    let token = localStorage.getItem('token');
    if (currentUser && currentUser.role) {
      setIsAuthenticated(true);
      role = currentUser.role;
    } else if (token) {
      setIsAuthenticated(true);
      try {
        const decoded = jwt_decode(token);
        role = decoded.role || localStorage.getItem('role');
      } catch (e) {
        // fallback to localStorage role if decoding fails
        role = localStorage.getItem('role');
      }
    }
    setUserRole(role);
    setLoading(false);
  }, [currentUser]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && (!userRole || !allowedRoles.includes(userRole))) {
    return <Navigate to="/" />;
  }

  return children;
};


function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Main layout routes */}
        <Route element={<MainLayout />}>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/find-teachers" element={<FindTeachers />} />
          <Route path="/teachers/:id" element={<TeacherProfile />} />
          <Route path="/teachers/:id/book" element={<BookTeacher />} />
          <Route path="/profile-image-uploader" element={<ProfileImageUploader />} />

          {/* Student routes */}
          <Route 
            path="/student/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/bookings" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <MyBookings />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/classes" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <MyClasses />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/assessments" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentAssessments />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/help" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentHelp />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/profile" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Profile />
              </ProtectedRoute>
            } 
          />

          {/* Parent routes */}
          <Route 
            path="/parent/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['parent']}>
                <ParentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/parent/profile" 
            element={
              <ProtectedRoute allowedRoles={['parent']}>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/parent/child-progress" 
            element={
              <ProtectedRoute allowedRoles={['parent']}>
                <ChildProgress />
              </ProtectedRoute>
            } 
          />

          {/* Teacher routes */}
          <Route 
            path="/teacher/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teacher/verification" 
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <Verification />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teacher/classes" 
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <ManageClasses />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teacher/bookings" 
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <ManageBookings />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teacher/assessments" 
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherAssessments />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teacher/assessments/create" 
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <CreateAssessment />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teacher/profile" 
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <Profile />
              </ProtectedRoute>
            } 
          />

          {/* Shared routes */}
          <Route 
            path="/classroom/:id" 
            element={
              <ProtectedRoute>
                <ClassRoom />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bookings/:id" 
            element={
              <ProtectedRoute>
                <BookingDetails />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/assessments/:id" 
            element={
              <ProtectedRoute>
                <AssessmentDetails />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/assessments/:id/take" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <TakeAssessment />
              </ProtectedRoute>
            } 
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
