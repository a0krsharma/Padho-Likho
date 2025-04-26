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
  
  IconButton,
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
  VideoCall as VideoCallIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
  CalendarToday as CalendarTodayIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Sample classes data
const classesData = [
  {
    id: 1,
    subject: 'Mathematics',
    topic: 'Quadratic Equations',
    student: {
      id: 1,
      name: 'Aryan Singh',
      image: null
    },
    date: '2025-04-10',
    time: '4:00 PM - 5:00 PM',
    status: 'upcoming'
  },
  {
    id: 2,
    subject: 'Science',
    topic: 'Chemical Reactions',
    student: {
      id: 2,
      name: 'Ananya Sharma',
      image: null
    },
    date: '2025-04-15',
    time: '5:30 PM - 6:30 PM',
    status: 'upcoming'
  },
  {
    id: 3,
    subject: 'Mathematics',
    topic: 'Trigonometry',
    student: {
      id: 3,
      name: 'Rahul Verma',
      image: null
    },
    date: '2025-04-16',
    time: '7:00 PM - 8:00 PM',
    status: 'upcoming'
  },
  {
    id: 4,
    subject: 'English',
    topic: 'Essay Writing',
    student: {
      id: 4,
      name: 'Priya Patel',
      image: null
    },
    date: '2025-04-03',
    time: '3:00 PM - 4:00 PM',
    status: 'completed'
  },
  {
    id: 5,
    subject: 'Mathematics',
    topic: 'Algebra',
    student: {
      id: 1,
      name: 'Aryan Singh',
      image: null
    },
    date: '2025-03-28',
    time: '4:00 PM - 5:00 PM',
    status: 'completed'
  },
  {
    id: 6,
    subject: 'Science',
    topic: 'Biology - Human Body',
    student: {
      id: 5,
      name: 'Vikram Mehta',
      image: null
    },
    date: '2025-03-25',
    time: '6:00 PM - 7:00 PM',
    status: 'cancelled'
  }
];

const ClassCard = ({ classItem, onJoin, onEdit, onCancel, onViewDetails }) => {
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
          bgcolor: getStatusColor(classItem.status),
          color: 'white',
          textAlign: 'center',
          textTransform: 'uppercase',
          fontSize: '0.75rem',
          fontWeight: 'bold'
        }}
      >
        {classItem.status}
      </Box>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={7}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ mr: 2 }}>
                {classItem.student.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                  {classItem.subject}: {classItem.topic}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <PersonIcon fontSize="small" sx={{ mr: 0.5 }} /> {classItem.student.name}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                <EventIcon fontSize="small" sx={{ mr: 0.5 }} /> {formatDate(classItem.date)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} /> {classItem.time}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {classItem.status === 'upcoming' && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button 
                  variant="contained" 
                  size="small"
                  startIcon={<VideoCallIcon />}
                  onClick={() => onJoin(classItem)}
                >
                  Start
                </Button>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton 
                    size="small" 
                    color="primary"
                    onClick={() => onEdit(classItem)}
                    title="Edit"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => onCancel(classItem)}
                    title="Cancel"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            )}
            {classItem.status === 'completed' && (
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => onViewDetails(classItem)}
              >
                View Details
              </Button>
            )}
            {classItem.status === 'cancelled' && (
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => onViewDetails(classItem)}
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

const ManageClasses = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [editFormData, setEditFormData] = useState({
    topic: '',
    date: '',
    time: ''
  });
  const [cancelReason, setCancelReason] = useState('');
  
  // Filter classes based on tab
  const filteredClasses = classesData.filter(classItem => {
    if (tabValue === 0) return true; // All classes
    if (tabValue === 1) return classItem.status === 'upcoming';
    if (tabValue === 2) return classItem.status === 'completed';
    if (tabValue === 3) return classItem.status === 'cancelled';
    return true;
  });
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleJoinClass = (classItem) => {
    navigate(`/classroom/${classItem.id}`);
  };
  
  const handleEditClass = (classItem) => {
    setSelectedClass(classItem);
    setEditFormData({
      topic: classItem.topic,
      date: classItem.date,
      time: classItem.time.split(' - ')[0]
    });
    setEditDialogOpen(true);
  };
  
  const handleCancelClass = (classItem) => {
    setSelectedClass(classItem);
    setCancelDialogOpen(true);
  };
  
  const handleViewDetails = (classItem) => {
    navigate(`/teacher/classes/${classItem.id}`);
  };
  
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };
  
  const handleEditSubmit = () => {
    // In a real application, this would send a request to the backend
    console.log('Editing class:', selectedClass.id, 'New data:', editFormData);
    setEditDialogOpen(false);
    // Update class in UI (in a real app, this would be done after API response)
    // For now, we'll just show a success message
    alert('Class updated successfully');
  };
  
  const handleCancelSubmit = () => {
    // In a real application, this would send a request to the backend
    console.log('Cancelling class:', selectedClass.id, 'Reason:', cancelReason);
    setCancelDialogOpen(false);
    setCancelReason('');
    // Update class status in UI (in a real app, this would be done after API response)
    // For now, we'll just show a success message
    alert('Class cancelled successfully');
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
              Manage Classes
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
                  <Tab label="All Classes" />
                  <Tab label="Upcoming" />
                  <Tab label="Completed" />
                  <Tab label="Cancelled" />
                </Tabs>
              </Box>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={() => navigate('/teacher/schedule-class')}
                sx={{ ml: 2 }}
              >
                Schedule Class
              </Button>
            </Box>
            
            <Box sx={{ mt: 3 }}>
              {filteredClasses.length > 0 ? (
                filteredClasses.map((classItem) => (
                  <ClassCard 
                    key={classItem.id} 
                    classItem={classItem} 
                    onJoin={handleJoinClass}
                    onEdit={handleEditClass}
                    onCancel={handleCancelClass}
                    onViewDetails={handleViewDetails}
                  />
                ))
              ) : (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <CalendarTodayIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No classes found
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    You don't have any {tabValue === 1 ? 'upcoming' : tabValue === 2 ? 'completed' : tabValue === 3 ? 'cancelled' : ''} classes.
                  </Typography>
                  <Button 
                    variant="contained" 
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/teacher/schedule-class')}
                    sx={{ mt: 2 }}
                  >
                    Schedule Class
                  </Button>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
        
        {/* Class Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3, bgcolor: 'primary.light', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="div">
                  {classesData.filter(c => c.status === 'upcoming').length}
                </Typography>
                <Typography variant="body1">
                  Upcoming Classes
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3, bgcolor: 'success.light', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="div">
                  {classesData.filter(c => c.status === 'completed').length}
                </Typography>
                <Typography variant="body1">
                  Completed Classes
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3, bgcolor: 'error.light', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="div">
                  {classesData.filter(c => c.status === 'cancelled').length}
                </Typography>
                <Typography variant="body1">
                  Cancelled Classes
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3, bgcolor: 'warning.light', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="div">
                  {classesData.length}
                </Typography>
                <Typography variant="body1">
                  Total Classes
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      
      {/* Edit Class Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Class</DialogTitle>
        <DialogContent>
          {selectedClass && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Subject"
                    fullWidth
                    value={selectedClass.subject}
                    disabled
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="topic"
                    label="Topic"
                    fullWidth
                    value={editFormData.topic}
                    onChange={handleEditFormChange}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="date"
                    label="Date"
                    type="date"
                    fullWidth
                    value={editFormData.date}
                    onChange={handleEditFormChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="time"
                    label="Time"
                    type="time"
                    fullWidth
                    value={editFormData.time}
                    onChange={handleEditFormChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Student"
                    fullWidth
                    value={selectedClass.student.name}
                    disabled
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleEditSubmit} 
            variant="contained"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Cancel Class Dialog */}
      <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)}>
        <DialogTitle>Cancel Class</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Are you sure you want to cancel this class?
          </Typography>
          {selectedClass && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1">
                {selectedClass.subject}: {selectedClass.topic}
              </Typography>
              <Typography variant="body2">
                {new Date(selectedClass.date).toLocaleDateString()} | {selectedClass.time}
              </Typography>
              <Typography variant="body2">
                Student: {selectedClass.student.name}
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
            Note: The student will be notified about this cancellation.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)}>
            Back
          </Button>
          <Button 
            onClick={handleCancelSubmit} 
            color="error" 
            variant="contained"
            disabled={!cancelReason}
          >
            Confirm Cancellation
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageClasses;
