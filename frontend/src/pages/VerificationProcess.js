import React from 'react';
import { Box, Container, Typography, Stepper, Step, StepLabel, Paper, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CheckCircle as CheckCircleIcon, AssignmentInd as AssignmentIndIcon, CloudUpload as CloudUploadIcon, VerifiedUser as VerifiedUserIcon } from '@mui/icons-material';

const steps = [
  'Personal Information',
  'Educational Qualifications',
  'Teaching Experience',
  'Document Upload',
  'Review & Submit',
  'Verification Complete'
];

const processDetails = [
  {
    icon: <AssignmentIndIcon color="primary" />, 
    title: 'Fill Personal Information',
    description: 'Provide your basic details such as name, contact information, and address.'
  },
  {
    icon: <CheckCircleIcon color="primary" />, 
    title: 'Add Educational Qualifications',
    description: 'Enter your highest qualification, university, and year of completion.'
  },
  {
    icon: <CheckCircleIcon color="primary" />, 
    title: 'Teaching Experience',
    description: 'Describe your teaching experience and the subjects/classes you can teach.'
  },
  {
    icon: <CloudUploadIcon color="primary" />, 
    title: 'Upload Documents',
    description: 'Upload valid ID proof and relevant educational certificates.'
  },
  {
    icon: <VerifiedUserIcon color="primary" />, 
    title: 'Review & Submit',
    description: 'Review all your details and submit your application for verification.'
  },
  {
    icon: <VerifiedUserIcon color="success" />, 
    title: 'Verification Complete',
    description: 'Our team will review your application and notify you once verified.'
  }
];

const VerificationProcess = () => {
  return (
    <Box>
      <Box sx={{ backgroundColor: 'primary.light', color: 'white', py: 8, borderRadius: 4, mb: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <VerifiedUserIcon sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Teacher Verification Process
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
            Step-by-step guide to becoming a verified teacher on Padho Likho
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ mb: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Verification Steps
          </Typography>
          <Divider sx={{ width: 100, mb: 4, borderColor: 'primary.main', borderWidth: 2 }} />

          <Stepper orientation="vertical" activeStep={-1} sx={{ mb: 4 }}>
            {steps.map((label, idx) => (
              <Step key={label} completed={false}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <List>
            {processDetails.map((step, idx) => (
              <ListItem key={idx} alignItems="flex-start">
                <ListItemIcon>{step.icon}</ListItemIcon>
                <ListItemText
                  primary={<Typography variant="h6" sx={{ fontWeight: 'bold' }}>{step.title}</Typography>}
                  secondary={step.description}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
};

export default VerificationProcess;
