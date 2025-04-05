import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  TextField,
  Button,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon,
  School as SchoolIcon,
  Help as HelpIcon,
  Book as BookIcon,
  Assignment as AssignmentIcon,
  VideoCall as VideoCallIcon,
  Search as SearchIcon,
  Class as ClassIcon,
  Payment as PaymentIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TeacherHelp = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const faqs = [
    {
      question: "How do I create a new class?",
      answer: "You can create a new class by navigating to the 'Manage Classes' section in your Teacher Dashboard. Click on 'Create New Class', fill in the required details such as subject, class level, and schedule, then click 'Create'."
    },
    {
      question: "How do I create assessments for my students?",
      answer: "To create assessments, go to the 'Assessments' tab in your dashboard. Click on 'Create New Assessment', select the class, add questions, set the duration and deadline, then publish it for your students."
    },
    {
      question: "How are payments processed?",
      answer: "Payments are processed automatically after each completed session. The platform fee is deducted, and the remaining amount is transferred to your registered bank account within 3-5 business days."
    },
    {
      question: "What happens if a student cancels a session?",
      answer: "If a student cancels more than 6 hours before the scheduled time, no cancellation fee is charged. For cancellations within 6 hours, you will receive a partial payment as compensation for your time."
    },
    {
      question: "How do I get verified as a teacher?",
      answer: "To get verified, go to the 'Verification Process' section in your dashboard. Upload your educational certificates, identity proof, and teaching experience documents. Our team will review and verify your profile within 2-3 business days."
    },
    {
      question: "Can I upload teaching materials for my students?",
      answer: "Yes, you can upload teaching materials such as notes, presentations, and worksheets for your students. Go to 'Manage Classes', select the class, and use the 'Upload Materials' option."
    }
  ];

  const resources = [
    {
      title: "Teaching Guides",
      icon: <BookIcon />,
      description: "Access comprehensive teaching guides and methodologies for effective online teaching."
    },
    {
      title: "Assessment Templates",
      icon: <AssignmentIcon />,
      description: "Use ready-made assessment templates for different subjects and class levels."
    },
    {
      title: "Classroom Management",
      icon: <ClassIcon />,
      description: "Learn best practices for managing online classrooms and engaging students effectively."
    },
    {
      title: "Payment Guidelines",
      icon: <PaymentIcon />,
      description: "Understand the payment structure, platform fees, and withdrawal processes."
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
            Teacher Help Center
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Find answers to common questions, access teaching resources, and get the support you need for your teaching journey
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
                Teaching Resources
              </Typography>
              <Grid container spacing={3}>
                {resources.map((resource, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
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
                          secondary="teacher.support@padholikho.com" 
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem>
                        <ListItemIcon>
                          <SchoolIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Phone" 
                          secondary="+91 9876543210" 
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
                      Our teacher support team typically responds within 24 hours during working days.
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
            onClick={() => navigate('/teacher/dashboard')}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TeacherHelp;
