import React from 'react';
import { Container, Box, Typography, Paper, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Hiring = () => (
  <Container maxWidth="sm">
    <Box sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom color="primary">
          We Are Hiring!
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Any qualification can apply. All will get hired!
        </Typography>
        <Typography variant="h6" color="success.main" sx={{ mb: 3, fontWeight: 600 }}>
          Salary will be up to ₹60,000 per month!
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mb: 2, mt: 4 }}>
          Apply Now via Google Form
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScyPQN78a2bnCm3tr3v4RCmNCpnbnsd4ywK5n6RZPHnQTz5Fg/viewform?embedded=true"
            width="100%"
            height="700"
            frameBorder="0"
            style={{ borderRadius: 8, minHeight: 600 }}
            title="Hiring Application Google Form"
            allowFullScreen
          >
            Loading…
          </iframe>
        </Box>
        <Box sx={{ my: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<EmailIcon />}
            href="mailto:a0krsharma@gmail.com"
            sx={{ mb: 1 }}
            fullWidth
          >
            Email: a0krsharma@gmail.com
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<PhoneIcon />}
            href="tel:7070253050"
            fullWidth
          >
            Call: 7070253050
          </Button>
        </Box>
        <Typography variant="body2" color="textSecondary">
          For any queries, contact us on the above details.
        </Typography>
      </Paper>
    </Box>
  </Container>
);

export default Hiring;
