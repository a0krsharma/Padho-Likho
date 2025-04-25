import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  useTheme
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Save as SaveIcon,
  Check as CheckIcon,
  Warning as WarningIcon,
  Timer as TimerIcon,
  Flag as FlagIcon,
  Help as HelpIcon,
  Close as CloseIcon,
  Info as InfoIcon,
  Send as SendIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

// Import custom components
import Assessment from '../../components/common/Assessment';
import ContentCard from '../../components/common/ContentCard';
import Breadcrumbs from '../../components/common/Breadcrumbs';

// Sample assessment data with questions - in a real app, this would come from an API
const getAssessmentWithQuestions = (id) => {
  const assessments = [
    {
      id: 1,
      title: 'Mathematics Mid-Term Assessment',
      subject: 'Mathematics',
      totalQuestions: 10, // Reduced for demo
      totalMarks: 20,
      duration: 60, // minutes
      sections: [
        {
          id: 1,
          title: 'Multiple Choice Questions',
          description: 'Select the correct option from the given choices.',
          questions: [
            {
              id: 1,
              text: 'If f(x) = x² + 3x + 2, then f(2) is equal to:',
              type: 'mcq',
              options: [
                { id: 'a', text: '8' },
                { id: 'b', text: '10' },
                { id: 'c', text: '12' },
                { id: 'd', text: '14' }
              ],
              marks: 1
            },
            {
              id: 2,
              text: 'The solution of the quadratic equation x² - 5x + 6 = 0 is:',
              type: 'mcq',
              options: [
                { id: 'a', text: 'x = 2, x = 3' },
                { id: 'b', text: 'x = -2, x = -3' },
                { id: 'c', text: 'x = 2, x = -3' },
                { id: 'd', text: 'x = -2, x = 3' }
              ],
              marks: 1
            },
            {
              id: 3,
              text: 'The value of sin²θ + cos²θ is:',
              type: 'mcq',
              options: [
                { id: 'a', text: '0' },
                { id: 'b', text: '1' },
                { id: 'c', text: '2' },
                { id: 'd', text: 'Depends on the value of θ' }
              ],
              marks: 1
            },
            {
              id: 4,
              text: 'If the radius of a circle is doubled, its area becomes:',
              type: 'mcq',
              options: [
                { id: 'a', text: 'Doubled' },
                { id: 'b', text: 'Tripled' },
                { id: 'c', text: 'Quadrupled' },
                { id: 'd', text: 'Unchanged' }
              ],
              marks: 1
            }
          ]
        },
        {
          id: 2,
          title: 'Short Answer Questions',
          description: 'Answer the questions in brief (2-3 lines).',
          questions: [
            {
              id: 5,
              text: 'Explain the difference between permutation and combination with an example.',
              type: 'short_answer',
              marks: 2
            },
            {
              id: 6,
              text: 'Find the derivative of f(x) = x³ - 4x² + 7x - 2.',
              type: 'short_answer',
              marks: 2
            },
            {
              id: 7,
              text: 'What is the relationship between the sides of a right-angled triangle according to the Pythagorean theorem?',
              type: 'short_answer',
              marks: 2
            }
          ]
        },
        {
          id: 3,
          title: 'Long Answer Questions',
          description: 'Provide detailed answers with proper steps and explanations.',
          questions: [
            {
              id: 8,
              text: 'Solve the following system of linear equations using the elimination method:\n3x + 2y = 7\n2x - 3y = -4',
              type: 'long_answer',
              marks: 3
            },
            {
              id: 9,
              text: 'A box contains 5 red balls, 3 green balls, and 2 blue balls. If two balls are drawn at random without replacement, find the probability of getting:\na) 2 red balls\nb) 1 red ball and 1 green ball\nc) No blue balls',
              type: 'long_answer',
              marks: 4
            },
            {
              id: 10,
              text: 'Prove that the sum of the interior angles of a polygon with n sides is (n-2) × 180 degrees.',
              type: 'long_answer',
              marks: 4
            }
          ]
        }
      ],
      instructions: [
        'Read all questions carefully before answering.',
        'All questions are compulsory.',
        'Time limit is 60 minutes.',
        'You cannot return to previous questions once submitted.',
        'Calculator is allowed for this assessment.'
      ]
    }
  ];
  
  return assessments.find(assessment => assessment.id === parseInt(id));
};

const TakeAssessment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const theme = useTheme();
  
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [confirmLeaveDialogOpen, setConfirmLeaveDialogOpen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isTimerWarning, setIsTimerWarning] = useState(false);
  
  // Timer ref for cleanup
  const timerRef = useRef(null);
  
  // Calculate progress
  const progress = useMemo(() => {
    if (!assessment) return 0;
    
    const totalQuestions = assessment.sections.reduce(
      (total, section) => total + section.questions.length, 
      0
    );
    
    const answeredQuestions = Object.keys(answers).length;
    return Math.floor((answeredQuestions / totalQuestions) * 100);
  }, [assessment, answers]);
  
  // Format time left
  const formatTimeLeft = (seconds) => {
    if (seconds === null) return '--:--';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours > 0 ? `${hours}:` : ''}${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Get all questions in a flat array
  const getAllQuestions = () => {
    if (!assessment) return [];
    
    return assessment.sections.reduce((allQuestions, section) => {
      return [...allQuestions, ...section.questions];
    }, []);
  };
  
  // Get current question
  const getCurrentQuestion = () => {
    const allQuestions = getAllQuestions();
    return allQuestions[activeStep] || null;
  };
  
  // Load assessment data
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchAssessment = async () => {
      try {
        const data = getAssessmentWithQuestions(id);
        if (data) {
          setAssessment(data);
          // Set initial timer
          setTimeLeft(data.duration * 60);
        } else {
          // Handle not found
          navigate('/not-found');
        }
      } catch (error) {
        console.error('Error fetching assessment:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAssessment();
    
    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [id, navigate]);
  
  // Timer effect
  useEffect(() => {
    if (timeLeft === null || submitted) return;
    
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          // Auto-submit when time is up
          clearInterval(timerRef.current);
          handleSubmitAssessment();
          return 0;
        }
        
        // Set warning when less than 5 minutes left
        if (prevTime <= 300 && !isTimerWarning) {
          setIsTimerWarning(true);
        }
        
        return prevTime - 1;
      });
    }, 1000);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timeLeft, submitted, isTimerWarning]);
  
  // Handle navigation
  const handleNext = () => {
    const allQuestions = getAllQuestions();
    if (activeStep < allQuestions.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };
  
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };
  
  // Handle answer change
  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value
    }));
  };
  
  // Toggle flagged question
  const handleToggleFlag = (questionId) => {
    setFlaggedQuestions((prevFlagged) => {
      if (prevFlagged.includes(questionId)) {
        return prevFlagged.filter(id => id !== questionId);
      } else {
        return [...prevFlagged, questionId];
      }
    });
  };
  
  // Submit assessment
  const handleSubmitAssessment = () => {
    // In a real app, this would be an API call
    setSubmitted(true);
    
    // Calculate mock score
    const allQuestions = getAllQuestions();
    const totalMarks = allQuestions.reduce((total, q) => total + q.marks, 0);
    
    // Simulate scoring (random for demo)
    const earnedMarks = Math.floor(Math.random() * (totalMarks * 0.7)) + Math.floor(totalMarks * 0.3);
    const percentage = Math.round((earnedMarks / totalMarks) * 100);
    
    setScore({
      earnedMarks,
      totalMarks,
      percentage
    });
    
    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };
  
  // Render question navigation
  const renderQuestionNavigation = () => {
    const allQuestions = getAllQuestions();
    
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
        {allQuestions.map((question, index) => {
          const isAnswered = answers[question.id] !== undefined;
          const isFlagged = flaggedQuestions.includes(question.id);
          const isActive = index === activeStep;
          
          return (
            <Tooltip 
              key={question.id} 
              title={`Question ${index + 1}${isFlagged ? ' (Flagged)' : ''}${isAnswered ? ' (Answered)' : ''}`}
            >
              <Button
                variant={isActive ? "contained" : "outlined"}
                color={isFlagged ? "warning" : isAnswered ? "success" : "primary"}
                size="small"
                onClick={() => setActiveStep(index)}
                sx={{ 
                  minWidth: '36px', 
                  height: '36px',
                  p: 0,
                  borderRadius: '50%'
                }}
              >
                {index + 1}
              </Button>
            </Tooltip>
          );
        })}
      </Box>
    );
  };
  
  // Render instructions
  const renderInstructions = () => {
    if (!assessment) return null;
    
    return (
      <Dialog
        open={showInstructions}
        onClose={() => setShowInstructions(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            {assessment.title} - Instructions
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" gutterBottom>
            Subject: {assessment.subject}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Duration: {assessment.duration} minutes
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Total Marks: {assessment.totalMarks}
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="h6" gutterBottom>
            Please read the following instructions carefully:
          </Typography>
          
          <List>
            {assessment.instructions.map((instruction, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <InfoIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={instruction} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="contained" 
            onClick={() => setShowInstructions(false)}
            startIcon={<CheckIcon />}
          >
            I understand, begin assessment
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  // Render timer
  const renderTimer = () => {
    const formattedTime = formatTimeLeft(timeLeft);
    
    return (
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        p: 1,
        borderRadius: 2,
        bgcolor: isTimerWarning ? 'error.lighter' : 'background.paper',
        border: '1px solid',
        borderColor: isTimerWarning ? 'error.main' : 'divider'
      }}>
        <TimerIcon color={isTimerWarning ? "error" : "primary"} sx={{ mr: 1 }} />
        <Typography 
          variant="h6" 
          component="div" 
          color={isTimerWarning ? "error" : "text.primary"}
          sx={{ fontWeight: 'medium', fontFamily: 'monospace' }}
        >
          {formattedTime}
        </Typography>
      </Box>
    );
  };
  
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', flexDirection: 'column' }}>
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading assessment...
          </Typography>
        </Box>
      </Container>
    );
  }
  
  if (submitted) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <ContentCard
          title="Assessment Completed"
          icon={<CheckIcon />}
        >
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <CheckIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Thank you for completing the assessment!
            </Typography>
            <Typography variant="body1" paragraph>
              Your responses have been submitted successfully.
            </Typography>
            
            {score && (
              <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: 'auto', mt: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Your Score
                </Typography>
                <Typography variant="h3" color="primary" gutterBottom>
                  {score.percentage}%
                </Typography>
                <Typography variant="body1">
                  {score.earnedMarks} out of {score.totalMarks} marks
                </Typography>
              </Paper>
            )}
            
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(-1)}
                startIcon={<ArrowBackIcon />}
                sx={{ mr: 2 }}
              >
                Back to Dashboard
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate(`/assessment/${id}/review`)}
                startIcon={<InfoIcon />}
              >
                Review Answers
              </Button>
            </Box>
          </Box>
        </ContentCard>
      </Container>
    );
  }
  
  if (!assessment) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Assessment not found</Alert>
      </Container>
    );
  }
  
  const currentQuestion = getCurrentQuestion();
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Dashboard', link: `/${currentUser?.role || 'student'}` },
          { label: 'Assessments', link: `/${currentUser?.role || 'student'}/assessments` },
          { label: assessment.title, link: '#' }
        ]}
        sx={{ mb: 3 }}
      />
      
      {/* Instructions Dialog */}
      {renderInstructions()}
      
      {/* Confirm Leave Dialog */}
      <Dialog
        open={confirmLeaveDialogOpen}
        onClose={() => setConfirmLeaveDialogOpen(false)}
      >
        <DialogTitle>Leave Assessment?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to leave? Your progress will not be saved, and you'll need to start over.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmLeaveDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={() => navigate(-1)} 
            color="error"
          >
            Leave
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Submit Dialog */}
      <Dialog
        open={submitDialogOpen}
        onClose={() => setSubmitDialogOpen(false)}
      >
        <DialogTitle>Submit Assessment?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to submit your assessment? You won't be able to make changes after submission.
          </DialogContentText>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Assessment Progress:
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ height: 10, borderRadius: 5, mb: 1 }}
            />
            <Typography variant="body2" color={progress < 100 ? "warning.main" : "success.main"}>
              {progress}% Complete ({Object.keys(answers).length} of {getAllQuestions().length} questions answered)
            </Typography>
            
            {flaggedQuestions.length > 0 && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                You have {flaggedQuestions.length} flagged question(s) that you marked for review.
              </Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSubmitDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmitAssessment} 
            variant="contained" 
            color="primary"
            startIcon={<SendIcon />}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Assessment Header */}
      <Paper 
        elevation={2} 
        sx={{ 
          p: 2, 
          mb: 3, 
          borderRadius: 2,
          background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          color: 'white'
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
              {assessment.title}
            </Typography>
            <Typography variant="subtitle1">
              {assessment.subject} • {assessment.totalMarks} Marks
            </Typography>
          </Grid>
          <Grid item xs={6} md={3} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            {renderTimer()}
          </Grid>
          <Grid item xs={6} md={3} sx={{ textAlign: 'right' }}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              <Tooltip title="View Instructions">
                <IconButton 
                  color="inherit" 
                  onClick={() => setShowInstructions(true)}
                  sx={{ mr: 1, bgcolor: 'rgba(255,255,255,0.1)' }}
                >
                  <HelpIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Exit Assessment">
                <IconButton 
                  color="inherit" 
                  onClick={() => setConfirmLeaveDialogOpen(true)}
                  sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
        
        {/* Progress bar */}
        <Box sx={{ mt: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              bgcolor: 'rgba(255,255,255,0.3)',
              '& .MuiLinearProgress-bar': {
                bgcolor: 'white'
              }
            }}
          />
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)', mt: 0.5, display: 'block' }}>
            {progress}% Complete • Question {activeStep + 1} of {getAllQuestions().length}
          </Typography>
        </Box>
      </Paper>
      
      <Grid container spacing={3}>
        {/* Main Content - Questions */}
        <Grid item xs={12} md={8}>
          <ContentCard>
            {currentQuestion && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Question {activeStep + 1} • {currentQuestion.marks} {currentQuestion.marks > 1 ? 'marks' : 'mark'}
                  </Typography>
                  <Tooltip title={flaggedQuestions.includes(currentQuestion.id) ? "Remove flag" : "Flag for review"}>
                    <IconButton 
                      color={flaggedQuestions.includes(currentQuestion.id) ? "warning" : "default"}
                      onClick={() => handleToggleFlag(currentQuestion.id)}
                      size="small"
                    >
                      {flaggedQuestions.includes(currentQuestion.id) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                  </Tooltip>
                </Box>
                
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                  {currentQuestion.text}
                </Typography>
                
                <Box sx={{ mt: 3 }}>
                  {currentQuestion.type === 'mcq' && (
                    <FormControl component="fieldset" fullWidth>
                      <RadioGroup
                        value={answers[currentQuestion.id] || ''}
                        onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                      >
                        {currentQuestion.options.map((option) => (
                          <FormControlLabel
                            key={option.id}
                            value={option.id}
                            control={<Radio />}
                            label={option.text}
                            sx={{ 
                              mb: 1,
                              p: 1,
                              borderRadius: 1,
                              '&:hover': { bgcolor: 'action.hover' }
                            }}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  )}
                  
                  {(currentQuestion.type === 'short_answer' || currentQuestion.type === 'long_answer') && (
                    <TextField
                      fullWidth
                      multiline
                      rows={currentQuestion.type === 'short_answer' ? 3 : 6}
                      placeholder={`Type your answer here...`}
                      value={answers[currentQuestion.id] || ''}
                      onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                      variant="outlined"
                    />
                  )}
                </Box>
              </Box>
            )}
            
            {/* Navigation Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                startIcon={<ArrowBackIcon />}
              >
                Previous
              </Button>
              
              <Box>
                {activeStep === getAllQuestions().length - 1 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setSubmitDialogOpen(true)}
                    startIcon={<SendIcon />}
                  >
                    Submit Assessment
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    endIcon={<ArrowForwardIcon />}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </ContentCard>
        </Grid>
        
        {/* Sidebar - Question Navigation */}
        <Grid item xs={12} md={4}>
          <ContentCard
            title="Question Navigator"
            subtitle={`${Object.keys(answers).length} of ${getAllQuestions().length} answered`}
          >
            {renderQuestionNavigation()}
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Legend:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ 
                      width: 16, 
                      height: 16, 
                      borderRadius: '50%', 
                      bgcolor: theme.palette.primary.main,
                      mr: 1 
                    }} />
                    <Typography variant="body2">Current</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ 
                      width: 16, 
                      height: 16, 
                      borderRadius: '50%', 
                      bgcolor: theme.palette.success.main,
                      mr: 1 
                    }} />
                    <Typography variant="body2">Answered</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ 
                      width: 16, 
                      height: 16, 
                      borderRadius: '50%', 
                      bgcolor: theme.palette.warning.main,
                      mr: 1 
                    }} />
                    <Typography variant="body2">Flagged</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ 
                      width: 16, 
                      height: 16, 
                      borderRadius: '50%', 
                      border: `1px solid ${theme.palette.divider}`,
                      mr: 1 
                    }} />
                    <Typography variant="body2">Unanswered</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setSubmitDialogOpen(true)}
                startIcon={<SendIcon />}
                size="large"
              >
                Submit Assessment
              </Button>
              
              {flaggedQuestions.length > 0 && (
                <Typography variant="body2" color="warning.main" sx={{ mt: 2 }}>
                  You have {flaggedQuestions.length} flagged question(s)
                </Typography>
              )}
            </Box>
          </ContentCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TakeAssessment;
