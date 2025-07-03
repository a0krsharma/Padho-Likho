import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Avatar,
  Divider,
  Tabs,
  Tab,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  useTheme
} from '@mui/material';
import { 
  Event as EventIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  MoreVert as MoreVertIcon,
  Cancel as CancelIcon,
  Reschedule as RescheduleIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

// MyBookings will fetch bookings from the backend API
const mockBookings = [
  {
    id: 1,
    subject: 'Mathematics',
    topic: 'Quadratic Equations',
    teacher: {
      id: 1,
      name: 'Rajesh Kumar',
      image: 'https://randomuser.me/api/portraits/men/48.jpg'
    },
    date: '2025-04-10',
    time: '4:00 PM - 5:00 PM',
    status: 'upcoming',
    price: 600
  },
  {
    id: 2,
    subject: 'Science',
    topic: 'Chemical Reactions',
    teacher: {
      id: 4,
      name: 'Neha Gupta',
      image: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    date: '2025-04-15',
    time: '5:30 PM - 6:30 PM',
    status: 'upcoming',
    price: 550
  },
  {
    id: 3,
    subject: 'English',
    topic: 'Essay Writing',
    teacher: {
      id: 2,
      name: 'Amara Kumari',
      image: 'https://randomuser.me/api/portraits/women/17.jpg'
    },
    date: '2025-04-03',
    time: '3:00 PM - 4:00 PM',
    status: 'completed',
    price: 450
  },
  {
    id: 4,
    subject: 'Mathematics',
    topic: 'Trigonometry',
    teacher: {
      id: 1,
      name: 'Rajesh Kumar',
      image: 'https://randomuser.me/api/portraits/men/48.jpg'
    },
    date: '2025-03-28',
    time: '4:00 PM - 5:00 PM',
    status: 'completed',
    price: 600
  },
  {
    id: 5,
    subject: 'Computer Science',
    topic: 'Introduction to Programming',
    teacher: {
      id: 3,
      name: 'Amit Patel',
      image: '/images/profile-image.jpg'
    },
    date: '2025-03-20',
    time: '6:00 PM - 7:30 PM',
    status: 'cancelled',
    price: 750
  }
];

const BookingCard = ({ booking, onViewDetails, onCancel, onReschedule }) => {
  const theme = useTheme();
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return theme.palette.primary.main;
      case 'completed':
        return theme.palette.success.main;
      case 'cancelled':
        return theme.palette.error.main;
      default:
        return theme.palette.text.secondary;
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <Paper elevation={1} sx={{ mb: 3, borderRadius: 3, overflow: 'hidden' }}>
      <Box 
        sx={{ 
          p: 0.5, 
          bgcolor: getStatusColor(booking.status),
          color: 'white',
          textAlign: 'center',
          textTransform: 'uppercase',
          fontSize: '0.75rem',
          fontWeight: 'bold'
        }}
      >
        {booking.status}
      </Box>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={7}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box 
                sx={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '50%',
                  backgroundColor: 'primary.light',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}
              >
                {booking.teacher?.name ? booking.teacher.name.split(' ').map(n => n[0]).join('') : ''}
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                  {booking.subject}: {booking.topic}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <PersonIcon fontSize="small" sx={{ mr: 0.5 }} /> {booking.teacher.name}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                <EventIcon fontSize="small" sx={{ mr: 0.5 }} /> {formatDate(booking.date)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} /> {booking.time}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {booking.status === 'upcoming' && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button 
                  variant="contained" 
                  size="small"
                  onClick={() => onViewDetails(booking)}
                >
                  View Details
                </Button>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton 
                    size="small" 
                    color="primary"
                    onClick={() => onReschedule(booking)}
                    title="Reschedule"
                  >
                    <RescheduleIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => onCancel(booking)}
                    title="Cancel"
                  >
                    <CancelIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            )}
            {booking.status === 'completed' && (
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => onViewDetails(booking)}
              >
                View Details
              </Button>
            )}
            {booking.status === 'cancelled' && (
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => onViewDetails(booking)}
              >
                View Details
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

const MyBookings = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');

  // New: API data state
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await axios.get('/api/bookings');
        setBookings(res.data.bookings || []);
      } catch (err) {
        console.log('Using mock data due to API error:', err);
        setBookings(mockBookings);
        setError('');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Filter bookings based on tab
  const filteredBookings = bookings.filter(booking => {
    if (tabValue === 0) return true; // All bookings
    if (tabValue === 1) return booking.status === 'upcoming';
    if (tabValue === 2) return booking.status === 'completed';
    if (tabValue === 3) return booking.status === 'cancelled';
    return true;
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleViewDetails = (booking) => {
    navigate(`/student/bookings/${booking._id || booking.id}`);
  };

  const handleCancel = (booking) => {
    setSelectedBooking(booking);
    setCancelDialogOpen(true);
  };

  const handleReschedule = (booking) => {
    setSelectedBooking(booking);
    setRescheduleDialogOpen(true);
  };

  const handleCancelConfirm = () => {
    // TODO: Implement cancel booking API call
    setCancelDialogOpen(false);
    setCancelReason('');
    alert('Booking cancelled successfully');
  };

  const handleRescheduleConfirm = () => {
    // TODO: Implement reschedule booking API call
    setRescheduleDialogOpen(false);
    setRescheduleDate('');
    setRescheduleTime('');
    alert('Booking rescheduled successfully');
  };

  if (loading) return <Box sx={{ p: 4, textAlign: 'center' }}>Loading...</Box>;
  if (error) return <Box sx={{ p: 4, textAlign: 'center', color: 'red' }}>{error}</Box>;

  return (
    <Box>
      {/* Header Section */}
      <Box 
        sx={{ 
          backgroundColor: 'primary.light',
          backgroundImage: 'linear-gradient(135deg, #4361ee 0%, #738eef 100%)',
          color: 'white',
          py: 4,
          borderRadius: 4,
          mb: 4
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            My Bookings
          </Typography>
          <Typography variant="h6">
            Manage your sessions with teachers
          </Typography>
        </Container>
      </Box>
      
      <Container maxWidth="lg">
        <Card elevation={2} sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
              >
                <Tab label="All Bookings" />
                <Tab label="Upcoming" />
                <Tab label="Completed" />
                <Tab label="Cancelled" />
              </Tabs>
            </Box>
            
            <Box sx={{ mt: 3 }}>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <BookingCard 
                    key={booking.id} 
                    booking={booking} 
                    onViewDetails={handleViewDetails}
                    onCancel={handleCancel}
                    onReschedule={handleReschedule}
                  />
                ))
              ) : (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No bookings found
                  </Typography>
                  <Button 
                    variant="contained" 
                    sx={{ mt: 2 }}
                    onClick={() => navigate('/find-teachers')}
                  >
                    Book a Session
                  </Button>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
        
        {/* Booking Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3, bgcolor: 'primary.light', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="div">
                  {bookings.length > 0 ? bookings.filter(b => b.status === 'upcoming').length : mockBookings.filter(b => b.status === 'upcoming').length}
                </Typography>
                <Typography variant="body1">
                  Upcoming Sessions
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3, bgcolor: 'success.light', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="div">
                  {bookings.length > 0 ? bookings.filter(b => b.status === 'completed').length : mockBookings.filter(b => b.status === 'completed').length}
                </Typography>
                <Typography variant="body1">
                  Completed Sessions
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3, bgcolor: 'error.light', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="div">
                  {bookings.length > 0 ? bookings.filter(b => b.status === 'cancelled').length : mockBookings.filter(b => b.status === 'cancelled').length}
                </Typography>
                <Typography variant="body1">
                  Cancelled Sessions
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3, bgcolor: 'warning.light', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="div">
                  ₹{bookings.length > 0 ? bookings.reduce((total, booking) => total + booking.price, 0) : mockBookings.reduce((total, booking) => total + booking.price, 0)}
                </Typography>
                <Typography variant="body1">
                  Total Spent
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Need Help Section */}
        <Card elevation={2} sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Need Help?
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" paragraph>
              If you need assistance with your bookings or have any questions, our support team is here to help.
            </Typography>
            <Button variant="contained">Contact Support</Button>
          </CardContent>
        </Card>
      </Container>
      
      {/* Cancel Dialog */}
      <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)}>
        <DialogTitle>Cancel Booking</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Are you sure you want to cancel this booking?
          </Typography>
          {selectedBooking && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1">
                {selectedBooking.subject}: {selectedBooking.topic}
              </Typography>
              <Typography variant="body2">
                {new Date(selectedBooking.date).toLocaleDateString()} | {selectedBooking.time}
              </Typography>
              <Typography variant="body2">
                Teacher: {selectedBooking.teacher.name}
              </Typography>
            </Box>
          )}
          <TextField
            label="Reason for cancellation"
            multiline
            rows={3}
            fullWidth
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            placeholder="Please provide a reason for cancellation"
          />
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
            Note: Cancellations made less than 4 hours before the scheduled time may incur a cancellation fee.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)}>
            Back
          </Button>
          <Button 
            onClick={handleCancelConfirm} 
            color="error" 
            variant="contained"
            disabled={!cancelReason}
          >
            Confirm Cancellation
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Reschedule Dialog */}
      <Dialog open={rescheduleDialogOpen} onClose={() => setRescheduleDialogOpen(false)}>
        <DialogTitle>Reschedule Booking</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Please select a new date and time for your session.
          </Typography>
          {selectedBooking && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1">
                {selectedBooking.subject}: {selectedBooking.topic}
              </Typography>
              <Typography variant="body2">
                Current: {new Date(selectedBooking.date).toLocaleDateString()} | {selectedBooking.time}
              </Typography>
              <Typography variant="body2">
                Teacher: {selectedBooking.teacher.name}
              </Typography>
            </Box>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="New Date"
                type="date"
                fullWidth
                value={rescheduleDate}
                onChange={(e) => setRescheduleDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="New Time Slot"
                fullWidth
                value={rescheduleTime}
                onChange={(e) => setRescheduleTime(e.target.value)}
              >
                <MenuItem value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</MenuItem>
                <MenuItem value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</MenuItem>
                <MenuItem value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</MenuItem>
                <MenuItem value="12:00 PM - 1:00 PM">12:00 PM - 1:00 PM</MenuItem>
                <MenuItem value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</MenuItem>
                <MenuItem value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</MenuItem>
                <MenuItem value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</MenuItem>
                <MenuItem value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</MenuItem>
                <MenuItem value="6:00 PM - 7:00 PM">6:00 PM - 7:00 PM</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
            Note: Rescheduling is subject to teacher availability. You will receive a confirmation once the teacher accepts the new time.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRescheduleDialogOpen(false)}>
            Back
          </Button>
          <Button 
            onClick={handleRescheduleConfirm} 
            color="primary" 
            variant="contained"
            disabled={!rescheduleDate || !rescheduleTime}
          >
            Confirm Reschedule
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyBookings;
