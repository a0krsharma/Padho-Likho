import React, { useState, useEffect } from 'react';
import ProfileEditForm from '../../components/profile/ProfileEditForm';
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  TextField,
  Button
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
  const [editMode, setEditMode] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [changePassword, setChangePassword] = useState({ old: '', new1: '', new2: '' });
  const [changePwLoading, setChangePwLoading] = useState(false);
  const [changePwSuccess, setChangePwSuccess] = useState('');
  const [changePwError, setChangePwError] = useState('');

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
    setEditMode(true);
  };

  const handleSaveProfile = async (updatedUser) => {
    setEditLoading(true);
    try {
      // TODO: Call backend API to update user profile
      // await axios.put('/auth/me', updatedUser);
      setShowSuccess(true);
      setEditMode(false);
      await getCurrentUser();
    } catch (err) {
      setError('Failed to update profile. Try again.');
    } finally {
      setEditLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setChangePwLoading(true);
    setChangePwError('');
    setChangePwSuccess('');
    if (!changePassword.old || !changePassword.new1 || !changePassword.new2) {
      setChangePwError('All fields are required.');
      setChangePwLoading(false);
      return;
    }
    if (changePassword.new1 !== changePassword.new2) {
      setChangePwError('New passwords do not match.');
      setChangePwLoading(false);
      return;
    }
    try {
      // TODO: Call backend API to change password
      // await axios.post('/auth/change-password', { oldPassword: changePassword.old, newPassword: changePassword.new1 });
      setChangePwSuccess('Password changed successfully!');
      setChangePassword({ old: '', new1: '', new2: '' });
    } catch (err) {
      setChangePwError('Failed to change password.');
    } finally {
      setChangePwLoading(false);
    }
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
        {showSuccess && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setShowSuccess(false)}>
            Profile updated successfully!
          </Alert>
        )}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {editMode ? (
              <ProfileEditForm
                user={currentUser}
                onSave={handleSaveProfile}
                onCancel={handleCancelEdit}
                loading={editLoading}
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
                    <Box component="form" onSubmit={handleChangePassword} sx={{ mt: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>Change Password</Typography>
                      {changePwSuccess && <Alert severity="success" sx={{ mb: 2 }}>{changePwSuccess}</Alert>}
                      {changePwError && <Alert severity="error" sx={{ mb: 2 }}>{changePwError}</Alert>}
                      <TextField
                        label="Current Password"
                        type="password"
                        value={changePassword.old}
                        onChange={e => setChangePassword({ ...changePassword, old: e.target.value })}
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        label="New Password"
                        type="password"
                        value={changePassword.new1}
                        onChange={e => setChangePassword({ ...changePassword, new1: e.target.value })}
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        label="Confirm New Password"
                        type="password"
                        value={changePassword.new2}
                        onChange={e => setChangePassword({ ...changePassword, new2: e.target.value })}
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={changePwLoading}
                        fullWidth
                      >
                        {changePwLoading ? 'Changing...' : 'Change Password'}
                      </Button>
                    </Box>
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
