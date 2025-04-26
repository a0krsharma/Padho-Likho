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
  const [selectedChild, setSelectedChild] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const handleChildChange = (event, newValue) => {
    setSelectedChild(newValue);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const currentChild = childrenData[selectedChild];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ py: 6, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Parent Dashboard
            </Typography>
            <Breadcrumbs 
              items={[
                { label: 'Home', link: '/' },
                { label: 'Dashboard', link: '/parent/dashboard', active: true }
              ]}
            />
          </Box>
          <NotificationBell 
            notifications={notifications}
            onViewAll={() => navigate('/parent/notifications')}
            onMarkAllRead={() => console.log('Mark all as read')}
          />
        </Box>

        {/* Child Selector */}
        <Box sx={{ mb: 4 }}>
          <Tabs
            value={selectedChild}
            onChange={handleChildChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ 
              mb: 2,
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                minWidth: 'auto',
                px: 3
              }
            }}
          >
            {childrenData.map((child, index) => (
              <Tab 
                key={child.id}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <UserAvatar 
                      name={child.name}
                      sx={{ mr: 1, width: 32, height: 32 }}
                    />
                    <Typography variant="body2">{child.name}</Typography>
                  </Box>
                }
              />
            ))}
            <Tab 
              icon={<AddIcon />} 
              iconPosition="start" 
              label="Add Child" 
              onClick={() => navigate('/parent/add-child')}
            />
          </Tabs>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={6} md={3}>
            <StatCard 
              icon={<EventIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />}
              title="Upcoming Classes"
              value={currentChild.upcomingClasses.length}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <StatCard 
              icon={<AssignmentIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />}
              title="Pending Assignments"
              value={currentChild.pendingAssignments.length}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <StatCard 
              icon={<GradeIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />}
              title="Average Grade"
              value={`${currentChild.averageGrade}%`}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <StatCard 
              icon={<TrendingUpIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />}
              title="Attendance"
              value={`${currentChild.attendance}%`}
            />
          </Grid>
        </Grid>
        
        <Grid container spacing={4} alignItems="stretch">
          {/* Left Column */}
          <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* Child Profile Summary */}
            <ContentCard 
              title="Child Profile"
              subtitle="View complete profile"
              action={() => navigate(`/parent/child/${currentChild.id}`)}
              icon={<PersonIcon />}
              sx={{ height: '100%' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <UserAvatar 
                  name={currentChild.name}
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    mr: 2,
                    fontSize: '2rem'
                  }}
                />
                <Box>
                  <Typography variant="h6">{currentChild.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Age: {currentChild.age} | Class: {currentChild.class}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    School: {currentChild.school}
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="subtitle2" gutterBottom>Subjects</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {currentChild.subjects.map((subject, index) => (
                  <Chip 
                    key={index} 
                    label={subject} 
                    size="small" 
                    color={
                      index % 5 === 0 ? 'primary' : 
                      index % 5 === 1 ? 'secondary' : 
                      index % 5 === 2 ? 'success' : 
                      index % 5 === 3 ? 'info' : 
                      'warning'
                    }
                  />
                ))}
              </Box>
            </ContentCard>
            
            {/* Upcoming Classes */}
            <ContentCard 
              title="Upcoming Classes"
              subtitle="View all classes"
              action={() => navigate('/parent/classes')}
              icon={<EventIcon />}
              sx={{ height: '100%' }}
            >
              {currentChild.upcomingClasses.length > 0 ? (
                <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                  <List>
                    {currentChild.upcomingClasses.map((classItem) => (
                      <Paper 
                        key={classItem.id} 
                        elevation={1} 
                        sx={{ mb: 2, p: 2.5, borderRadius: 4, boxShadow: '0 4px 16px 0 rgba(67,97,238,0.08)' }}
                      >
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} sm={7}>
                            <Box>
                              <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                                {classItem.subject}: {classItem.topic}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Teacher: {classItem.teacher}
                              </Typography>
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
                              sx={{ borderRadius: 3, fontWeight: 600, px: 3, py: 1, boxShadow: '0 2px 8px rgba(67,97,238,0.08)', transition: 'background 0.2s', '&:hover': { background: 'linear-gradient(135deg, #4361ee 0%, #738eef 100%)', color: 'white' } }}
                              onClick={() => navigate(`/parent/classes/${classItem.id}`)}
                            >
                              Details
                            </Button>
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                  </List>
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <CalendarTodayIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary">
                    No upcoming classes scheduled
                  </Typography>
                </Box>
              )}
            </ContentCard>
            
            {/* Pending Assignments */}
            <ContentCard 
              title="Pending Assignments"
              subtitle="View all assignments"
              action={() => navigate('/parent/assignments')}
              icon={<AssignmentIcon />}
              sx={{ height: '100%' }}
            >
              {currentChild.pendingAssignments.length > 0 ? (
                <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                  <List>
                    {currentChild.pendingAssignments.map((assignment) => (
                      <Paper 
                        key={assignment.id} 
                        elevation={1} 
                        sx={{ mb: 2, p: 2.5, borderRadius: 4, boxShadow: '0 4px 16px 0 rgba(67,97,238,0.08)' }}
                      >
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} sm={7}>
                            <Box>
                              <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                                {assignment.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Subject: {assignment.subject} | Teacher: {assignment.teacher}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Typography variant="body2" color="text.secondary">
                              Due: {assignment.dueDate}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={2} sx={{ textAlign: 'right' }}>
                            <Chip 
                              label={assignment.status} 
                              color={assignment.status === 'Completed' ? 'success' : 'warning'}
                              size="small"
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                  </List>
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <AssignmentIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary">
                    No pending assignments
                  </Typography>
                </Box>
              )}
            </ContentCard>
          </Grid>
          
          {/* Right Column */}
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* Progress Tracker */}
            <ContentCard 
              title="Academic Progress"
              subtitle="View detailed progress"
              action={() => navigate(`/parent/progress/${currentChild.id}`)}
              icon={<TrendingUpIcon />}
              sx={{ height: '100%' }}
            >
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Overall Progress</Typography>
                  <Typography variant="body2" fontWeight="bold">{currentChild.overallProgress}%</Typography>
                </Box>
                <ProgressTracker 
                  value={currentChild.overallProgress} 
                  color="primary"
                />
              </Box>
              
              <Typography variant="subtitle2" sx={{ mb: 2 }}>Subject Progress</Typography>
              
              {currentChild.subjectProgress.map((subject) => (
                <Box key={subject.id} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">{subject.name}</Typography>
                    <Typography variant="body2" fontWeight="bold">{subject.progress}%</Typography>
                  </Box>
                  <ProgressTracker 
                    value={subject.progress} 
                    color={
                      subject.progress >= 80 ? 'success' : 
                      subject.progress >= 60 ? 'primary' : 
                      subject.progress >= 40 ? 'warning' : 
                      'error'
                    }
                  />
                </Box>
              ))}
            </ContentCard>
            
            {/* Calendar and Recent Activity side-by-side */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <ContentCard 
                  title="Calendar"
                  subtitle="View full calendar"
                  action={() => navigate('/parent/calendar')}
                  icon={<CalendarTodayIcon />}
                >
                  <Calendar 
                    events={currentChild.calendarEvents}
                    onEventClick={(event) => navigate(`/parent/events/${event.id}`)}
                  />
                </ContentCard>
              </Grid>
              <Grid item xs={12} md={6}>
                <ContentCard 
                  title="Recent Activity"
                  subtitle="View all messages"
                  action={() => navigate('/parent/messages')}
                  icon={<MessageIcon />}
                >
                  <List>
                    {currentChild.teacherMessages.map((message) => (
                      <ListItem 
                        key={message.id} 
                        sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}
                      >
                        <ListItemAvatar>
                          <UserAvatar name={message.teacher} role="teacher" />
                        </ListItemAvatar>
                        <ListItemText 
                          primary={message.teacher}
                          secondary={message.preview}
                          primaryTypographyProps={{ variant: 'body2' }}
                          secondaryTypographyProps={{ variant: 'caption' }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {message.time}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Button 
                      variant="outlined" 
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={() => navigate('/parent/messages/new')}
                    >
                      New Message
                    </Button>
                  </Box>
                </ContentCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ParentDashboard;
