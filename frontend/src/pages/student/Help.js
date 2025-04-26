import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Accordion, AccordionSummary, AccordionDetails, TextField, Button, Divider, Paper, List, ListItem, ListItemIcon, ListItemText, Tab, Tabs } from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon,
  School as SchoolIcon,
  Help as HelpIcon,
  Book as BookIcon,
  Assignment as AssignmentIcon,
  VideoCall as VideoCallIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const StudentHelp = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const faqs = [
    {
      question: "How do I book a session with a teacher?",
      answer: "You can book a session by navigating to the 'Find Teachers' page, selecting a teacher based on your requirements, and clicking on the 'Book Now' button to schedule a session."
    },
    {
      question: "How do I access my assessments?",
      answer: "You can access your assessments from your Student Dashboard. Click on the 'Assessments' tab to view all pending and completed assessments."
    },
    {
      question: "Can I reschedule a booked session?",
      answer: "Yes, you can reschedule a session up to 6 hours before the scheduled time. Go to 'My Bookings' in your dashboard and click on the 'Reschedule' option for the session you want to change."
    },
    {
      question: "How do I track my progress?",
      answer: "Your progress is tracked automatically based on your completed assessments and classes. You can view detailed progress reports in the 'Progress' section of your dashboard."
    },
    {
      question: "What if I miss a scheduled class?",
      answer: "If you miss a scheduled class, it will be marked as 'Missed' in your bookings. You may be charged a cancellation fee if you don't cancel or reschedule at least 6 hours in advance."
    },
    {
      question: "How do I contact my teacher outside of class?",
      answer: "You can message your teacher through the messaging system available in your dashboard. Go to 'My Teachers' and select the teacher you want to contact."
    }
  ];

  const resources = [
    {
      title: "Study Guides",
      icon: <BookIcon />,
      description: "Access comprehensive study guides for all subjects and classes."
    },
    {
      title: "Practice Tests",
      icon: <AssignmentIcon />,
      description: "Take practice tests to prepare for your assessments and exams."
    },
    {
      title: "Video Tutorials",
      icon: <VideoCallIcon />,
      description: "Watch video tutorials on various topics to enhance your understanding."
    }
  ];

  const filteredFaqs = searchQuery 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Student Help Center
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Find answers to common questions, access learning resources, and get the support you need for your educational journey
          </Typography>
        </Box>

        <Box sx={{ mb: 6 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for help topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              sx: { borderRadius: 2, bgcolor: 'background.paper' }
            }}
          />
        </Box>

        <Box sx={{ mb: 6 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ mb: 4 }}
          >
            <Tab label="FAQs" icon={<HelpIcon />} iconPosition="start" />
            <Tab label="Resources" icon={<BookIcon />} iconPosition="start" />
            <Tab label="Contact Support" icon={<SchoolIcon />} iconPosition="start" />
          </Tabs>

          {tabValue === 0 && (
            <Box>
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Frequently Asked Questions
              </Typography>
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <Accordion key={index} sx={{ mb: 2, borderRadius: 1, '&:before': { display: 'none' } }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{ bgcolor: 'background.paper' }}
                    >
                      <Typography variant="h6">{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1">{faq.answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))
              ) : (
                <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
                  No results found for "{searchQuery}". Try a different search term.
                </Typography>
              )}
            </Box>
          )}

          {tabValue === 1 && (
            <Box>
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Learning Resources
              </Typography>
              <Grid container spacing={3}>
                {resources.map((resource, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Card sx={{ height: '100%', borderRadius: 2 }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Box sx={{ 
                            mr: 2, 
                            p: 1, 
                            borderRadius: '50%', 
                            bgcolor: 'primary.light',
                            color: 'primary.main'
                          }}>
                            {resource.icon}
                          </Box>
                          <Typography variant="h6">{resource.title}</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {resource.description}
                        </Typography>
                        <Button 
                          variant="outlined" 
                          sx={{ mt: 2 }}
                          fullWidth
                        >
                          Access Resources
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {tabValue === 2 && (
            <Box>
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Contact Support
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Send us a message
                    </Typography>
                    <TextField
                      fullWidth
                      label="Name"
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Subject"
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Message"
                      margin="normal"
                      variant="outlined"
                      multiline
                      rows={4}
                    />
                    <Button 
                      variant="contained" 
                      color="primary"
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      Submit
                    </Button>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                    <Typography variant="h6" gutterBottom>
                      Contact Information
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <SchoolIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Email" 
                          secondary="a0krsharma@gmail.com" 
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem>
                        <ListItemIcon>
                          <SchoolIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Phone" 
                          secondary="+91 7070253050" 
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem>
                        <ListItemIcon>
                          <SchoolIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Working Hours" 
                          secondary="Monday to Saturday, 9:00 AM to 6:00 PM" 
                        />
                      </ListItem>
                    </List>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                      Our support team typically responds within 24 hours during working days.
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>

        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h5" gutterBottom>
            Need more help?
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            If you couldn't find what you're looking for, you can also check our detailed guides or contact our support team directly.
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            size="large"
            onClick={() => navigate('/contact')}
            sx={{ mr: 2 }}
          >
            Contact Us
          </Button>
          <Button 
            variant="outlined" 
            color="primary"
            size="large"
            onClick={() => navigate('/student/dashboard')}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default StudentHelp;
