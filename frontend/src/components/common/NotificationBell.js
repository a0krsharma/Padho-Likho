import React, { useState } from 'react';
import {
  IconButton,
  Badge,
  Menu,
  Typography,
  Box,
  Divider,
  Avatar,
  ListItemText,
  ListItemAvatar,
  List,
  ListItem,
  Button,
  Tooltip
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Assignment as AssignmentIcon,
  Event as EventIcon,
  Message as MessageIcon,
  Feedback as FeedbackIcon,
  Check as CheckIcon,
  MarkEmailRead as MarkEmailReadIcon
} from '@mui/icons-material';

/**
 * A notification bell component with dropdown menu
 * 
 * @param {Object} props - Component props
 * @param {Array} props.notifications - Array of notification objects
 * @param {function} props.onNotificationClick - Callback when notification is clicked
 * @param {function} props.onMarkAllRead - Callback when "Mark all as read" is clicked
 */
const NotificationBell = ({ 
  notifications = [], 
  onNotificationClick, 
  onMarkAllRead 
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleNotificationClick = (notification) => {
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
    handleClose();
  };
  
  const handleMarkAllRead = () => {
    if (onMarkAllRead) {
      onMarkAllRead();
    }
    handleClose();
  };
  
  // Get appropriate icon for notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'assignment':
        return <AssignmentIcon color="primary" />;
      case 'class':
      case 'booking':
        return <EventIcon color="info" />;
      case 'message':
        return <MessageIcon color="success" />;
      case 'feedback':
        return <FeedbackIcon color="warning" />;
      default:
        return <NotificationsIcon color="action" />;
    }
  };
  
  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          onClick={handleClick}
          size="large"
          aria-label={`show ${unreadCount} new notifications`}
          color="inherit"
        >
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
            mt: 1.5,
            width: 320,
            maxHeight: 400,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            }
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2, pb: 1 }}>
          <Typography variant="h6" component="div">
            Notifications
          </Typography>
        </Box>
        
        <Divider />
        
        {notifications.length > 0 ? (
          <>
            <List sx={{ p: 0 }}>
              {notifications.map((notification) => (
                <ListItem
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  button
                  sx={{
                    backgroundColor: notification.read ? 'transparent' : 'rgba(25, 118, 210, 0.08)',
                    '&:hover': {
                      backgroundColor: notification.read ? 'rgba(0, 0, 0, 0.04)' : 'rgba(25, 118, 210, 0.12)',
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'background.paper' }}>
                      {getNotificationIcon(notification.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={notification.message}
                    secondary={notification.time}
                    primaryTypographyProps={{
                      variant: 'body2',
                      fontWeight: notification.read ? 'normal' : 'medium',
                    }}
                  />
                </ListItem>
              ))}
            </List>
            
            <Divider />
            
            <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
              <Button
                startIcon={<MarkEmailReadIcon />}
                onClick={handleMarkAllRead}
                size="small"
                sx={{ width: '100%', m: 1 }}
              >
                Mark all as read
              </Button>
            </Box>
          </>
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <CheckIcon color="success" sx={{ fontSize: 40, mb: 1, opacity: 0.7 }} />
            <Typography variant="body2" color="text.secondary">
              No new notifications
            </Typography>
          </Box>
        )}
      </Menu>
    </>
  );
};

export default NotificationBell;
