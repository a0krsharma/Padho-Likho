import React from 'react';
import axios from 'axios';

// Configure axios base URL based on environment
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://padho-likho-4ky2.onrender.com/api';
axios.defaults.baseURL = API_BASE_URL;

// Create context first
const AuthContext = React.createContext();

// Export the context hook
export function useAuth() {
  return React.useContext(AuthContext);
}

// Export the provider component
export function AuthProvider({ children }) {
  // State declarations
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Clear auth helper
  function clearAuth() {
    localStorage.removeItem('token');
    if (axios.defaults.headers.common['Authorization']) {
      delete axios.defaults.headers.common['Authorization'];
    }
    setCurrentUser(null);
    setError(null);
  }

  // Logout function
  function logout() {
    clearAuth();
  }

  // Check user function
  async function checkUser(token) {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get('auth/me');
      setCurrentUser(response.data.user);
      setError(null);
    } catch (err) {
      console.error('Error fetching user:', err);
      clearAuth();
      setError('Session expired');
    } finally {
      setLoading(false);
    }
  }

  // Initialize on mount
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  // Login function
  async function login(email, password) {
    try {
      setLoading(true);
      const response = await axios.post('auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setCurrentUser(user);
      setError(null);
      return true;
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  }

  // Register function
  async function register(userData) {
    try {
      setLoading(true);
      const registrationData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        phone: userData.phone,
        address: userData.address || '',
        city: userData.city || '',
        state: userData.state || '',
        zipCode: userData.zipCode || '',
        country: userData.country || ''
      };
      
      if (userData.role === 'student') {
        registrationData.class = userData.class;
        registrationData.subjects = userData.subjects;
      } else if (userData.role === 'teacher') {
        registrationData.subjects = userData.subjects;
        registrationData.qualifications = userData.qualifications;
        registrationData.experience = userData.experience;
      }
      
      const response = await axios.post('auth/register', registrationData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setCurrentUser(user);
      setError(null);
      return true;
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  }

  // Update profile function
  async function updateProfile(userData) {
    try {
      setLoading(true);
      const response = await axios.put('users/profile', userData);
      setCurrentUser(response.data.user);
      setError(null);
      return response.data.user;
    } catch (err) {
      console.error('Update profile error:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // Forgot password function
  async function forgotPassword(email) {
    try {
      setLoading(true);
      const response = await axios.post('auth/forgot-password', { email });
      setError(null);
      return response.data;
    } catch (err) {
      console.error('Forgot password error:', err);
      setError(err.response?.data?.message || 'Failed to process request');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // Reset password function
  async function resetPassword(token, newPassword) {
    try {
      setLoading(true);
      const response = await axios.post('auth/reset-password', { token, newPassword });
      setError(null);
      return response.data;
    } catch (err) {
      console.error('Reset password error:', err);
      setError(err.response?.data?.message || 'Failed to reset password');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // Create value object
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

  // Return provider
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
