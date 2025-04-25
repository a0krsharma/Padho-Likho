import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Divider,
  Chip,
  Grid,
  Button
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  School as SchoolIcon,
  LocationOn as LocationIcon,
  Edit as EditIcon
} from '@mui/icons-material';

/**
 * ProfileCard component
 * Displays user profile information in a card layout
 */
const ProfileCard = ({ user, onEdit }) => {
  // Generate avatar from user's name
  const getInitials = (name) => {
    if (!name) return 'U';
    const nameParts = name.split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  // Get role-specific information
  const getRoleSpecificInfo = () => {
    if (!user) return null;
    
    switch (user.role) {
      case 'student':
        return (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SchoolIcon sx={{ color: 'primary.main', mr: 2 }} />
              <Box>
                <Typography variant="body2" color="textSecondary">Class</Typography>
                <Typography variant="body1">{user.class || 'Not specified'}</Typography>
              </Box>
            </Box>
            {user.subjects && user.subjects.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>Subjects</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {user.subjects.map((subject, index) => (
                    <Chip key={index} label={subject} size="small" color="primary" variant="outlined" />
                  ))}
                </Box>
              </Box>
            )}
          </>
        );
      case 'teacher':
        return (
          <>
            {user.qualifications && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SchoolIcon sx={{ color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="body2" color="textSecondary">Qualifications</Typography>
                  <Typography variant="body1">{user.qualifications}</Typography>
                </Box>
              </Box>
            )}
            {user.experience && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SchoolIcon sx={{ color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="body2" color="textSecondary">Experience</Typography>
                  <Typography variant="body1">{user.experience} years</Typography>
                </Box>
              </Box>
            )}
            {user.subjects && user.subjects.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>Subjects Taught</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {user.subjects.map((subject, index) => (
                    <Chip key={index} label={subject} size="small" color="primary" variant="outlined" />
                  ))}
                </Box>
              </Box>
            )}
          </>
        );
      case 'parent':
        return (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>Children</Typography>
            {user.children && user.children.length > 0 ? (
              user.children.map((child, index) => (
                <Typography key={index} variant="body1">{child.name} - Class {child.class}</Typography>
              ))
            ) : (
              <Typography variant="body1">No children added yet</Typography>
            )}
          </Box>
        );
      default:
        return null;
    }
  };

  if (!user) {
    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Profile not available</Typography>
        </CardContent>
      </Card>
    );
  }

  const fullName = user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim();

  return (
    <Card sx={{ mb: 3, overflow: 'visible', elevation: 4, borderRadius: 4, boxShadow: '0 8px 32px 0 rgba(67,97,238,0.10)' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5" component="h2">Profile</Typography>
          {onEdit && (
            <Button 
              startIcon={<EditIcon />} 
              variant="outlined" 
              size="small"
              sx={{ borderRadius: 3, fontWeight: 600, px: 3, py: 1, boxShadow: '0 2px 8px rgba(67,97,238,0.08)', transition: 'background 0.2s', '&:hover': { background: 'linear-gradient(135deg, #4361ee 0%, #738eef 100%)', color: 'white' } }}
              onClick={onEdit}
            >
              Edit
            </Button>
          )}
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'center', sm: 'flex-start' }, mb: 3 }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: 'primary.main',
              fontSize: '2rem',
              mb: { xs: 2, sm: 0 },
              mr: { sm: 3 }
            }}
          >
            {getInitials(fullName)}
          </Avatar>
          
          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="h5" gutterBottom>{fullName}</Typography>
            <Chip 
              label={user.role.charAt(0).toUpperCase() + user.role.slice(1)} 
              color="primary" 
              size="small" 
              sx={{ mb: 1 }}
            />
            <Typography variant="body2" color="textSecondary">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EmailIcon sx={{ color: 'primary.main', mr: 2 }} />
              <Box>
                <Typography variant="body2" color="textSecondary">Email</Typography>
                <Typography variant="body1">{user.email}</Typography>
              </Box>
            </Box>
            
            {user.phone && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PhoneIcon sx={{ color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="body2" color="textSecondary">Phone</Typography>
                  <Typography variant="body1">{user.phone}</Typography>
                </Box>
              </Box>
            )}
          </Grid>
          
          <Grid item xs={12} md={6}>
            {user.address && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationIcon sx={{ color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="body2" color="textSecondary">Address</Typography>
                  <Typography variant="body1">
                    {user.address}
                    {user.city && `, ${user.city}`}
                    {user.state && `, ${user.state}`}
                    {user.zipCode && ` ${user.zipCode}`}
                  </Typography>
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        {getRoleSpecificInfo()}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
