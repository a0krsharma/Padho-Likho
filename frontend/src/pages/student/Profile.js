import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Divider,
  TextField,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Person as PersonIcon,
  School as SchoolIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Cake as CakeIcon,
  Home as HomeIcon,
  Star as StarIcon,
  Badge as BadgeIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const StudentProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  
  // Student profile data
  const [profileData, setProfileData] = useState({
    firstName: 'Rahul',
    lastName: 'Singh',
    email: 'rahul.singh@example.com',
    phone: '+91 9876543210',
    dateOfBirth: '2010-05-15',
    grade: '8',
    school: 'Delhi Public School',
    address: '123 Main Street, New Delhi',
    bio: 'I am a dedicated student who loves mathematics and science. I enjoy solving complex problems and participating in science competitions.'
  });
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Handle edit mode toggle
  const handleEditToggle = () => {
    setEditMode(!editMode);
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  
  // Handle save profile
  const handleSaveProfile = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEditMode(false);
      setShowSuccessAlert(true);
    }, 1500);
  };
  
  // Handle alert close
  const handleAlertClose = () => {
    setShowSuccessAlert(false);
  };
  
  // Achievements data
  const achievements = [
    { id: 1, title: 'Mathematics Olympiad', date: '2024-03-15', badge: 'Gold Medal' },
    { id: 2, title: 'Science Fair Winner', date: '2024-02-10', badge: 'First Place' },
    { id: 3, title: 'Perfect Attendance', date: '2024-01-30', badge: '100 Days' },
    { id: 4, title: 'Coding Competition', date: '2023-12-05', badge: 'Silver Medal' }
  ];
  
  // Course history data
  const courseHistory = [
    { id: 1, title: 'Advanced Mathematics', date: '2024-01-15', status: 'Completed', grade: 'A+' },
    { id: 2, title: 'Physics Fundamentals', date: '2023-11-20', status: 'Completed', grade: 'A' },
    { id: 3, title: 'Chemistry Basics', date: '2023-09-05', status: 'Completed', grade: 'A-' },
    { id: 4, title: 'English Literature', date: '2023-07-10', status: 'Completed', grade: 'B+' }
  ];
  
  return (
    <Box>
      {/* Loading overlay */}
      {isLoading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: 2,
            }}
          >
            <CircularProgress size={60} sx={{ mb: 2 }} />
            <Typography variant="h6">Saving profile...</Typography>
          </Paper>
        </Box>
      )}
      
      {/* Success Alert */}
      <Snackbar 
        open={showSuccessAlert} 
        autoHideDuration={6000} 
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
          Profile updated successfully!
        </Alert>
      </Snackbar>

      {/* Header Section */}
      <Box 
        sx={{ 
          backgroundColor: 'primary.light',
          backgroundImage: 'linear-gradient(135deg, #4361ee 0%, #738eef 100%)',
          color: 'white',
          py: 4,
          borderRadius: 4,
          mb: 4
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Student Profile
          </Typography>
          <Typography variant="h6">
            Manage your personal information and settings
          </Typography>
        </Container>
      </Box>
      
      <Container maxWidth="lg">
        {/* Profile Tabs */}
        <Box sx={{ mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ 
              mb: 2,
              '& .MuiTabs-indicator': { height: 3 },
              '& .MuiTab-root': { fontWeight: 'bold' }
            }}
          >
            <Tab label="Personal Info" icon={<PersonIcon />} iconPosition="start" />
            <Tab label="Achievements" icon={<StarIcon />} iconPosition="start" />
            <Tab label="Course History" icon={<HistoryIcon />} iconPosition="start" />
            <Tab label="Settings" icon={<SettingsIcon />} iconPosition="start" />
          </Tabs>
        </Box>
        
        {/* Personal Info Tab */}
        {activeTab === 0 && (
          <Grid container spacing={4}>
            {/* Left Column - Profile Summary */}
            <Grid item xs={12} md={4}>
              <Card elevation={2} sx={{ borderRadius: 3, mb: { xs: 4, md: 0 } }}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Avatar 
                    sx={{ 
                      width: 120, 
                      height: 120, 
                      mx: 'auto', 
                      mb: 2,
                      border: '4px solid',
                      borderColor: 'primary.light',
                      fontSize: 40
                    }}
                  >
                    {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                  </Avatar>
                  <Typography variant="h5" gutterBottom>
                    {profileData.firstName} {profileData.lastName}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    Grade {profileData.grade} Student
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {profileData.school}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <Chip 
                      icon={<StarIcon />} 
                      label="Gold Badge" 
                      color="warning" 
                    />
                    <Chip 
                      icon={<BadgeIcon />} 
                      label="Top Student" 
                      color="success" 
                    />
                  </Box>
                  
                  <Divider sx={{ my: 3 }} />
                  
                  <List sx={{ textAlign: 'left' }}>
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Email" 
                        secondary={profileData.email} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PhoneIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Phone" 
                        secondary={profileData.phone} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CakeIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Date of Birth" 
                        secondary={new Date(profileData.dateOfBirth).toLocaleDateString()} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <HomeIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Address" 
                        secondary={profileData.address} 
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Right Column - Edit Profile */}
            <Grid item xs={12} md={8}>
              <Card elevation={2} sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" component="h2">
                      {editMode ? 'Edit Profile' : 'Profile Details'}
                    </Typography>
                    {!editMode ? (
                      <Button 
                        variant="outlined" 
                        startIcon={<EditIcon />}
                        onClick={handleEditToggle}
                      >
                        Edit Profile
                      </Button>
                    ) : (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button 
                          variant="outlined" 
                          color="error"
                          startIcon={<CancelIcon />}
                          onClick={handleEditToggle}
                        >
                          Cancel
                        </Button>
                        <Button 
                          variant="contained" 
                          startIcon={<SaveIcon />}
                          onClick={handleSaveProfile}
                        >
                          Save Changes
                        </Button>
                      </Box>
                    )}
                  </Box>
                  
                  <Divider sx={{ mb: 3 }} />
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        variant={editMode ? "outlined" : "filled"}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        variant={editMode ? "outlined" : "filled"}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        variant={editMode ? "outlined" : "filled"}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        variant={editMode ? "outlined" : "filled"}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Date of Birth"
                        name="dateOfBirth"
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        variant={editMode ? "outlined" : "filled"}
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Grade"
                        name="grade"
                        value={profileData.grade}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        variant={editMode ? "outlined" : "filled"}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="School"
                        name="school"
                        value={profileData.school}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        variant={editMode ? "outlined" : "filled"}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Address"
                        name="address"
                        value={profileData.address}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        variant={editMode ? "outlined" : "filled"}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Bio"
                        name="bio"
                        value={profileData.bio}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        variant={editMode ? "outlined" : "filled"}
                        margin="normal"
                        multiline
                        rows={4}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
        
        {/* Achievements Tab */}
        {activeTab === 1 && (
          <Card elevation={2} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
                Achievements & Badges
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={3}>
                {achievements.map((achievement) => (
                  <Grid item xs={12} sm={6} md={4} key={achievement.id}>
                    <Paper 
                      elevation={2} 
                      sx={{ 
                        p: 3, 
                        borderRadius: 2, 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center'
                      }}
                    >
                      <Avatar 
                        sx={{ 
                          width: 80, 
                          height: 80, 
                          mb: 2,
                          bgcolor: 'warning.main'
                        }}
                      >
                        <StarIcon sx={{ fontSize: 40 }} />
                      </Avatar>
                      <Typography variant="h6" gutterBottom>
                        {achievement.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {new Date(achievement.date).toLocaleDateString()}
                      </Typography>
                      <Chip 
                        label={achievement.badge} 
                        color="warning" 
                        sx={{ mt: 1 }}
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        )}
        
        {/* Course History Tab */}
        {activeTab === 2 && (
          <Card elevation={2} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
                Course History
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <List>
                {courseHistory.map((course) => (
                  <Paper 
                    key={course.id} 
                    elevation={1} 
                    sx={{ mb: 2, p: 2, borderRadius: 2 }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={6}>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                            {course.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Completed: {new Date(course.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Chip 
                          label={course.status} 
                          color="success"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={6} sm={3} sx={{ textAlign: 'right' }}>
                        <Chip 
                          label={`Grade: ${course.grade}`} 
                          color="primary"
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </List>
            </CardContent>
          </Card>
        )}
        
        {/* Settings Tab */}
        {activeTab === 3 && (
          <Card elevation={2} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
                Account Settings
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <List>
                <Paper elevation={1} sx={{ mb: 2, borderRadius: 2 }}>
                  <ListItem>
                    <ListItemIcon>
                      <SecurityIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Change Password" 
                      secondary="Update your account password" 
                    />
                    <Button variant="outlined">Change</Button>
                  </ListItem>
                </Paper>
                
                <Paper elevation={1} sx={{ mb: 2, borderRadius: 2 }}>
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Email Notifications" 
                      secondary="Manage your email preferences" 
                    />
                    <Button variant="outlined">Configure</Button>
                  </ListItem>
                </Paper>
                
                <Paper elevation={1} sx={{ mb: 2, borderRadius: 2 }}>
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Privacy Settings" 
                      secondary="Control what information is visible to others" 
                    />
                    <Button variant="outlined">Manage</Button>
                  </ListItem>
                </Paper>
                
                <Paper elevation={1} sx={{ borderRadius: 2 }}>
                  <ListItem>
                    <ListItemIcon>
                      <SchoolIcon color="error" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Deactivate Account" 
                      secondary="Temporarily disable your account" 
                    />
                    <Button variant="outlined" color="error">Deactivate</Button>
                  </ListItem>
                </Paper>
              </List>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default StudentProfile;
