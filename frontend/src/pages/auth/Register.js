import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stepper,
  Step,
  StepLabel,
  FormHelperText
} from '@mui/material';
import { 
  Person as PersonIcon, 
  Email as EmailIcon, 
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PasswordStrengthMeter from '../../components/common/PasswordStrengthMeter';

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student', // Default role is now fixed as student
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    class: '',
    subjects: [],
    qualifications: '',
    experience: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [registerError, setRegisterError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const steps = ['Account Details', 'Personal Information', 'Student Details'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (name === 'subjects') {
      // Handle multi-select for subjects
      let selectedSubjects;
      if (e.target.multiple) {
        selectedSubjects = Array.from(e.target.selectedOptions, option => option.value);
      } else {
        // Single select
        selectedSubjects = [value];
      }
      setFormData({ ...formData, subjects: selectedSubjects });
      console.log('Selected subjects:', selectedSubjects);
    } else if (name === 'class' || name === 'experience') {
      // Ensure these are stored as strings for consistent handling
      setFormData({ ...formData, [name]: value.toString() });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    
    // Clear register error when user changes any field
    if (registerError) {
      setRegisterError('');
    }
  };

  const validateStep = (step) => {
    let isValid = true;
    const newErrors = {};
    
    if (step === 0) {
      // Validate email and password
      if (!formData.email) {
        newErrors.email = 'Email is required';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
        isValid = false;
      }
      
      if (!formData.password) {
        newErrors.password = 'Password is required';
        isValid = false;
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
        isValid = false;
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
        isValid = false;
      }
    } else if (step === 1) {
      // Validate personal details
      if (!formData.name) {
        newErrors.name = 'Full name is required';
        isValid = false;
      }
      
      // Role validation removed as role is fixed to student
      
      // Make phone optional but validate format if provided
      if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
        isValid = false;
      }
    } else if (step === 2) {
      // Validate role-specific details
      if (formData.role === 'student') {
        if (!formData.class) {
          // Set default class instead of showing error
          setFormData(prev => ({ ...prev, class: '1' }));
        }
        
        if (!formData.subjects || 
            (Array.isArray(formData.subjects) && formData.subjects.length === 0) || 
            (!Array.isArray(formData.subjects) && !formData.subjects)) {
          newErrors.subjects = 'Please select at least one subject';
          isValid = false;
        }
      } else if (formData.role === 'teacher') {
        if (!formData.qualifications) {
          newErrors.qualifications = 'Qualifications are required';
          isValid = false;
        }
        
        if (!formData.subjects || 
            (Array.isArray(formData.subjects) && formData.subjects.length === 0) || 
            (!Array.isArray(formData.subjects) && !formData.subjects)) {
          newErrors.subjects = 'Please select at least one subject';
          isValid = false;
        }
        if (!formData.experience) {
          // Set default experience instead of showing error
          setFormData(prev => ({ ...prev, experience: '0' }));
        }
      }
      // No specific validations for parent role
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate final step
    const isValid = validateStep(activeStep);
    if (!isValid) {
      return;
    }
    
    // Prepare data for submission
    setLoading(true);
    setRegisterError('');
    
    try {
      // Extract first and last name from full name
      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      // Log form data for debugging
      console.log('Form data before submission:', formData);
      
      const userData = {
        firstName,
        lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone || '',
        address: formData.address || '',
        city: formData.city || '',
        state: formData.state || '',
        zipCode: formData.zipCode || '',
        country: formData.country || ''
      };
      
      // Add role-specific data
      if (formData.role === 'student') {
        userData.class = formData.class || '1';
        userData.subjects = Array.isArray(formData.subjects) ? formData.subjects : 
                           (formData.subjects ? [formData.subjects] : []);
      } else if (formData.role === 'teacher') {
        userData.subjects = Array.isArray(formData.subjects) ? formData.subjects : 
                           (formData.subjects ? [formData.subjects] : []);
        userData.qualifications = formData.qualifications || '';
        userData.experience = formData.experience || '0';
      }
      
      console.log('Prepared userData for registration:', userData);
      
      // Submit registration
      const success = await register(userData);
      
      if (success) {
        navigate('/login', { 
          state: { 
            message: 'Registration successful! Please check your email to verify your account.' 
          } 
        });
      } else {
        // If register function returned false, there might be an error in the auth context
        setRegisterError('Registration failed. Please check your information and try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setRegisterError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Render step content
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
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
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
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
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <PasswordStrengthMeter password={formData.password} />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={toggleShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </>
        );
      case 1:
        return (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
            {/* Role selection removed - default role is student */}
            
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              Address Information (Optional)
            </Typography>
            
            <TextField
              margin="normal"
              fullWidth
              id="address"
              label="Street Address"
              name="address"
              autoComplete="street-address"
              value={formData.address}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="address-level2"
                  value={formData.city}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="state"
                  label="State/Province"
                  name="state"
                  autoComplete="address-level1"
                  value={formData.state}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="zipCode"
                  label="Postal/Zip Code"
                  name="zipCode"
                  autoComplete="postal-code"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  autoComplete="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </>
        );
      case 2:
        return (
          <>
            {formData.role === 'student' && (
              <>
                <FormControl fullWidth margin="normal" required error={!!errors.class}>
                  <InputLabel id="class-label">Class</InputLabel>
                  <Select
                    labelId="class-label"
                    id="class"
                    name="class"
                    value={formData.class}
                    label="Class"
                    onChange={handleChange}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((classNum) => (
                      <MenuItem key={classNum} value={classNum}>
                        Class {classNum}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.class && <FormHelperText error>{errors.class}</FormHelperText>}
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="subjects-label">Subjects of Interest</InputLabel>
                  <Select
                    labelId="subjects-label"
                    id="subjects"
                    name="subjects"
                    multiple
                    value={formData.subjects}
                    label="Subjects of Interest"
                    onChange={handleChange}
                    error={!!errors.subjects}
                  >
                    <MenuItem value="Mathematics">Mathematics</MenuItem>
                    <MenuItem value="Science">Science</MenuItem>
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Hindi">Hindi</MenuItem>
                    <MenuItem value="Social Studies">Social Studies</MenuItem>
                    <MenuItem value="Computer Science">Computer Science</MenuItem>
                  </Select>
                  {errors.subjects && <FormHelperText error>{errors.subjects}</FormHelperText>}
                </FormControl>
              </>
            )}
            {formData.role === 'teacher' && (
              <>
                <FormControl fullWidth margin="normal" required error={!!errors.subjects}>
                  <InputLabel id="subjects-label">Subjects You Teach</InputLabel>
                  <Select
                    labelId="subjects-label"
                    id="subjects"
                    name="subjects"
                    multiple
                    value={formData.subjects}
                    label="Subjects You Teach"
                    onChange={handleChange}
                  >
                    <MenuItem value="Mathematics">Mathematics</MenuItem>
                    <MenuItem value="Science">Science</MenuItem>
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Hindi">Hindi</MenuItem>
                    <MenuItem value="Social Studies">Social Studies</MenuItem>
                    <MenuItem value="Computer Science">Computer Science</MenuItem>
                  </Select>
                  {errors.subjects && <FormHelperText error>{errors.subjects}</FormHelperText>}
                </FormControl>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="qualifications"
                  label="Qualifications"
                  name="qualifications"
                  placeholder="e.g., B.Ed., M.Sc. in Mathematics"
                  value={formData.qualifications || ''}
                  onChange={handleChange}
                  error={!!errors.qualifications}
                  helperText={errors.qualifications}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="experience"
                  label="Years of Experience"
                  name="experience"
                  type="number"
                  value={formData.experience || ''}
                  onChange={handleChange}
                />
              </>
            )}
            {formData.role === 'parent' && (
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                After registration, you'll be able to add your children's details in your dashboard.
              </Typography>
            )}
          </>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Create an Account
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph align="center">
        Join Padho Likho to start your learning journey
      </Typography>
      
      {registerError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {registerError}
        </Alert>
      )}
      
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {getStepContent(activeStep)}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            disabled={activeStep === 0 || loading}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          <Box>
            {activeStep === steps.length - 1 ? (
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Register'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={loading}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
        
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Link component={RouterLink} to="/login" variant="body2">
              Log in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
