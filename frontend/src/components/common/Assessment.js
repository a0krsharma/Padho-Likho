import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  TextField,
  Divider,
  CircularProgress,
  Alert,
  useTheme
} from '@mui/material';
import {
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
  Check as CheckIcon,
  Save as SaveIcon,
  Timer as TimerIcon
} from '@mui/icons-material';

/**
 * A reusable assessment component for both creating and taking assessments
 * 
 * @param {Object} props - Component props
 * @param {Object} props.assessment - Assessment data
 * @param {boolean} props.editable - Whether assessment is editable (create/edit mode)
 * @param {function} props.onSubmit - Callback when assessment is submitted
 * @param {function} props.onChange - Callback when assessment is changed
 * @param {boolean} props.loading - Whether assessment is loading
 * @param {boolean} props.submitted - Whether assessment has been submitted
 * @param {Object} props.result - Assessment result object
 * @param {Object} props.sx - Additional styles to apply
 */
const Assessment = ({
  assessment = {
    title: '',
    description: '',
    timeLimit: 0,
    questions: []
  },
  editable = false,
  onSubmit,
  onChange,
  loading = false,
  submitted = false,
  result = null,
  sx = {}
}) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(assessment.timeLimit * 60 || 0);
  const [timer, setTimer] = useState(null);
  
  // Start timer when assessment is loaded
  React.useEffect(() => {
    if (!editable && assessment.timeLimit && !timer && !submitted) {
      const newTimer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(newTimer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      setTimer(newTimer);
      
      return () => clearInterval(newTimer);
    }
  }, [assessment, editable, submitted]);
  
  // Format time remaining
  const formatTimeRemaining = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Handle next step
  const handleNext = () => {
    setActiveStep(prevStep => prevStep + 1);
  };
  
  // Handle previous step
  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };
  
  // Handle answer change
  const handleAnswerChange = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
  };
  
  // Handle assessment submit
  const handleSubmit = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    
    if (onSubmit) {
      onSubmit(answers);
    }
  };
  
  // Handle assessment change in edit mode
  const handleAssessmentChange = (field, value) => {
    if (onChange) {
      onChange({
        ...assessment,
        [field]: value
      });
    }
  };
  
  // Handle question change in edit mode
  const handleQuestionChange = (index, field, value) => {
    if (onChange) {
      const newQuestions = [...assessment.questions];
      newQuestions[index] = {
        ...newQuestions[index],
        [field]: value
      };
      
      onChange({
        ...assessment,
        questions: newQuestions
      });
    }
  };
  
  // Handle option change in edit mode
  const handleOptionChange = (questionIndex, optionIndex, value) => {
    if (onChange) {
      const newQuestions = [...assessment.questions];
      const newOptions = [...newQuestions[questionIndex].options];
      newOptions[optionIndex] = value;
      
      newQuestions[questionIndex] = {
        ...newQuestions[questionIndex],
        options: newOptions
      };
      
      onChange({
        ...assessment,
        questions: newQuestions
      });
    }
  };
  
  // Handle correct answer change in edit mode
  const handleCorrectAnswerChange = (questionIndex, value) => {
    if (onChange) {
      const newQuestions = [...assessment.questions];
      newQuestions[questionIndex] = {
        ...newQuestions[questionIndex],
        correctAnswer: value
      };
      
      onChange({
        ...assessment,
        questions: newQuestions
      });
    }
  };
  
  // Add new question in edit mode
  const handleAddQuestion = () => {
    if (onChange) {
      const newQuestions = [...assessment.questions];
      newQuestions.push({
        id: `question-${Date.now()}`,
        text: '',
        type: 'multiple-choice',
        options: ['', '', '', ''],
        correctAnswer: '',
        points: 1
      });
      
      onChange({
        ...assessment,
        questions: newQuestions
      });
    }
  };
  
  // Remove question in edit mode
  const handleRemoveQuestion = (index) => {
    if (onChange) {
      const newQuestions = [...assessment.questions];
      newQuestions.splice(index, 1);
      
      onChange({
        ...assessment,
        questions: newQuestions
      });
    }
  };
  
  // Render question for taking assessment
  const renderQuestion = (question, index) => {
    const { id, text, type, options = [] } = question;
    
    return (
      <Box key={id || index} sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Question {index + 1}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {text}
        </Typography>
        
        {type === 'multiple-choice' && (
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <RadioGroup
              value={answers[id] || ''}
              onChange={(e) => handleAnswerChange(id, e.target.value)}
            >
              {options.map((option, optIndex) => (
                <FormControlLabel
                  key={optIndex}
                  value={option}
                  control={<Radio />}
                  label={option}
                  disabled={submitted}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
        
        {type === 'multiple-answer' && (
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            {options.map((option, optIndex) => (
              <FormControlLabel
                key={optIndex}
                control={
                  <Checkbox
                    checked={Array.isArray(answers[id]) && answers[id].includes(option)}
                    onChange={(e) => {
                      const currentAnswers = Array.isArray(answers[id]) ? [...answers[id]] : [];
                      if (e.target.checked) {
                        handleAnswerChange(id, [...currentAnswers, option]);
                      } else {
                        handleAnswerChange(
                          id,
                          currentAnswers.filter(a => a !== option)
                        );
                      }
                    }}
                    disabled={submitted}
                  />
                }
                label={option}
              />
            ))}
          </FormControl>
        )}
        
        {type === 'short-answer' && (
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Your answer"
            value={answers[id] || ''}
            onChange={(e) => handleAnswerChange(id, e.target.value)}
            disabled={submitted}
            sx={{ mt: 2 }}
          />
        )}
        
        {submitted && result && result.answers && result.answers[id] && (
          <Box sx={{ mt: 2 }}>
            <Alert 
              severity={result.answers[id].correct ? 'success' : 'error'}
              sx={{ mb: 1 }}
            >
              {result.answers[id].correct ? 'Correct!' : 'Incorrect'}
              {result.answers[id].points !== undefined && (
                <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                  ({result.answers[id].points} points)
                </Typography>
              )}
            </Alert>
            
            {!result.answers[id].correct && (
              <Typography variant="body2" color="text.secondary">
                Correct answer: {result.answers[id].correctAnswer}
              </Typography>
            )}
            
            {result.answers[id].feedback && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                {result.answers[id].feedback}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    );
  };
  
  // Render question for editing assessment
  const renderEditableQuestion = (question, index) => {
    const { id, text, type, options = [], correctAnswer, points } = question;
    
    return (
      <Paper 
        key={id || index} 
        elevation={1} 
        sx={{ 
          p: 3, 
          mb: 3, 
          borderRadius: 2,
          position: 'relative'
        }}
      >
        <Typography variant="h6" gutterBottom>
          Question {index + 1}
        </Typography>
        
        <TextField
          fullWidth
          label="Question Text"
          value={text}
          onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
          sx={{ mb: 2 }}
        />
        
        <Box sx={{ mb: 2 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Question Type</FormLabel>
            <RadioGroup
              row
              value={type}
              onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
            >
              <FormControlLabel value="multiple-choice" control={<Radio />} label="Multiple Choice" />
              <FormControlLabel value="multiple-answer" control={<Radio />} label="Multiple Answer" />
              <FormControlLabel value="short-answer" control={<Radio />} label="Short Answer" />
            </RadioGroup>
          </FormControl>
        </Box>
        
        {(type === 'multiple-choice' || type === 'multiple-answer') && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Options
            </Typography>
            
            {options.map((option, optIndex) => (
              <Box key={optIndex} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder={`Option ${optIndex + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                  sx={{ mr: 1 }}
                />
                
                {type === 'multiple-choice' && (
                  <Radio
                    checked={correctAnswer === option}
                    onChange={() => handleCorrectAnswerChange(index, option)}
                    disabled={!option}
                  />
                )}
                
                {type === 'multiple-answer' && (
                  <Checkbox
                    checked={Array.isArray(correctAnswer) && correctAnswer.includes(option)}
                    onChange={(e) => {
                      const current = Array.isArray(correctAnswer) ? [...correctAnswer] : [];
                      if (e.target.checked) {
                        handleCorrectAnswerChange(index, [...current, option]);
                      } else {
                        handleCorrectAnswerChange(
                          index,
                          current.filter(a => a !== option)
                        );
                      }
                    }}
                    disabled={!option}
                  />
                )}
              </Box>
            ))}
            
            <Button 
              variant="outlined" 
              size="small"
              onClick={() => {
                const newOptions = [...options, ''];
                handleQuestionChange(index, 'options', newOptions);
              }}
              sx={{ mt: 1 }}
            >
              Add Option
            </Button>
          </Box>
        )}
        
        {type === 'short-answer' && (
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Correct Answer"
              value={correctAnswer || ''}
              onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
              helperText="Enter the expected answer. Student responses will be matched against this."
            />
          </Box>
        )}
        
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <TextField
            label="Points"
            type="number"
            value={points || 1}
            onChange={(e) => handleQuestionChange(index, 'points', parseInt(e.target.value) || 1)}
            InputProps={{ inputProps: { min: 1 } }}
            sx={{ width: 100 }}
          />
          
          <Button 
            variant="outlined" 
            color="error" 
            size="small"
            onClick={() => handleRemoveQuestion(index)}
            sx={{ ml: 'auto' }}
          >
            Remove Question
          </Button>
        </Box>
      </Paper>
    );
  };
  
  // Render assessment for taking
  const renderAssessmentTaking = () => {
    const { title, description, questions = [] } = assessment;
    
    return (
      <Box>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
          
          {description && (
            <Typography variant="body1" color="text.secondary" paragraph>
              {description}
            </Typography>
          )}
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body2">
              {questions.length} {questions.length === 1 ? 'question' : 'questions'}
            </Typography>
            
            {assessment.timeLimit > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TimerIcon fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="body2" color={timeRemaining < 60 ? 'error' : 'text.primary'}>
                  Time remaining: {formatTimeRemaining()}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        
        {/* Stepper for questions */}
        <Stepper 
          activeStep={activeStep} 
          alternativeLabel
          sx={{ mb: 4, display: { xs: 'none', md: 'flex' } }}
        >
          {questions.map((question, index) => (
            <Step key={index}>
              <StepLabel>Question {index + 1}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {/* Current question */}
        {questions.length > 0 ? (
          <>
            {renderQuestion(questions[activeStep], activeStep)}
            
            {/* Navigation */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={activeStep === 0 || submitted}
                startIcon={<NavigateBeforeIcon />}
              >
                Previous
              </Button>
              
              {activeStep < questions.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={submitted}
                  endIcon={<NavigateNextIcon />}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={submitted || loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <CheckIcon />}
                >
                  {loading ? 'Submitting...' : submitted ? 'Submitted' : 'Submit Assessment'}
                </Button>
              )}
            </Box>
          </>
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            No questions available in this assessment.
          </Typography>
        )}
        
        {/* Results */}
        {submitted && result && (
          <Paper 
            elevation={1} 
            sx={{ 
              mt: 4, 
              p: 3, 
              borderRadius: 2,
              backgroundColor: theme.palette.success.light
            }}
          >
            <Typography variant="h5" gutterBottom>
              Assessment Results
            </Typography>
            
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.success.dark }}>
              {result.score} / {result.totalPoints} points ({Math.round((result.score / result.totalPoints) * 100)}%)
            </Typography>
            
            <Typography variant="body1" sx={{ mt: 1 }}>
              {result.feedback || 'Thank you for completing the assessment!'}
            </Typography>
          </Paper>
        )}
      </Box>
    );
  };
  
  // Render assessment for editing
  const renderAssessmentEditing = () => {
    const { title, description, timeLimit, questions = [] } = assessment;
    
    return (
      <Box>
        {/* Header */}
        <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom>
            Assessment Details
          </Typography>
          
          <TextField
            fullWidth
            label="Assessment Title"
            value={title}
            onChange={(e) => handleAssessmentChange('title', e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => handleAssessmentChange('description', e.target.value)}
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />
          
          <TextField
            label="Time Limit (minutes)"
            type="number"
            value={timeLimit || ''}
            onChange={(e) => handleAssessmentChange('timeLimit', parseInt(e.target.value) || 0)}
            InputProps={{ inputProps: { min: 0 } }}
            helperText="Set to 0 for no time limit"
            sx={{ width: 200 }}
          />
        </Paper>
        
        {/* Questions */}
        <Typography variant="h5" gutterBottom>
          Questions
        </Typography>
        
        {questions.map((question, index) => renderEditableQuestion(question, index))}
        
        <Button
          variant="outlined"
          fullWidth
          onClick={handleAddQuestion}
          sx={{ mb: 3 }}
        >
          Add Question
        </Button>
        
        {/* Save button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSubmit && onSubmit(assessment)}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
          >
            {loading ? 'Saving...' : 'Save Assessment'}
          </Button>
        </Box>
      </Box>
    );
  };
  
  return (
    <Box sx={{ ...sx }}>
      {editable ? renderAssessmentEditing() : renderAssessmentTaking()}
    </Box>
  );
};

export default Assessment;
