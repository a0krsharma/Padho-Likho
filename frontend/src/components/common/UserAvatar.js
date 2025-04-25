import React from 'react';
import { Avatar, Badge, Tooltip, Box } from '@mui/material';
import { 
  Person as PersonIcon,
  School as SchoolIcon,
  SupervisorAccount as SupervisorAccountIcon,
  Verified as VerifiedIcon
} from '@mui/icons-material';

/**
 * A reusable user avatar component with role indicators
 * 
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.name - User's name (used for alt text and to generate initials)
 * @param {string} props.role - User role (student, teacher, parent, admin)
 * @param {boolean} props.verified - Whether the user is verified
 * @param {string} props.size - Avatar size (small, medium, large)
 * @param {boolean} props.showBadge - Whether to show role badge
 * @param {Object} props.sx - Additional styles to apply
 */
const UserAvatar = ({ 
  src, 
  name = '', 
  role = 'student', 
  verified = false, 
  size = 'medium', 
  showBadge = true,
  sx = {} 
}) => {
  // Generate initials from name
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Get avatar size based on size prop
  const getAvatarSize = (size) => {
    switch (size) {
      case 'small':
        return { width: 32, height: 32 };
      case 'large':
        return { width: 64, height: 64 };
      case 'xlarge':
        return { width: 96, height: 96 };
      case 'medium':
      default:
        return { width: 40, height: 40 };
    }
  };
  
  // Get badge icon based on role
  const getBadgeIcon = (role) => {
    switch (role.toLowerCase()) {
      case 'teacher':
        return <SchoolIcon fontSize="small" />;
      case 'parent':
        return <SupervisorAccountIcon fontSize="small" />;
      case 'admin':
        return <VerifiedIcon fontSize="small" />;
      case 'student':
      default:
        return <PersonIcon fontSize="small" />;
    }
  };
  
  // Get badge color based on role
  const getBadgeColor = (role) => {
    switch (role.toLowerCase()) {
      case 'teacher':
        return 'primary';
      case 'parent':
        return 'success';
      case 'admin':
        return 'error';
      case 'student':
      default:
        return 'info';
    }
  };
  
  const avatarSx = {
    ...getAvatarSize(size),
    bgcolor: !src ? `${getBadgeColor(role)}.main` : undefined,
    ...sx
  };
  
  const avatar = (
    <Avatar 
      src={src} 
      alt={name || 'User'} 
      sx={avatarSx}
    >
      {!src && getInitials(name)}
    </Avatar>
  );
  
  // If verification badge is needed
  if (verified) {
    return (
      <Tooltip title={`Verified ${role}`}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <Box
              sx={{
                bgcolor: 'background.paper',
                borderRadius: '50%',
                padding: '2px',
              }}
            >
              <VerifiedIcon color="primary" fontSize="small" />
            </Box>
          }
        >
          {avatar}
        </Badge>
      </Tooltip>
    );
  }
  
  // If role badge is needed
  if (showBadge) {
    return (
      <Tooltip title={role.charAt(0).toUpperCase() + role.slice(1)}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <Box
              sx={{
                bgcolor: 'background.paper',
                borderRadius: '50%',
                padding: '2px',
              }}
            >
              {getBadgeIcon(role)}
            </Box>
          }
        >
          {avatar}
        </Badge>
      </Tooltip>
    );
  }
  
  return avatar;
};

export default UserAvatar;
