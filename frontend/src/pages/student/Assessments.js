import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Grid, Card, CardContent, Button, Divider, Tabs, Tab, Paper, Chip, LinearProgress, List, ListItem, ListItemText, ListItemIcon, CircularProgress } from '@mui/material';
import { Assignment as AssignmentIcon, CheckCircle as CheckCircleIcon, Pending as PendingIcon, Timer as TimerIcon, CalendarToday as CalendarTodayIcon, ArrowForward as ArrowForwardIcon, School as SchoolIcon, Grade as GradeIcon, TrendingUp as TrendingUpIcon, BarChart as BarChartIcon } from '@mui/icons-material';


import axios from 'axios';

// Assessments will fetch data from the backend API


const AssessmentCard = ({ assessment, onTakeAssessment, onViewDetails }) => {
  const theme = useTheme();
  
  // Get status color and icon
  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return { 
          color: theme.palette.warning.main, 
          icon: <PendingIcon />,
          text: 'Pending'
        };
      case 'completed':
        return { 
          color: theme.palette.success.main, 
          icon: <CheckCircleIcon />,
          text: 'Completed'
        };
      case 'in_progress':
        return { 
          color: theme.palette.info.main, 
          icon: <TimerIcon />,
          text: 'In Progress'
        };
      default:
        return { 
          color: theme.palette.text.secondary, 
          icon: <AssignmentIcon />,
          text: status
        };
    }
  };
  
  const statusInfo = getStatusInfo(assessment.status);
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Calculate days remaining
  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const daysRemaining = assessment.status === 'pending' ? getDaysRemaining(assessment.dueDate) : null;
  
  return (
    <Paper elevation={1} sx={{ mb: 3, borderRadius: 3, overflow: 'hidden' }}>
      <Box 
        sx={{ 
          p: 0.5, 
          bgcolor: statusInfo.color,
          color: 'white',
          textAlign: 'center',
          textTransform: 'uppercase',
          fontSize: '0.75rem',
          fontWeight: 'bold'
        }}
      >
        {statusInfo.text}
      </Box>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" component="h3" gutterBottom>
              {assessment.title}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              <Chip 
                label={assessment.subject} 
                color="primary" 
                size="small" 
              />
              <Chip 
                label={`${assessment.totalQuestions} Questions`} 
                variant="outlined" 
                size="small" 
              />
              <Chip 
                label={`${assessment.duration} mins`} 
                variant="outlined" 
                size="small" 
                icon={<TimerIcon fontSize="small" />}
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Teacher
              </Typography>
              <Typography variant="body1">
                {assessment.teacher}
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="body2" color="text.secondary">
                {assessment.status === 'completed' ? 'Completed On' : 'Due Date'}
              </Typography>
              <Typography variant="body1">
                {assessment.status === 'completed' 
                  ? formatDate(assessment.completedOn) 
                  : formatDate(assessment.dueDate)}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            {assessment.status === 'completed' ? (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Score
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {assessment.score} / {assessment.totalMarks}
                  </Typography>
                </Box>
                <Box sx={{ position: 'relative', display: 'inline-flex', width: '100%' }}>
                  <CircularProgress
                    variant="determinate"
                    value={assessment.percentage}
                    size={60}
                    thickness={5}
                    sx={{ color: assessment.percentage >= 90 
                      ? theme.palette.success.main 
                      : assessment.percentage >= 75 
                        ? theme.palette.info.main 
                        : assessment.percentage >= 60 
                          ? theme.palette.warning.main 
                          : theme.palette.error.main 
                    }}
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
                    <Typography variant="caption" component="div" fontWeight="bold">
                      {Math.round(assessment.percentage)}%
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => onViewDetails(assessment)}
                    >
                      View Results
                    </Button>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Time Remaining
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color={daysRemaining <= 1 ? 'error.main' : daysRemaining <= 3 ? 'warning.main' : 'text.primary'}
                    fontWeight={daysRemaining <= 3 ? 'medium' : 'normal'}
                  >
                    {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} remaining
                  </Typography>
                </Box>
                <Button 
                  variant="contained" 
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => onTakeAssessment(assessment)}
                >
                  Take Assessment
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

const Assessments = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentAssessment, setCurrentAssessment] = useState(null);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await axios.get('/api/assessments');
        setAssessments(res.data.assessments || []);
      } catch (err) {
        setError('Failed to load assessments.');
      } finally {
        setLoading(false);
      }
    };
    fetchAssessments();
  }, []);


  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleTakeAssessment = (assessment) => {
    setCurrentAssessment(assessment);
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/student/assessments/${assessment._id || assessment.id}/take`);
    }, 1500);
  };

  const handleViewDetails = (assessment) => {
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/student/assessments/${assessment._id || assessment.id}`);
    }, 1500);
  };

  if (loading) return <Box sx={{ p: 4, textAlign: 'center' }}>Loading...</Box>;
  if (error) return <Box sx={{ p: 4, textAlign: 'center', color: 'red' }}>{error}</Box>;


  // Filter assessments based on tab, search term, and subject filter
  const filteredAssessments = assessments.filter(assessment => {
    // Tab filter
    const tabFilter = 
      tabValue === 0 ? true : // All assessments
      tabValue === 1 ? assessment.status === 'pending' :
      tabValue === 2 ? assessment.status === 'completed' : true;
    
    // Search filter
    const searchFilter = searchTerm === '' ? true :
      assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.topic.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Subject filter
    const subjectFilter = selectedSubject === 'all' ? true :
      assessment.subject.toLowerCase() === selectedSubject.toLowerCase();
    
    return tabFilter && searchFilter && subjectFilter;
  });

  // Calculate statistics
  const totalAssessments = assessments.length;
  const completedAssessments = assessments.filter(a => a.status === 'completed').length;
  const pendingAssessments = assessments.filter(a => a.status === 'pending').length;
  
  const averageScore = assessments
    .filter(a => a.status === 'completed')
    .reduce((sum, a) => sum + a.percentage, 0) / completedAssessments || 0;
  
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
            <Typography variant="h6">
              {currentAssessment ? `Loading ${currentAssessment.title}...` : 'Loading...'}
            </Typography>
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
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Assessments
          </Typography>
          <Typography variant="h6">
            Track your progress through tests and quizzes
          </Typography>
        </Container>
      </Box>
      
      <Container maxWidth="lg">
        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <AssignmentIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h4" component="div">
                  {totalAssessments}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Total Assessments
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <PendingIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                <Typography variant="h4" component="div">
                  {pendingAssessments}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Pending
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                <Typography variant="h4" component="div">
                  {completedAssessments}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Completed
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <GradeIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                <Typography variant="h4" component="div">
                  {averageScore.toFixed(1)}%
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Average Score
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Assessments List */}
        <Card elevation={2} sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                sx={{ 
                  '& .MuiTabs-indicator': { height: 3 },
                  '& .MuiTab-root': { fontWeight: 'bold' }
                }}
              >
                <Tab 
                  label={`All Assessments (${assessments.length})`} 
                  icon={<AssignmentIcon />} 
                  iconPosition="start" 
                />
                <Tab 
                  label={`Pending (${pendingAssessments})`} 
                  icon={<PendingIcon />} 
                  iconPosition="start" 
                />
                <Tab 
                  label={`Completed (${completedAssessments})`} 
                  icon={<CheckCircleIcon />} 
                  iconPosition="start" 
                />
              </Tabs>
            </Box>
            
            {/* Search and Filter */}
            <Box sx={{ mt: 3, mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ flexGrow: 1, minWidth: '200px' }}>
                <Paper
                  elevation={1}
                  sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ p: '10px' }} aria-label="search">
                    <AssignmentIcon color="action" />
                  </Box>
                  <Box
                    component="input"
                    sx={{
                      ml: 1,
                      flex: 1,
                      border: 'none',
                      outline: 'none',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      p: '8px 0',
                    }}
                    placeholder="Search assessments by title, subject, or topic"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </Paper>
              </Box>
              
              <Box sx={{ minWidth: '150px' }}>
                <Paper
                  elevation={1}
                  sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                  }}
                >
                  <Box
                    component="select"
                    sx={{
                      ml: 1,
                      flex: 1,
                      border: 'none',
                      outline: 'none',
                      p: '10px',
                      fontSize: '0.9rem',
                      fontFamily: 'inherit',
                      bgcolor: 'transparent',
                    }}
                    value={selectedSubject}
                    onChange={handleSubjectChange}
                  >
                    <option value="all">All Subjects</option>
                    <option value="mathematics">Mathematics</option>
                    <option value="science">Science</option>
                    <option value="english">English</option>
                    <option value="history">History</option>
                    <option value="computer science">Computer Science</option>
                  </Box>
                </Paper>
              </Box>
            </Box>
            
            <Box sx={{ mt: 3 }}>
              {filteredAssessments.length > 0 ? (
                filteredAssessments.map((assessment) => (
                  <AssessmentCard 
                    key={assessment.id} 
                    assessment={assessment} 
                    onTakeAssessment={handleTakeAssessment}
                    onViewDetails={handleViewDetails}
                  />
                ))
              ) : (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <Paper elevation={1} sx={{ p: 4, borderRadius: 3, maxWidth: '500px', mx: 'auto' }}>
                    <AssignmentIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No assessments found
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {searchTerm || selectedSubject !== 'all' ?
                        'Try adjusting your search or filter criteria.' :
                        `You don't have any ${tabValue === 1 ? 'pending' : tabValue === 2 ? 'completed' : ''} assessments yet.`}
                    </Typography>
                    {(searchTerm || selectedSubject !== 'all') && (
                      <Button 
                        variant="outlined" 
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedSubject('all');
                        }}
                      >
                        Clear Filters
                      </Button>
                    )}
                  </Paper>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
        
        {/* Performance Insights */}
        <Card elevation={2} sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent>
            <Typography variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrendingUpIcon sx={{ mr: 1 }} /> Performance Insights
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            {completedAssessments > 0 ? (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Subject Performance
                  </Typography>
                  
                  <List>
                    {['Mathematics', 'Science', 'English', 'Computer Science'].map((subject, index) => {
                      // Calculate subject performance
                      const subjectAssessments = assessments.filter(
                        a => a.status === 'completed' && a.subject === subject
                      );
                      
                      if (subjectAssessments.length === 0) return null;
                      
                      const subjectAverage = subjectAssessments.reduce(
                        (sum, a) => sum + a.percentage, 0
                      ) / subjectAssessments.length;
                      
                      return (
                        <Box key={index} sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2">{subject}</Typography>
                            <Typography variant="body2">{subjectAverage.toFixed(1)}%</Typography>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={subjectAverage} 
                            sx={{ 
                              height: 8, 
                              borderRadius: 4,
                              bgcolor: 'background.paper',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: subjectAverage >= 90 
                                  ? theme.palette.success.main 
                                  : subjectAverage >= 75 
                                    ? theme.palette.info.main 
                                    : subjectAverage >= 60 
                                      ? theme.palette.warning.main 
                                      : theme.palette.error.main
                              }
                            }}
                          />
                        </Box>
                      );
                    })}
                  </List>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Recent Results
                  </Typography>
                  
                  <List>
                    {assessments
                      .filter(a => a.status === 'completed')
                      .sort((a, b) => new Date(b.completedOn) - new Date(a.completedOn))
                      .slice(0, 5)
                      .map((assessment, index) => (
                        <ListItem 
                          key={index} 
                          sx={{ px: 0, borderBottom: index < 4 ? '1px solid' : 'none', borderColor: 'divider' }}
                        >
                          <ListItemIcon>
                            <CircularProgress
                              variant="determinate"
                              value={assessment.percentage}
                              size={40}
                              thickness={5}
                              sx={{ 
                                color: assessment.percentage >= 90 
                                  ? theme.palette.success.main 
                                  : assessment.percentage >= 75 
                                    ? theme.palette.info.main 
                                    : assessment.percentage >= 60 
                                      ? theme.palette.warning.main 
                                      : theme.palette.error.main 
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText 
                            primary={assessment.title} 
                            secondary={`${assessment.subject} | ${new Date(assessment.completedOn).toLocaleDateString()}`}
                          />
                        </ListItem>
                      ))}
                  </List>
                </Grid>
              </Grid>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <BarChartIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="body1" color="text.secondary">
                  Complete assessments to see your performance insights
                </Typography>
              </Box>
            )}
            
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button 
                variant="outlined" 
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/student/performance')}
              >
                View Detailed Performance
              </Button>
            </Box>
          </CardContent>
        </Card>
        
        {/* Study Tips */}
        <Card elevation={2} sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Study Tips
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <List>
              <ListItem>
                <ListItemIcon>
                  <SchoolIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Review your completed assessments" 
                  secondary="Understanding your mistakes is key to improvement"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <TimerIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Practice time management" 
                  secondary="Allocate specific time for each question based on its marks"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CalendarTodayIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Create a study schedule" 
                  secondary="Plan your preparation for upcoming assessments"
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Assessments;
