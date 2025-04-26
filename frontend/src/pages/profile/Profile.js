import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  CircularProgress,
  Alert
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import ProfileCard from '../../components/profile/ProfileCard';

/**
 * Profile page component
 * Displays user profile information and allows editing
 */
const Profile = () => {
  const { currentUser, getCurrentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        await getCurrentUser();
        setLoading(false);
      } catch (error) {
        setError('Failed to load profile. Please try again.');
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [getCurrentUser]);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleEditProfile = () => {
    // This will be implemented in the future
    console.log('Edit profile clicked');
  };
  
  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Profile
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <ProfileCard 
              user={currentUser} 
              onEdit={handleEditProfile}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={{ mb: 3 }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Activity" />
                <Tab label="Settings" />
              </Tabs>
              
              <Box sx={{ p: 3 }}>
                {activeTab === 0 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Recent Activity
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Your recent activity will appear here.
                    </Typography>
                  </Box>
                )}
                
                {activeTab === 1 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Account Settings
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Account settings will be available soon.
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile;
