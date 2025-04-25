import React from 'react';
import { Container, Typography, Box, Divider, Paper } from '@mui/material';

const TermsOfService = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={2} sx={{ p: 4, my: 4, borderRadius: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Terms of Service
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Last Updated: April 17, 2025
        </Typography>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            1. Introduction
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to Padho Likho ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of the Padho Likho platform, including our website, mobile applications, and services (collectively, the "Service").
          </Typography>
          <Typography variant="body1" paragraph>
            By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Service.
          </Typography>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            2. Eligibility
          </Typography>
          <Typography variant="body1" paragraph>
            You must be at least 13 years of age to access or use the Service. If you are under 18 years of age, you may only access or use the Service with the consent and supervision of a parent or legal guardian who agrees to be bound by these Terms.
          </Typography>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            3. Account Registration
          </Typography>
          <Typography variant="body1" paragraph>
            To access certain features of the Service, you may need to register for an account. When you register for an account, you agree to provide accurate, current, and complete information and to update such information to keep it accurate, current, and complete.
          </Typography>
          <Typography variant="body1" paragraph>
            You are responsible for safeguarding your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </Typography>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            4. User Conduct
          </Typography>
          <Typography variant="body1" paragraph>
            You agree not to use the Service to:
          </Typography>
          <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
            <li>Violate any applicable law or regulation</li>
            <li>Infringe the rights of any third party</li>
            <li>Harass, abuse, or harm another person</li>
            <li>Send spam or other unsolicited messages</li>
            <li>Upload or transmit viruses, malware, or other malicious code</li>
            <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
            <li>Attempt to gain unauthorized access to the Service or other users' accounts</li>
          </Typography>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            5. Content
          </Typography>
          <Typography variant="body1" paragraph>
            You retain all rights to any content you submit, post, or display on or through the Service ("User Content"). By submitting, posting, or displaying User Content on or through the Service, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, modify, and display the User Content in connection with the operation of the Service.
          </Typography>
          <Typography variant="body1" paragraph>
            You are solely responsible for your User Content and the consequences of posting or publishing it. You represent and warrant that you own or have the necessary rights to post your User Content and that your User Content does not violate the rights of any third party.
          </Typography>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            6. Intellectual Property
          </Typography>
          <Typography variant="body1" paragraph>
            The Service and its original content, features, and functionality are and will remain the exclusive property of Padho Likho and its licensors. The Service is protected by copyright, trademark, and other laws of both India and foreign countries.
          </Typography>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            7. Termination
          </Typography>
          <Typography variant="body1" paragraph>
            We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms.
          </Typography>
          <Typography variant="body1" paragraph>
            Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
          </Typography>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            8. Disclaimer of Warranties
          </Typography>
          <Typography variant="body1" paragraph>
            The Service is provided "as is" and "as available" without warranties of any kind, either express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
          </Typography>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            9. Limitation of Liability
          </Typography>
          <Typography variant="body1" paragraph>
            In no event shall Padho Likho, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </Typography>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            10. Changes to Terms
          </Typography>
          <Typography variant="body1" paragraph>
            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </Typography>
        </Box>
        
        <Box>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            11. Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions about these Terms, please contact us at legal@padholikho.com.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default TermsOfService;
