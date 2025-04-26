import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Chip
} from '@mui/material';
import { 
  Assignment as AssignmentIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Check as CheckIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Sample students data
const studentsData = [
  { id: 1, name: 'Aryan Singh', grade: '8th', subject: 'Mathematics' },
  { id: 2, name: 'Ananya Sharma', grade: '9th', subject: 'Science' },
  { id: 3, name: 'Rahul Verma', grade: '7th', subject: 'Mathematics' },
  { id: 4, name: 'Priya Patel', grade: '6th', subject: 'English' },
  { id: 5, name: 'Vikram Mehta', grade: '10th', subject: 'Science' }
];

const CreateAssessment = () => {
  const navigate = useNavigate();
  
  
  // Stepper state
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Basic Details', 'Questions', 'Assign Students', 'Review'];
  
  // Form state
  const [assessmentData, setAssessmentData] = useState({
    title: '',
    subject: '',
    topic: '',
    grade: '',
    type: '',
    totalMarks: 0,
    dueDate: '',
    instructions: '',
    questions: [],
    assignedStudents: []
  });
  
  // Question form state
  const [currentQuestion, setCurrentQuestion] = useState({
    type: 'multiple_choice',
    text: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    marks: 1
  });
  
  // Dialog state
  const [questionDialogOpen, setQuestionDialogOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  
  // Handle basic details form change
  const handleBasicDetailsChange = (e) => {
    const { name, value } = e.target;
    setAssessmentData({
      ...assessmentData,
      [name]: value
    });
  };
  
  // Handle question form change
  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion({
      ...currentQuestion,
      [name]: value
    });
  };
  
  // Handle option change for multiple choice questions
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions[index] = value;
    setCurrentQuestion({
      ...currentQuestion,
      options: updatedOptions
    });
  };
  
  // Add option for multiple choice questions
  const handleAddOption = () => {
    setCurrentQuestion({
      ...currentQuestion,
      options: [...currentQuestion.options, '']
    });
  };
  
  // Remove option for multiple choice questions
  const handleRemoveOption = (index) => {
    const updatedOptions = currentQuestion.options.filter((_, i) => i !== index);
    setCurrentQuestion({
      ...currentQuestion,
      options: updatedOptions
    });
  };
  
  // Add question to assessment
  const handleAddQuestion = () => {
    // Validate question
    if (!currentQuestion.text) {
      alert('Please enter a question');
      return;
    }
    
    if (currentQuestion.type === 'multiple_choice' && !currentQuestion.correctAnswer) {
      alert('Please select a correct answer');
      return;
    }
    
    // Add question to assessment
    setAssessmentData({
      ...assessmentData,
      questions: [...assessmentData.questions, { ...currentQuestion, id: Date.now() }]
    });
    
    // Reset current question
    setCurrentQuestion({
      type: 'multiple_choice',
      text: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      marks: 1
    });
    
    // Close dialog
    setQuestionDialogOpen(false);
  };
  
  // Edit question
  const handleEditQuestion = (questionId) => {
    const questionToEdit = assessmentData.questions.find(q => q.id === questionId);
    setCurrentQuestion(questionToEdit);
    setQuestionDialogOpen(true);
  };
  
  // Delete question
  const handleDeleteQuestion = (questionId) => {
    setAssessmentData({
      ...assessmentData,
      questions: assessmentData.questions.filter(q => q.id !== questionId)
    });
  };
  
  // Toggle student selection
  const handleStudentToggle = (studentId) => {
    const currentIndex = assessmentData.assignedStudents.indexOf(studentId);
    const newAssignedStudents = [...assessmentData.assignedStudents];
    
    if (currentIndex === -1) {
      newAssignedStudents.push(studentId);
    } else {
      newAssignedStudents.splice(currentIndex, 1);
    }
    
    setAssessmentData({
      ...assessmentData,
      assignedStudents: newAssignedStudents
    });
  };
  
  // Handle next step
  const handleNext = () => {
    // Validate current step
    if (activeStep === 0) {
      // Validate basic details
      if (!assessmentData.title || !assessmentData.subject || !assessmentData.grade || !assessmentData.type || !assessmentData.dueDate) {
        alert('Please fill in all required fields');
        return;
      }
    } else if (activeStep === 1) {
      // Validate questions
      if (assessmentData.questions.length === 0) {
        alert('Please add at least one question');
        return;
      }
    } else if (activeStep === 2) {
      // Validate assigned students
      if (assessmentData.assignedStudents.length === 0) {
        alert('Please assign at least one student');
        return;
      }
    }
    
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  // Handle back step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  // Handle save as draft
  const handleSaveAsDraft = () => {
    console.log('Saving assessment as draft:', assessmentData);
    alert('Assessment saved as draft');
    navigate('/teacher/assessments');
  };
  
  // Handle publish assessment
  const handlePublishAssessment = () => {
    console.log('Publishing assessment:', assessmentData);
    alert('Assessment published successfully');
    navigate('/teacher/assessments');
  };
  
  // Calculate total marks
  const calculateTotalMarks = () => {
    return assessmentData.questions.reduce((total, question) => total + Number(question.marks), 0);
  };
  
  // Render step content
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Basic Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  name="title"
                  label="Assessment Title"
                  fullWidth
                  value={assessmentData.title}
                  onChange={handleBasicDetailsChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Subject</InputLabel>
                  <Select
                    name="subject"
                    value={assessmentData.subject}
                    onChange={handleBasicDetailsChange}
                    label="Subject"
                  >
                    <MenuItem value="Mathematics">Mathematics</MenuItem>
                    <MenuItem value="Science">Science</MenuItem>
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Social Studies">Social Studies</MenuItem>
                    <MenuItem value="Hindi">Hindi</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="topic"
                  label="Topic"
                  fullWidth
                  value={assessmentData.topic}
                  onChange={handleBasicDetailsChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Grade</InputLabel>
                  <Select
                    name="grade"
                    value={assessmentData.grade}
                    onChange={handleBasicDetailsChange}
                    label="Grade"
                  >
                    <MenuItem value="1st">1st Grade</MenuItem>
                    <MenuItem value="2nd">2nd Grade</MenuItem>
                    <MenuItem value="3rd">3rd Grade</MenuItem>
                    <MenuItem value="4th">4th Grade</MenuItem>
                    <MenuItem value="5th">5th Grade</MenuItem>
                    <MenuItem value="6th">6th Grade</MenuItem>
                    <MenuItem value="7th">7th Grade</MenuItem>
                    <MenuItem value="8th">8th Grade</MenuItem>
                    <MenuItem value="9th">9th Grade</MenuItem>
                    <MenuItem value="10th">10th Grade</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Assessment Type</InputLabel>
                  <Select
                    name="type"
                    value={assessmentData.type}
                    onChange={handleBasicDetailsChange}
                    label="Assessment Type"
                  >
                    <MenuItem value="Quiz">Quiz</MenuItem>
                    <MenuItem value="Test">Test</MenuItem>
                    <MenuItem value="Assignment">Assignment</MenuItem>
                    <MenuItem value="Project">Project</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="dueDate"
                  label="Due Date"
                  type="date"
                  fullWidth
                  value={assessmentData.dueDate}
                  onChange={handleBasicDetailsChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="instructions"
                  label="Instructions"
                  multiline
                  rows={4}
                  fullWidth
                  value={assessmentData.instructions}
                  onChange={handleBasicDetailsChange}
                  placeholder="Enter instructions for students..."
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">
                Questions
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={() => setQuestionDialogOpen(true)}
              >
                Add Question
              </Button>
            </Box>
            
            {assessmentData.questions.length > 0 ? (
              <Box>
                <List>
                  {assessmentData.questions.map((question, index) => (
                    <Paper 
                      key={question.id} 
                      elevation={1} 
                      sx={{ mb: 2, p: 2, borderRadius: 2 }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                            Q{index + 1}: {question.text}
                          </Typography>
                          <Chip 
                            label={question.type === 'multiple_choice' ? 'Multiple Choice' : 'Subjective'} 
                            size="small" 
                            sx={{ mt: 1, mr: 1 }}
                          />
                          <Chip 
                            label={`${question.marks} mark${question.marks > 1 ? 's' : ''}`} 
                            size="small" 
                            sx={{ mt: 1 }}
                          />
                        </Box>
                        <Box>
                          <IconButton 
                            size="small" 
                            color="primary" 
                            onClick={() => handleEditQuestion(question.id)}
                          >
                            <AssignmentIcon />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="error" 
                            onClick={() => handleDeleteQuestion(question.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      
                      {question.type === 'multiple_choice' && (
                        <Box sx={{ mt: 2 }}>
                          <List dense>
                            {question.options.map((option, optIndex) => (
                              <ListItem key={optIndex}>
                                <ListItemText 
                                  primary={
                                    <Typography 
                                      variant="body2" 
                                      sx={{ 
                                        color: option === question.correctAnswer ? 'success.main' : 'text.primary',
                                        fontWeight: option === question.correctAnswer ? 'bold' : 'normal'
                                      }}
                                    >
                                      {String.fromCharCode(65 + optIndex)}. {option}
                                      {option === question.correctAnswer && ' (Correct)'}
                                    </Typography>
                                  } 
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      )}
                    </Paper>
                  ))}
                </List>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1">
                    Total Marks: {calculateTotalMarks()}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 6, bgcolor: 'background.paper', borderRadius: 2 }}>
                <AssignmentIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No questions added yet
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Click the "Add Question" button to add questions to your assessment.
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  onClick={() => setQuestionDialogOpen(true)}
                >
                  Add Question
                </Button>
              </Box>
            )}
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Assign Students
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Select the students who should take this assessment.
            </Typography>
            
            <List>
              {studentsData.filter(student => 
                (!assessmentData.subject || student.subject === assessmentData.subject) &&
                (!assessmentData.grade || student.grade === assessmentData.grade)
              ).map((student) => (
                <Paper 
                  key={student.id} 
                  elevation={1} 
                  sx={{ 
                    mb: 2, 
                    p: 1, 
                    borderRadius: 2,
                    bgcolor: assessmentData.assignedStudents.includes(student.id) ? 'primary.light' : 'background.paper'
                  }}
                >
                  <ListItem>
                    <Checkbox
                      edge="start"
                      checked={assessmentData.assignedStudents.includes(student.id)}
                      onChange={() => handleStudentToggle(student.id)}
                    />
                    <ListItemText 
                      primary={student.name} 
                      secondary={`${student.grade} Grade - ${student.subject}`} 
                    />
                  </ListItem>
                </Paper>
              ))}
            </List>
            
            {studentsData.filter(student => 
              (!assessmentData.subject || student.subject === assessmentData.subject) &&
              (!assessmentData.grade || student.grade === assessmentData.grade)
            ).length === 0 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No students found matching the selected subject and grade.
                </Typography>
              </Box>
            )}
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">
                Selected Students: {assessmentData.assignedStudents.length}
              </Typography>
            </Box>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review Assessment
            </Typography>
            
            <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                Basic Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Title:</strong> {assessmentData.title}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Subject:</strong> {assessmentData.subject}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Topic:</strong> {assessmentData.topic || 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Grade:</strong> {assessmentData.grade}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Type:</strong> {assessmentData.type}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Due Date:</strong> {new Date(assessmentData.dueDate).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Instructions:</strong> {assessmentData.instructions || 'N/A'}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            
            <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                Questions ({assessmentData.questions.length})
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Marks: {calculateTotalMarks()}
              </Typography>
            </Paper>
            
            <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                Assigned Students ({assessmentData.assignedStudents.length})
              </Typography>
              <Grid container spacing={1}>
                {assessmentData.assignedStudents.map((studentId) => {
                  const student = studentsData.find(s => s.id === studentId);
                  return (
                    <Grid item key={studentId}>
                      <Chip 
                        icon={<PersonIcon />}
                        label={student ? student.name : `Student ${studentId}`} 
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Paper>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button 
                variant="outlined" 
                startIcon={<SaveIcon />}
                onClick={() => setSaveDialogOpen(true)}
              >
                Save as Draft
              </Button>
              <Button 
                variant="contained" 
                startIcon={<CheckIcon />}
                onClick={handlePublishAssessment}
              >
                Publish Assessment
              </Button>
            </Box>
          </Box>
        );
      default:
        return 'Unknown step';
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
              onClick={() => navigate('/teacher/assessments')}
              sx={{ mr: 2 }}
            >
              Back
            </Button>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              Create Assessment
            </Typography>
          </Box>
        </Container>
      </Box>
      
      <Container maxWidth="lg">
        <Card elevation={2} sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            
            <Box sx={{ mt: 4, mb: 2 }}>
              {getStepContent(activeStep)}
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<ArrowBackIcon />}
              >
                Back
              </Button>
              <Box>
                <Button 
                  variant="outlined" 
                  onClick={handleSaveAsDraft} 
                  sx={{ mr: 1 }}
                >
                  Save as Draft
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button 
                    variant="contained" 
                    onClick={handlePublishAssessment}
                    startIcon={<CheckIcon />}
                  >
                    Publish
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
          </CardContent>
        </Card>
      </Container>
      
      {/* Add Question Dialog */}
      <Dialog 
        open={questionDialogOpen} 
        onClose={() => setQuestionDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {currentQuestion.id ? 'Edit Question' : 'Add Question'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  name="type"
                  value={currentQuestion.type}
                  onChange={handleQuestionChange}
                >
                  <FormControlLabel 
                    value="multiple_choice" 
                    control={<Radio />} 
                    label="Multiple Choice" 
                  />
                  <FormControlLabel 
                    value="subjective" 
                    control={<Radio />} 
                    label="Subjective" 
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="text"
                label="Question"
                multiline
                rows={2}
                fullWidth
                value={currentQuestion.text}
                onChange={handleQuestionChange}
              />
            </Grid>
            
            {currentQuestion.type === 'multiple_choice' && (
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Options
                </Typography>
                {currentQuestion.options.map((option, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Radio
                      checked={currentQuestion.correctAnswer === option}
                      onChange={() => setCurrentQuestion({ ...currentQuestion, correctAnswer: option })}
                      disabled={!option}
                    />
                    <TextField
                      fullWidth
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleRemoveOption(index)}
                      disabled={currentQuestion.options.length <= 2}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button 
                  startIcon={<AddIcon />} 
                  onClick={handleAddOption}
                  disabled={currentQuestion.options.length >= 6}
                  sx={{ mt: 1 }}
                >
                  Add Option
                </Button>
              </Grid>
            )}
            
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="marks"
                label="Marks"
                type="number"
                fullWidth
                value={currentQuestion.marks}
                onChange={handleQuestionChange}
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setQuestionDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleAddQuestion} 
            variant="contained"
          >
            {currentQuestion.id ? 'Update Question' : 'Add Question'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Save as Draft Confirmation Dialog */}
      <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)}>
        <DialogTitle>Save as Draft</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to save this assessment as a draft?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            You can continue editing it later from the Assessments page.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSaveAsDraft} 
            variant="contained"
          >
            Save as Draft
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateAssessment;
