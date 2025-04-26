import React from 'react';
import axios from 'axios';

// Create context first
const AuthContext = React.createContext();

// Export the context hook
export function useAuth() {
  return React.useContext(AuthContext);
}

// Mock user data for development
const mockUsers = {
  'teacher@example.com': {
    _id: '2',
    email: 'teacher@example.com',
    password: 'password123',
    firstName: 'Teacher',
    lastName: 'User',
    role: 'teacher',
    profilePicture: 'https://randomuser.me/api/portraits/women/1.jpg',
    phone: '9876543211',
    address: '456 Teacher Avenue',
    city: 'Mumbai',
    state: 'Maharashtra',
    zipCode: '400001',
    country: 'India',
    isVerified: true,
    createdAt: new Date(),
    teacherDetails: {
      subjects: ['Mathematics', 'Science'],
      qualifications: ['M.Sc. Mathematics', 'B.Ed.'],
      experience: 5,
      hourlyRate: 500
    }
  },
  'student@example.com': {
    _id: '1',
    email: 'student@example.com',
    password: 'password123',
    firstName: 'Student',
    lastName: 'User',
    role: 'student',
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
    phone: '9876543210',
    address: '123 Student Street',
    city: 'Delhi',
    state: 'Delhi',
    zipCode: '110001',
    country: 'India',
    isVerified: true,
    createdAt: new Date(),
    studentDetails: {
      class: 10,
      subjects: ['Mathematics', 'Science', 'English']
    }
  },
  'parent@example.com': {
    _id: '3',
    email: 'parent@example.com',
    password: 'password123',
    firstName: 'Parent',
    lastName: 'User',
    role: 'parent',
    profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
    phone: '9876543212',
    address: '789 Parent Road',
    city: 'Bangalore',
    state: 'Karnataka',
    zipCode: '560001',
    country: 'India',
    isVerified: true,
    createdAt: new Date(),
    parentDetails: {
      children: [
        {
          name: 'Child One',
          age: 12,
          class: 7
        },
        {
          name: 'Child Two',
          age: 9,
          class: 4
        }
      ]
    }
  }
};

// Export the provider component
export function AuthProvider({ children }) {
  // State declarations
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Clear auth helper - memoize with useCallback to prevent recreation on each render
  // Clear authentication state and remove all tokens
  const clearAuth = React.useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    delete axios.defaults.headers.common['Authorization'];
    setCurrentUser(null);
    setError(null);
  }, []);

  // Logout function
  const logout = React.useCallback(() => {
    clearAuth();
  }, [clearAuth]);

  // Check user function
  // Robustly check user using token (mock or real backend)
  const checkUser = React.useCallback(async (token) => {
    try {
      if (!token || typeof token !== 'string' || !token.includes('.')) {
        throw new Error('Token is missing or not a valid JWT string');
      }
      // Try backend /api/auth/me first
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get('/api/auth/me');
        if (response.data && response.data.user) {
          setCurrentUser(response.data.user);
          setError(null);
          return;
        }
      } catch (apiError) {
        // If backend fails, fallback to mock decode
        // Decode the JWT-like token
        const parts = token.split('.');
        if (!Array.isArray(parts) || parts.length !== 3) {
          throw new Error('Invalid token format');
        }
        const payload = parts[1];
        let decodedPayload;
        try {
          decodedPayload = JSON.parse(atob(payload));
        } catch (e) {
          throw new Error('Token payload is not valid base64 or JSON');
        }
        // Find the user in our mock data
        const userId = decodedPayload.userId;
        const user = Object.values(mockUsers).find(u => u._id === userId);
        if (user) {
          const userToReturn = { ...user };
          delete userToReturn.password;
          setCurrentUser(userToReturn);
          setError(null);
        } else {
          setCurrentUser(null);
          setError('Profile not found for this account.');
        }
      }
    } catch (err) {
      // Only clear auth if token truly invalid or expired
      console.error('Auth check error:', err);
      setCurrentUser(null);
      setError('Authentication failed. Please login again.');
    } finally {
      setLoading(false);
    }
  }, [clearAuth]);

  // Effect to check for token on mount
  React.useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Set token in axios headers
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          await checkUser(token);
        } catch (error) {
          console.error('Auth check error:', error);
          clearAuth();
        }
      } else {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [checkUser, clearAuth]);

  // Login function
  async function login(email, password) {
    try {
      setLoading(true);
      
      // Try to use the backend API first
      try {
        const response = await axios.post('/api/auth/login', { email, password });
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', user.role); 
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setCurrentUser(user);
        setError(null);
        return true;
      } catch (apiError) {
        console.error('API Login error:', apiError);
        
        // Fall back to mock login if API fails
        console.log("Falling back to mock authentication");
        if (mockUsers[email] && mockUsers[email].password === password) {
          console.log("Mock authentication successful");
          const user = { ...mockUsers[email] };
          delete user.password; // Don't include password in the user object
          
          // Create a simple mock token that mimics JWT structure
          // Format: header.payload.signature (all base64 encoded)
          const mockPayload = {
            userId: user._id,
            role: user.role,
            exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days expiry
          };
          
          // Create a simple JWT-like token with base64 encoding
          const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
          const payload = btoa(JSON.stringify(mockPayload));
          const signature = btoa('mockSignature'); // Not a real signature, just for structure
          
          const token = `${header}.${payload}.${signature}`;
          
          localStorage.setItem('token', token);
          localStorage.setItem('userRole', user.role);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          setCurrentUser(user);
          setError(null);
          return true;
        } else {
          console.log("Mock authentication failed - invalid credentials");
          setError('Invalid email or password');
          return false;
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      
      // Final fallback if everything else fails
      console.log("Final fallback authentication");
      if (email && password && mockUsers[email] && mockUsers[email].password === password) {
        console.log("Final fallback authentication successful");
        const user = { ...mockUsers[email] };
        delete user.password;
        
        const mockPayload = {
          userId: user._id,
          role: user.role,
          exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days expiry
        };
        
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const payload = btoa(JSON.stringify(mockPayload));
        const signature = btoa('mockSignature'); // Not a real signature, just for structure
        
        const token = `${header}.${payload}.${signature}`;
        
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', user.role);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        setCurrentUser(user);
        setError(null);
        return true;
      }
      
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
      
      // Try to use the backend API first
      try {
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
        
        const response = await axios.post('/api/auth/register', registrationData);
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', user.role);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setCurrentUser(user);
        setError(null);
        return true;
      } catch (apiError) {
        console.error('API Registration error:', apiError);
        
        // Fall back to mock registration if API fails
        // Create a new mock user
        const newUser = {
          _id: `${Date.now()}`, // Simple ID generation
          email: userData.email,
          password: userData.password,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: userData.role || 'student',
          phone: userData.phone || '',
          address: userData.address || '',
          city: userData.city || '',
          state: userData.state || '',
          zipCode: userData.zipCode || '',
          country: userData.country || '',
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        // Add role-specific details
        if (userData.role === 'student') {
          newUser.studentDetails = {
            class: userData.class || 1,
            subjects: userData.subjects || []
          };
        } else if (userData.role === 'teacher') {
          newUser.teacherDetails = {
            subjects: userData.subjects || [],
            qualifications: userData.qualifications || [],
            experience: userData.experience || 0,
            hourlyRate: 500 // Default rate
          };
        } else if (userData.role === 'parent') {
          newUser.parentDetails = {
            children: []
          };
        }
        
        // Add to mock users
        mockUsers[userData.email] = newUser;
        
        // Create a simple mock token that mimics JWT structure
        // Format: header.payload.signature (all base64 encoded)
        const mockPayload = {
          userId: newUser._id,
          role: newUser.role,
          exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days expiry
        };
        
        // Create a simple JWT-like token with base64 encoding
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const payload = btoa(JSON.stringify(mockPayload));
        const signature = btoa('mockSignature'); // Not a real signature, just for structure
        
        const token = `${header}.${payload}.${signature}`;
        
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', newUser.role);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        const userToReturn = { ...newUser };
        delete userToReturn.password; // Don't include password
        
        setCurrentUser(userToReturn);
        setError(null);
        return true;
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed');
      return false;
    }
  }

  // Add getCurrentUser method to context value
  // Get current user with robust error handling (no forced logout on minor errors)
  const getCurrentUser = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setCurrentUser(null);
        setError('You are not logged in. Please login again.');
        return null;
      }
      await checkUser(token);
      // Do not force logout here; just return null if not found
      return currentUser;
    } catch (err) {
      // Only clear auth if token truly invalid
      setCurrentUser(null);
      setError('Unable to fetch user profile. Please login again.');
      return null;
    } finally {
      setLoading(false);
    }
  }, [checkUser, currentUser]);

  // Only keep this value declaration
  const value = React.useMemo(() => ({
    currentUser,
    loading,
    error,
    login,
    logout,
    register,
    getCurrentUser,
  }), [currentUser, loading, error, login, logout, register, getCurrentUser]);

  // Return provider
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
