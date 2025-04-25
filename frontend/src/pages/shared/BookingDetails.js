import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Chip,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useTheme
} from '@mui/material';
import {
  Event as EventIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  VideoCall as VideoCallIcon,
  Cancel as CancelIcon,
  Update as RescheduleIcon,
  ArrowBack as ArrowBackIcon,
  LocationOn as LocationIcon,
  Payment as PaymentIcon,
  Receipt as ReceiptIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

// Sample booking data - in a real app, this would come from an API
const getBookingById = (id) => {
  const bookings = [
    {
      id: 1,
      subject: 'Mathematics',
      topic: 'Quadratic Equations',
      description: 'In this session, we will cover solving quadratic equations using factoring, completing the square, and the quadratic formula. We will also discuss applications of quadratic equations in real-world problems.',
      teacher: {
        id: 1,
        name: 'Rajesh Kumar',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        qualifications: 'M.Sc. Mathematics, B.Ed.',
        experience: '8 years',
        rating: 4.8
      },
      date: '2025-04-25',
      time: '4:00 PM - 5:00 PM',
      duration: 60,
      status: 'upcoming',
      price: 600,
      paymentStatus: 'paid',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN123456789',
      location: 'Online',
      joinUrl: 'https://meet.example.com/class-123',
      createdAt: '2025-04-10T10:30:00Z',
      notes: 'Please prepare Chapter 5 from the textbook before the class.'
    },
    {
      id: 2,
      subject: 'Science',
      topic: 'Chemical Reactions',
      description: 'This session will introduce different types of chemical reactions, balancing chemical equations, and factors affecting reaction rates. We will also perform virtual demonstrations of interesting chemical reactions.',
      teacher: {
        id: 4,
        name: 'Neha Gupta',
        image: 'https://randomuser.me/api/portraits/women/68.jpg',
        qualifications: 'M.Sc. Chemistry, Ph.D.',
        experience: '6 years',
        rating: 4.9
      },
      date: '2025-04-28',
      time: '5:30 PM - 6:30 PM',
      duration: 60,
      status: 'upcoming',
      price: 550,
      paymentStatus: 'paid',
      paymentMethod: 'UPI',
      transactionId: 'TXN987654321',
      location: 'Online',
      joinUrl: 'https://meet.example.com/class-456',
      createdAt: '2025-04-12T14:15:00Z',
      notes: 'Please review the periodic table before the class.'
    },
    {
      id: 3,
      subject: 'English',
      topic: 'Essay Writing',
      description: 'Learn effective essay writing techniques, including thesis development, paragraph structure, and persuasive writing. We will analyze sample essays and practice writing introductions and conclusions.',
      teacher: {
        id: 2,
        name: 'Priya Sharma',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        qualifications: 'M.A. English Literature',
        experience: '5 years',
        rating: 4.7
      },
      date: '2025-04-03',
      time: '3:00 PM - 4:00 PM',
      duration: 60,
      status: 'completed',
      price: 450,
      paymentStatus: 'paid',
      paymentMethod: 'Debit Card',
      transactionId: 'TXN567891234',
      location: 'Online',
      joinUrl: 'https://meet.example.com/class-789',
      recording: 'https://example.com/recordings/english-essay-writing',
      createdAt: '2025-03-28T09:45:00Z',
      notes: 'Please bring a sample essay topic you would like to work on.'
    }
  ];
  
  return bookings.find(booking => booking.id === parseInt(id));
};

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const { currentUser } = useAuth();
  
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchBooking = () => {
      setLoading(true);
      try {
        const bookingData = getBookingById(id);
        setBooking(bookingData);
      } catch (error) {
        console.error('Error fetching booking:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBooking();
  }, [id]);
  
  const handleCancel = () => {
    setCancelDialogOpen(true);
  };
  
  const handleReschedule = () => {
    setRescheduleDialogOpen(true);
  };
  
  const handleCancelConfirm = () => {
    // In a real application, this would send a request to the backend
    console.log('Cancelling booking:', booking.id, 'Reason:', cancelReason);
    setCancelDialogOpen(false);
    setCancelReason('');
    // Update booking status in UI (in a real app, this would be done after API response)
    setBooking({ ...booking, status: 'cancelled' });
    // Show success message
    alert('Booking cancelled successfully');
  };
  
  const handleRescheduleConfirm = () => {
    // In a real application, this would send a request to the backend
    console.log('Rescheduling booking:', booking.id, 'New date:', rescheduleDate, 'New time:', rescheduleTime);
    setRescheduleDialogOpen(false);
    setRescheduleDate('');
    setRescheduleTime('');
    // Update booking in UI (in a real app, this would be done after API response)
    setBooking({ 
      ...booking, 
      date: rescheduleDate,
      time: rescheduleTime,
      status: 'rescheduled'
    });
    // Show success message
    alert('Booking rescheduled successfully');
  };
  
  const handleJoinClass = () => {
    // In a real app, this would open the class URL
    window.open(booking.joinUrl, '_blank');
  };
  
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return theme.palette.primary.main;
      case 'completed':
        return theme.palette.success.main;
      case 'cancelled':
        return theme.palette.error.main;
      case 'rescheduled':
        return theme.palette.warning.main;
      default:
        return theme.palette.text.secondary;
    }
  };
  
  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <Typography>Loading booking details...</Typography>
        </Box>
      </Container>
    );
  }
  
  if (!booking) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', flexDirection: 'column' }}>
          <Typography variant="h5" gutterBottom>Booking not found</Typography>
          <Button 
            variant="contained" 
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2 }}
        >
          Back to Bookings
        </Button>
        
        <Typography variant="h4" component="h1" gutterBottom>
          Booking Details
        </Typography>
        
        <Paper elevation={2} sx={{ borderRadius: 3, overflow: 'hidden', mb: 4 }}>
          <Box 
            sx={{ 
              p: 1, 
              bgcolor: getStatusColor(booking.status),
              color: 'white',
              textAlign: 'center',
              textTransform: 'uppercase',
              fontSize: '0.875rem',
              fontWeight: 'bold'
            }}
          >
            {booking.status}
          </Box>
          
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Typography variant="h5" gutterBottom>
                  {booking.subject}: {booking.topic}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EventIcon sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="body1">
                    {formatDate(booking.date)}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AccessTimeIcon sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="body1">
                    {booking.time} ({booking.duration} minutes)
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationIcon sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="body1">
                    {booking.location}
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="h6" gutterBottom>Description</Typography>
                <Typography variant="body1" paragraph>
                  {booking.description}
                </Typography>
                
                {booking.notes && (
                  <>
                    <Typography variant="h6" gutterBottom>Notes</Typography>
                    <Typography variant="body1" paragraph>
                      {booking.notes}
                    </Typography>
                  </>
                )}
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card sx={{ mb: 3, bgcolor: 'background.paper' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Teacher</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar 
                        src={booking.teacher.image} 
                        alt={booking.teacher.name}
                        sx={{ width: 64, height: 64, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="subtitle1">{booking.teacher.name}</Typography>
                        <Chip 
                          icon={<SchoolIcon />} 
                          label={`${booking.teacher.experience} Experience`}
                          size="small"
                          sx={{ mr: 1, mt: 1 }}
                        />
                      </Box>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Qualifications: {booking.teacher.qualifications}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Rating: {booking.teacher.rating}/5
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
                
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Payment Information</Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <PaymentIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Amount" 
                          secondary={`₹${booking.price}`} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <ReceiptIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Payment Status" 
                          secondary={booking.paymentStatus} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <PaymentIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Payment Method" 
                          secondary={booking.paymentMethod} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <ReceiptIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Transaction ID" 
                          secondary={booking.transactionId} 
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {booking.status === 'upcoming' && (
                    <>
                      <Button 
                        variant="contained" 
                        color="primary"
                        startIcon={<VideoCallIcon />}
                        onClick={handleJoinClass}
                        fullWidth
                      >
                        Join Class
                      </Button>
                      <Button 
                        variant="outlined" 
                        color="primary"
                        startIcon={<RescheduleIcon />}
                        onClick={handleReschedule}
                        fullWidth
                      >
                        Reschedule
                      </Button>
                      <Button 
                        variant="outlined" 
                        color="error"
                        startIcon={<CancelIcon />}
                        onClick={handleCancel}
                        fullWidth
                      >
                        Cancel Booking
                      </Button>
                    </>
                  )}
                  
                  {booking.status === 'completed' && booking.recording && (
                    <Button 
                      variant="contained" 
                      color="primary"
                      startIcon={<VideoCallIcon />}
                      onClick={() => window.open(booking.recording, '_blank')}
                      fullWidth
                    >
                      View Recording
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
      
      {/* Cancel Dialog */}
      <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)}>
        <DialogTitle>Cancel Booking</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Are you sure you want to cancel this booking?
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1">
              {booking.subject}: {booking.topic}
            </Typography>
            <Typography variant="body2">
              {formatDate(booking.date)} | {booking.time}
            </Typography>
            <Typography variant="body2">
              Teacher: {booking.teacher.name}
            </Typography>
          </Box>
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
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1">
              {booking.subject}: {booking.topic}
            </Typography>
            <Typography variant="body2">
              Current: {formatDate(booking.date)} | {booking.time}
            </Typography>
            <Typography variant="body2">
              Teacher: {booking.teacher.name}
            </Typography>
          </Box>
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
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">Select a time slot</option>
                <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                <option value="12:00 PM - 1:00 PM">12:00 PM - 1:00 PM</option>
                <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
                <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
                <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
                <option value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</option>
                <option value="6:00 PM - 7:00 PM">6:00 PM - 7:00 PM</option>
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
    </Container>
  );
};

export default BookingDetails;
