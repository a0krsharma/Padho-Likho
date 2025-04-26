import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert, Link } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

const grades = [
  'Nursery', 'KG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
];

const BookFreeTrial = () => {
  const [form, setForm] = useState({
    parentName: '',
    studentName: '',
    phone: '',
    email: '',
    grade: '',
    role: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.parentName || !form.studentName || !form.phone || !form.email || !form.grade || !form.role) {
      setError('Please fill all fields.');
      return;
    }
    setSubmitted(true);
    setError('');
    setForm({ parentName: '', studentName: '', phone: '', email: '', grade: '', role: '' });
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: 500, mx: 'auto', mt: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Book a Free Trial
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Contact us at <Link href="tel:7070253050" underline="hover" color="primary"><PhoneIcon sx={{ verticalAlign: 'middle', mr: 1 }} />7070253050</Link> or fill the form below to book a free trial class for your child.
      </Typography>
      <Box component="form" onSubmit={handleSubmit} name="book-free-trial" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="book-free-trial" />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Parent's Name" name="parentName" value={form.parentName} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Student's Name" name="studentName" value={form.studentName} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Parent's Phone Number" name="phone" value={form.phone} onChange={handleChange} fullWidth required type="tel" inputProps={{ maxLength: 15 }} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email Address" name="email" value={form.email} onChange={handleChange} fullWidth required type="email" />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Select Grade</InputLabel>
              <Select label="Select Grade" name="grade" value={form.grade} onChange={handleChange}>
                <MenuItem value="">Select one...</MenuItem>
                {grades.map((grade) => (
                  <MenuItem value={grade} key={grade}>{grade}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>I am a</InputLabel>
              <Select label="I am a" name="role" value={form.role} onChange={handleChange}>
                <MenuItem value="">Select one...</MenuItem>
                <MenuItem value="Parent">Parent</MenuItem>
                <MenuItem value="Guardian">Guardian</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth size="large">
              Book Free Trial
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error" onClose={() => setError('')}>{error}</Alert>
      </Snackbar>
      <Snackbar open={submitted} autoHideDuration={4000} onClose={() => setSubmitted(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" onClose={() => setSubmitted(false)}>
          Thank you! We have received your request. Our team will contact you soon.
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default BookFreeTrial;
