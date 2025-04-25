import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Button, 
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
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
  CalendarToday as CalendarTodayIcon,
  ArrowForward as ArrowForwardIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Import custom components
import ContentCard from '../../components/common/ContentCard';
import StatCard from '../../components/common/StatCard';
import Calendar from '../../components/common/Calendar';
import NotificationBell from '../../components/common/NotificationBell';
import UserAvatar from '../../components/common/UserAvatar';
import DataTable from '../../components/common/DataTable';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import ProgressTracker from '../../components/common/ProgressTracker';

// Sample data
const upcomingClasses = [
  {
    id: 1,
    subject: 'Mathematics',
    topic: 'Quadratic Equations',
    teacher: 'Rajesh Kumar',
    teacherImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: 'Today',
    time: '4:00 PM - 5:00 PM'
  },
  {
    id: 2,
    subject: 'Science',
    topic: 'Chemical Reactions',
    teacher: 'Neha Gupta',
    teacherImage: 'https://randomuser.me/api/portraits/women/68.jpg',
    date: 'Tomorrow',
    time: '5:30 PM - 6:30 PM'
  }
];

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

const recentActivity = [
  {
    id: 1,
    title: 'Completed assignment in Mathematics',
    time: '2 hours ago',
    icon: <AssignmentIcon />,
    iconBg: 'primary.light'
  },
  {
    id: 2,
    title: 'Attended Science class',
    time: '5 hours ago',
    icon: <EventNoteIcon />,
    iconBg: 'secondary.light'
  },
  {
    id: 3,
    title: 'Received feedback on assignment',
    time: '1 day ago',
    icon: <StarIcon />,
    iconBg: 'warning.light'
  }
];

const calendarEvents = [
  {
    id: 1,
    title: 'Mathematics class',
    date: '2025-04-10',
    time: '4:00 PM - 5:00 PM'
  },
  {
    id: 2,
    title: 'Science class',
    date: '2025-04-11',
    time: '5:30 PM - 6:30 PM'
  }
];

const weeklyPerformance = [
  {
    id: 1,
    name: 'Mathematics',
    score: 80,
    color: 'primary'
  },
  {
    id: 2,
    name: 'Science',
    score: 70,
    color: 'secondary'
  },
  {
    id: 3,
    name: 'English',
    score: 90,
    color: 'success'
  }
];

const monthlyPerformance = [
  {
    id: 1,
    name: 'Mathematics',
    score: 85,
    color: 'primary'
  },
  {
    id: 2,
    name: 'Science',
    score: 75,
    color: 'secondary'
  },
  {
    id: 3,
    name: 'English',
    score: 95,
    color: 'success'
  }
];

const pendingAssignments = [
  {
    id: 1,
    subject: 'Mathematics',
    title: 'Practice Problems - Chapter 5',
    dueDate: '2025-04-10',
    assignedBy: 'Rajesh Kumar'
  },
  {
    id: 2,
    subject: 'Science',
    title: 'Lab Report - Chemical Reactions',
    dueDate: '2025-04-15',
    assignedBy: 'Neha Gupta'
  }
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Student Dashboard
            </Typography>
            <Breadcrumbs 
              items={[
                { label: 'Home', link: '/' },
                { label: 'Dashboard', link: '/student/dashboard', active: true }
              ]}
            />
          </Box>
          <NotificationBell 
            notifications={notifications}
            onViewAll={() => navigate('/student/notifications')}
            onMarkAllRead={() => console.log('Mark all as read')}
          />
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={6} md={3}>
            <StatCard 
              icon={<EventNoteIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />}
              title="Upcoming Classes"
              value={upcomingClasses.length}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <StatCard 
              icon={<AssignmentIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />}
              title="Pending Assignments"
              value={pendingAssignments.length}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <StatCard 
              icon={<BookIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />}
              title="Subjects"
              value={5}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <StatCard 
              icon={<StarIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />}
              title="Average Score"
              value="85%"
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
              action={() => navigate('/student/classes')}
              icon={<EventNoteIcon />}
            >
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
                            <UserAvatar 
                              name={classItem.teacher}
                              image={classItem.teacherImage}
                              role="teacher"
                              sx={{ mr: 2 }}
                            />
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
                            sx={{ borderRadius: 3, fontWeight: 600, px: 3, py: 1, boxShadow: '0 2px 8px rgba(67,97,238,0.08)', transition: 'background 0.2s', '&:hover': { background: 'linear-gradient(135deg, #4361ee 0%, #738eef 100%)', color: 'white' } }}
                            onClick={() => navigate(`/classroom/${classItem.id}`)}
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
                    No classes scheduled for today
                  </Typography>
                </Box>
              )}
            </ContentCard>
            
            {/* Pending Assignments */}
            <ContentCard 
              title="Pending Assignments"
              subtitle="View all pending assignments"
              action={() => navigate('/student/assignments')}
              icon={<AssignmentIcon />}
            >
              {pendingAssignments.length > 0 ? (
                <List>
                  {pendingAssignments.map((assignment) => (
                    <Paper 
                      key={assignment.id} 
                      elevation={3} 
                      sx={{ mb: 2, p: 2.5, borderRadius: 4, boxShadow: '0 4px 16px 0 rgba(67,97,238,0.08)' }}
                    >
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={7}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                            {assignment.subject}: {assignment.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Due: {assignment.dueDate}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Assigned by: {assignment.assignedBy}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={5} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                          <Button 
                            variant="outlined" 
                            color="primary" 
                            size="small"
                            sx={{ borderRadius: 3, fontWeight: 600, px: 3, py: 1, boxShadow: '0 2px 8px rgba(67,97,238,0.08)', transition: 'background 0.2s', '&:hover': { background: 'linear-gradient(135deg, #4361ee 0%, #738eef 100%)', color: 'white' } }}
                            onClick={() => navigate(`/assignments/${assignment.id}`)}
                          >
                            View Assignment
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
                    No pending assignments
                  </Typography>
                </Box>
              )}
            </ContentCard>
            
            {/* Recent Activity */}
            <ContentCard 
              title="Recent Activity"
              subtitle="View all activity"
              action={() => navigate('/student/activity')}
              icon={<DashboardIcon />}
            >
              <List>
                {recentActivity.map((activity) => (
                  <ListItem 
                    key={activity.id} 
                    sx={{ 
                      px: 2, 
                      py: 1.5, 
                      borderBottom: '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: activity.iconBg }}>
                        {activity.icon}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={activity.title}
                      secondary={activity.time}
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                ))}
              </List>
            </ContentCard>
          </Grid>
          
          {/* Right Column */}
          <Grid item xs={12} md={4}>
            {/* Progress Summary */}
            <ContentCard 
              title="Progress Summary"
              subtitle="View detailed progress"
              action={() => navigate('/student/progress')}
              icon={<SchoolIcon />}
            >
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Overall Progress</Typography>
                  <Typography variant="body2" fontWeight="bold">75%</Typography>
                </Box>
                <ProgressTracker 
                  value={75} 
                  color="primary"
                />
              </Box>
              
              <Typography variant="subtitle2" sx={{ mb: 2 }}>Subject Progress</Typography>
              
              {subjectProgress.map((subject) => (
                <Box key={subject.subject} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">{subject.subject}</Typography>
                    <Typography variant="body2" fontWeight="bold">{subject.progress}%</Typography>
                  </Box>
                  <ProgressTracker 
                    value={subject.progress} 
                    color="primary"
                  />
                </Box>
              ))}
            </ContentCard>
            
            {/* Calendar */}
            <ContentCard 
              title="Calendar"
              subtitle="View full calendar"
              action={() => navigate('/student/calendar')}
              icon={<CalendarTodayIcon />}
            >
              <Calendar 
                events={calendarEvents}
                onEventClick={(event) => navigate(`/student/classes/${event.id}`)}
              />
            </ContentCard>
            
            {/* Performance */}
            <ContentCard 
              title="Performance"
              subtitle="View detailed performance"
              action={() => navigate('/student/performance')}
              icon={<StarIcon />}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <CircularProgress
                    variant="determinate"
                    value={85}
                    size={120}
                    thickness={5}
                    sx={{ color: 'success.main' }}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h4" component="div" color="text.primary">
                      85%
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Box>
                <Tabs 
                  value={tabValue} 
                  onChange={handleTabChange} 
                  variant="fullWidth" 
                  sx={{ mb: 2 }}
                >
                  <Tab label="Weekly" />
                  <Tab label="Monthly" />
                </Tabs>
                
                {tabValue === 0 && (
                  <Box>
                    {weeklyPerformance.map((subject) => (
                      <Box key={subject.id} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2">{subject.name}</Typography>
                          <Typography variant="body2" fontWeight="bold">{subject.score}%</Typography>
                        </Box>
                        <ProgressTracker 
                          value={subject.score} 
                          color={subject.color}
                        />
                      </Box>
                    ))}
                  </Box>
                )}
                
                {tabValue === 1 && (
                  <Box>
                    {monthlyPerformance.map((subject) => (
                      <Box key={subject.id} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2">{subject.name}</Typography>
                          <Typography variant="body2" fontWeight="bold">{subject.score}%</Typography>
                        </Box>
                        <ProgressTracker 
                          value={subject.score} 
                          color={subject.color}
                        />
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </ContentCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default StudentDashboard;
