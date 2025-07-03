import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert, Link } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

const grades = [
  'Nursery', 'KG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
];

const BookFreeTrial = () => {
  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: 500, mx: 'auto', mt: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Book a Free Trial
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Contact us at <Link href="tel:7070253050" underline="hover" color="primary"><PhoneIcon sx={{ verticalAlign: 'middle', mr: 1 }} />7070253050</Link> or fill the form below to book a free trial class for your child.
      </Typography>
      <form name="book-free-trial" method="POST" data-netlify="true">
        <input type="hidden" name="form-name" value="book-free-trial" />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Name" name="name" required fullWidth variant="outlined" />
          <TextField label="Email" name="email" type="email" required fullWidth variant="outlined" />
          <TextField label="WhatsApp Number" name="whatsapp" type="tel" required fullWidth variant="outlined" />
          <TextField label="Class" name="class" required fullWidth variant="outlined" />
          <TextField label="Subject" name="subject" required fullWidth variant="outlined" />
          <TextField label="Timing" name="timing" required fullWidth variant="outlined" />
          <TextField label="Date" name="date" type="date" required fullWidth InputLabelProps={{ shrink: true }} variant="outlined" />
          <Button type="submit" variant="contained" color="primary" size="large">Book Now</Button>
        </Box>
      </form>
    </Paper>
  );
};

export default BookFreeTrial;
