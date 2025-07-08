import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { 
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  LinkedIn as LinkedInIcon,
  School as SchoolIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import CareersFooter from './CareersFooter';

const Footer = () => {
  return (
    <Box component="footer" sx={{ mt: 'auto' }}>
      <CareersFooter />
      <Box
        component="footer"
        sx={{
          py: 6,
          px: 2,
          mt: 'auto',
          backgroundColor: 'primary.dark',
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SchoolIcon sx={{ mr: 1 }} />
                <Typography variant="h6" component="div">
                  Padho Likho
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Your gateway to quality education. Connect with qualified teachers for personalized learning experiences.
              </Typography>
              <Box>
                <IconButton color="inherit" aria-label="Facebook" component="a" href="https://www.facebook.com/profile.php?id=61578106288087" target="_blank" rel="noopener noreferrer">
                  <FacebookIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="Twitter" component="a" href="https://x.com/a0krsharma" target="_blank" rel="noopener noreferrer">
                  <TwitterIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="Instagram" component="a" href="https://www.instagram.com/padhoolikho/" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="YouTube" component="a" href="https://www.youtube.com/channel/UCMkDdnT1C-lb36nGApnm8mg" target="_blank" rel="noopener noreferrer">
                  <YouTubeIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="LinkedIn" component="a" href="https://www.linkedin.com/in/abhishek-kumar-740846a8/" target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Link component={RouterLink} to="/" color="inherit" display="block" sx={{ mb: 1 }}>
                Home
              </Link>
              <Link component={RouterLink} to="/find-teachers" color="inherit" display="block" sx={{ mb: 1 }}>
                Find Teachers
              </Link>
              <Link component={RouterLink} to="/about" color="inherit" display="block" sx={{ mb: 1 }}>
                About Us
              </Link>
              <Link component={RouterLink} to="/contact" color="inherit" display="block" sx={{ mb: 1 }}>
                Contact Us
              </Link>
              <Link component={RouterLink} to="/blog" color="inherit" display="block" sx={{ mb: 1 }}>
                Blog
              </Link>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                For Students
              </Typography>
              <Link component={RouterLink} to="/register" color="inherit" display="block" sx={{ mb: 1 }}>
                Register as Student
              </Link>
              <Link component={RouterLink} to="/find-teachers" color="inherit" display="block" sx={{ mb: 1 }}>
                Book a Teacher
              </Link>
              <Link component={RouterLink} to="/student/dashboard" color="inherit" display="block" sx={{ mb: 1 }}>
                Student Dashboard
              </Link>
              <Link component={RouterLink} to="/student/assessments" color="inherit" display="block" sx={{ mb: 1 }}>
                Take Assessments
              </Link>
              <Link component={RouterLink} to="/help/students" color="inherit" display="block" sx={{ mb: 1 }}>
                Student Help Center
              </Link>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                For Teachers
              </Typography>
              <Link component={RouterLink} to="/register" color="inherit" display="block" sx={{ mb: 1 }}>
                Register as Teacher
              </Link>
              <Link component={RouterLink} to="/teacher/dashboard" color="inherit" display="block" sx={{ mb: 1 }}>
                Teacher Dashboard
              </Link>
              <Link component={RouterLink} to="/teacher/classes" color="inherit" display="block" sx={{ mb: 1 }}>
                Manage Classes
              </Link>
              <Link component={RouterLink} to="/help/teachers" color="inherit" display="block" sx={{ mb: 1 }}>
                Teacher Help Center
              </Link>
              <Link component={RouterLink} to="/teacher/verification" color="inherit" display="block" sx={{ mb: 1 }}>
                Verification Process
              </Link>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 3, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ mb: { xs: 2, md: 0 } }}>
              &copy; {new Date().getFullYear()} Padho Likho. All rights reserved.
            </Typography>
            
            <Box>
              <Link component={RouterLink} to="/privacy-policy" color="inherit" sx={{ mr: 2 }}>
                Privacy Policy
              </Link>
              <Link component={RouterLink} to="/terms-of-service" color="inherit" sx={{ mr: 2 }}>
                Terms of Service
              </Link>
              <Link component={RouterLink} to="/refund-policy" color="inherit">
                Refund Policy
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
