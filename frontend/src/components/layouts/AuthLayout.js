import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Box, Container, Paper, Typography, Grid } from '@mui/material';
import { School as SchoolIcon } from '@mui/icons-material';

const AuthLayout = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'primary.light',
        backgroundImage: 'linear-gradient(135deg, #4361ee 0%, #738eef 100%)',
      }}
    >
      <Container component="main" maxWidth="lg" sx={{ mb: 4, mt: 4, flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ p: 4, color: 'white', textAlign: 'center' }}>
              <SchoolIcon sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h3" component="h1" gutterBottom>
                Padho Likho
              </Typography>
              <Typography variant="h5" gutterBottom>
                Your Gateway to Quality Education
              </Typography>
              <Typography variant="body1" paragraph>
                Connect with qualified teachers for personalized learning experiences.
                Book sessions, attend interactive classes, and track your progress all in one place.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={6}
              sx={{
                p: { xs: 3, md: 4 },
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', mb: 3, alignItems: 'center' }}>
                <SchoolIcon sx={{ fontSize: 40, mr: 1, color: 'primary.main' }} />
                <Typography variant="h4" component="h1" color="primary.main">
                  Padho Likho
                </Typography>
              </Box>
              <Outlet />
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  &copy; {new Date().getFullYear()} Padho Likho. All rights reserved.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Link to="/privacy-policy" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Privacy Policy
                  </Link>
                  {' | '}
                  <Link to="/terms-of-service" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Terms of Service
                  </Link>
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AuthLayout;
