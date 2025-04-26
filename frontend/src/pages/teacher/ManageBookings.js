import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Avatar,
  Tabs,
  Tab,
  Paper,

  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  useTheme
} from '@mui/material';
import { 
  Event as EventIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,

  Check as CheckIcon,
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon,
  CalendarToday as CalendarTodayIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Sample bookings data
const bookingsData = [
  {
    id: 1,
    subject: 'Mathematics',
    topic: 'Algebra',
    student: {
      id: 1,
      name: 'Aryan Singh',
      image: null,
      grade: '8th'
    },
    date: '2025-04-15',
    time: '4:00 PM - 5:00 PM',
    status: 'pending'
  },
  {
    id: 2,
    subject: 'Science',
    topic: 'Physics - Motion',
    student: {
      id: 2,
      name: 'Ananya Sharma',
      image: null,
      grade: '9th'
    },
    date: '2025-04-18',
    time: '5:30 PM - 6:30 PM',
    status: 'confirmed'
  },
  {
    id: 3,
    subject: 'Mathematics',
    topic: 'Geometry',
    student: {
      id: 3,
      name: 'Rahul Verma',
      image: null,
      grade: '7th'
    },
    date: '2025-04-20',
    time: '7:00 PM - 8:00 PM',
    status: 'confirmed'
  },
  {
    id: 4,
    subject: 'English',
    topic: 'Grammar',
    student: {
      id: 4,
      name: 'Priya Patel',
      image: null,
      grade: '6th'
    },
    date: '2025-04-12',
    time: '3:00 PM - 4:00 PM',
    status: 'rejected'
  },
  {
    id: 5,
    subject: 'Science',
    topic: 'Chemistry - Periodic Table',
    student: {
      id: 5,
      name: 'Vikram Mehta',
      image: null,
      grade: '10th'
    },
    date: '2025-04-25',
    time: '6:00 PM - 7:00 PM',
    status: 'pending'
  }
];

const BookingCard = ({ booking, onAccept, onReject, onViewDetails }) => {
  const theme = useTheme();
  
  // Get status color and label
  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return { color: theme.palette.warning.main, label: 'Pending' };
      case 'confirmed':
        return { color: theme.palette.success.main, label: 'Confirmed' };
      case 'rejected':
        return { color: theme.palette.error.main, label: 'Rejected' };
      default:
        return { color: theme.palette.text.secondary, label: status };
    }
  };
  
  const statusInfo = getStatusInfo(booking.status);
  
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
          bgcolor: statusInfo.color,
          color: 'white',
          textAlign: 'center',
          textTransform: 'uppercase',
          fontSize: '0.75rem',
          fontWeight: 'bold'
        }}
      >
        {statusInfo.label}
      </Box>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={7}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ mr: 2 }}>
                {booking.student.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                  {booking.subject}: {booking.topic}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <PersonIcon fontSize="small" sx={{ mr: 0.5 }} /> 
                  {booking.student.name} ({booking.student.grade} Grade)
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
            {booking.status === 'pending' && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  variant="contained" 
                  color="success"
                  size="small"
                  startIcon={<CheckIcon />}
                  onClick={() => onAccept(booking)}
                >
                  Accept
                </Button>
                <Button 
                  variant="outlined" 
                  color="error"
                  size="small"
                  startIcon={<CloseIcon />}
                  onClick={() => onReject(booking)}
                >
                  Reject
                </Button>
              </Box>
            )}
            {(booking.status === 'confirmed' || booking.status === 'rejected') && (
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

const ManageBookings = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    subject: '',
    grade: '',
    dateFrom: '',
    dateTo: ''
  });
  
  // Filter bookings based on tab and filters
  const filteredBookings = bookingsData.filter(booking => {
    // Filter by tab
    if (tabValue === 0) return true; // All bookings
    if (tabValue === 1) return booking.status === 'pending';
    if (tabValue === 2) return booking.status === 'confirmed';
    if (tabValue === 3) return booking.status === 'rejected';
    
    return true;
  });
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleAcceptBooking = (booking) => {
    // In a real application, this would send a request to the backend
    console.log('Accepting booking:', booking.id);
    // Update booking status in UI (in a real app, this would be done after API response)
    // For now, we'll just show a success message
    alert(`Booking from ${booking.student.name} for ${booking.subject} accepted successfully`);
  };
  
  const handleRejectBooking = (booking) => {
    setSelectedBooking(booking);
    setRejectDialogOpen(true);
  };
  
  const handleViewDetails = (booking) => {
    navigate(`/teacher/bookings/${booking.id}`);
  };
  
  const handleRejectSubmit = () => {
    // In a real application, this would send a request to the backend
    console.log('Rejecting booking:', selectedBooking.id, 'Reason:', rejectReason);
    setRejectDialogOpen(false);
    setRejectReason('');
    // Update booking status in UI (in a real app, this would be done after API response)
    // For now, we'll just show a success message
    alert(`Booking from ${selectedBooking.student.name} rejected`);
  };
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  const handleApplyFilters = () => {
    // In a real app, this would apply the filters
    console.log('Applying filters:', filters);
    setFilterDialogOpen(false);
  };
  
  const handleResetFilters = () => {
    setFilters({
      subject: '',
      grade: '',
      dateFrom: '',
      dateTo: ''
    });
  };
  
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              color="inherit" 
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/teacher/dashboard')}
              sx={{ mr: 2 }}
            >
              Back
            </Button>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              Manage Bookings
            </Typography>
          </Box>
        </Container>
      </Box>
      
      <Container maxWidth="lg">
        <Card elevation={2} sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', flexGrow: 1 }}>
                <Tabs 
                  value={tabValue} 
                  onChange={handleTabChange} 
                  variant="scrollable"
                  scrollButtons="auto"
                  allowScrollButtonsMobile
                >
                  <Tab label="All Bookings" />
                  <Tab label="Pending" />
                  <Tab label="Confirmed" />
                  <Tab label="Rejected" />
                </Tabs>
              </Box>
              <Button 
                variant="outlined" 
                startIcon={<FilterListIcon />}
                onClick={() => setFilterDialogOpen(true)}
                sx={{ ml: 2 }}
              >
                Filter
              </Button>
            </Box>
            
            <Box sx={{ mt: 3 }}>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <BookingCard 
                    key={booking.id} 
                    booking={booking} 
                    onAccept={handleAcceptBooking}
                    onReject={handleRejectBooking}
                    onViewDetails={handleViewDetails}
                  />
                ))
              ) : (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <CalendarTodayIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No bookings found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    You don't have any {tabValue === 1 ? 'pending' : tabValue === 2 ? 'confirmed' : tabValue === 3 ? 'rejected' : ''} bookings.
                  </Typography>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
        
        {/* Booking Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3, bgcolor: 'warning.light', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="div">
                  {bookingsData.filter(b => b.status === 'pending').length}
                </Typography>
                <Typography variant="body1">
                  Pending Bookings
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3, bgcolor: 'success.light', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="div">
                  {bookingsData.filter(b => b.status === 'confirmed').length}
                </Typography>
                <Typography variant="body1">
                  Confirmed Bookings
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3, bgcolor: 'error.light', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="div">
                  {bookingsData.filter(b => b.status === 'rejected').length}
                </Typography>
                <Typography variant="body1">
                  Rejected Bookings
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3, bgcolor: 'primary.light', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="div">
                  {bookingsData.length}
                </Typography>
                <Typography variant="body1">
                  Total Bookings
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      
      {/* Reject Booking Dialog */}
      <Dialog open={rejectDialogOpen} onClose={() => setRejectDialogOpen(false)}>
        <DialogTitle>Reject Booking</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Are you sure you want to reject this booking?
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
                Student: {selectedBooking.student.name}
              </Typography>
            </Box>
          )}
          <TextField
            label="Reason for rejection"
            multiline
            rows={3}
            fullWidth
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Please provide a reason for rejection"
          />
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
            Note: The student will be notified about this rejection.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectDialogOpen(false)}>
            Back
          </Button>
          <Button 
            onClick={handleRejectSubmit} 
            color="error" 
            variant="contained"
            disabled={!rejectReason}
          >
            Confirm Rejection
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Filter Dialog */}
      <Dialog open={filterDialogOpen} onClose={() => setFilterDialogOpen(false)}>
        <DialogTitle>Filter Bookings</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Subject</InputLabel>
                <Select
                  name="subject"
                  value={filters.subject}
                  onChange={handleFilterChange}
                  label="Subject"
                >
                  <MenuItem value="">All Subjects</MenuItem>
                  <MenuItem value="Mathematics">Mathematics</MenuItem>
                  <MenuItem value="Science">Science</MenuItem>
                  <MenuItem value="English">English</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Grade</InputLabel>
                <Select
                  name="grade"
                  value={filters.grade}
                  onChange={handleFilterChange}
                  label="Grade"
                >
                  <MenuItem value="">All Grades</MenuItem>
                  <MenuItem value="6th">6th Grade</MenuItem>
                  <MenuItem value="7th">7th Grade</MenuItem>
                  <MenuItem value="8th">8th Grade</MenuItem>
                  <MenuItem value="9th">9th Grade</MenuItem>
                  <MenuItem value="10th">10th Grade</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="dateFrom"
                label="From Date"
                type="date"
                fullWidth
                value={filters.dateFrom}
                onChange={handleFilterChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="dateTo"
                label="To Date"
                type="date"
                fullWidth
                value={filters.dateTo}
                onChange={handleFilterChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResetFilters}>
            Reset
          </Button>
          <Button onClick={() => setFilterDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleApplyFilters} 
            variant="contained"
          >
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageBookings;
