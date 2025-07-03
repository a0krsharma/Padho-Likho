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
  Avatar,
  Chip,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,

} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  School as SchoolIcon,
  Subject as SubjectIcon,
  Check as CheckIcon,
  Star as StarIcon,
  Verified as VerifiedIcon
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

const teachersData = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    image: 'https://randomuser.me/api/portraits/men/48.jpg',
    subjects: ['Mathematics', 'Physics'],
    classes: [9, 10],
    experience: 8,
    rating: 4.9,
    reviewCount: 124,
    hourlyRate: 600,
    bio: 'Experienced teacher specializing in Mathematics and Physics for classes 9-10. I focus on building strong fundamentals and problem-solving skills.',
    education: 'M.Sc. in Mathematics from Delhi University',
    languages: ['English', 'Hindi'],
    verified: true,
    availability: [
      { day: 'Monday', slots: ['4:00 PM - 6:00 PM', '7:00 PM - 9:00 PM'] },
      { day: 'Tuesday', slots: ['4:00 PM - 6:00 PM', '7:00 PM - 9:00 PM'] },
      { day: 'Wednesday', slots: ['4:00 PM - 6:00 PM', '7:00 PM - 9:00 PM'] },
      { day: 'Thursday', slots: ['4:00 PM - 6:00 PM', '7:00 PM - 9:00 PM'] },
      { day: 'Friday', slots: ['4:00 PM - 6:00 PM', '7:00 PM - 9:00 PM'] },
      { day: 'Saturday', slots: ['10:00 AM - 12:00 PM', '4:00 PM - 6:00 PM'] },
      { day: 'Sunday', slots: ['10:00 AM - 12:00 PM'] }
    ]
  },
  {
    id: 2,
    name: 'Amara Kumari',
    image: 'https://randomuser.me/api/portraits/women/17.jpg',
    subjects: ['English', 'Social Studies'],
    classes: [6, 7, 8],
    experience: 5,
    rating: 4.7,
    reviewCount: 98,
    hourlyRate: 500,
    bio: 'Passionate English and Social Studies teacher with 5 years of experience. I make learning engaging and interactive for students.',
    education: 'B.Ed from Mumbai University',
    languages: ['English', 'Hindi', 'Marathi'],
    verified: true,
    availability: [
      { day: 'Monday', slots: ['3:00 PM - 5:00 PM', '6:00 PM - 8:00 PM'] },
      { day: 'Tuesday', slots: ['3:00 PM - 5:00 PM', '6:00 PM - 8:00 PM'] },
      { day: 'Wednesday', slots: ['3:00 PM - 5:00 PM', '6:00 PM - 8:00 PM'] },
      { day: 'Thursday', slots: ['3:00 PM - 5:00 PM', '6:00 PM - 8:00 PM'] },
      { day: 'Friday', slots: ['3:00 PM - 5:00 PM', '6:00 PM - 8:00 PM'] },
      { day: 'Saturday', slots: ['11:00 AM - 1:00 PM', '3:00 PM - 5:00 PM'] }
    ]
  }
];

const BookTeacher = () => {
  // const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const teacher = teachersData.find(t => t.id === parseInt(id)) || null;
  
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Select Subject', 'Choose Date & Time', 'Booking Details', 'Confirm Booking'];
  
  const [bookingData, setBookingData] = useState({
    subject: '',
    class: '',
    date: null,
    time: null,
    duration: 60,
    topic: '',
    notes: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value
    });
  };
  
  const handleNext = () => {
    if (activeStep === 0) {
      if (!bookingData.subject || !bookingData.class) {
        setError('Please select both subject and class');
        return;
      }
    } else if (activeStep === 1) {
      if (!bookingData.date || !bookingData.time) {
        setError('Please select both date and time');
        return;
      }
    } else if (activeStep === 2) {
      if (!bookingData.topic) {
        setError('Please enter a topic for the class');
        return;
      }
    }
    
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setError('');
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setError('');
  };
  
  const handleConfirmBooking = () => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setConfirmDialogOpen(false);
      
      console.log('Booking confirmed:', {
        teacherId: teacher.id,
        teacherName: teacher.name,
        ...bookingData,
        totalAmount: calculateTotalAmount()
      });
    }, 1500);
  };
  
  const calculateTotalAmount = () => {
    const durationInHours = bookingData.duration / 60;
    return teacher.hourlyRate * durationInHours;
  };
  
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const formatTime = (time) => {
    if (!time) return '';
    return new Date(time).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (!teacher) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Teacher Not Found
        </Typography>
        <Typography variant="body1" paragraph>
          The teacher you're looking for doesn't exist or has been removed.
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/find-teachers')}
        >
          Back to Teachers
        </Button>
      </Container>
    );
  }
  
  if (success) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
          <CheckIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Booking Successful!
          </Typography>
          <Typography variant="body1" paragraph>
            Your booking with {teacher.name} has been confirmed for {formatDate(bookingData.date)} at {formatTime(bookingData.time)}.
          </Typography>
          <Typography variant="body1" paragraph>
            Subject: {bookingData.subject}, Class: {bookingData.class}, Topic: {bookingData.topic}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Total Amount: ₹{calculateTotalAmount()}
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button 
              variant="contained" 
              onClick={() => navigate('/student/bookings')}
              sx={{ mr: 2 }}
            >
              View My Bookings
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => navigate('/find-teachers')}
            >
              Find More Teachers
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }
  
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Select Subject and Class
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Subject</InputLabel>
                  <Select
                    name="subject"
                    value={bookingData.subject}
                    onChange={handleChange}
                    label="Subject"
                  >
                    {teacher.subjects.map((subject) => (
                      <MenuItem key={subject} value={subject}>
                        {subject}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Class</InputLabel>
                  <Select
                    name="class"
                    value={bookingData.class}
                    onChange={handleChange}
                    label="Class"
                  >
                    {teacher.classes.map((classNum) => (
                      <MenuItem key={classNum} value={classNum}>
                        Class {classNum}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Choose Date and Time
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Select Date"
                  type="date"
                  name="date"
                  value={bookingData.date ? bookingData.date.toISOString().split('T')[0] : ''}
                  onChange={(e) => {
                    const newDate = e.target.value ? new Date(e.target.value) : null;
                    setBookingData({
                      ...bookingData,
                      date: newDate
                    });
                  }}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                  inputProps={{ min: new Date().toISOString().split('T')[0] }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Select Time"
                  type="time"
                  name="time"
                  value={bookingData.time ? new Date(bookingData.time).toTimeString().slice(0, 5) : ''}
                  onChange={(e) => {
                    const [hours, minutes] = e.target.value.split(':');
                    const newTime = new Date();
                    newTime.setHours(parseInt(hours, 10));
                    newTime.setMinutes(parseInt(minutes, 10));
                    setBookingData({
                      ...bookingData,
                      time: newTime
                    });
                  }}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Duration</InputLabel>
                  <Select
                    name="duration"
                    value={bookingData.duration}
                    onChange={handleChange}
                    label="Duration"
                  >
                    <MenuItem value={60}>1 hour</MenuItem>
                    <MenuItem value={90}>1.5 hours</MenuItem>
                    <MenuItem value={120}>2 hours</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle1" gutterBottom>
                Teacher's Availability
              </Typography>
              <Grid container spacing={1}>
                {teacher.availability.map((avail) => (
                  <Grid item xs={12} sm={6} md={4} key={avail.day}>
                    <Paper 
                      elevation={1} 
                      sx={{ 
                        p: 2, 
                        borderRadius: 2,
                        bgcolor: 'background.paper'
                      }}
                    >
                      <Typography variant="subtitle2" gutterBottom>
                        {avail.day}
                      </Typography>
                      {avail.slots.map((slot, index) => (
                        <Chip 
                          key={index} 
                          label={slot} 
                          size="small" 
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Booking Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  name="topic"
                  label="Topic for the Class"
                  fullWidth
                  value={bookingData.topic}
                  onChange={handleChange}
                  placeholder="e.g., Quadratic Equations, Newton's Laws of Motion"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="notes"
                  label="Additional Notes for Teacher"
                  fullWidth
                  multiline
                  rows={4}
                  value={bookingData.notes}
                  onChange={handleChange}
                  placeholder="Any specific requirements or areas you need help with"
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Booking Summary
            </Typography>
            <Paper elevation={1} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Teacher
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {teacher.name}
                  </Typography>
                  
                  <Typography variant="subtitle2" color="text.secondary">
                    Subject
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {bookingData.subject}
                  </Typography>
                  
                  <Typography variant="subtitle2" color="text.secondary">
                    Class
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Class {bookingData.class}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Date
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {formatDate(bookingData.date)}
                  </Typography>
                  
                  <Typography variant="subtitle2" color="text.secondary">
                    Time
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {formatTime(bookingData.time)}
                  </Typography>
                  
                  <Typography variant="subtitle2" color="text.secondary">
                    Duration
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {bookingData.duration / 60} hour{bookingData.duration > 60 ? 's' : ''}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="subtitle2" color="text.secondary">
                    Topic
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {bookingData.topic}
                  </Typography>
                  
                  {bookingData.notes && (
                    <>
                      <Typography variant="subtitle2" color="text.secondary">
                        Additional Notes
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {bookingData.notes}
                      </Typography>
                    </>
                  )}
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1">
                  Hourly Rate:
                </Typography>
                <Typography variant="subtitle1">
                  ₹{teacher.hourlyRate}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1">
                  Duration:
                </Typography>
                <Typography variant="subtitle1">
                  {bookingData.duration / 60} hour{bookingData.duration > 60 ? 's' : ''}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Total Amount:
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  ₹{calculateTotalAmount()}
                </Typography>
              </Box>
            </Paper>
            <Typography variant="body2" color="text.secondary" paragraph>
              By confirming this booking, you agree to our terms and conditions. You can cancel or reschedule this booking up to 6 hours before the scheduled time.
            </Typography>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };
  
  return (
    <Box>
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
              onClick={() => navigate(`/teachers/${teacher.id}`)}
              sx={{ mr: 2 }}
            >
              Back
            </Button>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              Book a Class
            </Typography>
          </Box>
        </Container>
      </Box>
      
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ borderRadius: 3, mb: 4 }}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                  <Avatar 
                    src={teacher.image} 
                    alt={teacher.name}
                    sx={{ width: 100, height: 100, mb: 2 }}
                  />
                  <Typography variant="h5" gutterBottom>
                    {teacher.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <StarIcon sx={{ color: 'warning.main', mr: 0.5 }} />
                    <Typography variant="body1">
                      {teacher.rating} ({teacher.reviewCount} reviews)
                    </Typography>
                  </Box>
                  {teacher.verified && (
                    <Chip 
                      icon={<VerifiedIcon />} 
                      label="Verified Teacher" 
                      color="primary" 
                      size="small"
                    />
                  )}
                </Box>
                
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Subjects
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {teacher.subjects.map((subject) => (
                      <Chip 
                        key={subject} 
                        label={subject} 
                        size="small" 
                        icon={<SubjectIcon />}
                      />
                    ))}
                  </Box>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Classes
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {teacher.classes.map((classNum) => (
                      <Chip 
                        key={classNum} 
                        label={`Class ${classNum}`} 
                        size="small" 
                        icon={<SchoolIcon />}
                      />
                    ))}
                  </Box>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Experience
                  </Typography>
                  <Typography variant="body1">
                    {teacher.experience} years
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Hourly Rate
                  </Typography>
                  <Typography variant="h6" color="primary.main">
                    ₹{teacher.hourlyRate}
                  </Typography>
                </Box>
                
                <Divider sx={{ mb: 2 }} />
                
                <Typography variant="body2" paragraph>
                  {teacher.bio}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Stepper 
                  activeStep={activeStep} 
                  alternativeLabel
                  sx={{ mb: 4 }}
                >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                
                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}
                
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
                  {activeStep === steps.length - 1 ? (
                    <Button 
                      variant="contained" 
                      onClick={() => setConfirmDialogOpen(true)}
                      startIcon={<CheckIcon />}
                    >
                      Confirm Booking
                    </Button>
                  ) : (
                    <Button 
                      variant="contained" 
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>Confirm Booking</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Are you sure you want to book a class with {teacher.name}?
          </Typography>
          <Typography variant="body2" paragraph>
            {formatDate(bookingData.date)} at {formatTime(bookingData.time)}
          </Typography>
          <Typography variant="body2" paragraph>
            Subject: {bookingData.subject}, Class: {bookingData.class}
          </Typography>
          <Typography variant="h6">
            Total Amount: ₹{calculateTotalAmount()}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmBooking} 
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
      
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Your booking has been confirmed successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookTeacher;
