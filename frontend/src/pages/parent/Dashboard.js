
import React from 'react';
import { Box, Container, Typography, Grid, Button, Avatar, Divider, List, ListItem, ListItemText, ListItemAvatar, LinearProgress, Paper, Chip, Tabs, Tab, IconButton } from '@mui/material';
import { School as SchoolIcon, Person as PersonIcon, Event as EventIcon, Assignment as AssignmentIcon, TrendingUp as TrendingUpIcon, CalendarToday as CalendarTodayIcon, ArrowForward as ArrowForwardIcon, AccessTime as AccessTimeIcon, CheckCircle as CheckCircleIcon, Grade as GradeIcon, Add as AddIcon, Message as MessageIcon } from '@mui/icons-material';

// Import custom components
// import ContentCard from '../../components/common/ContentCard';
// import StatCard from '../../components/common/StatCard';
// import Calendar from '../../components/common/Calendar';
// import NotificationBell from '../../components/common/NotificationBell';
// import UserAvatar from '../../components/common/UserAvatar';
// import DataTable from '../../components/common/DataTable';
// import Breadcrumbs from '../../components/common/Breadcrumbs';
// import ProgressTracker from '../../components/common/ProgressTracker';


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
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
  LinearProgress,
  Paper,
  Chip,
  Tabs,
  Tab,
  IconButton,
  useTheme
} from '@mui/material';
import { 
  School as SchoolIcon,
  Person as PersonIcon,
  Event as EventIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
  CalendarToday as CalendarTodayIcon,
  ArrowForward as ArrowForwardIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  Grade as GradeIcon,
  Add as AddIcon,
  Message as MessageIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


// Sample data
const childrenData = [
  {
    id: 1,
    name: 'Aryan Singh',
    age: 12,
    class: 7,
    school: 'Delhi Public School',
    avatar: null,
    subjects: ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies'],
    upcomingClasses: 2,
    pendingAssignments: 3,
    completedAssessments: 5,
    overallProgress: 78
  },
  {
    id: 2,
    name: 'Ananya Singh',
    age: 9,
    class: 4,
    school: 'Delhi Public School',
    avatar: null,
    subjects: ['Mathematics', 'Science', 'English', 'Hindi', 'Environmental Studies'],
    upcomingClasses: 1,
    pendingAssignments: 2,
    completedAssessments: 4,
    overallProgress: 85
  }
];

const upcomingClasses = [
  {
    id: 1,
    childId: 1,
    childName: 'Aryan Singh',
    subject: 'Mathematics',
    topic: 'Quadratic Equations',
    teacher: 'Rajesh Kumar',
    teacherImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: 'Today',
    time: '4:00 PM - 5:00 PM'
  },
  {
    id: 2,
    childId: 1,
    childName: 'Aryan Singh',
    subject: 'Science',
    topic: 'Chemical Reactions',
    teacher: 'Neha Gupta',
    teacherImage: 'https://randomuser.me/api/portraits/women/68.jpg',
    date: 'Tomorrow',
    time: '5:30 PM - 6:30 PM'
  },
  {
    id: 3,
    childId: 2,
    childName: 'Ananya Singh',
    subject: 'English',
    topic: 'Story Writing',
    teacher: 'Priya Sharma',
    teacherImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: 'Tomorrow',
    time: '3:00 PM - 4:00 PM'
  }
];

const recentAssessments = [
  {
    id: 1,
    childId: 1,
    childName: 'Aryan Singh',
    title: 'Mathematics Mid-Term Test',
    subject: 'Mathematics',
    date: '2025-04-02',
    score: 85,
    totalMarks: 100
  },
  {
    id: 2,
    childId: 2,
    childName: 'Ananya Singh',
    title: 'English Grammar Quiz',
    subject: 'English',
    date: '2025-04-01',
    score: 42,
    totalMarks: 50
  },
  {
    id: 3,
    childId: 1,
    childName: 'Aryan Singh',
    title: 'Science Test - Chemical Reactions',
    subject: 'Science',
    date: '2025-03-28',
    score: 72,
    totalMarks: 80
  }
];

const notifications = [
  {
    id: 1,
    type: 'class',
    message: 'Aryan has a Mathematics class today at 4:00 PM',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'assessment',
    message: 'Ananya scored 84% in her English Grammar Quiz',
    time: '1 day ago'
  },
  {
    id: 3,
    type: 'assignment',
    message: 'Aryan has a pending Science assignment due tomorrow',
    time: '2 days ago'
  }
];

const ParentDashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [selectedChild, setSelectedChild] = useState(childrenData[0].id);
  
  // Get current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Filter data for selected child
  const activeChild = childrenData.find(child => child.id === selectedChild);
  
  const filteredClasses = upcomingClasses.filter(
    classItem => classItem.childId === selectedChild
  );
  
  const filteredAssessments = recentAssessments.filter(
    assessment => assessment.childId === selectedChild
  );
  
  const handleChildChange = (event, newValue) => {
    setSelectedChild(newValue);
  };
  
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
                Parent Dashboard
              </Typography>
              <Typography variant="h6">
                Welcome back, Mr. Singh!
              </Typography>
              <Typography variant="body1">
                {currentDate}
              </Typography>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Button 
                variant="contained" 
                color="secondary"
                startIcon={<MessageIcon />}
                onClick={() => navigate('/parent/messages')}
              >
                Message Teachers
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
            startIcon={<MessageIcon />}
            onClick={() => navigate('/parent/messages')}
          >
            Message Teachers
          </Button>
        </Box>
        
        {/* Child Selector */}
        <Card elevation={2} sx={{ mb: 4, borderRadius: 3 }}>
          <Tabs
            value={selectedChild}
            onChange={handleChildChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            {childrenData.map((child) => (
              <Tab 
                key={child.id}
                value={child.id}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                      {child.name.charAt(0)}
                    </Avatar>
                    {child.name}
                  </Box>
                }
              />
            ))}
            <Tab 
              value="add"
              icon={<AddIcon />}
              iconPosition="start"
              label="Add Child"
              onClick={() => navigate('/parent/add-child')}
            />
          </Tabs>
          
          {activeChild && (
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        mr: 2,
                        bgcolor: 'primary.main'
                      }}
                    >
                      {activeChild.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{activeChild.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Class {activeChild.class} | {activeChild.age} years old
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {activeChild.school}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 1.5, 
                          textAlign: 'center',
                          bgcolor: 'primary.light',
                          color: 'white',
                          borderRadius: 2
                        }}
                      >
                        <Typography variant="h5">{activeChild.upcomingClasses}</Typography>
                        <Typography variant="body2">Upcoming Classes</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 1.5, 
                          textAlign: 'center',
                          bgcolor: 'warning.light',
                          color: 'white',
                          borderRadius: 2
                        }}
                      >
                        <Typography variant="h5">{activeChild.pendingAssignments}</Typography>
                        <Typography variant="body2">Pending Tasks</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 1.5, 
                          textAlign: 'center',
                          bgcolor: 'success.light',
                          color: 'white',
                          borderRadius: 2
                        }}
                      >
                        <Typography variant="h5">{activeChild.completedAssessments}</Typography>
                        <Typography variant="body2">Assessments</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 1.5, 
                          textAlign: 'center',
                          bgcolor: 'info.light',
                          color: 'white',
                          borderRadius: 2
                        }}
                      >
                        <Typography variant="h5">{activeChild.overallProgress}%</Typography>
                        <Typography variant="body2">Progress</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  variant="outlined"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate(`/parent/child-progress/${activeChild.id}`)}
                >
                  View Detailed Progress
                </Button>
              </Box>
            </CardContent>
          )}
        </Card>
        
        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid item xs={12} md={8}>
            {/* Upcoming Classes */}
            <Card elevation={2} sx={{ mb: 4, borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center' }}>
                    <EventIcon sx={{ mr: 1 }} /> Upcoming Classes
                  </Typography>
                  <Button 
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate(`/parent/child-classes/${activeChild.id}`)}
                  >
                    View All
                  </Button>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                {filteredClasses.length > 0 ? (
                  <List>
                    {filteredClasses.map((classItem) => (
                      <Paper 
                        key={classItem.id} 
                        elevation={1} 
                        sx={{ mb: 2, p: 2, borderRadius: 2 }}
                      >
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} sm={7}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar src={classItem.teacherImage} sx={{ mr: 2 }} />
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
                              variant="outlined" 
                              size="small"
                              onClick={() => navigate(`/parent/class-details/${classItem.id}`)}
                            >
                              Details
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
                      onClick={() => navigate('/find-teachers')}
                    >
                      Book a Class
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
            
            {/* Recent Assessments */}
            <Card elevation={2} sx={{ mb: 4, borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center' }}>
                    <AssignmentIcon sx={{ mr: 1 }} /> Recent Assessments
                  </Typography>
                  <Button 
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate(`/parent/child-assessments/${activeChild.id}`)}
                  >
                    View All
                  </Button>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                {filteredAssessments.length > 0 ? (
                  <List>
                    {filteredAssessments.map((assessment) => (
                      <Paper 
                        key={assessment.id} 
                        elevation={1} 
                        sx={{ mb: 2, p: 2, borderRadius: 2 }}
                      >
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} sm={7}>
                            <Box>
                              <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                                {assessment.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Subject: {assessment.subject}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Typography variant="body2" color="text.secondary">
                              Date: {new Date(assessment.date).toLocaleDateString()}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={2} sx={{ textAlign: 'right' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                              <Typography 
                                variant="subtitle2" 
                                sx={{ 
                                  color: (assessment.score / assessment.totalMarks) * 100 >= 80 
                                    ? 'success.main' 
                                    : (assessment.score / assessment.totalMarks) * 100 >= 60
                                      ? 'warning.main'
                                      : 'error.main'
                                }}
                              >
                                {assessment.score}/{assessment.totalMarks}
                              </Typography>
                              <Typography variant="body2">
                                {((assessment.score / assessment.totalMarks) * 100).toFixed(0)}%
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                  </List>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <AssignmentIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                      No recent assessments
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
            
            {/* Subject Progress */}
            <Card elevation={2} sx={{ mb: 4, borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TrendingUpIcon sx={{ mr: 1 }} /> Subject Progress
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Grid container spacing={3}>
                  {activeChild && activeChild.subjects.map((subject, index) => (
                    <Grid item xs={12} key={index}>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body1">{subject}</Typography>
                          <Typography variant="body2">
                            {/* Random progress for demo purposes */}
                            {Math.floor(65 + Math.random() * 25)}%
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={65 + Math.random() * 25} 
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
                  S
                </Avatar>
                <Typography variant="h6">Mr. Suresh Singh</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Parent of {childrenData.length} {childrenData.length === 1 ? 'child' : 'children'}
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Button 
                    variant="outlined" 
                    fullWidth
                    onClick={() => navigate('/parent/profile')}
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
                    onClick={() => navigate('/parent/notifications')}
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
                    onClick={() => navigate('/parent/bookings')}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.light' }}>
                        <CalendarTodayIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Manage Bookings" />
                  </ListItem>
                  
                  <ListItem 
                    button 
                    sx={{ borderRadius: 2 }}
                    onClick={() => navigate('/parent/teachers')}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'secondary.light' }}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="View Teachers" />
                  </ListItem>
                  
                  <ListItem 
                    button 
                    sx={{ borderRadius: 2 }}
                    onClick={() => navigate('/parent/payments')}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'success.light' }}>
                        <GradeIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Payment History" />
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

export default ParentDashboard;
