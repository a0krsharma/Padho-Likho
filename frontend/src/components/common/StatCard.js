import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  LinearProgress,
  CircularProgress,
  Tooltip,
  useTheme
} from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';

/**
 * A reusable stat card component for dashboards
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {string|number} props.value - Main stat value
 * @param {string} props.subtitle - Optional subtitle or description
 * @param {React.ReactNode} props.icon - Icon to display
 * @param {string} props.iconColor - Color for the icon background
 * @param {number} props.progress - Optional progress value (0-100)
 * @param {string} props.progressColor - Color for the progress bar
 * @param {string} props.trend - Trend direction ('up', 'down', or null)
 * @param {string|number} props.trendValue - Trend value to display
 * @param {string} props.tooltipText - Text to display in tooltip
 * @param {Object} props.sx - Additional styles to apply
 */
const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  iconColor = 'primary.main',
  progress,
  progressColor,
  trend,
  trendValue,
  tooltipText,
  sx = {}
}) => {
  const theme = useTheme();

  // Determine trend color
  const getTrendColor = () => {
    if (trend === 'up') return theme.palette.success.main;
    if (trend === 'down') return theme.palette.error.main;
    return theme.palette.text.secondary;
  };

  // Determine trend symbol
  const getTrendSymbol = () => {
    if (trend === 'up') return '↑';
    if (trend === 'down') return '↓';
    return '';
  };

  return (
    <Card 
      elevation={1} 
      sx={{ 
        height: '100%',
        borderRadius: 2,
        overflow: 'visible',
        position: 'relative',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3
        },
        ...sx
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header with title and icon */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {icon && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: '12px',
                backgroundColor: `${iconColor}15`,
                color: iconColor,
                mr: 2
              }}
            >
              {icon}
            </Box>
          )}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                {title}
              </Typography>
              {tooltipText && (
                <Tooltip title={tooltipText} arrow>
                  <IconButton size="small" sx={{ ml: 0.5, p: 0 }}>
                    <InfoIcon fontSize="small" color="action" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Main value */}
        <Box sx={{ display: 'flex', alignItems: 'baseline', mb: progress !== undefined ? 1 : 0 }}>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
            {value}
          </Typography>
          {trend && trendValue && (
            <Typography 
              variant="body2" 
              component="span" 
              sx={{ 
                ml: 1, 
                color: getTrendColor(),
                fontWeight: 'medium'
              }}
            >
              {getTrendSymbol()} {trendValue}
            </Typography>
          )}
        </Box>

        {/* Progress bar */}
        {progress !== undefined && (
          <Box sx={{ mt: 2, mb: 1 }}>
            {typeof progress === 'number' ? (
              <LinearProgress 
                variant="determinate" 
                value={Math.min(Math.max(progress, 0), 100)} 
                color={progressColor || "primary"}
                sx={{ 
                  height: 6, 
                  borderRadius: 3,
                  backgroundColor: theme.palette.grey[200]
                }}
              />
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress size={24} color={progressColor || "primary"} />
              </Box>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
