import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
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
  Update as RescheduleIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Import custom components
import ContentCard from '../../components/common/ContentCard';
import UserAvatar from '../../components/common/UserAvatar';
import DataTable from '../../components/common/DataTable';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Calendar from '../../components/common/Calendar';

// Sample booking data
const bookingsData = [
  {
    id: 1,
    subject: 'Mathematics',
    topic: 'Quadratic Equations',
    teacher: {
      id: 1,
      name: 'Rajesh Kumar',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
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
      name: 'Priya Sharma',
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
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
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
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
      image: 'https://randomuser.me/api/portraits/men/62.jpg'
    },
    date: '2025-03-20',
    time: '6:00 PM - 7:30 PM',
    status: 'cancelled',
    price: 750
  }
];

// BookingCard component with our custom components
const BookingCard = ({ booking, onViewDetails, onCancel, onReschedule }) => {
  const theme = useTheme();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const open = Boolean(menuAnchorEl);
  
  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  
  // Format date for display
  const formattedDate = new Date(booking.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Status color mapping
  const statusColor = 
    booking.status === 'upcoming' ? 'primary' :
    booking.status === 'completed' ? 'success' :
    booking.status === 'cancelled' ? 'error' :
    'warning';
  
  // Status label mapping
  const statusLabel = 
    booking.status === 'upcoming' ? 'Upcoming' :
    booking.status === 'completed' ? 'Completed' :
    booking.status === 'cancelled' ? 'Cancelled' :
    'Rescheduled';
  
  return (
    <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden', mb: 3 }}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <UserAvatar 
              name={booking.teacher.name}
              image={booking.teacher.image}
              role="teacher"
              sx={{ mr: 2, width: 56, height: 56 }}
            />
            <Box>
              <Typography variant="h6" gutterBottom>
                {booking.subject}: {booking.topic}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Teacher: {booking.teacher.name}
              </Typography>
            </Box>
          </Box>
          <Chip 
            label={statusLabel} 
            color={statusColor} 
            size="small"
          />
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EventIcon sx={{ mr: 1, color: 'primary.main', fontSize: 20 }} />
              <Typography variant="body2">
                {formattedDate}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTimeIcon sx={{ mr: 1, color: 'primary.main', fontSize: 20 }} />
              <Typography variant="body2">
                {booking.time}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <SchoolIcon sx={{ mr: 1, color: 'primary.main', fontSize: 20 }} />
              <Typography variant="body2">
                Subject: {booking.subject}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PersonIcon sx={{ mr: 1, color: 'primary.main', fontSize: 20 }} />
              <Typography variant="body2">
                Price: ₹{booking.price}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            variant="outlined" 
            onClick={() => onViewDetails(booking)}
          >
            View Details
          </Button>
          <Box>
            {booking.status === 'upcoming' && (
              <>
                <Button 
                  variant="outlined" 
                  color="error" 
                  sx={{ mr: 1 }}
                  onClick={() => onCancel(booking)}
                  startIcon={<CancelIcon />}
                >
                  Cancel
                </Button>
                <Button 
                  variant="outlined" 
                  color="warning"
                  onClick={() => onReschedule(booking)}
                  startIcon={<RescheduleIcon />}
                >
                  Reschedule
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

const MyBookings = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');
  
  // Filter bookings based on active tab
  const filteredBookings = bookingsData.filter(booking => {
    if (activeTab === 0) return true; // All bookings
    if (activeTab === 1) return booking.status === 'upcoming';
    if (activeTab === 2) return booking.status === 'completed';
    if (activeTab === 3) return booking.status === 'cancelled' || booking.status === 'rescheduled';
    return false;
  });
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleViewDetails = (booking) => {
    navigate(`/student/bookings/${booking.id}`);
  };
  
  const handleCancelBooking = (booking) => {
    setSelectedBooking(booking);
    setCancelDialogOpen(true);
  };
  
  const handleRescheduleBooking = (booking) => {
    setSelectedBooking(booking);
    setRescheduleDialogOpen(true);
  };
  
  const handleCancelConfirm = () => {
    // Here you would make an API call to cancel the booking
    console.log(`Cancelling booking ${selectedBooking.id} with reason: ${cancelReason}`);
    setCancelDialogOpen(false);
    setCancelReason('');
    setSelectedBooking(null);
  };
  
  const handleRescheduleConfirm = () => {
    // Here you would make an API call to reschedule the booking
    console.log(`Rescheduling booking ${selectedBooking.id} to ${rescheduleDate} at ${rescheduleTime}`);
    setRescheduleDialogOpen(false);
    setRescheduleDate('');
    setRescheduleTime('');
    setSelectedBooking(null);
  };
  
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" component="h1">
              My Bookings
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => navigate('/student/find-teachers')}
            >
              Book New Session
            </Button>
          </Box>
          <Breadcrumbs 
            items={[
              { label: 'Home', link: '/' },
              { label: 'Dashboard', link: '/student/dashboard' },
              { label: 'My Bookings', link: '/student/bookings', active: true }
            ]}
          />
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ 
              borderBottom: 1, 
              borderColor: 'divider',
              mb: 3
            }}
          >
            <Tab label="All Bookings" />
            <Tab label="Upcoming" />
            <Tab label="Completed" />
            <Tab label="Cancelled/Rescheduled" />
          </Tabs>
          
          {filteredBookings.length > 0 ? (
            filteredBookings.map(booking => (
              <BookingCard 
                key={booking.id}
                booking={booking}
                onViewDetails={handleViewDetails}
                onCancel={handleCancelBooking}
                onReschedule={handleRescheduleBooking}
              />
            ))
          ) : (
            <ContentCard>
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <EventIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  No bookings found
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  You don't have any {activeTab === 0 ? '' : activeTab === 1 ? 'upcoming ' : activeTab === 2 ? 'completed ' : 'cancelled/rescheduled '}
                  bookings at the moment.
                </Typography>
                {activeTab === 0 || activeTab === 1 ? (
                  <Button 
                    variant="contained" 
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate('/student/find-teachers')}
                  >
                    Book a Session
                  </Button>
                ) : null}
              </Box>
            </ContentCard>
          )}
        </Box>
        
        {/* Cancel Booking Dialog */}
        <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)}>
          <DialogTitle>Cancel Booking</DialogTitle>
          <DialogContent>
            <Typography variant="body1" paragraph>
              Are you sure you want to cancel this booking?
            </Typography>
            {selectedBooking && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Booking Details:
                </Typography>
                <Typography variant="body2">
                  Subject: {selectedBooking.subject} - {selectedBooking.topic}
                </Typography>
                <Typography variant="body2">
                  Teacher: {selectedBooking.teacher.name}
                </Typography>
                <Typography variant="body2">
                  Date & Time: {new Date(selectedBooking.date).toLocaleDateString()} at {selectedBooking.time}
                </Typography>
              </Box>
            )}
            <TextField
              label="Reason for cancellation"
              multiline
              rows={4}
              fullWidth
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCancelDialogOpen(false)}>
              Back
            </Button>
            <Button 
              onClick={handleCancelConfirm} 
              variant="contained" 
              color="error"
              disabled={!cancelReason}
            >
              Confirm Cancellation
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Reschedule Booking Dialog */}
        <Dialog open={rescheduleDialogOpen} onClose={() => setRescheduleDialogOpen(false)}>
          <DialogTitle>Reschedule Booking</DialogTitle>
          <DialogContent>
            <Typography variant="body1" paragraph>
              Please select a new date and time for your booking.
            </Typography>
            {selectedBooking && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Current Booking Details:
                </Typography>
                <Typography variant="body2">
                  Subject: {selectedBooking.subject} - {selectedBooking.topic}
                </Typography>
                <Typography variant="body2">
                  Teacher: {selectedBooking.teacher.name}
                </Typography>
                <Typography variant="body2">
                  Date & Time: {new Date(selectedBooking.date).toLocaleDateString()} at {selectedBooking.time}
                </Typography>
              </Box>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="New Date"
                  type="date"
                  fullWidth
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="New Time"
                  select
                  fullWidth
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                  variant="outlined"
                >
                  <MenuItem value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</MenuItem>
                  <MenuItem value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</MenuItem>
                  <MenuItem value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</MenuItem>
                  <MenuItem value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</MenuItem>
                  <MenuItem value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</MenuItem>
                  <MenuItem value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</MenuItem>
                  <MenuItem value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</MenuItem>
                  <MenuItem value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setRescheduleDialogOpen(false)}>
              Back
            </Button>
            <Button 
              onClick={handleRescheduleConfirm} 
              variant="contained" 
              color="primary"
              disabled={!rescheduleDate || !rescheduleTime}
            >
              Confirm Reschedule
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default MyBookings;
