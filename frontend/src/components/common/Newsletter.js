import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Alert, Paper, Divider } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

const Newsletter = ({ title, description, buttonText, successMessage, backgroundColor, borderColor, icon, onSubscribe }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await onSubscribe(email);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={0} sx={{ bgcolor: backgroundColor || 'background.paper', border: 1, borderColor: borderColor || 'grey.200', borderRadius: 3, p: { xs: 3, md: 4 }, maxWidth: 540, mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {icon || <EmailIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />}
        <Typography variant="h6" sx={{ fontWeight: 600 }}>{title || 'Newsletter Signup'}</Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{description || 'Subscribe to receive updates and resources.'}</Typography>
      <Divider sx={{ mb: 2 }} />
      {success ? (
        <Alert severity="success">{successMessage || 'Thank you for subscribing!'}</Alert>
      ) : (
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
            <TextField
              type="email"
              label="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              size="small"
              sx={{ flex: 1 }}
              disabled={loading}
            />
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{ borderRadius: 3, fontWeight: 600, px: 3, py: 1, minWidth: 140 }}
            >
              {buttonText || 'Subscribe'}
            </Button>
          </Box>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </form>
      )}
    </Paper>
  );
};

export default Newsletter;
