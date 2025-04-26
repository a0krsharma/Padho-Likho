import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Work as WorkIcon,
  Phone as PhoneIcon,
  Info as InfoIcon
} from '@mui/icons-material';

const HiringNavbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar 
      position="static" 
      color="secondary"
      sx={{ 
        backgroundColor: '#4CAF50',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <WorkIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            We're Hiring!
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 1 : 2
        }}>
          <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
            <InfoIcon sx={{ mr: 0.5 }} />
            Get hired with minimum qualification
          </Typography>
          
          <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
            <InfoIcon sx={{ mr: 0.5 }} />
            Salary up to ₹60,000
          </Typography>
          
          <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
            <InfoIcon sx={{ mr: 0.5 }} />
            Totally Online Job
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PhoneIcon sx={{ mr: 0.5 }} />
            <Typography variant="body1">
              Contact: 7070253050
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            color="primary"
            href="https://docs.google.com/forms/d/e/1FAIpQLScyPQN78a2bnCm3tr3v4RCmNCpnbnsd4ywK5n6RZPHnQTz5Fg/viewform?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ 
              backgroundColor: '#2196F3',
              '&:hover': {
                backgroundColor: '#1976D2'
              }
            }}
          >
            Apply Now
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HiringNavbar; 