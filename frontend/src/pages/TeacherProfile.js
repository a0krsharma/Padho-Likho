import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Avatar, 
  Button, 
  Chip, 
  Divider, 
  Paper,
  Card,
  CardContent,
  Rating,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  School as SchoolIcon,
  AccessTime as AccessTimeIcon,
  Language as LanguageIcon,
  Verified as VerifiedIcon,
  EventAvailable as EventAvailableIcon,
  CheckCircle as CheckCircleIcon,
  Person as PersonIcon,
  CalendarMonth as CalendarMonthIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';

// Sample teacher data
const teachersData = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    subjects: ['Mathematics', 'Physics'],
    classes: [9, 10],
    experience: 8,
    rating: 4.9,
    reviewCount: 124,
    hourlyRate: 600,
    bio: 'Experienced mathematics and physics teacher with a passion for making complex concepts easy to understand. I have been teaching for 8 years and have helped hundreds of students improve their grades and develop a love for these subjects.',
    languages: ['English', 'Hindi'],
    verified: true,
    availability: 'Weekdays evenings, Weekends',
    education: [
      { degree: 'M.Sc. in Mathematics', institution: 'Delhi University', year: '2014' },
      { degree: 'B.Ed.', institution: 'Jamia Millia Islamia', year: '2015' }
    ],
    achievements: [
      'Best Teacher Award - ABC School (2019)',
      'Published research paper on innovative teaching methods',
      'Conducted workshops on mathematics pedagogy'
    ],
    teachingApproach: 'I believe in a student-centered approach that focuses on understanding concepts rather than memorization. I use real-world examples and visual aids to make learning engaging and effective.',
    reviews: [
      { id: 1, name: 'Amit Singh', rating: 5, comment: 'Excellent teacher! My son improved his math score from C to A in just 3 months.', date: '2023-02-15' },
      { id: 2, name: 'Amara Kumari', rating: 5, comment: 'Very patient and explains complex concepts in a simple way.', date: '2023-01-10' },
      { id: 3, name: 'Rahul Verma', rating: 4, comment: 'Good teaching style. Helped me prepare for my board exams.', date: '2022-12-05' }
    ]
  }
];

const TeacherProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Find teacher by id
  const teacher = teachersData.find(t => t.id === parseInt(id)) || teachersData[0];
  
  // Tab state
  const [tabValue, setTabValue] = useState(0);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  return (
    <Box>
      {/* Header Section */}
      <Box 
        sx={{ 
          backgroundColor: 'primary.light',
          backgroundImage: 'linear-gradient(135deg, #4361ee 0%, #738eef 100%)',
          color: 'white',
          py: 6,
          borderRadius: 4,
          mb: 6
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={3} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Box 
                sx={{ 
                  width: { xs: 120, md: 150 }, 
                  height: { xs: 120, md: 150 }, 
                  mx: { xs: 'auto', md: 0 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%'
                }}
              >
                <PersonIcon sx={{ fontSize: 60, color: 'white' }} />
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
                  {teacher.name}
                </Typography>
                {teacher.verified && (
                  <VerifiedIcon 
                    sx={{ ml: 1, fontSize: 28 }} 
                    titleAccess="Verified Teacher"
                  />
                )}
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mt: 1, 
                mb: 2,
                justifyContent: { xs: 'center', md: 'flex-start' }
              }}>
                <Rating 
                  value={teacher.rating} 
                  precision={0.1} 
                  readOnly 
                />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {teacher.rating} ({teacher.reviewCount} reviews)
                </Typography>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                mb: 3,
                justifyContent: { xs: 'center', md: 'flex-start' }
              }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  onClick={() => navigate(`/teachers/${teacher.id}/book`)}
                  sx={{ mr: 2, fontWeight: 'bold', px: 4 }}
                >
                  Book Now
                </Button>
                <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
                  ₹{teacher.hourlyRate}/hour
                </Typography>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 1, 
                mb: 3,
                justifyContent: { xs: 'center', md: 'flex-start' }
              }}>
                {teacher.subjects.map((subject, index) => (
                  <Chip 
                    key={index} 
                    label={subject} 
                    color="secondary" 
                    sx={{ color: 'white', fontWeight: 'medium' }}
                  />
                ))}
                {teacher.classes.map((classNum, index) => (
                  <Chip 
                    key={`class-${index}`} 
                    label={`Class ${classNum}`} 
                    variant="outlined"
                    sx={{ color: 'white', borderColor: 'white' }}
                  />
                ))}
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 2,
                justifyContent: { xs: 'center', md: 'flex-start' }
              }}>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  size="large"
                  onClick={() => navigate(`/teachers/${teacher.id}/book`)}
                >
                  Book a Session
                </Button>
                <Button 
                  variant="outlined" 
                  color="inherit" 
                  size="large"
                  sx={{ borderColor: 'white', color: 'white' }}
                >
                  Message
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid item xs={12} md={8}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons={isMobile ? "auto" : false}
              allowScrollButtonsMobile
              sx={{ mb: 4 }}
            >
              <Tab label="About" />
              <Tab label="Reviews" />
              <Tab label="Schedule" />
              <Tab label="Pricing" />
            </Tabs>
            
            {/* About Tab */}
            <Box hidden={tabValue !== 0}>
              <Typography variant="h5" component="h2" gutterBottom>
                About {teacher.name}
              </Typography>
              <Typography variant="body1" paragraph>
                {teacher.bio}
              </Typography>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Teaching Approach
              </Typography>
              <Typography variant="body1" paragraph>
                {teacher.teachingApproach}
              </Typography>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Education
              </Typography>
              <List>
                {teacher.education.map((edu, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <SchoolIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={edu.degree} 
                      secondary={`${edu.institution}, ${edu.year}`} 
                    />
                  </ListItem>
                ))}
              </List>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Achievements
              </Typography>
              <List>
                {teacher.achievements.map((achievement, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={achievement} />
                  </ListItem>
                ))}
              </List>
            </Box>
            
            {/* Reviews Tab */}
            <Box hidden={tabValue !== 1}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Typography variant="h5" component="h2">
                  Student Reviews
                </Typography>
                <Typography variant="body1" sx={{ ml: 2 }}>
                  ({teacher.reviewCount} reviews)
                </Typography>
              </Box>
              
              {teacher.reviews.map((review) => (
                <Paper key={review.id} elevation={1} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2 }}>
                      <PersonIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1">{review.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {review.date}
                      </Typography>
                    </Box>
                    <Box sx={{ ml: 'auto' }}>
                      <Rating value={review.rating} readOnly size="small" />
                    </Box>
                  </Box>
                  <Typography variant="body1">
                    {review.comment}
                  </Typography>
                </Paper>
              ))}
              
              <Button 
                variant="outlined" 
                endIcon={<ArrowForwardIcon />}
                sx={{ mt: 2 }}
              >
                View All Reviews
              </Button>
            </Box>
            
            {/* Schedule Tab */}
            <Box hidden={tabValue !== 2}>
              <Typography variant="h5" component="h2" gutterBottom>
                Availability
              </Typography>
              <Typography variant="body1" paragraph>
                {teacher.name} is available during the following times:
              </Typography>
              
              <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Regular Schedule
                </Typography>
                <Typography variant="body1">
                  {teacher.availability}
                </Typography>
              </Paper>
              
              <Typography variant="body1" paragraph>
                To book a session, select a date and time that works for you:
              </Typography>
              
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <CalendarMonthIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Calendar View Coming Soon
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Our interactive calendar feature is under development.
                </Typography>
                <Button 
                  variant="contained" 
                  sx={{ mt: 3 }}
                  onClick={() => navigate(`/teachers/${teacher.id}/book`)}
                >
                  Book a Session Now
                </Button>
              </Box>
            </Box>
            
            {/* Pricing Tab */}
            <Box hidden={tabValue !== 3}>
              <Typography variant="h5" component="h2" gutterBottom>
                Pricing Plans
              </Typography>
              <Typography variant="body1" paragraph>
                Choose a plan that suits your learning needs:
              </Typography>
              
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6}>
                  <Card elevation={2} sx={{ height: '100%', borderRadius: 3 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom align="center">
                        Single Session
                      </Typography>
                      <Box sx={{ textAlign: 'center', my: 2 }}>
                        <Typography variant="h3" component="div" color="primary.main">
                          ₹{teacher.hourlyRate}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          per hour
                        </Typography>
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      <List>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon>
                            <CheckCircleIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary="One-on-one attention" />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon>
                            <CheckCircleIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary="Flexible scheduling" />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon>
                            <CheckCircleIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary="Post-session notes" />
                        </ListItem>
                      </List>
                      <Button 
                        variant="outlined" 
                        fullWidth 
                        sx={{ mt: 2 }}
                        onClick={() => navigate(`/teachers/${teacher.id}/book`)}
                      >
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card 
                    elevation={4} 
                    sx={{ 
                      height: '100%', 
                      borderRadius: 3,
                      border: `2px solid ${theme.palette.primary.main}`
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom align="center">
                        Package (10 Sessions)
                      </Typography>
                      <Box sx={{ textAlign: 'center', my: 2 }}>
                        <Typography variant="h3" component="div" color="primary.main">
                          ₹{teacher.hourlyRate * 9}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          for 10 hours (10% off)
                        </Typography>
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      <List>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon>
                            <CheckCircleIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary="One-on-one attention" />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon>
                            <CheckCircleIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary="Flexible scheduling" />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon>
                            <CheckCircleIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary="Post-session notes" />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon>
                            <CheckCircleIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary="Progress tracking" />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon>
                            <CheckCircleIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary="Customized study plan" />
                        </ListItem>
                      </List>
                      <Button 
                        variant="contained" 
                        fullWidth 
                        sx={{ mt: 2 }}
                        onClick={() => navigate(`/teachers/${teacher.id}/book`)}
                      >
                        Book Package
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              
              <Typography variant="body2" color="text.secondary">
                * All sessions are conducted online via our integrated video conferencing system.
              </Typography>
            </Box>
          </Grid>
          
          {/* Right Column */}
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Teacher Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SchoolIcon color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Experience
                  </Typography>
                  <Typography variant="body1">
                    {teacher.experience} years
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccessTimeIcon color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Availability
                  </Typography>
                  <Typography variant="body1">
                    {teacher.availability}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LanguageIcon color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Languages
                  </Typography>
                  <Typography variant="body1">
                    {teacher.languages.join(', ')}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EventAvailableIcon color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Response Time
                  </Typography>
                  <Typography variant="body1">
                    Usually within 2 hours
                  </Typography>
                </Box>
              </Box>
            </Card>
            
            <Card elevation={2} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Subjects & Classes
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Subjects:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {teacher.subjects.map((subject, index) => (
                  <Chip 
                    key={index} 
                    label={subject} 
                    size="small" 
                    color="primary" 
                  />
                ))}
              </Box>
              
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Classes:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {teacher.classes.map((classNum, index) => (
                  <Chip 
                    key={index} 
                    label={`Class ${classNum}`} 
                    size="small"
                    color="secondary"
                  />
                ))}
              </Box>
            </Card>
            
            <Button 
              variant="contained" 
              fullWidth 
              size="large"
              sx={{ py: 1.5 }}
              onClick={() => navigate(`/teachers/${teacher.id}/book`)}
            >
              Book a Session
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TeacherProfile;
