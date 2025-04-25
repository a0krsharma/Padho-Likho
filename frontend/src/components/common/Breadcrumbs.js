import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon
} from '@mui/icons-material';

/**
 * A breadcrumbs navigation component
 * 
 * @param {Object} props - Component props
 * @param {Array} props.customPaths - Optional custom path definitions to override automatic generation
 * @param {Object} props.sx - Additional styles to apply
 */
const Breadcrumbs = ({ customPaths, sx = {} }) => {
  const location = useLocation();
  
  // Generate breadcrumb paths from current location
  const generatePaths = () => {
    if (customPaths) return customPaths;
    
    const pathnames = location.pathname.split('/').filter(x => x);
    
    const paths = [
      { name: 'Home', path: '/', icon: <HomeIcon fontSize="small" sx={{ mr: 0.5 }} /> }
    ];
    
    let currentPath = '';
    
    pathnames.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Format the segment name (replace hyphens with spaces and capitalize)
      const formattedName = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Add to paths array
      paths.push({
        name: formattedName,
        path: currentPath,
        isLast: index === pathnames.length - 1
      });
    });
    
    return paths;
  };
  
  const paths = generatePaths();
  
  return (
    <Box sx={{ mb: 3, ...sx }}>
      <MuiBreadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        aria-label="breadcrumb"
      >
        {paths.map((path, index) => {
          const isLast = path.isLast || index === paths.length - 1;
          
          return isLast ? (
            <Typography 
              key={path.path} 
              color="text.primary" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                fontWeight: 'medium' 
              }}
            >
              {path.icon && path.icon}
              {path.name}
            </Typography>
          ) : (
            <Link
              key={path.path}
              component={RouterLink}
              to={path.path}
              color="inherit"
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                '&:hover': {
                  textDecoration: 'none',
                  color: 'primary.main'
                }
              }}
            >
              {path.icon && path.icon}
              {path.name}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
};

export default Breadcrumbs;
