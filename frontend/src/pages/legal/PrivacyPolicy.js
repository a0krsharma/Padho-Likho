import React from 'react';
import { Container, Typography, Box, Divider, Paper } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={2} sx={{ p: 4, my: 4, borderRadius: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Privacy Policy
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
            At Padho Likho, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
          </Typography>
          <Typography variant="body1" paragraph>
            Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the platform.
          </Typography>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            2. Information We Collect
          </Typography>
          <Typography variant="body1" paragraph>
            We collect several types of information from and about users of our platform, including:
          </Typography>
          <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
            <li><strong>Personal Data:</strong> First name, last name, email address, phone number, address, and profile picture.</li>
            <li><strong>Educational Information:</strong> Academic qualifications, subjects of interest, and class/grade level.</li>
            <li><strong>Account Information:</strong> Username, password, and account preferences.</li>
            <li><strong>Transaction Data:</strong> Details about payments to and from you, and other details of services you have purchased from us.</li>
            <li><strong>Technical Data:</strong> Internet protocol (IP) address, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access our platform.</li>
            <li><strong>Usage Data:</strong> Information about how you use our platform and services.</li>
          </Typography>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            3. How We Collect Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We collect information from you when you:
          </Typography>
          <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
            <li>Register on our platform</li>
            <li>Complete a profile</li>
            <li>Make a booking or purchase</li>
            <li>Participate in a class or assessment</li>
            <li>Contact our support team</li>
            <li>Use or view our platform via your browser's cookies</li>
          </Typography>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            4. How We Use Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We may use the information we collect from you for the following purposes:
          </Typography>
          <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To allow you to participate in interactive features of our service</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our service</li>
            <li>To monitor the usage of our service</li>
            <li>To detect, prevent and address technical issues</li>
            <li>To process payments and prevent fraudulent transactions</li>
            <li>To match students with appropriate teachers</li>
            <li>To send you promotional communications about our services</li>
          </Typography>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            5. Disclosure of Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We may disclose your personal information in the following situations:
          </Typography>
          <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
            <li><strong>Service Providers:</strong> We may share your information with third-party service providers who perform services on our behalf, such as payment processing and data analysis.</li>
            <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            <li><strong>Legal Requirements:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
            <li><strong>Protection of Rights:</strong> We may disclose your information to protect the rights, property, or safety of Padho Likho, our users, or others.</li>
          </Typography>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            6. Data Security
          </Typography>
          <Typography variant="body1" paragraph>
            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
          </Typography>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            7. Your Data Protection Rights
          </Typography>
          <Typography variant="body1" paragraph>
            You have the following data protection rights:
          </Typography>
          <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
            <li><strong>Access:</strong> You can request access to your personal data.</li>
            <li><strong>Correction:</strong> You can request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
            <li><strong>Erasure:</strong> You can request that we erase your personal data under certain conditions.</li>
            <li><strong>Restriction:</strong> You can request that we restrict the processing of your personal data under certain conditions.</li>
            <li><strong>Objection:</strong> You can object to our processing of your personal data under certain conditions.</li>
            <li><strong>Data Portability:</strong> You can request that we transfer the data we have collected to another organization, or directly to you, under certain conditions.</li>
          </Typography>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            8. Children's Privacy
          </Typography>
          <Typography variant="body1" paragraph>
            Our platform is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.
          </Typography>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            9. Changes to This Privacy Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
          </Typography>
        </Box>
        
        <Box>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            10. Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions about this Privacy Policy, please contact us at privacy@padholikho.com.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;
