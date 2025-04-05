import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Configure axios base URL based on environment
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
axios.defaults.baseURL = API_BASE_URL;

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define logout function early to avoid reference errors
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setCurrentUser(null);
    setError(null);
  };

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      const fetchCurrentUser = async () => {
        try {
          // Set default auth header for all requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          const response = await axios.get('/api/auth/me');
          setCurrentUser(response.data.user);
          setError(null);
        } catch (err) {
          console.error('Error fetching current user:', err);
          logout(); // Clear invalid token
          setError('Session expired. Please login again.');
        } finally {
          setLoading(false);
        }
      };
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/login', { email, password });
      
      const { token, user } = response.data;
      
      // Save token to localStorage
      localStorage.setItem('token', token);
      
      // Set default auth header for all requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setCurrentUser(user);
      setError(null);
      return true;
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      
      // Prepare the data for the backend
      const registrationData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        phone: userData.phone,
        // Send address fields directly as expected by the backend
        address: userData.address || '',
        city: userData.city || '',
        state: userData.state || '',
        zipCode: userData.zipCode || '',
        country: userData.country || ''
      };
      
      // Add role-specific data
      if (userData.role === 'student') {
        registrationData.class = userData.class;
        registrationData.subjects = userData.subjects;
      } else if (userData.role === 'teacher') {
        registrationData.subjects = userData.subjects;
        registrationData.qualifications = userData.qualifications;
        registrationData.experience = userData.experience;
      }
      
      console.log('Sending registration data:', JSON.stringify(registrationData, null, 2));
      
      const response = await axios.post('/api/auth/register', registrationData);
      
      console.log('Registration response:', response.data);
      
      const { token, user } = response.data;
      
      // Save token to localStorage
      localStorage.setItem('token', token);
      
      // Set default auth header for all requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setCurrentUser(user);
      setError(null);
      return true;
    } catch (err) {
      console.error('Registration error:', err);
      console.error('Error details:', err.response?.data);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function is defined above to avoid reference errors

  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      const response = await axios.put('/api/users/profile', userData);
      
      setCurrentUser(response.data.user);
      setError(null);
      return response.data.user;
    } catch (err) {
      console.error('Update profile error:', err);
      setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/forgot-password', { email });
      setError(null);
      return response.data;
    } catch (err) {
      console.error('Forgot password error:', err);
      setError(err.response?.data?.message || 'Failed to process request. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/reset-password', { token, newPassword });
      setError(null);
      return response.data;
    } catch (err) {
      console.error('Reset password error:', err);
      setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    forgotPassword,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
