import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button, Avatar, Divider, Tabs, Tab, Paper, Chip, LinearProgress, List, ListItem, ListItemText, ListItemIcon, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Assignment as AssignmentIcon, CheckCircle as CheckCircleIcon, Pending as PendingIcon, Timer as TimerIcon, TrendingUp as TrendingUpIcon, School as SchoolIcon, Grade as GradeIcon, BarChart as BarChartIcon, ArrowUpward as ArrowUpwardIcon, ArrowDownward as ArrowDownwardIcon, Remove as RemoveIcon, CalendarMonth as CalendarMonthIcon, Person as PersonIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';

// Sample data for child
const childData = {
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
};

// Sample assessments data
const assessmentsData = [
  {
    id: 1,
    title: 'Mathematics Mid-Term Test',
    subject: 'Mathematics',
    topic: 'Algebra and Geometry',
    date: '2025-04-02',
    totalQuestions: 30,
    score: 85,
    totalMarks: 100,
    percentage: 85,
    teacher: 'Rajesh Kumar'
  },
  {
    id: 2,
    title: 'Science Quiz - Chemical Reactions',
    subject: 'Science',
    topic: 'Chemical Reactions',
    date: '2025-03-28',
    totalQuestions: 20,
    score: 45,
    totalMarks: 50,
    percentage: 90,
    teacher: 'Neha Gupta'
  },
  {
    id: 3,
    title: 'English Grammar Test',
    subject: 'English',
    topic: 'Grammar and Punctuation',
    date: '2025-03-20',
    totalQuestions: 25,
    score: 68,
    totalMarks: 75,
    percentage: 90.67,
    teacher: 'Priya Sharma'
  },
  {
    id: 4,
    title: 'Hindi Quarterly Exam',
    subject: 'Hindi',
    topic: 'Comprehension and Grammar',
    date: '2025-03-15',
    totalQuestions: 30,
    score: 82,
    totalMarks: 100,
    percentage: 82,
    teacher: 'Amit Verma'
  },
  {
    id: 5,
    title: 'Social Studies Test - Ancient Civilizations',
    subject: 'Social Studies',
    topic: 'Ancient Civilizations',
    date: '2025-03-10',
    totalQuestions: 25,
    score: 70,
    totalMarks: 100,
    percentage: 70,
    teacher: 'Sanjay Gupta'
  },
  {
    id: 6,
    title: 'Mathematics Quiz - Fractions',
    subject: 'Mathematics',
    topic: 'Fractions and Decimals',
    date: '2025-03-05',
    totalQuestions: 15,
    score: 42,
    totalMarks: 45,
    percentage: 93.33,
    teacher: 'Rajesh Kumar'
  },
  {
    id: 7,
    title: 'Science Lab Assessment',
    subject: 'Science',
    topic: 'Lab Experiments',
    date: '2025-02-28',
    totalQuestions: 10,
    score: 38,
    totalMarks: 50,
    percentage: 76,
    teacher: 'Neha Gupta'
  }
];

// Sample attendance data
const attendanceData = [
  { month: 'January', present: 12, total: 12, percentage: 100 },
  { month: 'February', present: 10, total: 12, percentage: 83.33 },
  { month: 'March', present: 11, total: 12, percentage: 91.67 },
  { month: 'April', present: 9, total: 10, percentage: 90 }
];

// Sample subject performance data
const subjectPerformanceData = [
  { 
    subject: 'Mathematics', 
    currentScore: 89, 
    previousScore: 82, 
    trend: 'up',
    assessments: 3,
    attendance: 95
  },
  { 
    subject: 'Science', 
    currentScore: 83, 
    previousScore: 85, 
    trend: 'down',
    assessments: 2,
    attendance: 100
  },
  { 
    subject: 'English', 
    currentScore: 91, 
    previousScore: 88, 
    trend: 'up',
    assessments: 1,
    attendance: 92
  },
  { 
    subject: 'Hindi', 
    currentScore: 82, 
    previousScore: 82, 
    trend: 'stable',
    assessments: 1,
    attendance: 100
  },
  { 
    subject: 'Social Studies', 
    currentScore: 70, 
    previousScore: 65, 
    trend: 'up',
    assessments: 1,
    attendance: 83
  }
];

// Sample teacher feedback
const teacherFeedbackData = [
  {
    id: 1,
    teacher: 'Rajesh Kumar',
    subject: 'Mathematics',
    date: '2025-04-01',
    feedback: 'Aryan has shown significant improvement in algebra. He is able to solve complex equations with minimal guidance. He should focus more on geometry concepts.'
  },
  {
    id: 2,
    teacher: 'Neha Gupta',
    subject: 'Science',
    date: '2025-03-25',
    feedback: 'Aryan participates actively in class discussions and asks insightful questions. His lab work is meticulous. He needs to work on time management during tests.'
  },
  {
    id: 3,
    teacher: 'Priya Sharma',
    subject: 'English',
    date: '2025-03-18',
    feedback: 'Aryan has excellent comprehension skills and vocabulary. His writing has improved significantly. He should focus on grammar and punctuation.'
  }
];

const ChildProgress = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Calculate subject averages
  const subjectAverages = childData.subjects.map(subject => {
    const subjectAssessments = assessmentsData.filter(a => a.subject === subject);
    const average = subjectAssessments.reduce((sum, a) => sum + a.percentage, 0) / 
                   (subjectAssessments.length || 1);
    return { subject, average };
  });
  
  // Get trend icon
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <ArrowUpwardIcon fontSize="small" sx={{ color: 'success.main' }} />;
      case 'down':
        return <ArrowDownwardIcon fontSize="small" sx={{ color: 'error.main' }} />;
      default:
        return <RemoveIcon fontSize="small" sx={{ color: 'text.secondary' }} />;
    }
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              color="inherit" 
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/parent/dashboard')}
              sx={{ mr: 2 }}
            >
              Back
            </Button>
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                {childData.name}'s Progress
              </Typography>
              <Typography variant="h6">
                Class {childData.class} | {childData.school}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
      
      <Container maxWidth="lg">
        {/* Overview Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <GradeIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h4" component="div">
                  {Math.round(assessmentsData.reduce((sum, a) => sum + a.percentage, 0) / assessmentsData.length)}%
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Average Score
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <AssignmentIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                <Typography variant="h4" component="div">
                  {assessmentsData.length}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Assessments Taken
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <SchoolIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                <Typography variant="h4" component="div">
                  {Math.round(attendanceData.reduce((sum, a) => sum + a.percentage, 0) / attendanceData.length)}%
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Attendance
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <TrendingUpIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                <Typography variant="h4" component="div">
                  {childData.overallProgress}%
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Overall Progress
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Tabs Section */}
        <Card elevation={2} sx={{ borderRadius: 3, mb: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
            >
              <Tab label="Performance Overview" />
              <Tab label="Subject Analysis" />
              <Tab label="Assessments" />
              <Tab label="Attendance" />
              <Tab label="Teacher Feedback" />
            </Tabs>
          </Box>
          
          {/* Performance Overview Tab */}
          <Box hidden={tabValue !== 0} sx={{ p: 3 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Subject Performance
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {subjectAverages.map((subject, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1">{subject.subject}</Typography>
                      <Typography variant="body2">{subject.average.toFixed(1)}%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={subject.average} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        bgcolor: 'background.paper',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: subject.average >= 90 
                            ? theme.palette.success.main 
                            : subject.average >= 75 
                              ? theme.palette.info.main 
                              : subject.average >= 60 
                                ? theme.palette.warning.main 
                                : theme.palette.error.main
                        }
                      }}
                    />
                  </Box>
                ))}
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Recent Performance Trends
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <TableContainer component={Paper} elevation={0}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Subject</TableCell>
                        <TableCell align="center">Current</TableCell>
                        <TableCell align="center">Previous</TableCell>
                        <TableCell align="center">Trend</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {subjectPerformanceData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {row.subject}
                          </TableCell>
                          <TableCell align="center">{row.currentScore}%</TableCell>
                          <TableCell align="center">{row.previousScore}%</TableCell>
                          <TableCell align="center">
                            {getTrendIcon(row.trend)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Recent Assessments
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <TableContainer component={Paper} elevation={0}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Assessment</TableCell>
                        <TableCell>Subject</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell align="center">Score</TableCell>
                        <TableCell align="center">Percentage</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {assessmentsData.slice(0, 5).map((row) => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row">
                            {row.title}
                          </TableCell>
                          <TableCell>{row.subject}</TableCell>
                          <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                          <TableCell align="center">{row.score}/{row.totalMarks}</TableCell>
                          <TableCell align="center">
                            <Chip 
                              label={`${row.percentage.toFixed(1)}%`}
                              color={
                                row.percentage >= 90 ? 'success' :
                                row.percentage >= 75 ? 'info' :
                                row.percentage >= 60 ? 'warning' : 'error'
                              }
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    onClick={() => setTabValue(2)}
                  >
                    View All Assessments
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
          
          {/* Subject Analysis Tab */}
          <Box hidden={tabValue !== 1} sx={{ p: 3 }}>
            <Grid container spacing={4}>
              {subjectPerformanceData.map((subject, index) => (
                <Grid item xs={12} key={index}>
                  <Paper elevation={1} sx={{ p: 3, borderRadius: 3 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                          {subject.subject}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                            Current Score:
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {subject.currentScore}%
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                            Previous Score:
                          </Typography>
                          <Typography variant="body1">
                            {subject.previousScore}%
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                            Trend:
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {getTrendIcon(subject.trend)}
                            <Typography variant="body1" sx={{ ml: 0.5 }}>
                              {subject.trend === 'up' 
                                ? `+${subject.currentScore - subject.previousScore}%` 
                                : subject.trend === 'down' 
                                  ? `-${subject.previousScore - subject.currentScore}%`
                                  : 'No change'}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <AssignmentIcon color="primary" sx={{ mr: 1 }} />
                            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                              Assessments Taken:
                            </Typography>
                            <Typography variant="body1">
                              {subject.assessments}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <SchoolIcon color="primary" sx={{ mr: 1 }} />
                            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                              Attendance:
                            </Typography>
                            <Typography variant="body1">
                              {subject.attendance}%
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                            <CircularProgress
                              variant="determinate"
                              value={subject.currentScore}
                              size={100}
                              thickness={5}
                              sx={{ 
                                color: subject.currentScore >= 90 
                                  ? theme.palette.success.main 
                                  : subject.currentScore >= 75 
                                    ? theme.palette.info.main 
                                    : subject.currentScore >= 60 
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
                              <Typography variant="h6" component="div">
                                {subject.currentScore}%
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
          
          {/* Assessments Tab */}
          <Box hidden={tabValue !== 2} sx={{ p: 3 }}>
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Assessment</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Teacher</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="center">Score</TableCell>
                    <TableCell align="center">Percentage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assessmentsData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell>{row.subject}</TableCell>
                      <TableCell>{row.teacher}</TableCell>
                      <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                      <TableCell align="center">{row.score}/{row.totalMarks}</TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={`${row.percentage.toFixed(1)}%`}
                          color={
                            row.percentage >= 90 ? 'success' :
                            row.percentage >= 75 ? 'info' :
                            row.percentage >= 60 ? 'warning' : 'error'
                          }
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          
          {/* Attendance Tab */}
          <Box hidden={tabValue !== 3} sx={{ p: 3 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Monthly Attendance
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <TableContainer component={Paper} elevation={0}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Month</TableCell>
                        <TableCell align="center">Present</TableCell>
                        <TableCell align="center">Total</TableCell>
                        <TableCell align="center">Percentage</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {attendanceData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {row.month}
                          </TableCell>
                          <TableCell align="center">{row.present}</TableCell>
                          <TableCell align="center">{row.total}</TableCell>
                          <TableCell align="center">
                            <Chip 
                              label={`${row.percentage.toFixed(1)}%`}
                              color={
                                row.percentage >= 90 ? 'success' :
                                row.percentage >= 75 ? 'info' :
                                row.percentage >= 60 ? 'warning' : 'error'
                              }
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Attendance Overview
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
                    <CircularProgress
                      variant="determinate"
                      value={Math.round(attendanceData.reduce((sum, a) => sum + a.percentage, 0) / attendanceData.length)}
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
                        flexDirection: 'column'
                      }}
                    >
                      <Typography variant="h4" component="div">
                        {Math.round(attendanceData.reduce((sum, a) => sum + a.percentage, 0) / attendanceData.length)}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Average
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" gutterBottom>
                      Total Classes: {attendanceData.reduce((sum, a) => sum + a.total, 0)}
                    </Typography>
                    <Typography variant="body1">
                      Classes Attended: {attendanceData.reduce((sum, a) => sum + a.present, 0)}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary">
                    {Math.round(attendanceData.reduce((sum, a) => sum + a.percentage, 0) / attendanceData.length) >= 90 
                      ? 'Excellent attendance record!' 
                      : Math.round(attendanceData.reduce((sum, a) => sum + a.percentage, 0) / attendanceData.length) >= 75 
                        ? 'Good attendance record.' 
                        : 'Attendance needs improvement.'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          
          {/* Teacher Feedback Tab */}
          <Box hidden={tabValue !== 4} sx={{ p: 3 }}>
            {teacherFeedbackData.map((feedback, index) => (
              <Paper 
                key={feedback.id} 
                elevation={1} 
                sx={{ 
                  p: 3, 
                  mb: 3, 
                  borderRadius: 3,
                  borderLeft: '4px solid',
                  borderColor: 'primary.main'
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PersonIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1">
                        {feedback.teacher}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Subject: {feedback.subject}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Date: {new Date(feedback.date).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Typography variant="body1">
                      {feedback.feedback}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            ))}
            
            {teacherFeedbackData.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No teacher feedback available yet.
                </Typography>
              </Box>
            )}
          </Box>
        </Card>
        
        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Button 
            variant="outlined" 
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/parent/dashboard')}
          >
            Back to Dashboard
          </Button>
          <Button 
            variant="contained" 
            startIcon={<MessageIcon />}
            onClick={() => navigate('/parent/messages')}
          >
            Contact Teachers
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ChildProgress;

// Import the MessageIcon
const MessageIcon = () => {
  return <SchoolIcon />;
};
