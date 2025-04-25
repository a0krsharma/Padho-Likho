import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

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
import Hiring from './pages/Hiring';
import AdminDashboard from './pages/admin/AdminDashboard';

// Teacher pages
import TeacherDashboard from './pages/teacher/Dashboard';
import ManageClasses from './pages/teacher/ManageClasses';
import ManageBookings from './pages/teacher/ManageBookings';
import TeacherAssessments from './pages/teacher/Assessments';
import CreateAssessment from './pages/teacher/CreateAssessment';

// Student pages
import StudentDashboard from './pages/student/Dashboard';
import StudentAssessments from './pages/student/Assessments';
import MyBookings from './pages/student/MyBookings';
import MyClasses from './pages/student/MyClasses';

// Profile page
import Profile from './pages/profile/Profile';

// Shared pages
import BookingDetails from './pages/shared/BookingDetails';
import ClassRoom from './pages/shared/ClassRoom';
import AssessmentDetails from './pages/shared/AssessmentDetails';
import TakeAssessment from './pages/shared/TakeAssessment';

// Parent pages
import ParentDashboard from './pages/parent/Dashboard';
import ChildProgress from './pages/parent/ChildProgress';

// Context
import { AuthProvider } from './context/AuthContext';

// Placeholder components for pages we haven't created yet
const PlaceholderComponent = ({ title }) => (
  <Box 
    sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '80vh',
      flexDirection: 'column'
    }}
  >
    <h1>{title}</h1>
    <p>This page is under construction</p>
  </Box>
);

// Protected route component
const ProtectedRoute = ({ children, allowedRoles }) => {
  // This is a simplified version - in a real app, we would check authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth status
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      
      // Decode the JWT token to get the user role
      try {
        // Simple JWT decoding (base64)
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        setUserRole(decodedPayload.role || 'student');
        console.log('User role from token:', decodedPayload.role);
      } catch (error) {
        console.error('Error decoding token:', error);
        // Fallback to checking localStorage for role
        const storedRole = localStorage.getItem('userRole');
        setUserRole(storedRole || 'student');
      }
    }
    setLoading(false);
  }, []);

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

  if (allowedRoles && !allowedRoles.includes(userRole)) {
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
          <Route path="/privacy-policy" element={<React.Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>}>
            {React.createElement(require('./pages/legal/PrivacyPolicy').default)}
          </React.Suspense>} />
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/hiring" element={<Hiring />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/find-teachers" element={<FindTeachers />} />
          <Route path="/teachers/:id" element={<TeacherProfile />} />
          <Route path="/teachers/:id/book" element={<BookTeacher />} />

          {/* Student routes */}
          <Route 
            path="/student/help" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <React.Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>}>
                  {React.createElement(require('./pages/student/Help').default)}
                </React.Suspense>
              </ProtectedRoute>
            } 
          />
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
            path="/teacher/verification-process" 
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                {React.createElement(require('./pages/VerificationProcess').default)}
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teacher/verification" 
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                {React.createElement(require('./pages/teacher/Verification').default)}
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teacher/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherDashboard />
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
