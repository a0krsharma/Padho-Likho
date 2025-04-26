import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  
  Card,
  CardContent,
  Alert,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import { 
  CloudUpload as CloudUploadIcon,
  Check as CheckIcon,
  School as SchoolIcon,
  VerifiedUser as VerifiedUserIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TeacherVerification = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    highestQualification: '',
    university: '',
    yearOfCompletion: '',
    teachingExperience: '',
    subjects: [],
    classes: [],
    idType: '',
    idNumber: '',
    uploadedFiles: []
  });
  const [errors, setErrors] = useState({});

  const steps = ['Personal Information', 'Educational Qualifications', 'Teaching Experience', 'Document Upload', 'Review & Submit'];

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileObjects = files.map(file => ({
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified
    }));
    
    setFormData({
      ...formData,
      uploadedFiles: [...formData.uploadedFiles, ...fileObjects]
    });
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...formData.uploadedFiles];
    updatedFiles.splice(index, 1);
    setFormData({
      ...formData,
      uploadedFiles: updatedFiles
    });
  };

  const validateStep = (step) => {
    let isValid = true;
    const newErrors = {};

    switch (step) {
      case 0: // Personal Information
        if (!formData.idType) {
          newErrors.idType = 'Please select an ID type';
          isValid = false;
        }
        if (!formData.idNumber) {
          newErrors.idNumber = 'Please enter your ID number';
          isValid = false;
        }
        break;
      case 1: // Educational Qualifications
        if (!formData.highestQualification) {
          newErrors.highestQualification = 'Please select your highest qualification';
          isValid = false;
        }
        if (!formData.university) {
          newErrors.university = 'Please enter your university/institution name';
          isValid = false;
        }
        if (!formData.yearOfCompletion) {
          newErrors.yearOfCompletion = 'Please enter your year of completion';
          isValid = false;
        }
        break;
      case 2: // Teaching Experience
        if (!formData.teachingExperience) {
          newErrors.teachingExperience = 'Please select your teaching experience';
          isValid = false;
        }
        if (!formData.subjects || formData.subjects.length === 0) {
          newErrors.subjects = 'Please select at least one subject';
          isValid = false;
        }
        if (!formData.classes || formData.classes.length === 0) {
          newErrors.classes = 'Please select at least one class';
          isValid = false;
        }
        break;
      case 3: // Document Upload
        if (formData.uploadedFiles.length === 0) {
          newErrors.uploadedFiles = 'Please upload at least one document';
          isValid = false;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    // In a real application, this would submit the form data to the backend
    console.log('Form submitted:', formData);
    // Navigate to success page or show success message
    setActiveStep(steps.length);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.idType}>
                  <InputLabel>ID Type</InputLabel>
                  <Select
                    name="idType"
                    value={formData.idType}
                    onChange={handleChange}
                    label="ID Type"
                  >
                    <MenuItem value="aadhar">Aadhar Card</MenuItem>
                    <MenuItem value="pan">PAN Card</MenuItem>
                    <MenuItem value="voter">Voter ID</MenuItem>
                    <MenuItem value="passport">Passport</MenuItem>
                    <MenuItem value="driving">Driving License</MenuItem>
                  </Select>
                  {errors.idType && <FormHelperText>{errors.idType}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="idNumber"
                  label="ID Number"
                  fullWidth
                  value={formData.idNumber}
                  onChange={handleChange}
                  error={!!errors.idNumber}
                  helperText={errors.idNumber}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Educational Qualifications
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.highestQualification}>
                  <InputLabel>Highest Qualification</InputLabel>
                  <Select
                    name="highestQualification"
                    value={formData.highestQualification}
                    onChange={handleChange}
                    label="Highest Qualification"
                  >
                    <MenuItem value="bachelor">Bachelor's Degree</MenuItem>
                    <MenuItem value="master">Master's Degree</MenuItem>
                    <MenuItem value="phd">PhD</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  {errors.highestQualification && <FormHelperText>{errors.highestQualification}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="university"
                  label="University/Institution"
                  fullWidth
                  value={formData.university}
                  onChange={handleChange}
                  error={!!errors.university}
                  helperText={errors.university}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="yearOfCompletion"
                  label="Year of Completion"
                  fullWidth
                  type="number"
                  value={formData.yearOfCompletion}
                  onChange={handleChange}
                  error={!!errors.yearOfCompletion}
                  helperText={errors.yearOfCompletion}
                  InputProps={{ inputProps: { min: 1950, max: new Date().getFullYear() } }}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Teaching Experience
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.teachingExperience}>
                  <InputLabel>Teaching Experience</InputLabel>
                  <Select
                    name="teachingExperience"
                    value={formData.teachingExperience}
                    onChange={handleChange}
                    label="Teaching Experience"
                  >
                    <MenuItem value="0-1">Less than 1 year</MenuItem>
                    <MenuItem value="1-3">1-3 years</MenuItem>
                    <MenuItem value="3-5">3-5 years</MenuItem>
                    <MenuItem value="5-10">5-10 years</MenuItem>
                    <MenuItem value="10+">More than 10 years</MenuItem>
                  </Select>
                  {errors.teachingExperience && <FormHelperText>{errors.teachingExperience}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.subjects}>
                  <InputLabel>Subjects</InputLabel>
                  <Select
                    multiple
                    name="subjects"
                    value={formData.subjects}
                    onChange={(e) => setFormData({...formData, subjects: e.target.value})}
                    label="Subjects"
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    <MenuItem value="Mathematics">Mathematics</MenuItem>
                    <MenuItem value="Science">Science</MenuItem>
                    <MenuItem value="Physics">Physics</MenuItem>
                    <MenuItem value="Chemistry">Chemistry</MenuItem>
                    <MenuItem value="Biology">Biology</MenuItem>
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Hindi">Hindi</MenuItem>
                    <MenuItem value="Social Studies">Social Studies</MenuItem>
                    <MenuItem value="Computer Science">Computer Science</MenuItem>
                  </Select>
                  {errors.subjects && <FormHelperText>{errors.subjects}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.classes}>
                  <InputLabel>Classes</InputLabel>
                  <Select
                    multiple
                    name="classes"
                    value={formData.classes}
                    onChange={(e) => setFormData({...formData, classes: e.target.value})}
                    label="Classes"
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={`Class ${value}`} />
                        ))}
                      </Box>
                    )}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((classNum) => (
                      <MenuItem key={classNum} value={classNum}>
                        Class {classNum}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.classes && <FormHelperText>{errors.classes}</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Document Upload
            </Typography>
            <Alert severity="info" sx={{ mb: 3 }}>
              Please upload clear scanned copies of your educational certificates, ID proof, and any teaching experience certificates.
            </Alert>
            <Box sx={{ mb: 3 }}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
                sx={{ mb: 2 }}
              >
                Upload Documents
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={handleFileUpload}
                />
              </Button>
              {errors.uploadedFiles && (
                <FormHelperText error>{errors.uploadedFiles}</FormHelperText>
              )}
            </Box>
            {formData.uploadedFiles.length > 0 && (
              <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Uploaded Documents
                </Typography>
                <List>
                  {formData.uploadedFiles.map((file, index) => (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <IconButton edge="end" onClick={() => handleRemoveFile(index)}>
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemIcon>
                        <SchoolIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={file.name}
                        secondary={`Size: ${(file.size / 1024).toFixed(2)} KB`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </Box>
        );
      case 4:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review Your Information
            </Typography>
            <Alert severity="info" sx={{ mb: 3 }}>
              Please review your information carefully before submitting. Once submitted, you cannot make changes until the verification process is complete.
            </Alert>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Personal Information
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText primary="ID Type" secondary={formData.idType} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="ID Number" secondary={formData.idNumber} />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Educational Qualifications
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText primary="Highest Qualification" secondary={formData.highestQualification} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="University/Institution" secondary={formData.university} />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Year of Completion" secondary={formData.yearOfCompletion} />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Teaching Experience
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText primary="Teaching Experience" secondary={formData.teachingExperience} />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Subjects" 
                          secondary={formData.subjects.join(', ')} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Classes" 
                          secondary={formData.classes.map(c => `Class ${c}`).join(', ')} 
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Uploaded Documents
                    </Typography>
                    <List>
                      {formData.uploadedFiles.map((file, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <SchoolIcon />
                          </ListItemIcon>
                          <ListItemText primary={file.name} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Teacher Verification
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Complete the verification process to become a certified teacher on our platform
          </Typography>
        </Box>

        <Paper sx={{ p: 4, borderRadius: 2, mb: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length ? (
            <Box sx={{ textAlign: 'center' }}>
              <VerifiedUserIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Verification Request Submitted!
              </Typography>
              <Typography variant="body1" paragraph>
                Your verification request has been submitted successfully. Our team will review your documents and update your status within 2-3 business days.
              </Typography>
              <Typography variant="body1" paragraph>
                You will receive an email notification once the verification process is complete.
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => navigate('/teacher/dashboard')}
                sx={{ mt: 2 }}
              >
                Back to Dashboard
              </Button>
            </Box>
          ) : (
            <>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  startIcon={<ArrowBackIcon />}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                  endIcon={activeStep === steps.length - 1 ? <CheckIcon /> : <ArrowForwardIcon />}
                >
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </Paper>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button 
            variant="outlined" 
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/teacher/dashboard')}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TeacherVerification;
