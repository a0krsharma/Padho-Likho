import React, { useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Container, 
  Avatar, 
  Menu, 
  MenuItem, 
  Divider, 
  useMediaQuery, 
  useTheme 
} from '@mui/material';
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  Info as InfoIcon,
  ContactSupport as ContactIcon,
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
  Login as LoginIcon,
  Help as HelpIcon,
  Home as HomeIcon,
  School as SchoolIcon,
  HowToReg as RegisterIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import Footer from '../common/Footer';

const MainLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  


  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
    navigate('/');
  };

  
  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };
  
  // Navigation items based on authentication status and user role
  const getNavigationItems = () => {
    const items = [
      { text: 'Home', icon: <HomeIcon />, path: '/' },
      { text: 'Find Teachers', icon: <SchoolIcon />, path: '/find-teachers' },
      { text: 'Hiring', icon: <RegisterIcon />, path: '/hiring' },
      { text: 'About', icon: <InfoIcon />, path: '/about' },
      { text: 'Contact', icon: <ContactIcon />, path: '/contact' }
    ];
    
    if (currentUser) {
      // Add role-specific navigation items
      if (currentUser.role === 'student') {
        items.push(
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/student/dashboard' },
          { text: 'My Bookings', icon: <SchoolIcon />, path: '/student/bookings' },
          { text: 'My Classes', icon: <SchoolIcon />, path: '/student/classes' },
          { text: 'Assessments', icon: <SchoolIcon />, path: '/student/assessments' },
          { text: 'Help Center', icon: <HelpIcon />, path: '/student/help' }
        );
      } else if (currentUser.role === 'parent') {
        items.push(
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/parent/dashboard' },
          { text: 'Child Progress', icon: <SchoolIcon />, path: '/parent/child-progress' }
        );
      } else if (currentUser.role === 'teacher') {
        items.push(
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/teacher/dashboard' },
          { text: 'Manage Classes', icon: <SchoolIcon />, path: '/teacher/classes' },
          { text: 'Manage Bookings', icon: <SchoolIcon />, path: '/teacher/bookings' }
        );
      }
    }
    
    return items;
  };
  
  const navigationItems = getNavigationItems();
  
  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'primary.main' }}>
          Padho Likho
        </Typography>
      </Box>
      <Divider />
      <List>
        {navigationItems.map((item) => (
          <ListItem button key={item.text} onClick={() => handleNavigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="inherit" elevation={4} sx={{ boxShadow: '0 4px 24px 0 rgba(67,97,238,0.10)' }}>
        <Toolbar sx={{ minHeight: 72, px: { xs: 1, md: 4 } }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ 
              flexGrow: 1, 
              textDecoration: 'none', 
              color: 'primary.main',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <SchoolIcon sx={{ mr: 1 }} />
            Padho Likho
          </Typography>
          
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {navigationItems.slice(0, 4).map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  onClick={() => handleNavigate(item.path)}
                  sx={{ mx: 1 }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
          
          {currentUser ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {!isMobile && (
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => handleNavigate(`/${currentUser.role}/dashboard`)}
                  sx={{ mr: 2 }}
                >
                  Dashboard
                </Button>
              )}
              
              <IconButton onClick={handleProfileMenuOpen}>
                <Avatar 
                  alt={`${currentUser.firstName} ${currentUser.lastName}`} 
                  src={currentUser.profilePicture || ''}
                  sx={{ width: 40, height: 40 }}
                >
                  {currentUser.firstName ? currentUser.firstName[0].toUpperCase() : 'U'}
                </Avatar>
              </IconButton>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => { 
                  handleProfileMenuClose(); 
                  handleNavigate(`/${currentUser.role}/profile`); 
                }}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box>
              <Button 
                color="inherit" 
                onClick={() => navigate('/login')}
                startIcon={<LoginIcon />}
                sx={{ mr: 1 }}
              >
                Login
              </Button>
              <Button 
                color="primary" 
                variant="contained" 
                onClick={() => navigate('/register')}
                startIcon={<RegisterIcon />}
              >
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
      
      <Box component="main" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Container maxWidth="lg" sx={{ flex: 1, display: 'flex', flexDirection: 'column', py: 4 }}>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Outlet />
          </Box>
        </Container>
      </Box>
      
      <Footer />
    </Box>
  );
};

export default MainLayout;
