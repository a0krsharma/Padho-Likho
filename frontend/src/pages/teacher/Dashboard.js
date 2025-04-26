import React, { useEffect, useState } from 'react';
// import Newsletter from '../../components/common/Newsletter';

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
  Paper,
  Chip,
  IconButton,
  Badge,
  useTheme
} from '@mui/material';
import { 
  School as SchoolIcon,
  Person as PersonIcon,
  Event as EventIcon,
  EventNote as EventNoteIcon,
  Assignment as AssignmentIcon,
  Notifications as NotificationsIcon,
  CalendarToday as CalendarTodayIcon,
  ArrowForward as ArrowForwardIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  Add as AddIcon,
  Message as MessageIcon,
  VideoCall as VideoCallIcon,
  AttachMoney as AttachMoneyIcon,
  Star as StarIcon,
  People as PeopleIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Sample data
const upcomingClasses = [
  {
    id: 1,
    subject: 'Mathematics',
    topic: 'Quadratic Equations',
    student: {
      id: 1,
      name: 'Aryan Singh',
      image: null
    },
    date: 'Today',
    time: '4:00 PM - 5:00 PM'
  },
  {
    id: 2,
    subject: 'Science',
    topic: 'Chemical Reactions',
    student: {
      id: 2,
      name: 'Ananya Sharma',
      image: null
    },
    date: 'Tomorrow',
    time: '5:30 PM - 6:30 PM'
  },
  {
    id: 3,
    subject: 'Mathematics',
    topic: 'Trigonometry',
    student: {
      id: 3,
      name: 'Rahul Verma',
      image: null
    },
    date: 'Tomorrow',
    time: '7:00 PM - 8:00 PM'
  }
];

const pendingAssignments = [
  {
    id: 1,
    title: 'Mathematics Mid-Term Test',
    subject: 'Mathematics',
    assignedTo: 'Aryan Singh',
    dueDate: '2025-04-15',
    status: 'pending_review'
  },
  {
    id: 2,
    title: 'Science Quiz - Chemical Reactions',
    subject: 'Science',
    assignedTo: 'Ananya Sharma',
    dueDate: '2025-04-10',
    status: 'pending_review'
  }
];

const recentBookings = [
  {
    id: 1,
    subject: 'Mathematics',
    topic: 'Algebra',
    student: 'Rahul Verma',
    date: '2025-04-20',
    time: '6:00 PM - 7:00 PM',
    status: 'confirmed'
  },
  {
    id: 2,
    subject: 'Science',
    topic: 'Physics - Motion',
    student: 'Priya Patel',
    date: '2025-04-18',
    time: '5:00 PM - 6:00 PM',
    status: 'pending'
  }
];

const notifications = [
  {
    id: 1,
    type: 'booking',
    message: 'New booking request from Priya Patel for Science',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'assignment',
    message: 'Aryan Singh submitted Mathematics Mid-Term Test',
    time: '1 day ago'
  },
  {
    id: 3,
    type: 'message',
    message: 'New message from Ananya Sharma\'s parent',
    time: '2 days ago'
  }
];

const earningsData = {
  today: 1200,
  thisWeek: 5400,
  thisMonth: 24000,
  pending: 3600
};

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Get current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <Box>
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
                Teacher Dashboard
              </Typography>
              <Typography variant="h6">
                Welcome back, Rajesh Kumar!
              </Typography>
              <Typography variant="body1">
                {currentDate}
              </Typography>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Button 
                variant="contained" 
                color="secondary"
                startIcon={<AddIcon />}
                onClick={() => navigate('/teacher/create-assessment')}
              >
                Create Assessment
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
            startIcon={<AddIcon />}
            onClick={() => navigate('/teacher/create-assessment')}
          >
            Create Assessment
          </Button>
        </Box>
        
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <EventNoteIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h4" component="div">
                  {upcomingClasses.length}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Upcoming Classes
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <AssignmentIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                <Typography variant="h4" component="div">
                  {pendingAssignments.length}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Pending Reviews
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <PeopleIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                <Typography variant="h4" component="div">
                  12
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Active Students
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <StarIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                <Typography variant="h4" component="div">
                  4.9
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Rating (124 reviews)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid item xs={12} md={8}>
            {/* Upcoming Classes */}
            <Card elevation={2} sx={{ mb: 4, borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center' }}>
                    <EventIcon sx={{ mr: 1 }} /> Today's Schedule
                  </Typography>
                  <Button 
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate('/teacher/manage-classes')}
                  >
                    View All
                  </Button>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                {upcomingClasses.length > 0 ? (
                  <List>
                    {upcomingClasses.map((classItem) => (
                      <Paper 
                        key={classItem.id} 
                        elevation={1} 
                        sx={{ mb: 2, p: 2, borderRadius: 2 }}
                      >
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} sm={7}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar sx={{ mr: 2 }}>
                                {classItem.student.name.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                                  {classItem.subject}: {classItem.topic}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Student: {classItem.student.name}
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
                              startIcon={<VideoCallIcon />}
                              onClick={() => navigate(`/classroom/${classItem.id}`)}
                            >
                              Start
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
                      No classes scheduled for today
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
            
            {/* Pending Reviews */}
            <Card elevation={2} sx={{ mb: 4, borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center' }}>
                    <AssignmentIcon sx={{ mr: 1 }} /> Pending Reviews
                  </Typography>
                  <Button 
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate('/teacher/assessments')}
                  >
                    View All
                  </Button>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                {pendingAssignments.length > 0 ? (
                  <List>
                    {pendingAssignments.map((assignment) => (
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
                                Subject: {assignment.subject} | Student: {assignment.assignedTo}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Typography variant="body2" color="text.secondary">
                              Due: {new Date(assignment.dueDate).toLocaleDateString()}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={2} sx={{ textAlign: 'right' }}>
                            <Button 
                              variant="outlined" 
                              size="small"
                              onClick={() => navigate(`/teacher/assessments/${assignment.id}/review`)}
                            >
                              Review
                            </Button>
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                  </List>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <AssignmentIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                      No pending reviews
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
            
            {/* Recent Bookings */}
            <Card elevation={2} sx={{ mb: 4, borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarTodayIcon sx={{ mr: 1 }} /> Recent Bookings
                  </Typography>
                  <Button 
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate('/teacher/manage-bookings')}
                  >
                    View All
                  </Button>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                {recentBookings.length > 0 ? (
                  <List>
                    {recentBookings.map((booking) => (
                      <Paper 
                        key={booking.id} 
                        elevation={1} 
                        sx={{ mb: 2, p: 2, borderRadius: 2 }}
                      >
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} sm={7}>
                            <Box>
                              <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                                {booking.subject}: {booking.topic}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Student: {booking.student}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Typography variant="body2" color="text.secondary">
                              {new Date(booking.date).toLocaleDateString()} | {booking.time}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={2} sx={{ textAlign: 'right' }}>
                            <Chip 
                              label={booking.status === 'confirmed' ? 'Confirmed' : 'Pending'} 
                              color={booking.status === 'confirmed' ? 'success' : 'warning'}
                              size="small"
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                  </List>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <CalendarTodayIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                      No recent bookings
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
          
          {/* Right Column */}
          <Grid item xs={12} md={4}>
            {/* Profile Summary */}
            <Card elevation={2} sx={{ mb: 4, borderRadius: 3 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar 
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    mx: 'auto', 
                    mb: 2,
                    border: '4px solid',
                    borderColor: 'primary.light'
                  }}
                />
                <Typography variant="h6">Rajesh Kumar</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Mathematics & Physics Teacher
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                  <StarIcon sx={{ color: 'warning.main', mr: 0.5 }} />
                  <Typography variant="body1">
                    4.9 (124 reviews)
                  </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    fullWidth
                    onClick={() => navigate('/teacher/profile')}
                  >
                    View Profile
                  </Button>
                </Box>
              </CardContent>
            </Card>
            
            {/* Earnings */}
            <Card elevation={2} sx={{ mb: 4, borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AttachMoneyIcon sx={{ mr: 1 }} /> Earnings
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <List sx={{ p: 0 }}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText primary="Today" />
                    <Typography variant="subtitle1" color="primary.main">
                      ₹{earningsData.today}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText primary="This Week" />
                    <Typography variant="subtitle1" color="primary.main">
                      ₹{earningsData.thisWeek}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText primary="This Month" />
                    <Typography variant="subtitle1" color="primary.main">
                      ₹{earningsData.thisMonth}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText primary="Pending Payout" />
                    <Typography variant="subtitle1" color="warning.main">
                      ₹{earningsData.pending}
                    </Typography>
                  </ListItem>
                </List>
                
                <Box sx={{ mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    fullWidth
                    onClick={() => navigate('/teacher/earnings')}
                  >
                    View Earnings
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
                    onClick={() => navigate('/teacher/manage-classes')}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.light' }}>
                        <EventNoteIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Manage Classes" />
                  </ListItem>
                  
                  <ListItem 
                    button 
                    sx={{ borderRadius: 2 }}
                    onClick={() => navigate('/teacher/manage-bookings')}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'secondary.light' }}>
                        <CalendarTodayIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Manage Bookings" />
                  </ListItem>
                  
                  <ListItem 
                    button 
                    sx={{ borderRadius: 2 }}
                    onClick={() => navigate('/teacher/create-assessment')}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'warning.light' }}>
                        <AssignmentIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Create Assessment" />
                  </ListItem>
                  
                  <ListItem 
                    button 
                    sx={{ borderRadius: 2 }}
                    onClick={() => navigate('/teacher/messages')}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'success.light' }}>
                        <MessageIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          Messages
                          <Badge 
                            badgeContent={3} 
                            color="error" 
                            sx={{ ml: 1 }}
                          />
                        </Box>
                      } 
                    />
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

export default TeacherDashboard;
