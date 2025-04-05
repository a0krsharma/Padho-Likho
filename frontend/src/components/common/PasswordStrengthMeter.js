import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

/**
 * Password strength meter component
 * Displays a visual indicator of password strength
 */
const PasswordStrengthMeter = ({ password }) => {
  // Calculate password strength
  const calculateStrength = (password) => {
    if (!password) return 0;
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 25;
    
    // Contains lowercase letters
    if (/[a-z]/.test(password)) strength += 25;
    
    // Contains uppercase letters
    if (/[A-Z]/.test(password)) strength += 25;
    
    // Contains numbers or special characters
    if (/[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) strength += 25;
    
    return strength;
  };
  
  // Get strength level and color
  const getStrengthInfo = (strength) => {
    if (strength === 0) return { level: 'None', color: '#e0e0e0' };
    if (strength <= 25) return { level: 'Weak', color: '#f44336' };
    if (strength <= 50) return { level: 'Fair', color: '#ff9800' };
    if (strength <= 75) return { level: 'Good', color: '#2196f3' };
    return { level: 'Strong', color: '#4caf50' };
  };
  
  const strength = calculateStrength(password);
  const { level, color } = getStrengthInfo(strength);
  
  return (
    <Box sx={{ width: '100%', mt: 1, mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="caption" color="textSecondary">
          Password Strength
        </Typography>
        <Typography variant="caption" sx={{ color }}>
          {level}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={strength}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: '#e0e0e0',
          '& .MuiLinearProgress-bar': {
            backgroundColor: color,
          },
        }}
      />
      {strength < 100 && (
        <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, display: 'block' }}>
          {strength < 25 ? 'Try adding uppercase, numbers, and special characters' : 
           strength < 50 ? 'Try adding more variety of characters' : 
           strength < 75 ? 'Almost there! Add more complexity' : ''}
        </Typography>
      )}
    </Box>
  );
};

export default PasswordStrengthMeter;
