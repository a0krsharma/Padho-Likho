import React from 'react';
import {
  Box,
  Paper,
  Typography,
  LinearProgress,
  CircularProgress,
  Grid,
  Divider,
  Chip,
  useTheme
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  TrendingFlat as TrendingFlatIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Error as ErrorIcon
} from '@mui/icons-material';

/**
 * A reusable progress tracker component for students
 * 
 * @param {Object} props - Component props
 * @param {Array} props.subjects - Array of subject progress objects
 * @param {Object} props.overall - Overall progress data
 * @param {Array} props.milestones - Array of milestone objects
 * @param {Array} props.recentActivities - Array of recent activity objects
 * @param {Object} props.sx - Additional styles to apply
 */
const ProgressTracker = ({
  subjects = [],
  overall = { completed: 0, total: 0, score: 0 },
  milestones = [],
  recentActivities = [],
  sx = {}
}) => {
  const theme = useTheme();
  
  // Calculate overall progress percentage
  const overallPercentage = overall.total > 0 
    ? Math.round((overall.completed / overall.total) * 100) 
    : 0;
  
  // Get trend icon based on trend value
  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUpIcon color="success" />;
    if (trend === 'down') return <TrendingDownIcon color="error" />;
    return <TrendingFlatIcon color="action" />;
  };
  
  // Get status icon based on status
  const getStatusIcon = (status) => {
    if (status === 'completed') return <CheckCircleIcon color="success" />;
    if (status === 'in-progress') return <ScheduleIcon color="primary" />;
    if (status === 'overdue') return <ErrorIcon color="error" />;
    return null;
  };
  
  // Get color based on progress percentage
  const getProgressColor = (percentage) => {
    if (percentage >= 75) return 'success';
    if (percentage >= 50) return 'primary';
    if (percentage >= 25) return 'warning';
    return 'error';
  };
  
  return (
    <Box sx={{ ...sx }}>
      {/* Overall Progress */}
      <Paper 
        elevation={1} 
        sx={{ 
          p: 3, 
          mb: 3, 
          borderRadius: 2,
          background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          color: 'white'
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Overall Progress
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              {overall.completed} of {overall.total} lessons completed
            </Typography>
            
            <Box sx={{ mb: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={overallPercentage} 
                sx={{ 
                  height: 10, 
                  borderRadius: 5,
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: 'white'
                  }
                }} 
              />
            </Box>
            
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {overallPercentage}% Complete
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Box sx={{ display: 'inline-flex', position: 'relative' }}>
              <CircularProgress 
                variant="determinate" 
                value={100} 
                size={120} 
                thickness={4}
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.3)',
                  position: 'absolute'
                }} 
              />
              <CircularProgress 
                variant="determinate" 
                value={overall.score} 
                size={120} 
                thickness={4}
                sx={{ color: 'white' }} 
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                  {overall.score}%
                </Typography>
              </Box>
            </Box>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Average Score
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Subject Progress */}
      <Typography variant="h6" gutterBottom>
        Subject Progress
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {subjects.map((subject, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper 
              elevation={1} 
              sx={{ 
                p: 2, 
                height: '100%',
                borderRadius: 2
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'medium', flex: 1 }}>
                  {subject.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {getTrendIcon(subject.trend)}
                  <Typography 
                    variant="body2" 
                    color={
                      subject.trend === 'up' ? 'success.main' : 
                      subject.trend === 'down' ? 'error.main' : 
                      'text.secondary'
                    }
                    sx={{ ml: 0.5 }}
                  >
                    {subject.trendValue || ''}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ mb: 1 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={subject.progress} 
                  color={getProgressColor(subject.progress)}
                  sx={{ height: 6, borderRadius: 3 }} 
                />
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  {subject.completed} / {subject.total} Lessons
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {subject.progress}%
                </Typography>
              </Box>
              
              {subject.nextLesson && (
                <>
                  <Divider sx={{ my: 1.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    Next: {subject.nextLesson}
                  </Typography>
                </>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      {/* Milestones */}
      {milestones.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>
            Milestones
          </Typography>
          <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
            {milestones.map((milestone, index) => (
              <React.Fragment key={index}>
                {index > 0 && <Divider sx={{ my: 2 }} />}
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Box 
                    sx={{ 
                      mr: 2,
                      mt: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: 
                        milestone.status === 'completed' ? 'success.light' :
                        milestone.status === 'in-progress' ? 'primary.light' :
                        milestone.status === 'overdue' ? 'error.light' : 'grey.200'
                    }}
                  >
                    {getStatusIcon(milestone.status)}
                  </Box>
                  
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'medium', mr: 1 }}>
                        {milestone.title}
                      </Typography>
                      
                      <Chip 
                        label={milestone.status} 
                        size="small"
                        color={
                          milestone.status === 'completed' ? 'success' :
                          milestone.status === 'in-progress' ? 'primary' :
                          milestone.status === 'overdue' ? 'error' : 'default'
                        }
                        variant="outlined"
                        sx={{ height: 20, borderRadius: 1 }}
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {milestone.description}
                    </Typography>
                    
                    {milestone.dueDate && (
                      <Typography variant="caption" color="text.secondary">
                        Due: {new Date(milestone.dueDate).toLocaleDateString()}
                      </Typography>
                    )}
                  </Box>
                  
                  {milestone.progress !== undefined && (
                    <Box sx={{ ml: 2, minWidth: 60, textAlign: 'right' }}>
                      <Typography variant="h6" color={getProgressColor(milestone.progress)}>
                        {milestone.progress}%
                      </Typography>
                    </Box>
                  )}
                </Box>
              </React.Fragment>
            ))}
          </Paper>
        </>
      )}
      
      {/* Recent Activities */}
      {recentActivities.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>
            Recent Activities
          </Typography>
          <Paper elevation={1} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            {recentActivities.map((activity, index) => (
              <Box 
                key={index}
                sx={{ 
                  p: 2,
                  borderBottom: index < recentActivities.length - 1 ? '1px solid' : 'none',
                  borderColor: 'divider',
                  '&:hover': {
                    backgroundColor: 'action.hover'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Box 
                    sx={{ 
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: `${activity.color || 'primary'}.light`,
                      color: `${activity.color || 'primary'}.main`
                    }}
                  >
                    {activity.icon || <CheckCircleIcon />}
                  </Box>
                  
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2">
                      {activity.title}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary">
                      {activity.description}
                    </Typography>
                    
                    {activity.score !== undefined && (
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        <Typography 
                          variant="body2" 
                          color={activity.score >= 70 ? 'success.main' : 'warning.main'}
                          sx={{ fontWeight: 'medium' }}
                        >
                          Score: {activity.score}%
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  
                  <Typography variant="caption" color="text.secondary">
                    {new Date(activity.timestamp).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Paper>
        </>
      )}
    </Box>
  );
};

export default ProgressTracker;
