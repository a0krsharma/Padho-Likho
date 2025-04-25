import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { SentimentDissatisfied as SadIcon, Home as HomeIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Paper 
        elevation={3} 
        sx={{ 
          p: 6, 
          my: 8, 
          textAlign: 'center',
          borderRadius: 4,
          backgroundColor: 'background.paper'
        }}
      >
        <SadIcon sx={{ fontSize: 100, color: 'primary.main', mb: 3 }} />
        
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          404
        </Typography>
        
        <Typography variant="h4" gutterBottom>
          Page Not Found
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4, maxWidth: '500px', mx: 'auto' }}>
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
          sx={{ px: 4, py: 1.5, borderRadius: 2 }}
        >
          Back to Home
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFound;
