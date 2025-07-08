import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
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
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
  LinearProgress,
  Paper,
  Chip,
  CircularProgress,
  Tabs,
  Tab
} from '@mui/material';
import { 
  School as SchoolIcon,
  Book as BookIcon,
  Assignment as AssignmentIcon,
  EventNote as EventNoteIcon,
  Star as StarIcon,
  Notifications as NotificationsIcon,
  CalendarToday as CalendarTodayIcon,
  ArrowForward as ArrowForwardIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

// StudentDashboard will fetch dashboard data from the backend API


const assignments = [
  {
    id: 1,
    subject: 'Mathematics',
    title: 'Practice Problems - Chapter 5',
    dueDate: '2025-04-10',
    status: 'pending'
  },
  {
    id: 2,
    subject: 'Science',
    title: 'Lab Report - Chemical Reactions',
    dueDate: '2025-04-15',
    status: 'pending'
  },
  {
    id: 3,
    subject: 'English',
    title: 'Essay - My Favorite Book',
    dueDate: '2025-04-05',
    status: 'completed'
  }
];

const subjectProgress = [
  { subject: 'Mathematics', progress: 75 },
  { subject: 'Science', progress: 60 },
  { subject: 'English', progress: 85 },
  { subject: 'Hindi', progress: 70 }
];

const notifications = [
  {
    id: 1,
    type: 'assignment',
    message: 'New assignment added in Mathematics',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'class',
    message: 'Your Science class is rescheduled to tomorrow',
    time: '5 hours ago'
  },
  {
    id: 3,
    type: 'feedback',
    message: 'Rajesh Kumar gave feedback on your assignment',
    time: '1 day ago'
  }
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(true);
  const [dashboardData, setDashboardData] = useState({ classes: [], assessments: [], bookings: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { api } = useContext(AuthContext);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await api.get('/api/dashboard/student');
        setDashboardData(res.data || { classes: [], assessments: [], bookings: [] });
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError(err.response?.data?.message || 'Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboard();
  }, [api]);

  
  // Get current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  if (loading) return <Box sx={{ p: 4, textAlign: 'center' }}>Loading...</Box>;
  if (error) return <Box sx={{ p: 4, textAlign: 'center', color: 'red' }}>{error}</Box>;

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Handle navigation with loading animation
  const handleNavigation = (path) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate(path);
    }, 800);
  };
  
  // Close welcome dialog
  const handleCloseWelcomeDialog = () => {
    setShowWelcomeDialog(false);
  };
  
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
            <Typography variant="h6">Loading...</Typography>
          </Paper>
        </Box>
      )}
      
      {/* Welcome Dialog */}
      {showWelcomeDialog && (
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
            zIndex: 9998,
          }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 4,
              maxWidth: '500px',
              width: '90%',
              borderRadius: 2,
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                cursor: 'pointer',
              }}
              onClick={handleCloseWelcomeDialog}
            >
              ✕
            </Box>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  mb: 2,
                  bgcolor: 'primary.main',
                }}
              >
                <SchoolIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h5" gutterBottom>
                Welcome to Your Dashboard, Rahul!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                We're excited to have you back. Here's what's new today:
              </Typography>
            </Box>
            <List>
              <ListItem>
                <ListItemIcon>
                  <EventNoteIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="New Classes Available"
                  secondary="2 new classes have been added to your schedule"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AssignmentIcon color="warning" />
                </ListItemIcon>
                <ListItemText
                  primary="Pending Assignments"
                  secondary="You have 2 assignments due this week"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <StarIcon color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Achievement Unlocked"
                  secondary="You've completed 5 consecutive days of learning!"
                />
              </ListItem>
            </List>
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleCloseWelcomeDialog}
              >
                Get Started
              </Button>
            </Box>
          </Paper>
        </Box>
      )}

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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                Student Dashboard
              </Typography>
              <Typography variant="h6">
                Welcome back, Rahul!
              </Typography>
              <Typography variant="body1">
                {currentDate}
              </Typography>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Button 
                variant="contained" 
                color="secondary"
                startIcon={<BookIcon />}
                onClick={() => handleNavigation('/find-teachers')}
              >
                Book New Session
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
      
      <Container maxWidth="lg">
        {/* Quick Actions - Mobile Only */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 4 }}>
          <Button 
            variant="contained" 
            fullWidth
            startIcon={<BookIcon />}
            onClick={() => handleNavigation('/find-teachers')}
          >
            Book New Session
          </Button>
        </Box>
        
        {/* Dashboard Tabs */}
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
            <Tab label="Overview" icon={<DashboardIcon />} iconPosition="start" />
            <Tab label="Classes" icon={<EventNoteIcon />} iconPosition="start" />
            <Tab label="Assignments" icon={<AssignmentIcon />} iconPosition="start" />
          </Tabs>
        </Box>
        
        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid item xs={12} md={8}>
            {/* Upcoming Classes */}
            <Card elevation={2} sx={{ mb: 4, borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center' }}>
                    <EventNoteIcon sx={{ mr: 1 }} /> Upcoming Classes
                  </Typography>
                  <Button 
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate('/student/classes')}
                  >
                    View All
                  </Button>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                {dashboardData.classes.length > 0 ? (
                  <List>
                    {dashboardData.classes.map((classItem) => (
                      <Paper 
                        key={classItem.id} 
                        elevation={1} 
                        sx={{ mb: 2, p: 2, borderRadius: 2 }}
                      >
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} sm={7}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box 
                                sx={{ 
                                  width: 40, 
                                  height: 40, 
                                  borderRadius: '50%',
                                  backgroundColor: 'primary.light',
                                  color: 'white',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mr: 2,
                                  fontWeight: 'bold',
                                  fontSize: '1rem'
                                }}
                              >
                                {classItem.teacher ? classItem.teacher.split(' ').map(n => n[0]).join('') : ''}
                              </Box>
                              <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                                  {classItem.subject}: {classItem.topic}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Teacher: {classItem.teacher}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {classItem.date}
                              </Typography>
                              <Typography variant="body2">
                                {classItem.time}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={2} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                            <Button 
                              variant="contained" 
                              size="small"
                              onClick={() => handleNavigation(`/student/classes/${classItem.id}`)}
                            >
                              Join
                            </Button>
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                  </List>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <CalendarTodayIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                      No upcoming classes scheduled
                    </Typography>
                    <Button 
                      variant="contained" 
                      sx={{ mt: 2 }}
                      onClick={() => handleNavigation('/find-teachers')}
                    >
                      Book a Class
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
            
            {/* Assignments */}
            <Card elevation={2} sx={{ mb: 4, borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center' }}>
                    <AssignmentIcon sx={{ mr: 1 }} /> Assignments
                  </Typography>
                  <Button 
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate('/student/assignments')}
                  >
                    View All
                  </Button>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                <List>
                  {assignments.map((assignment) => (
                    <Paper 
                      key={assignment.id} 
                      elevation={1} 
                      sx={{ mb: 2, p: 2, borderRadius: 2 }}
                    >
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={7}>
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                              {assignment.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Subject: {assignment.subject}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Typography variant="body2" color="text.secondary">
                            Due: {new Date(assignment.dueDate).toLocaleDateString()}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={2} sx={{ textAlign: 'right' }}>
                          <Chip 
                            label={assignment.status === 'completed' ? 'Completed' : 'Pending'} 
                            color={assignment.status === 'completed' ? 'success' : 'warning'}
                            size="small"
                          />
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                </List>
              </CardContent>
            </Card>
            
            {/* Subject Progress */}
            <Card elevation={2} sx={{ mb: 4, borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BookIcon sx={{ mr: 1 }} /> Subject Progress
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Grid container spacing={3}>
                  {subjectProgress.map((subject, index) => (
                    <Grid item xs={12} key={index}>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body1">{subject.subject}</Typography>
                          <Typography variant="body2">{subject.progress}%</Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={subject.progress} 
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Right Column */}
          <Grid item xs={12} md={4}>
            {/* Profile Summary */}
            <Card elevation={2} sx={{ mb: 4, borderRadius: 3 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar 
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    mx: 'auto', 
                    mb: 2,
                    border: '4px solid',
                    borderColor: 'primary.light'
                  }}
                >
                  R
                </Avatar>
                <Typography variant="h6">Rahul Singh</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Class 8 Student
                </Typography>
                <Chip 
                  icon={<StarIcon />} 
                  label="Gold Badge" 
                  color="warning" 
                  sx={{ mt: 1 }}
                />
                <Box sx={{ mt: 3 }}>
                  <Button 
                    variant="outlined" 
                    fullWidth
                    onClick={() => handleNavigation('/student/profile')}
                  >
                    View Profile
                  </Button>
                </Box>
              </CardContent>
            </Card>
            
            {/* Notifications */}
            <Card elevation={2} sx={{ mb: 4, borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center' }}>
                    <NotificationsIcon sx={{ mr: 1 }} /> Notifications
                  </Typography>
                  <Button size="small">Mark All Read</Button>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                <List>
                  {notifications.map((notification) => (
                    <ListItem 
                      key={notification.id} 
                      sx={{ 
                        px: 2, 
                        py: 1.5, 
                        borderBottom: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      <ListItemText 
                        primary={notification.message}
                        secondary={notification.time}
                        primaryTypographyProps={{ variant: 'body2' }}
                        secondaryTypographyProps={{ variant: 'caption' }}
                      />
                    </ListItem>
                  ))}
                </List>
                
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Button 
                    endIcon={<ArrowForwardIcon />}
                    size="small"
                  >
                    View All Notifications
                  </Button>
                </Box>
              </CardContent>
            </Card>
            
            {/* Quick Links */}
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                  Quick Links
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <List sx={{ p: 0 }}>
                  <ListItem 
                    button 
                    sx={{ borderRadius: 2 }}
                    onClick={() => handleNavigation('/student/bookings')}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.light' }}>
                        <BookIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="My Bookings" />
                  </ListItem>
                  
                  <ListItem 
                    button 
                    sx={{ borderRadius: 2 }}
                    onClick={() => handleNavigation('/student/classes')}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'secondary.light' }}>
                        <SchoolIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="My Classes" />
                  </ListItem>
                  
                  <ListItem 
                    button 
                    sx={{ borderRadius: 2 }}
                    onClick={() => handleNavigation('/student/assessments')}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'warning.light' }}>
                        <AssignmentIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Assessments" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default StudentDashboard;
