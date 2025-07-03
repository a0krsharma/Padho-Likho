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
  Tabs,
  Tab,
  Paper,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  TextField,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Event as EventIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  VideoCall as VideoCallIcon,
  Assignment as AssignmentIcon,
  Download as DownloadIcon,
  Star as StarIcon,
  Feedback as FeedbackIcon,
  ArrowForward as ArrowForwardIcon,
  CalendarToday as CalendarTodayIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Sample classes data
const classesData = [
  {
    id: 1,
    subject: 'Mathematics',
    topic: 'Quadratic Equations',
    teacher: {
      id: 1,
      name: 'Rajesh Kumar',
      image: 'https://randomuser.me/api/portraits/men/48.jpg'
    },
    date: '2025-04-10',
    time: '4:00 PM - 5:00 PM',
    status: 'upcoming',
    materials: [
      { id: 1, name: 'Quadratic Equations - Notes.pdf', type: 'pdf' },
      { id: 2, name: 'Practice Problems.docx', type: 'doc' }
    ],
    assignments: [
      { id: 1, title: 'Practice Problems - Chapter 5', dueDate: '2025-04-15', status: 'pending' }
    ]
  },
  {
    id: 2,
    subject: 'Science',
    topic: 'Chemical Reactions',
    teacher: {
      id: 4,
      name: 'Neha Gupta',
      image: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    date: '2025-04-15',
    time: '5:30 PM - 6:30 PM',
    status: 'upcoming',
    materials: [
      { id: 3, name: 'Chemical Reactions - Slides.pptx', type: 'ppt' },
      { id: 4, name: 'Lab Instructions.pdf', type: 'pdf' }
    ],
    assignments: [
      { id: 2, title: 'Lab Report - Chemical Reactions', dueDate: '2025-04-20', status: 'pending' }
    ]
  },
  {
    id: 3,
    subject: 'English',
    topic: 'Essay Writing',
    teacher: {
      id: 2,
      name: 'Amara Kumari',
      image: 'https://randomuser.me/api/portraits/women/17.jpg'
    },
    date: '2025-04-03',
    time: '3:00 PM - 4:00 PM',
    status: 'completed',
    materials: [
      { id: 5, name: 'Essay Writing Techniques.pdf', type: 'pdf' },
      { id: 6, name: 'Sample Essays.docx', type: 'doc' }
    ],
    assignments: [
      { id: 3, title: 'Essay - My Favorite Book', dueDate: '2025-04-08', status: 'completed' }
    ],
    recording: 'https://example.com/recordings/english-essay-writing'
  },
  {
    id: 4,
    subject: 'Mathematics',
    topic: 'Trigonometry',
    teacher: {
      id: 1,
      name: 'Rajesh Kumar',
      image: 'https://randomuser.me/api/portraits/men/48.jpg'
    },
    date: '2025-03-28',
    time: '4:00 PM - 5:00 PM',
    status: 'completed',
    materials: [
      { id: 7, name: 'Trigonometry Formulas.pdf', type: 'pdf' },
      { id: 8, name: 'Practice Problems.xlsx', type: 'xls' }
    ],
    assignments: [
      { id: 4, title: 'Trigonometry Problems Set', dueDate: '2025-04-02', status: 'completed' }
    ],
    recording: 'https://example.com/recordings/mathematics-trigonometry'
  },
  {
    id: 5,
    subject: 'Computer Science',
    topic: 'Introduction to Programming',
    teacher: {
      id: 3,
      name: 'Amit Patel',
      image: '/images/profile-image.jpg'
    },
    date: '2025-03-20',
    time: '6:00 PM - 7:30 PM',
    status: 'completed',
    materials: [
      { id: 9, name: 'Programming Basics.pdf', type: 'pdf' },
      { id: 10, name: 'Code Examples.zip', type: 'zip' }
    ],
    assignments: [
      { id: 5, title: 'Simple Calculator Program', dueDate: '2025-03-25', status: 'completed' }
    ],
    recording: 'https://example.com/recordings/cs-intro-programming'
  }
];

const ClassCard = ({ classItem, onJoin, onViewDetails, onFeedback }) => {
  const theme = useTheme();
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return theme.palette.primary.main;
      case 'completed':
        return theme.palette.success.main;
      case 'cancelled':
        return theme.palette.error.main;
      default:
        return theme.palette.text.secondary;
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <Paper elevation={1} sx={{ mb: 3, borderRadius: 3, overflow: 'hidden' }}>
      <Box 
        sx={{ 
          p: 0.5, 
          bgcolor: getStatusColor(classItem.status),
          color: 'white',
          textAlign: 'center',
          textTransform: 'uppercase',
          fontSize: '0.75rem',
          fontWeight: 'bold'
        }}
      >
        {classItem.status}
      </Box>
      <Box sx={{ p: 2 }}>
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
                {classItem.teacher?.name ? classItem.teacher.name.split(' ').map(n => n[0]).join('') : ''}
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                  {classItem.subject}: {classItem.topic}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <PersonIcon fontSize="small" sx={{ mr: 0.5 }} /> {classItem.teacher.name}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                <EventIcon fontSize="small" sx={{ mr: 0.5 }} /> {formatDate(classItem.date)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} /> {classItem.time}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {classItem.status === 'upcoming' && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button 
                  variant="contained" 
                  size="small"
                  startIcon={<VideoCallIcon />}
                  onClick={() => onJoin(classItem)}
                >
                  Join Class
                </Button>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => onViewDetails(classItem)}
                >
                  Details
                </Button>
              </Box>
            )}
            {classItem.status === 'completed' && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => onViewDetails(classItem)}
                >
                  View Details
                </Button>
                <Button 
                  variant="outlined" 
                  size="small"
                  color="secondary"
                  startIcon={<FeedbackIcon />}
                  onClick={() => onFeedback(classItem)}
                >
                  Feedback
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

const MyClasses = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [tabValue, setTabValue] = useState(0);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState('');
  
  // Filter classes based on tab
  const filteredClasses = classesData.filter(classItem => {
    if (tabValue === 0) return true; // All classes
    if (tabValue === 1) return classItem.status === 'upcoming';
    if (tabValue === 2) return classItem.status === 'completed';
    return true;
  });
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleJoinClass = (classItem) => {
    navigate(`/classroom/${classItem.id}`);
  };
  
  const handleViewDetails = (classItem) => {
    navigate(`/student/classes/${classItem.id}`);
  };
  
  const handleFeedback = (classItem) => {
    setSelectedClass(classItem);
    setFeedbackDialogOpen(true);
  };
  
  const handleFeedbackSubmit = () => {
    // In a real application, this would send a request to the backend
    console.log('Submitting feedback for class:', selectedClass.id, 'Rating:', feedbackRating, 'Comment:', feedbackComment);
    setFeedbackDialogOpen(false);
    setFeedbackRating(0);
    setFeedbackComment('');
    // Show success message
    alert('Thank you for your feedback!');
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
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            My Classes
          </Typography>
          <Typography variant="h6">
            Manage your learning sessions
          </Typography>
        </Container>
      </Box>
      
      <Container maxWidth="lg">
        <Card elevation={2} sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
              >
                <Tab label="All Classes" />
                <Tab label="Upcoming" />
                <Tab label="Completed" />
              </Tabs>
            </Box>
            
            <Box sx={{ mt: 3 }}>
              {filteredClasses.length > 0 ? (
                filteredClasses.map((classItem) => (
                  <ClassCard 
                    key={classItem.id} 
                    classItem={classItem} 
                    onJoin={handleJoinClass}
                    onViewDetails={handleViewDetails}
                    onFeedback={handleFeedback}
                  />
                ))
              ) : (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <CalendarTodayIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No classes found
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
            </Box>
          </CardContent>
        </Card>
        
        {/* Class Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={2} sx={{ borderRadius: 3, bgcolor: 'primary.light', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="div">
                  {classesData.filter(c => c.status === 'upcoming').length}
                </Typography>
                <Typography variant="body1">
                  Upcoming Classes
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card elevation={2} sx={{ borderRadius: 3, bgcolor: 'success.light', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="div">
                  {classesData.filter(c => c.status === 'completed').length}
                </Typography>
                <Typography variant="body1">
                  Completed Classes
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Card elevation={2} sx={{ borderRadius: 3, bgcolor: 'warning.light', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="div">
                  {classesData.reduce((total, c) => total + c.assignments.length, 0)}
                </Typography>
                <Typography variant="body1">
                  Total Assignments
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Materials and Assignments */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ borderRadius: 3, height: '100%' }}>
              <CardContent>
                <Typography variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <DownloadIcon sx={{ mr: 1 }} /> Recent Materials
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <List>
                  {classesData
                    .flatMap(c => c.materials.map(m => ({ ...m, subject: c.subject, date: c.date })))
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 5)
                    .map((material) => (
                      <ListItem 
                        key={material.id} 
                        button
                        sx={{ 
                          borderRadius: 2, 
                          mb: 1,
                          '&:hover': { bgcolor: 'action.hover' }
                        }}
                      >
                        <ListItemText 
                          primary={material.name} 
                          secondary={`${material.subject} | ${new Date(material.date).toLocaleDateString()}`} 
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="download">
                            <DownloadIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                </List>
                
                <Button 
                  endIcon={<ArrowForwardIcon />}
                  sx={{ mt: 2 }}
                  onClick={() => navigate('/student/materials')}
                >
                  View All Materials
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ borderRadius: 3, height: '100%' }}>
              <CardContent>
                <Typography variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AssignmentIcon sx={{ mr: 1 }} /> Recent Assignments
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <List>
                  {classesData
                    .flatMap(c => c.assignments.map(a => ({ ...a, subject: c.subject })))
                    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                    .slice(0, 5)
                    .map((assignment) => (
                      <ListItem 
                        key={assignment.id} 
                        button
                        sx={{ 
                          borderRadius: 2, 
                          mb: 1,
                          '&:hover': { bgcolor: 'action.hover' }
                        }}
                      >
                        <ListItemText 
                          primary={assignment.title} 
                          secondary={`${assignment.subject} | Due: ${new Date(assignment.dueDate).toLocaleDateString()}`} 
                        />
                        <Chip 
                          label={assignment.status === 'completed' ? 'Completed' : 'Pending'} 
                          color={assignment.status === 'completed' ? 'success' : 'warning'}
                          size="small"
                        />
                      </ListItem>
                    ))}
                </List>
                
                <Button 
                  endIcon={<ArrowForwardIcon />}
                  sx={{ mt: 2 }}
                  onClick={() => navigate('/student/assignments')}
                >
                  View All Assignments
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Need Help Section */}
        <Card elevation={2} sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Need Help?
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" paragraph>
              If you're having trouble with your classes or need technical assistance, our support team is here to help.
            </Typography>
            <Button variant="contained">Contact Support</Button>
          </CardContent>
        </Card>
      </Container>
      
      {/* Feedback Dialog */}
      <Dialog 
        open={feedbackDialogOpen} 
        onClose={() => setFeedbackDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Class Feedback</DialogTitle>
        <DialogContent>
          {selectedClass && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1">
                {selectedClass.subject}: {selectedClass.topic}
              </Typography>
              <Typography variant="body2">
                Teacher: {selectedClass.teacher.name}
              </Typography>
              <Typography variant="body2">
                Date: {new Date(selectedClass.date).toLocaleDateString()} | {selectedClass.time}
              </Typography>
            </Box>
          )}
          
          <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
            How would you rate this class?
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Rating
              name="feedback-rating"
              value={feedbackRating}
              onChange={(event, newValue) => {
                setFeedbackRating(newValue);
              }}
              size="large"
            />
            <Typography variant="body2" sx={{ ml: 2 }}>
              {feedbackRating > 0 ? `${feedbackRating} stars` : 'Select rating'}
            </Typography>
          </Box>
          
          <TextField
            label="Your feedback"
            multiline
            rows={4}
            fullWidth
            value={feedbackComment}
            onChange={(e) => setFeedbackComment(e.target.value)}
            placeholder="What did you like about this class? What could be improved?"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFeedbackDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleFeedbackSubmit} 
            color="primary" 
            variant="contained"
            disabled={feedbackRating === 0}
          >
            Submit Feedback
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyClasses;
