import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { Error as ErrorIcon, Refresh as RefreshIcon } from '@mui/icons-material';

const ErrorDisplay = ({ 
  message = 'An error occurred', 
  details = null, 
  onRetry = null 
}) => {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 4, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        maxWidth: '600px',
        mx: 'auto',
        my: 4,
        borderRadius: 2
      }}
    >
      <ErrorIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
      <Typography variant="h5" gutterBottom color="error" sx={{ fontWeight: 'bold' }}>
        {message}
      </Typography>
      
      {details && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
          {details}
        </Typography>
      )}
      
      {onRetry && (
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<RefreshIcon />}
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </Paper>
  );
};

export default ErrorDisplay;
