import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Divider,
  Rating,
  Avatar,
  Stack,
  useTheme
} from '@mui/material';
import {
  School as SchoolIcon,
  LocationOn as LocationIcon,
  AccessTime as AccessTimeIcon,
  Verified as VerifiedIcon,
  Language as LanguageIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import UserAvatar from './UserAvatar';

/**
 * A reusable profile card component for teachers and students
 * 
 * @param {Object} props - Component props
 * @param {Object} props.profile - Profile data object
 * @param {string} props.type - Profile type ('teacher' or 'student')
 * @param {function} props.onViewProfile - Callback when view profile is clicked
 * @param {function} props.onBookNow - Callback when book now is clicked
 * @param {function} props.onContact - Callback when contact is clicked
 * @param {Object} props.sx - Additional styles to apply
 */
const ProfileCard = ({
  profile = {},
  type = 'teacher',
  onViewProfile,
  onBookNow,
  onContact,
  sx = {}
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  const {
    id,
    name,
    avatar,
    role = type,
    verified = false,
    rating = 0,
    reviewCount = 0,
    subjects = [],
    location = '',
    experience = '',
    hourlyRate = '',
    languages = [],
    availability = '',
    about = '',
    qualifications = []
  } = profile;
  
  // Handle view profile click
  const handleViewProfile = () => {
    if (onViewProfile) {
      onViewProfile(profile);
    } else {
      navigate(`/teachers/${id}`);
    }
  };
  
  // Handle book now click
  const handleBookNow = (e) => {
    e.stopPropagation();
    
    if (onBookNow) {
      onBookNow(profile);
    } else {
      navigate(`/teachers/${id}/book`);
    }
  };
  
  // Handle contact click
  const handleContact = (e) => {
    e.stopPropagation();
    
    if (onContact) {
      onContact(profile);
    }
  };
  
  return (
    <Card 
      elevation={1} 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
        overflow: 'visible',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        },
        ...sx
      }}
      onClick={handleViewProfile}
    >
      <CardContent sx={{ p: 3, pb: 1, flex: 1 }}>
        {/* Header with avatar and basic info */}
        <Box sx={{ display: 'flex', mb: 2 }}>
          <Box sx={{ position: 'relative' }}>
            <UserAvatar
              name={name}
              src={avatar}
              role={role}
              verified={verified}
              size="large"
            />
          </Box>
          
          <Box sx={{ ml: 2, flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mr: 1 }}>
                {name}
              </Typography>
              
              {verified && (
                <Chip
                  icon={<VerifiedIcon fontSize="small" />}
                  label="Verified"
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ height: 24, borderRadius: 3 }}
                />
              )}
            </Box>
            
            {/* Subjects */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, my: 0.5 }}>
              {subjects.slice(0, 2).map((subject, index) => (
                <Chip
                  key={index}
                  label={subject}
                  size="small"
                  color="secondary"
                  variant="outlined"
                  sx={{ height: 20, borderRadius: 3 }}
                />
              ))}
              {subjects.length > 2 && (
                <Chip
                  label={`+${subjects.length - 2} more`}
                  size="small"
                  variant="outlined"
                  sx={{ height: 20, borderRadius: 3 }}
                />
              )}
            </Box>
            
            {/* Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
              <Rating
                value={rating}
                readOnly
                precision={0.5}
                size="small"
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                ({reviewCount})
              </Typography>
            </Box>
          </Box>
        </Box>
        
        {/* Additional info */}
        <Box sx={{ mb: 2 }}>
          {/* Location */}
          {location && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationIcon fontSize="small" color="action" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {location}
              </Typography>
            </Box>
          )}
          
          {/* Experience */}
          {experience && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <SchoolIcon fontSize="small" color="action" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {experience} Experience
              </Typography>
            </Box>
          )}
          
          {/* Languages */}
          {languages && languages.length > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LanguageIcon fontSize="small" color="action" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {languages.join(', ')}
              </Typography>
            </Box>
          )}
          
          {/* Availability */}
          {availability && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AccessTimeIcon fontSize="small" color="action" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {availability}
              </Typography>
            </Box>
          )}
        </Box>
        
        {/* About */}
        {about && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ 
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}>
              {about}
            </Typography>
          </Box>
        )}
        
        {/* Qualifications */}
        {qualifications && qualifications.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Qualifications
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {qualifications.map((qualification, index) => (
                <Chip
                  key={index}
                  label={qualification}
                  size="small"
                  variant="outlined"
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>
          </Box>
        )}
        
        {/* Price */}
        {hourlyRate && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto' }}>
            <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
              ₹{hourlyRate}/hr
            </Typography>
          </Box>
        )}
      </CardContent>
      
      <Divider />
      
      {/* Actions */}
      <CardActions sx={{ p: 2 }}>
        <Button 
          variant="outlined" 
          size="small" 
          onClick={handleContact}
          sx={{ borderRadius: 2, mr: 1 }}
        >
          Contact
        </Button>
        
        {type === 'teacher' && (
          <Button 
            variant="contained" 
            size="small" 
            onClick={handleBookNow}
            sx={{ borderRadius: 2, ml: 'auto' }}
          >
            Book Now
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ProfileCard;
