import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  AccessTime as AccessTimeIcon,
  CalendarToday as CalendarTodayIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Help as HelpIcon,
  PlayArrow as PlayArrowIcon,
  Description as DescriptionIcon,
  Grade as GradeIcon,
  Timer as TimerIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Visibility as VisibilityIcon,
  Share as ShareIcon,
  Print as PrintIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

// Sample assessment data - in a real app, this would come from an API
const getAssessmentById = (id) => {
  const assessments = [
    {
      id: 1,
      title: 'Mathematics Mid-Term Assessment',
      subject: 'Mathematics',
      description: 'This assessment covers quadratic equations, trigonometry, and coordinate geometry.',
      class: '10th Grade',
      totalQuestions: 30,
      totalMarks: 60,
      duration: 60, // minutes
      dueDate: '2025-04-30',
      status: 'pending',
      teacher: {
        id: 1,
        name: 'Rajesh Kumar',
        image: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      sections: [
        {
          id: 1,
          title: 'Multiple Choice Questions',
          description: 'Select the correct option from the given choices.',
          questionCount: 15,
          marks: 15
        },
        {
          id: 2,
          title: 'Short Answer Questions',
          description: 'Answer the questions in brief (2-3 lines).',
          questionCount: 10,
          marks: 20
        },
        {
          id: 3,
          title: 'Long Answer Questions',
          description: 'Provide detailed answers with proper steps and explanations.',
          questionCount: 5,
          marks: 25
        }
      ],
      instructions: [
        'Read all questions carefully before answering.',
        'All questions are compulsory.',
        'Time limit is 60 minutes.',
        'You cannot return to previous questions once submitted.',
        'Calculator is allowed for this assessment.'
      ],
      attempts: {
        allowed: 1,
        completed: 0,
        remaining: 1
      }
    },
    {
      id: 2,
      title: 'Science Weekly Test',
      subject: 'Science',
      description: 'This weekly test covers chemical reactions, Newton\'s laws of motion, and human anatomy.',
      class: '9th Grade',
      totalQuestions: 20,
      totalMarks: 40,
      duration: 45, // minutes
      dueDate: '2025-04-25',
      status: 'completed',
      teacher: {
        id: 4,
        name: 'Neha Gupta',
        image: 'https://randomuser.me/api/portraits/women/68.jpg'
      },
      sections: [
        {
          id: 1,
          title: 'Multiple Choice Questions',
          description: 'Select the correct option from the given choices.',
          questionCount: 10,
          marks: 10
        },
        {
          id: 2,
          title: 'Short Answer Questions',
          description: 'Answer the questions in brief (2-3 lines).',
          questionCount: 8,
          marks: 16
        },
        {
          id: 3,
          title: 'Diagram Based Questions',
          description: 'Label the diagrams and answer the related questions.',
          questionCount: 2,
          marks: 14
        }
      ],
      instructions: [
        'Read all questions carefully before answering.',
        'All questions are compulsory.',
        'Time limit is 45 minutes.',
        'You cannot return to previous questions once submitted.',
        'No calculators allowed for this assessment.'
      ],
      attempts: {
        allowed: 2,
        completed: 1,
        remaining: 1
      },
      result: {
        score: 32,
        totalMarks: 40,
        percentage: 80,
        grade: 'A',
        submittedOn: '2025-04-20'
      }
    }
  ];
  
  return assessments.find(assessment => assessment.id === parseInt(id));
};

const AssessmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchAssessment = () => {
      setLoading(true);
      try {
        const data = getAssessmentById(id);
        if (data) {
          setAssessment(data);
        } else {
          setError('Assessment not found');
        }
      } catch (error) {
        console.error('Error fetching assessment:', error);
        setError('Failed to load assessment details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAssessment();
  }, [id]);
  
  const handleStartAssessment = () => {
    setConfirmDialogOpen(true);
  };
  
  const confirmStartAssessment = () => {
    setConfirmDialogOpen(false);
    // In a real app, this would navigate to the assessment taking page
    navigate(`/assessment/${id}/take`);
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning.main';
      case 'completed':
        return 'success.main';
      case 'missed':
        return 'error.main';
      default:
        return 'info.main';
    }
  };
  
  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'completed':
        return 'Completed';
      case 'missed':
        return 'Missed';
      default:
        return status;
    }
  };
  
  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  
  if (error || !assessment) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '80vh', justifyContent: 'center' }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error || 'Assessment not found'}
          </Alert>
          <Button 
            variant="contained" 
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          Assessment Details
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {/* Main Assessment Information */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Typography variant="h5" gutterBottom>
                  {assessment.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {assessment.subject} • {assessment.class}
                </Typography>
              </Box>
              <Chip 
                label={getStatusText(assessment.status)} 
                color={assessment.status === 'pending' ? 'warning' : assessment.status === 'completed' ? 'success' : 'error'}
                sx={{ fontWeight: 'bold' }}
              />
            </Box>
            
            <Typography variant="body1" paragraph>
              {assessment.description}
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Total Questions
                  </Typography>
                  <Typography variant="h6">
                    {assessment.totalQuestions}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Total Marks
                  </Typography>
                  <Typography variant="h6">
                    {assessment.totalMarks}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Duration
                  </Typography>
                  <Typography variant="h6">
                    {assessment.duration} min
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Due Date
                  </Typography>
                  <Typography variant="h6">
                    {new Date(assessment.dueDate).toLocaleDateString()}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
          
          {/* Assessment Sections */}
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Assessment Sections
            </Typography>
            
            {assessment.sections.map((section) => (
              <Card key={section.id} variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {section.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {section.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">
                      <strong>Questions:</strong> {section.questionCount}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Marks:</strong> {section.marks}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Paper>
          
          {/* Instructions */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Instructions
            </Typography>
            
            <List>
              {assessment.instructions.map((instruction, index) => (
                <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={instruction} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        
        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Action Card */}
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Take Assessment
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AccessTimeIcon color="action" sx={{ mr: 1 }} />
              <Typography variant="body2">
                Duration: <strong>{assessment.duration} minutes</strong>
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CalendarTodayIcon color="action" sx={{ mr: 1 }} />
              <Typography variant="body2">
                Due: <strong>{new Date(assessment.dueDate).toLocaleDateString()}</strong>
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <AssignmentIcon color="action" sx={{ mr: 1 }} />
              <Typography variant="body2">
                Attempts: <strong>{assessment.attempts.completed}/{assessment.attempts.allowed}</strong>
              </Typography>
            </Box>
            
            {assessment.status === 'pending' && assessment.attempts.remaining > 0 ? (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<PlayArrowIcon />}
                onClick={handleStartAssessment}
              >
                Start Assessment
              </Button>
            ) : assessment.status === 'completed' ? (
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                startIcon={<VisibilityIcon />}
                onClick={() => navigate(`/assessment/${id}/result`)}
              >
                View Result
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="error"
                fullWidth
                disabled
                startIcon={<CancelIcon />}
              >
                No Attempts Remaining
              </Button>
            )}
          </Paper>
          
          {/* Teacher Information */}
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Created By
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                component="img"
                src={assessment.teacher.image}
                alt={assessment.teacher.name}
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  mr: 2
                }}
              />
              <Box>
                <Typography variant="subtitle1">
                  {assessment.teacher.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Teacher
                </Typography>
              </Box>
            </Box>
          </Paper>
          
          {/* Result Card (if completed) */}
          {assessment.status === 'completed' && assessment.result && (
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Your Result
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <CircularProgress
                    variant="determinate"
                    value={assessment.result.percentage}
                    size={100}
                    thickness={5}
                    color={assessment.result.percentage >= 70 ? 'success' : assessment.result.percentage >= 40 ? 'warning' : 'error'}
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
                    <Typography variant="h5" component="div">
                      {assessment.result.percentage}%
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Grade: {assessment.result.grade}
                </Typography>
                <Typography variant="body1">
                  Score: {assessment.result.score}/{assessment.result.totalMarks}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Submitted on: {new Date(assessment.result.submittedOn).toLocaleDateString()}
                </Typography>
              </Box>
              
              <Button
                variant="outlined"
                fullWidth
                startIcon={<VisibilityIcon />}
                onClick={() => navigate(`/assessment/${id}/result`)}
              >
                View Detailed Result
              </Button>
            </Paper>
          )}
        </Grid>
      </Grid>
      
      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>Start Assessment?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to start the assessment. Once started, the timer will begin and you must complete the assessment in one session.
            <br /><br />
            <strong>Time Limit:</strong> {assessment.duration} minutes
            <br />
            <strong>Questions:</strong> {assessment.totalQuestions}
            <br />
            <strong>Attempts Remaining:</strong> {assessment.attempts.remaining}/{assessment.attempts.allowed}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmStartAssessment} variant="contained" color="primary">
            Start Now
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AssessmentDetails;
