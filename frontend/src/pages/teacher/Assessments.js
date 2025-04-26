import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Grid, Card, CardContent, Button, Tabs, Tab, Paper, Chip, IconButton, TextField, Menu, MenuItem, ListItemText, ListItemIcon, useTheme } from '@mui/material';
import { Assignment as AssignmentIcon, Add as AddIcon, MoreVert as MoreVertIcon, ArrowBack as ArrowBackIcon, Search as SearchIcon, CheckCircle as CheckCircleIcon, PendingActions as PendingActionsIcon, AccessTime as AccessTimeIcon, Delete as DeleteIcon, Edit as EditIcon, Visibility as VisibilityIcon } from '@mui/icons-material';

// Sample assessments data
const assessmentsData = [
  {
    id: 1,
    title: 'Mathematics Mid-Term Test',
    subject: 'Mathematics',
    topic: 'Algebra and Geometry',
    grade: '8th',
    type: 'Test',
    totalMarks: 50,
    dueDate: '2025-04-15',
    assignedTo: [
      { id: 1, name: 'Aryan Singh' },
      { id: 2, name: 'Ananya Sharma' }
    ],
    status: 'active',
    submissions: 1,
    pending: 1
  },
  {
    id: 2,
    title: 'Science Quiz - Chemical Reactions',
    subject: 'Science',
    topic: 'Chemical Reactions',
    grade: '9th',
    type: 'Quiz',
    totalMarks: 20,
    dueDate: '2025-04-10',
    assignedTo: [
      { id: 2, name: 'Ananya Sharma' },
      { id: 3, name: 'Rahul Verma' }
    ],
    status: 'active',
    submissions: 2,
    pending: 0
  },
  {
    id: 3,
    title: 'Mathematics Assignment - Trigonometry',
    subject: 'Mathematics',
    topic: 'Trigonometry',
    grade: '10th',
    type: 'Assignment',
    totalMarks: 30,
    dueDate: '2025-04-05',
    assignedTo: [
      { id: 5, name: 'Vikram Mehta' }
    ],
    status: 'completed',
    submissions: 1,
    pending: 0
  },
  {
    id: 4,
    title: 'English Essay - My Favorite Book',
    subject: 'English',
    topic: 'Essay Writing',
    grade: '7th',
    type: 'Assignment',
    totalMarks: 25,
    dueDate: '2025-04-20',
    assignedTo: [
      { id: 4, name: 'Priya Patel' }
    ],
    status: 'active',
    submissions: 0,
    pending: 1
  },
  {
    id: 5,
    title: 'Science Project - Renewable Energy',
    subject: 'Science',
    topic: 'Energy Resources',
    grade: '10th',
    type: 'Project',
    totalMarks: 100,
    dueDate: '2025-05-10',
    assignedTo: [
      { id: 2, name: 'Ananya Sharma' },
      { id: 5, name: 'Vikram Mehta' }
    ],
    status: 'draft',
    submissions: 0,
    pending: 0
  }
];

const AssessmentCard = ({ assessment, onView, onEdit, onDelete, onViewSubmissions }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  // Get status color and icon
  const getStatusInfo = (status) => {
    switch (status) {
      case 'active':
        return { 
          color: theme.palette.primary.main, 
          label: 'Active',
          icon: <AccessTimeIcon fontSize="small" />
        };
      case 'completed':
        return { 
          color: theme.palette.success.main, 
          label: 'Completed',
          icon: <CheckCircleIcon fontSize="small" />
        };
      case 'draft':
        return { 
          color: theme.palette.warning.main, 
          label: 'Draft',
          icon: <PendingActionsIcon fontSize="small" />
        };
      default:
        return { 
          color: theme.palette.text.secondary, 
          label: status,
          icon: <AssignmentIcon fontSize="small" />
        };
    }
  };
  
  const statusInfo = getStatusInfo(assessment.status);
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <Paper elevation={1} sx={{ mb: 3, borderRadius: 3, overflow: 'hidden' }}>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                {assessment.title}
              </Typography>
              <Box>
                <Chip 
                  icon={statusInfo.icon}
                  label={statusInfo.label} 
                  size="small"
                  sx={{ 
                    bgcolor: `${statusInfo.color}15`, 
                    color: statusInfo.color,
                    fontWeight: 'medium',
                    mr: 1
                  }}
                />
                <IconButton size="small" onClick={handleMenuOpen}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => {
                    handleMenuClose();
                    onView(assessment);
                  }}>
                    <ListItemIcon>
                      <VisibilityIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>View Details</ListItemText>
                  </MenuItem>
                  {assessment.status !== 'completed' && (
                    <MenuItem onClick={() => {
                      handleMenuClose();
                      onEdit(assessment);
                    }}>
                      <ListItemIcon>
                        <EditIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Edit</ListItemText>
                    </MenuItem>
                  )}
                  <MenuItem onClick={() => {
                    handleMenuClose();
                    onViewSubmissions(assessment);
                  }}>
                    <ListItemIcon>
                      <AssignmentIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>View Submissions</ListItemText>
                  </MenuItem>
                  {assessment.status === 'draft' && (
                    <MenuItem onClick={() => {
                      handleMenuClose();
                      onDelete(assessment);
                    }}>
                      <ListItemIcon>
                        <DeleteIcon fontSize="small" color="error" />
                      </ListItemIcon>
                      <ListItemText sx={{ color: 'error.main' }}>Delete</ListItemText>
                    </MenuItem>
                  )}
                </Menu>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="text.secondary">
              <strong>Subject:</strong> {assessment.subject}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Topic:</strong> {assessment.topic}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Grade:</strong> {assessment.grade}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="text.secondary">
              <strong>Type:</strong> {assessment.type}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Total Marks:</strong> {assessment.totalMarks}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Due Date:</strong> {formatDate(assessment.dueDate)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="text.secondary">
              <strong>Assigned to:</strong> {assessment.assignedTo.length} students
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Submissions:</strong> {assessment.submissions}/{assessment.assignedTo.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Pending Review:</strong> {assessment.pending}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <Button 
                variant="outlined" 
                size="small"
                startIcon={<VisibilityIcon />}
                onClick={() => onView(assessment)}
              >
                View
              </Button>
              {assessment.status !== 'completed' && (
                <Button 
                  variant="outlined" 
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => onEdit(assessment)}
                >
                  Edit
                </Button>
              )}
              <Button 
                variant="contained" 
                size="small"
                startIcon={<AssignmentIcon />}
                onClick={() => onViewSubmissions(assessment)}
              >
                Submissions
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

const TeacherAssessments = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter assessments based on tab and search query
  const filteredAssessments = assessmentsData.filter(assessment => {
    // Filter by tab
    if (tabValue === 0) return true; // All assessments
    if (tabValue === 1) return assessment.status === 'active';
    if (tabValue === 2) return assessment.status === 'completed';
    if (tabValue === 3) return assessment.status === 'draft';
    
    return true;
  }).filter(assessment => {
    // Filter by search query
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      assessment.title.toLowerCase().includes(query) ||
      assessment.subject.toLowerCase().includes(query) ||
      assessment.topic.toLowerCase().includes(query)
    );
  });
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const handleViewAssessment = (assessment) => {
    navigate(`/teacher/assessments/${assessment.id}`);
  };
  
  const handleEditAssessment = (assessment) => {
    navigate(`/teacher/assessments/${assessment.id}/edit`);
  };
  
  const handleDeleteAssessment = (assessment) => {
    // In a real application, this would send a request to the backend
    console.log('Deleting assessment:', assessment.id);
    // For now, we'll just show a confirmation message
    if (window.confirm(`Are you sure you want to delete "${assessment.title}"?`)) {
      alert('Assessment deleted successfully');
    }
  };
  
  const handleViewSubmissions = (assessment) => {
    navigate(`/teacher/assessments/${assessment.id}/submissions`);
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
              Assessments
            </Typography>
          </Box>
        </Container>
      </Box>
      
      <Container maxWidth="lg">
        {/* Search and Create */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Search assessments by title, subject, or topic..."
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
              }}
              variant="outlined"
              size="small"
              sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button 
              variant="contained" 
              fullWidth
              startIcon={<AddIcon />}
              onClick={() => navigate('/teacher/create-assessment')}
            >
              Create New Assessment
            </Button>
          </Grid>
        </Grid>
        
        {/* Assessment Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3, bgcolor: 'primary.light', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h3" component="div">
                  {assessmentsData.filter(a => a.status === 'active').length}
                </Typography>
                <Typography variant="body1">
                  Active
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3, bgcolor: 'success.light', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h3" component="div">
                  {assessmentsData.filter(a => a.status === 'completed').length}
                </Typography>
                <Typography variant="body1">
                  Completed
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3, bgcolor: 'warning.light', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h3" component="div">
                  {assessmentsData.filter(a => a.status === 'draft').length}
                </Typography>
                <Typography variant="body1">
                  Drafts
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card elevation={2} sx={{ borderRadius: 3, bgcolor: 'info.light', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h3" component="div">
                  {assessmentsData.reduce((total, a) => total + a.pending, 0)}
                </Typography>
                <Typography variant="body1">
                  Pending Review
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        <Card elevation={2} sx={{ borderRadius: 3, mb: 4 }}>
          <CardContent>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
              >
                <Tab label="All Assessments" />
                <Tab label="Active" />
                <Tab label="Completed" />
                <Tab label="Drafts" />
              </Tabs>
            </Box>
            
            <Box sx={{ mt: 3 }}>
              {filteredAssessments.length > 0 ? (
                filteredAssessments.map((assessment) => (
                  <AssessmentCard 
                    key={assessment.id} 
                    assessment={assessment} 
                    onView={handleViewAssessment}
                    onEdit={handleEditAssessment}
                    onDelete={handleDeleteAssessment}
                    onViewSubmissions={handleViewSubmissions}
                  />
                ))
              ) : (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <AssignmentIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No assessments found
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {searchQuery 
                      ? "No assessments match your search criteria." 
                      : `You don't have any ${tabValue === 1 ? 'active' : tabValue === 2 ? 'completed' : tabValue === 3 ? 'draft' : ''} assessments.`}
                  </Typography>
                  <Button 
                    variant="contained" 
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/teacher/create-assessment')}
                    sx={{ mt: 2 }}
                  >
                    Create New Assessment
                  </Button>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default TeacherAssessments;
