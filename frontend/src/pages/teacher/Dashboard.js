import React, { useEffect } from 'react';
import Newsletter from '../../components/common/Newsletter';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Button, 
  Divider,
  useTheme,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  Chip,
  Badge,
  useMediaQuery
} from '@mui/material';
import { 
  School as SchoolIcon,
  Person as PersonIcon,
  Event as EventIcon,
  EventNote as EventNoteIcon,
  Assignment as AssignmentIcon,
  CalendarToday as CalendarTodayIcon,
  ArrowForward as ArrowForwardIcon,
  AccessTime as AccessTimeIcon,
  Add as AddIcon,
  VideoCall as VideoCallIcon,
  AttachMoney as AttachMoneyIcon,
  Star as StarIcon,
  People as PeopleIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  MenuBook as MenuBookIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Import custom components
import ContentCard from '../../components/common/ContentCard';
import StatCard from '../../components/common/StatCard';
import Calendar from '../../components/common/Calendar';
import NotificationBell from '../../components/common/NotificationBell';
import UserAvatar from '../../components/common/UserAvatar';
import DataTable from '../../components/common/DataTable';
import Breadcrumbs from '../../components/common/Breadcrumbs';


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
  const { currentUser } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  // Get current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Newsletter subscription handler
  const handleNewsletterSubscribe = (email) => {
    // In a real app, this would be an API call
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        // 90% success rate for demo purposes
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject({ message: 'Network error. Please try again.' });
        }
      }, 1500);
    });
  };
  
  return (
    <Box sx={{ pb: 6 }}>
      {/* Header Section */}
      <Box 
        sx={{ 
          backgroundColor: 'primary.light',
          backgroundImage: 'linear-gradient(135deg, #4361ee 0%, #738eef 100%)',
          color: 'white',
          py: { xs: 3, md: 4 },
          px: { xs: 2, md: 0 },
          borderRadius: { xs: 0, md: 4 },
          mb: 4
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' }, 
            justifyContent: 'space-between',
            gap: { xs: 2, sm: 0 }
          }}>
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
                Teacher Dashboard
              </Typography>
              <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
                Welcome back, {currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Teacher'}!
              </Typography>
              <Typography variant="body1">
                {currentDate}
              </Typography>
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' }, alignSelf: { xs: 'stretch', sm: 'auto' }, width: { xs: '100%', sm: 'auto' } }}>
              <Button 
                variant="contained" 
                color="secondary"
                startIcon={<AddIcon />}
                onClick={() => navigate('/teacher/create-assessment')}
                fullWidth={isMobile}
                sx={{ whiteSpace: 'nowrap' }}
              >
                Create Assessment
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
      
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
        {/* Quick Actions - Mobile Only */}
        <Box sx={{ display: { xs: 'block', sm: 'none' }, mb: 4 }}>
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
          <Grid item xs={6} sm={6} md={3}>
            <StatCard 
              icon={<EventNoteIcon sx={{ fontSize: { xs: 32, md: 40 }, color: 'primary.main', mb: 1 }} />}
              title="Upcoming Classes"
              value={upcomingClasses.length}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <StatCard 
              icon={<AssignmentIcon sx={{ fontSize: { xs: 32, md: 40 }, color: 'warning.main', mb: 1 }} />}
              title="Pending Reviews"
              value={pendingAssignments.length}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <StatCard 
              icon={<PeopleIcon sx={{ fontSize: { xs: 32, md: 40 }, color: 'info.main', mb: 1 }} />}
              title="Active Students"
              value={12}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <StatCard 
              icon={<StarIcon sx={{ fontSize: { xs: 32, md: 40 }, color: 'success.main', mb: 1 }} />}
              title="Rating"
              value={4.9}
              subtitle="(124 reviews)"
            />
          </Grid>
        </Grid>
        
        <Grid container spacing={4} alignItems="stretch">
          {/* Left Column */}
          <Grid item xs={12} md={8}>
            {/* Upcoming Classes */}
            <ContentCard 
              title="Today's Schedule"
              subtitle="View all upcoming classes"
              action={() => navigate('/teacher/manage-classes')}
              icon={<EventIcon />}
              sx={{ mb: 4 }}
            >
              {upcomingClasses.length > 0 ? (
                <List sx={{ p: 0 }}>
                  {upcomingClasses.map((classItem) => (
                    <Paper 
                      key={classItem.id} 
                      elevation={1} 
                      sx={{ mb: 2, p: { xs: 1.5, sm: 2 }, borderRadius: 2 }}
                    >
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={7}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <UserAvatar 
                              name={classItem.student.name} 
                              sx={{ mr: 2, width: { xs: 36, sm: 40 }, height: { xs: 36, sm: 40 } }}
                            />
                            <Box>
                              <Typography variant="subtitle1" sx={{ fontWeight: 'medium', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                                {classItem.subject}: {classItem.topic}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Student: {classItem.student.name}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {classItem.date}
                            </Typography>
                            <Typography variant="body2">
                              {classItem.time}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6} sm={2} sx={{ textAlign: { xs: 'right', sm: 'right' } }}>
                          <Button 
                            variant="contained" 
                            size="small"
                            startIcon={!isMobile && <VideoCallIcon />}
                            sx={{ borderRadius: 3, fontWeight: 600, px: 3, py: 1, boxShadow: '0 2px 8px rgba(67,97,238,0.08)', transition: 'background 0.2s', '&:hover': { background: 'linear-gradient(135deg, #4361ee 0%, #738eef 100%)', color: 'white' } }}
                            onClick={() => navigate(`/classroom/${classItem.id}`)}
                          >
                            {isMobile ? <VideoCallIcon /> : "Start"}
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
            </ContentCard>
            
            {/* Pending Reviews */}
            <ContentCard 
              title="Pending Reviews"
              subtitle="View all pending reviews"
              action={() => navigate('/teacher/assessments')}
              icon={<AssignmentIcon />}
              sx={{ mb: 4 }}
            >
              {pendingAssignments.length > 0 ? (
                <List sx={{ p: 0 }}>
                  {pendingAssignments.map((assignment) => (
                    <Paper 
                      key={assignment.id} 
                      elevation={1} 
                      sx={{ mb: 2, p: { xs: 1.5, sm: 2 }, borderRadius: 2 }}
                    >
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={7}>
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'medium', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
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
            </ContentCard>
            
            {/* Recent Bookings */}
            <ContentCard 
              title="Recent Bookings"
              subtitle="View all recent bookings"
              action={() => navigate('/teacher/manage-bookings')}
              icon={<CalendarTodayIcon />}
              sx={{ mb: { xs: 4, md: 0 } }}
            >
              {recentBookings.length > 0 ? (
                <List sx={{ p: 0 }}>
                  {recentBookings.map((booking) => (
                    <Paper 
                      key={booking.id} 
                      elevation={1} 
                      sx={{ mb: 2, p: { xs: 1.5, sm: 2 }, borderRadius: 2 }}
                    >
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={7}>
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'medium', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
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
            </ContentCard>
          </Grid>
          
          {/* Right Column */}
          <Grid item xs={12} md={4}>
            {/* Profile Summary */}
            <ContentCard 
              title="Profile Summary"
              subtitle="View your profile"
              action={() => navigate('/teacher/profile')}
              icon={<PersonIcon />}
              sx={{ mb: 4 }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <UserAvatar 
                  name={currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Teacher'} 
                  sx={{ 
                    width: { xs: 80, sm: 100 }, 
                    height: { xs: 80, sm: 100 }, 
                    mx: 'auto', 
                    mb: 2,
                    border: '4px solid',
                    borderColor: 'primary.light'
                  }}
                />
                <Typography variant="h6">{currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Teacher'}</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Mathematics & Physics Teacher
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                  <StarIcon sx={{ color: 'warning.main', mr: 0.5 }} />
                  <Typography variant="body1">
                    4.9 (124 reviews)
                  </Typography>
                </Box>
              </Box>
            </ContentCard>
            
            {/* Earnings */}
            <ContentCard 
              title="Earnings"
              subtitle="View your earnings"
              action={() => navigate('/teacher/earnings')}
              icon={<AttachMoneyIcon />}
              sx={{ mb: 4 }}
            >
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
            </ContentCard>
            
            {/* Notifications */}
            <ContentCard 
              title="Notifications"
              subtitle="View all notifications"
              action={() => navigate('/teacher/notifications')}
              icon={<NotificationBell />}
              sx={{ mb: 4 }}
            >
              <List sx={{ p: 0 }}>
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
            </ContentCard>
            
            {/* Quick Links */}
            <ContentCard 
              title="Quick Links"
              subtitle="Quick access to important pages"
              icon={<ArrowForwardIcon />}
              sx={{ mb: { xs: 4, md: 0 } }}
            >
              <List sx={{ p: 0 }}>
                <ListItem 
                  button 
                  sx={{ borderRadius: 2, mb: 1 }}
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
                  sx={{ borderRadius: 2, mb: 1 }}
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
                  sx={{ borderRadius: 2, mb: 1 }}
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
            </ContentCard>
          </Grid>
        </Grid>
        
        {/* Newsletter Section */}
        <Box sx={{ mt: 6, mb: 4 }}>
          <Newsletter 
            title="Teacher Resources Newsletter" 
            description="Subscribe to receive weekly teaching resources, lesson plans, and professional development opportunities tailored for your subjects."
            buttonText="Get Resources"
            successMessage="You're all set! Look for your first newsletter soon."
            backgroundColor="info.lighter"
            borderColor="info.light"
            icon={<MenuBookIcon color="info" />}
            onSubscribe={handleNewsletterSubscribe}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default TeacherDashboard;
