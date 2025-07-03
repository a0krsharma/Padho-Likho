import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Link,
  useTheme,
  useMediaQuery,
  Container
} from '@mui/material';
import {
  Work as WorkIcon,
  Email as EmailIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';

const CareersFooter = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const positions = [
    'Digital Marketing Head',
    'Digital Marketing Assistant',
    'Education Curriculum Head',
    'Teachers (All Subjects)',
    'Specific Subject Teachers',
    'Singing Teacher',
    'Drawing Teacher',
    'MERN Stack Web Developer',
    'Sales Head',
    'Sales Team Lead'
  ];

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        py: 4,
        px: 2
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Join Our Team
            </Typography>
            <Typography variant="body1" paragraph>
              We're looking for talented individuals to join our growing team. 
              Explore exciting career opportunities with us!
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                href="https://docs.google.com/forms/d/e/1FAIpQLScyPQN78a2bnCm3tr3v4RCmNCpnbnsd4ywK5n6RZPHnQTz5Fg/viewform?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<WorkIcon />}
                sx={{ mb: 2 }}
              >
                Apply Now
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Open Positions
            </Typography>
            <Grid container spacing={1}>
              {positions.map((position, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Typography variant="body2">
                    • {position}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon sx={{ mr: 1 }} />
                <Typography variant="body1">
                  Contact: 8294331885
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon sx={{ mr: 1 }} />
                <Link 
                  href="mailto:padholikho.contact@gmail.com" 
                  color="inherit"
                  sx={{ textDecoration: 'none' }}
                >
                  padholikho.contact@gmail.com
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CareersFooter; 