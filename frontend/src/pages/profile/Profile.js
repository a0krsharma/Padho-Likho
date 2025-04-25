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
import ProfileEditForm from '../../components/profile/ProfileEditForm';

/**
 * Profile page component
 * Displays user profile information and allows editing
 */
const Profile = () => {
  const { currentUser, getCurrentUser, updateProfile, loading: authLoading, error: authError } = useAuth();
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Only fetch if currentUser is null and not already loading
    if (!currentUser && !authLoading) {
      getCurrentUser().catch(() => {
        setError('Failed to load profile. Please try again.');
      });
    }
  }, [currentUser, authLoading, getCurrentUser]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEditProfile = () => {
    setEditMode(true);
    setSuccessMsg('');
    setError('');
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setError('');
    setSuccessMsg('');
  };

  const handleSaveProfile = async (updatedData) => {
    setSaving(true);
    setError('');
    setSuccessMsg('');
    try {
      await updateProfile(updatedData);
      setEditMode(false);
      setSuccessMsg('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (authError || error) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ mt: 3 }}>
          {authError || error}
        </Alert>
      </Container>
    );
  }

  if (successMsg) {
    setTimeout(() => setSuccessMsg(''), 2500);
  }

  if (!currentUser) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '60vh', justifyContent: 'center' }}>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            You are not logged in or your session expired.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <a href="/login">
              <button style={{ padding: '10px 24px', fontSize: '1rem', borderRadius: 6, border: 'none', background: '#4361ee', color: 'white', cursor: 'pointer' }}>Go to Login</button>
            </a>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Profile
        </Typography>
        {successMsg && (
          <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>
        )}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {editMode ? (
              <ProfileEditForm
                user={currentUser}
                onSave={handleSaveProfile}
                onCancel={handleCancelEdit}
                loading={saving}
              />
            ) : (
              <ProfileCard
                user={currentUser}
                onEdit={handleEditProfile}
              />
            )}
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
