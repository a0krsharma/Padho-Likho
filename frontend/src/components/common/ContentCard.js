import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardActions, 
  Typography, 
  IconButton, 
  Box,
  Divider
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

/**
 * A reusable content card component with consistent styling
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {string} props.subtitle - Optional card subtitle
 * @param {React.ReactNode} props.icon - Optional icon to display in header
 * @param {React.ReactNode} props.children - Card content
 * @param {React.ReactNode} props.actions - Optional card actions
 * @param {boolean} props.elevation - Card elevation (default: 1)
 * @param {function} props.onMoreClick - Optional callback for more options button
 * @param {Object} props.sx - Additional styles to apply to the card
 */
const ContentCard = ({ 
  title, 
  subtitle, 
  icon, 
  children, 
  actions, 
  elevation = 1, 
  onMoreClick,
  sx = {}
}) => {

  return (
    <Card 
      elevation={elevation} 
      sx={{ 

        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 4,
        overflow: 'visible',
        mb: { xs: 3, md: 4 },
        p: { xs: 1, md: 2 },
        boxSizing: 'border-box',
        ...sx
      }}
    >
      {title && (
        <>
          <CardHeader
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {icon && <Box sx={{ color: 'primary.main' }}>{icon}</Box>}
                <Typography variant="h6" component="h2" sx={{ fontWeight: 'medium' }}>
                  {title}
                </Typography>
              </Box>
            }
            subheader={subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
            action={
              onMoreClick && (
                <IconButton onClick={onMoreClick} size="small">
                  <MoreVertIcon />
                </IconButton>
              )
            }
            sx={{ 
              pb: 1,
              '& .MuiCardHeader-action': {
                margin: 0
              }
            }}
          />
          <Divider />
        </>
      )}
      <CardContent sx={{ flexGrow: 1, pt: title ? 2 : 1 }}>
        {children}
      </CardContent>
      {actions && (
        <CardActions sx={{ p: 2, pt: 0 }}>
          {actions}
        </CardActions>
      )}
    </Card>
  );
};

export default ContentCard;
