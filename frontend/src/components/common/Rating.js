import React, { useState } from 'react';
import {
  Box,
  Typography,
  Rating as MuiRating,
  LinearProgress,
  Paper,
  Grid,
  Tooltip,
  useTheme
} from '@mui/material';
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  StarHalf as StarHalfIcon
} from '@mui/icons-material';

/**
 * A reusable rating component with detailed statistics
 * 
 * @param {Object} props - Component props
 * @param {number} props.value - Current rating value
 * @param {function} props.onChange - Callback when rating changes
 * @param {boolean} props.readOnly - Whether rating is read-only
 * @param {boolean} props.showStats - Whether to show rating statistics
 * @param {Object} props.stats - Rating statistics object
 * @param {number} props.precision - Rating precision (0.5 or 1)
 * @param {string} props.label - Label for the rating
 * @param {Object} props.sx - Additional styles to apply
 */
const Rating = ({
  value = 0,
  onChange,
  readOnly = false,
  showStats = false,
  stats = null,
  precision = 0.5,
  label = 'Rating',
  sx = {}
}) => {
  const theme = useTheme();
  const [hover, setHover] = useState(-1);
  
  // Default stats if not provided
  const defaultStats = {
    average: value,
    total: 0,
    distribution: {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    }
  };
  
  const ratingStats = stats || defaultStats;
  
  // Calculate percentage for each rating level
  const calculatePercentage = (count) => {
    if (!ratingStats.total || ratingStats.total === 0) return 0;
    return (count / ratingStats.total) * 100;
  };
  
  // Get label text based on rating value
  const getRatingLabel = (rating) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 3.5) return 'Very Good';
    if (rating >= 2.5) return 'Good';
    if (rating >= 1.5) return 'Fair';
    return 'Poor';
  };
  
  // Get color based on rating value
  const getRatingColor = (rating) => {
    if (rating >= 4.5) return theme.palette.success.main;
    if (rating >= 3.5) return theme.palette.success.light;
    if (rating >= 2.5) return theme.palette.warning.main;
    if (rating >= 1.5) return theme.palette.warning.light;
    return theme.palette.error.main;
  };
  
  return (
    <Box sx={{ ...sx }}>
      {/* Basic Rating */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: showStats ? 2 : 0 }}>
        {label && (
          <Typography 
            component="legend" 
            variant="body2" 
            sx={{ mr: 1, minWidth: 60 }}
          >
            {label}:
          </Typography>
        )}
        
        <MuiRating
          value={value}
          precision={precision}
          onChange={(event, newValue) => {
            if (onChange) onChange(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          readOnly={readOnly}
          icon={<StarIcon fontSize="inherit" />}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
          sx={{
            '& .MuiRating-iconFilled': {
              color: getRatingColor(value),
            },
            '& .MuiRating-iconHover': {
              color: getRatingColor(hover !== -1 ? hover : value),
            },
          }}
        />
        
        {readOnly ? (
          <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mr: 0.5 }}>
              {value.toFixed(1)}
            </Typography>
            {ratingStats.total > 0 && (
              <Typography variant="body2" color="text.secondary">
                ({ratingStats.total} {ratingStats.total === 1 ? 'review' : 'reviews'})
              </Typography>
            )}
          </Box>
        ) : (
          <Box sx={{ ml: 2 }}>
            {hover !== -1 ? (
              <Typography variant="body2">
                {getRatingLabel(hover)}
              </Typography>
            ) : value > 0 ? (
              <Typography variant="body2">
                {getRatingLabel(value)}
              </Typography>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Select rating
              </Typography>
            )}
          </Box>
        )}
      </Box>
      
      {/* Rating Statistics */}
      {showStats && ratingStats && (
        <Paper 
          elevation={0} 
          sx={{ 
            p: 2, 
            borderRadius: 2, 
            backgroundColor: theme.palette.background.default,
            mt: 2
          }}
        >
          <Grid container spacing={2}>
            {/* Average Rating */}
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: getRatingColor(ratingStats.average) }}>
                  {ratingStats.average.toFixed(1)}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                  <MuiRating
                    value={ratingStats.average}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {ratingStats.total} {ratingStats.total === 1 ? 'review' : 'reviews'}
                </Typography>
              </Box>
            </Grid>
            
            {/* Rating Distribution */}
            <Grid item xs={12} sm={8}>
              <Box>
                {[5, 4, 3, 2, 1].map((star) => (
                  <Box key={star} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ minWidth: 20 }}>
                      {star}
                    </Typography>
                    <StarIcon sx={{ fontSize: 16, color: theme.palette.warning.main, mx: 0.5 }} />
                    <Box sx={{ flex: 1, mx: 1 }}>
                      <Tooltip title={`${ratingStats.distribution[star]} reviews`} arrow>
                        <LinearProgress
                          variant="determinate"
                          value={calculatePercentage(ratingStats.distribution[star])}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: theme.palette.grey[200],
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: star >= 4 
                                ? theme.palette.success.main 
                                : star >= 3 
                                  ? theme.palette.warning.main 
                                  : theme.palette.error.main
                            }
                          }}
                        />
                      </Tooltip>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 40, textAlign: 'right' }}>
                      {ratingStats.total > 0 
                        ? `${Math.round(calculatePercentage(ratingStats.distribution[star]))}%` 
                        : '0%'
                      }
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default Rating;
