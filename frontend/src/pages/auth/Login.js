import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  InputAdornment, 
  IconButton, 
  Alert, 
  CircularProgress,
  Link
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Email as EmailIcon, 
  Lock as LockIcon 
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear field error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    // Clear login error when user changes any field
    if (loginError) {
      setLoginError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      await login(formData.email, formData.password);
      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(
        error.response?.data?.message || 
        'Failed to login. Please check your credentials and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Welcome Back
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph align="center">
        Log in to continue your learning journey
      </Typography>
      
      {loginError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {loginError}
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={formData.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          error={Boolean(errors.password)}
          helperText={errors.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon color="primary" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        <Box sx={{ textAlign: 'right', mt: 1 }}>
          <Link component={RouterLink} to="/forgot-password" variant="body2">
            Forgot password?
          </Link>
        </Box>
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, mb: 2, py: 1.5 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Log In'}
        </Button>
        
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link component={RouterLink} to="/register" variant="body2">
              Register now
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
