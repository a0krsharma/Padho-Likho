import React from 'react';
import axios from 'axios';

// Configure axios base URL based on environment
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://padho-likho-4ky2.onrender.com/api';
axios.defaults.baseURL = API_BASE_URL;

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

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
  const checkUser = React.useCallback(async (token) => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get('/auth/me');
      setCurrentUser(response.data.user);
      setError(null);
    } catch (err) {
      console.error('Error fetching user:', err);
      clearAuth();
      setError('Session expired');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize on mount
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkUser(token);
    } else {
      setLoading(false);
    }
  }, [checkUser]);

  // Login function
  async function login(email, password) {
    try {
      setLoading(true);
      const response = await axios.post('/auth/login', { email, password });
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
      
      console.log('Sending registration data:', JSON.stringify(registrationData, null, 2));
      
      const response = await axios.post('/auth/register', registrationData);
      console.log('Registration response:', response.data);
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setCurrentUser(user);
      setError(null);
      return true;
    } catch (err) {
      console.error('Registration error:', err);
      console.error('Error response:', err.response?.data);
      
      // Handle validation errors
      if (err.response?.data?.errors) {
        const validationErrors = err.response.data.errors.map(error => error.msg).join(', ');
        setError(validationErrors || 'Validation failed. Please check your input.');
      } else {
        setError(err.response?.data?.message || 'Registration failed');
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
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
