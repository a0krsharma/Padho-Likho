import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  InputAdornment, 
  Alert, 
  CircularProgress,
  Link,
  Paper
} from '@mui/material';
import { 
  Email as EmailIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { forgotPassword } = useAuth();

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const validateForm = () => {
    if (!email) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      await forgotPassword(email);
      setSuccess(true);
      setError('');
    } catch (error) {
      console.error('Forgot password error:', error);
      setError(
        error.response?.data?.message || 
        'Failed to process request. Please try again.'
      );
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Forgot Password
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph align="center">
        Enter your email address and we'll send you a link to reset your password
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {success ? (
        <Box>
          <Alert severity="success" sx={{ mb: 3 }}>
            Password reset link has been sent to your email address. Please check your inbox.
          </Alert>
          <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, mb: 3 }}>
            <Typography variant="body1" paragraph>
              If you don't receive an email within a few minutes, please:
            </Typography>
            <ul>
              <li>
                <Typography variant="body1">Check your spam or junk folder</Typography>
              </li>
              <li>
                <Typography variant="body1">Verify that you entered the correct email address</Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Contact our support team if you continue to have issues
                </Typography>
              </li>
            </ul>
          </Paper>
          <Button
            component={RouterLink}
            to="/login"
            fullWidth
            variant="contained"
            startIcon={<ArrowBackIcon />}
          >
            Back to Login
          </Button>
        </Box>
      ) : (
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
            value={email}
            onChange={handleChange}
            error={Boolean(error)}
            helperText={error}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Reset Password'}
          </Button>
          
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              Remember your password?{' '}
              <Link component={RouterLink} to="/login" variant="body2">
                Back to login
              </Link>
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ForgotPassword;
