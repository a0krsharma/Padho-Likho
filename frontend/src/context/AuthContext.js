import React from 'react';
import axios from 'axios';

// Configure axios base URL based on environment
const API_BASE_URL = (process.env.REACT_APP_API_URL || 'https://padho-likho-4ky2.onrender.com').replace(/\/$/, '');

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
  async function logout() {
    try {
      // Attempt to invalidate the session on the server
      await api.post('/api/auth/logout');
    } catch (err) {
      console.error('Logout API error (proceeding with client-side cleanup):', err);
      // Continue with client-side cleanup even if server logout fails
    } finally {
      // Clear auth state and token
      clearAuth();
    }
  }

  // Check user function
  const checkUser = React.useCallback(async (token) => {
    try {
      if (!token) {
        setLoading(false);
        return;
      }
      
      // Fetch user data using the api instance
      const response = await api.get('/api/auth/me');
      
      // If successful, update the user state
      if (response.data && response.data.user) {
        setCurrentUser(response.data.user);
        setError(null);
      } else {
        throw new Error('Invalid user data received');
      }
    } catch (err) {
      console.error('Error fetching user:', err);
      clearAuth();
      setError('Session expired. Please log in again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize on mount and on token change
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    checkUser(token);
  }, [checkUser]);

  // Login function
  async function login(email, password) {
    try {
      setLoading(true);
      setError('');
      
      // Make login request using the api instance
      const response = await api.post('/api/auth/login', { 
        email: email.trim().toLowerCase(),
        password: password
      });
      
      // Extract token and user data
      const { token, user } = response.data;
      
      if (!token || !user) {
        throw new Error('Invalid response from server');
      }
      
      // Store token and update auth header
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Update user state
      setCurrentUser(user);
      setError(null);
      
      return true;
    } catch (err) {
      console.error('Login error:', err);
      clearAuth();
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }

  // Register function
  async function register(userData) {
    try {
      setLoading(true);
      setError('');
      
      // Prepare registration data
      const registrationData = {
        firstName: userData.firstName.trim(),
        lastName: userData.lastName.trim(),
        email: userData.email.trim().toLowerCase(),
        password: userData.password,
        role: userData.role,
        phone: userData.phone?.trim() || '',
        address: userData.address?.trim() || '',
        city: userData.city?.trim() || '',
        state: userData.state?.trim() || '',
        zipCode: userData.zipCode?.trim() || '',
        country: userData.country?.trim() || ''
      };
      
      // Add role-specific fields
      if (userData.role === 'student') {
        registrationData.class = userData.class;
        registrationData.subjects = Array.isArray(userData.subjects) ? userData.subjects : [];
      } else if (userData.role === 'teacher') {
        registrationData.subjects = Array.isArray(userData.subjects) ? userData.subjects : [];
        registrationData.qualifications = userData.qualifications?.trim() || '';
        registrationData.experience = userData.experience || 0;
      }
      
      // Send registration request using the api instance
      const response = await api.post('/api/auth/register', registrationData);
      
      // Handle successful registration
      const { token, user } = response.data;
      
      if (!token || !user) {
        throw new Error('Invalid response from server');
      }
      
      // Store token and update auth header
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Update user state
      setCurrentUser(user);
      setError(null);
      
      return true;
      
    } catch (err) {
      console.error('Registration error:', err);
      
      // Clear any partial auth state on error
      clearAuth();
      
      // Handle different types of errors
      if (err.response?.status === 400 && err.response.data?.errors) {
        // Handle validation errors
        const validationErrors = err.response.data.errors
          .map(error => error.msg || error.message || 'Invalid field')
          .join('\n');
        setError(validationErrors || 'Please check your input and try again.');
      } else if (err.response?.data?.message) {
        // Handle server-side error messages
        setError(err.response.data.message);
      } else if (err.message === 'Network Error') {
        setError('Unable to connect to the server. Please check your internet connection.');
      } else {
        setError('Registration failed. Please try again later.');
      }
      
      return false;
      
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
    clearAuth,
    checkUser, // Expose checkUser for ProtectedRoute
    api        // Expose the configured api instance
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
