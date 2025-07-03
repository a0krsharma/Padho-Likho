import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Paper,
  Divider,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Phone as PhoneIcon, 
  LocationOn as LocationIcon,
  Send as SendIcon
} from '@mui/icons-material';

const Contact = () => {
  // const theme = useTheme();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear field error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const form = e.target;
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...formData
        }).toString()
      })
      .then(() => {
        console.log('Form successfully submitted');
        setSubmitted(true);
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      })
      .catch((error) => {
        console.error('Form submission error:', error);
        alert('There was an error submitting the form. Please try again.');
      });
    }
  };
  
  const handleCloseSnackbar = () => {
    setSubmitted(false);
  };
  
  return (
    <Box>
      {/* Header Section */}
      <Box 
        sx={{ 
          backgroundColor: 'primary.light',
          backgroundImage: 'linear-gradient(135deg, #4361ee 0%, #738eef 100%)',
          color: 'white',
          py: 8,
          borderRadius: 4,
          mb: 8
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Contact Us
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
            We'd love to hear from you. Get in touch with our team.
          </Typography>
        </Container>
      </Box>
      
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="h4" component="h2" gutterBottom>
                Get In Touch
              </Typography>
              <Divider sx={{ width: 100, mb: 4, borderColor: 'primary.main', borderWidth: 2 }} />
              <Typography variant="body1" paragraph>
                Have questions about our platform or need assistance? Reach out to us using any of the contact methods below.
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, mt: 4 }}>
                <Box 
                  sx={{ 
                    backgroundColor: 'primary.main', 
                    color: 'white', 
                    p: 1.5, 
                    borderRadius: '50%', 
                    mr: 2,
                    display: 'flex'
                  }}
                >
                  <EmailIcon />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Email
                  </Typography>
                  <Typography variant="body1">
                    padholikho.contact@gmail.com
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box 
                  sx={{ 
                    backgroundColor: 'primary.main', 
                    color: 'white', 
                    p: 1.5, 
                    borderRadius: '50%', 
                    mr: 2,
                    display: 'flex'
                  }}
                >
                  <PhoneIcon />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Phone
                  </Typography>
                  <Typography variant="body1">
                    +91 8294331885
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box 
                  sx={{ 
                    backgroundColor: 'primary.main', 
                    color: 'white', 
                    p: 1.5, 
                    borderRadius: '50%', 
                    mr: 2,
                    display: 'flex'
                  }}
                >
                  <LocationIcon />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Address
                  </Typography>
                  <Typography variant="body1">
                    Vill - Gaudhapar, PS - Chandi,<br />
                    PO - Barhauna, India
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Office Hours
                </Typography>
                <Typography variant="body1">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 2:00 PM<br />
                  Sunday: Closed
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Send us a Message
              </Typography>
              <Divider sx={{ width: 100, mb: 4, borderColor: 'primary.main', borderWidth: 2 }} />
              
              <Box 
                component="form" 
                name="contact" 
                method="POST" 
                data-netlify="true"
                onSubmit={handleSubmit} 
                noValidate
                sx={{ '& .hidden': { display: 'none' } }}
              >
                {/* Netlify Form Name */}
                <input type="hidden" name="form-name" value="contact" />
                
                {/* Honeypot field to catch spam bots */}
                <div className="hidden">
                  <label>
                    Don't fill this out if you're human: <input name="bot-field" />
                  </label>
                </div>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={Boolean(errors.name)}
                      helperText={errors.name}
                      inputProps={{
                        'aria-label': 'Your Name'
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={Boolean(errors.email)}
                      helperText={errors.email}
                      inputProps={{
                        'aria-label': 'Email Address'
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="subject"
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      error={Boolean(errors.subject)}
                      helperText={errors.subject}
                      inputProps={{
                        'aria-label': 'Subject'
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="message"
                      label="Your Message"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      error={Boolean(errors.message)}
                      helperText={errors.message}
                      inputProps={{
                        'aria-label': 'Your Message'
                      }}
                    />
                  </Grid>
                </Grid>
                
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<SendIcon />}
                  sx={{ mt: 4, py: 1.5, px: 4 }}
                >
                  Send Message
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      
      {/* FAQ Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8, mb: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom align="center">
            Frequently Asked Questions
          </Typography>
          <Divider sx={{ width: 100, mx: 'auto', mb: 6, borderColor: 'primary.main', borderWidth: 2 }} />
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  How do I book a session with a teacher?
                </Typography>
                <Typography variant="body1">
                  You can book a session by navigating to the "Find Teachers" page, selecting a teacher based on your requirements, and clicking on the "Book Now" button to schedule a session.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  What payment methods do you accept?
                </Typography>
                <Typography variant="body1">
                  We accept all major credit/debit cards, UPI payments, and net banking. You can also add money to your in-app wallet for seamless transactions.
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  How can I become a teacher on Padho Likho?
                </Typography>
                <Typography variant="body1">
                  To become a teacher, register on our platform, complete your profile with all required qualifications and documents, and submit for verification. Our team will review your application and get back to you.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  Can I cancel or reschedule a booking?
                </Typography>
                <Typography variant="body1">
                  Yes, you can cancel or reschedule a booking up to 4 hours before the scheduled time without any penalty. For cancellations made less than 4 hours before, a small fee may apply.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  How do live classes work?
                </Typography>
                <Typography variant="body1">
                  Live classes are conducted through our integrated video conferencing system. You'll receive a notification before the class starts, and you can join with a single click from your dashboard.
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  Is there a mobile app available?
                </Typography>
                <Typography variant="body1">
                  Yes, we have mobile apps available for both Android and iOS devices. You can download them from the Google Play Store or Apple App Store to access our platform on the go.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Map Section - In a real application, this would be an actual map */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            height: 400, 
            width: '100%', 
            bgcolor: 'grey.200', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            borderRadius: 3
          }}
        >
          <Typography variant="h5" color="text.secondary">
            Google Map would be embedded here
          </Typography>
        </Paper>
      </Container>
      
      {/* Success Snackbar */}
      <Snackbar 
        open={submitted} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Your message has been sent successfully! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
