import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  IconButton,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Tabs,
  Tab,
  Tooltip,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  Chip
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Videocam as VideocamIcon,
  VideocamOff as VideocamOffIcon,
  ScreenShare as ScreenShareIcon,
  StopScreenShare as StopScreenShareIcon,
  Chat as ChatIcon,
  People as PeopleIcon,
  Send as SendIcon,
  Assignment as AssignmentIcon,
  Description as DescriptionIcon,
  PresentToAll as PresentToAllIcon,
  CallEnd as CallEndIcon,
  Settings as SettingsIcon,
  MoreVert as MoreVertIcon,
  Fullscreen as FullscreenIcon,
  PictureInPicture as PictureInPictureIcon,
  RecordVoiceOver as RecordVoiceOverIcon,
  PanTool as RaisedHandIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

// Import custom components
import VideoCall from '../../components/common/VideoCall';
import Whiteboard from '../../components/common/Whiteboard';
import Chat from '../../components/common/Chat';
import UserAvatar from '../../components/common/UserAvatar';
import ContentCard from '../../components/common/ContentCard';

// Sample class data - in a real app, this would come from an API
const getClassById = (id) => {
  const classes = [
    {
      id: 1,
      subject: 'Mathematics',
      topic: 'Quadratic Equations',
      description: 'In this session, we will cover solving quadratic equations using factoring, completing the square, and the quadratic formula.',
      teacher: {
        id: 1,
        name: 'Rajesh Kumar',
        image: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      date: '2025-04-25',
      time: '4:00 PM - 5:00 PM',
      duration: 60,
      status: 'active',
      materials: [
        { id: 1, name: 'Quadratic Equations - Notes.pdf', type: 'pdf' },
        { id: 2, name: 'Practice Problems.docx', type: 'doc' }
      ],
      participants: [
        { id: 1, name: 'Rajesh Kumar', role: 'teacher', image: 'https://randomuser.me/api/portraits/men/32.jpg', isOnline: true },
        { id: 2, name: 'Rahul Sharma', role: 'student', image: 'https://randomuser.me/api/portraits/men/22.jpg', isOnline: true },
        { id: 3, name: 'Priya Patel', role: 'student', image: 'https://randomuser.me/api/portraits/women/29.jpg', isOnline: true },
        { id: 4, name: 'Amit Singh', role: 'student', image: 'https://randomuser.me/api/portraits/men/45.jpg', isOnline: false }
      ],
      messages: [
        { id: 1, sender: { id: 1, name: 'Rajesh Kumar', role: 'teacher', image: 'https://randomuser.me/api/portraits/men/32.jpg' }, text: 'Welcome to the class! We will start in a few minutes.', time: '3:55 PM' },
        { id: 2, sender: { id: 2, name: 'Rahul Sharma', role: 'student', image: 'https://randomuser.me/api/portraits/men/22.jpg' }, text: 'Good afternoon, sir!', time: '3:56 PM' },
        { id: 3, sender: { id: 3, name: 'Priya Patel', role: 'student', image: 'https://randomuser.me/api/portraits/women/29.jpg' }, text: 'Hello everyone!', time: '3:57 PM' }
      ]
    },
    {
      id: 2,
      subject: 'Science',
      topic: 'Chemical Reactions',
      description: 'This session will introduce different types of chemical reactions, balancing chemical equations, and factors affecting reaction rates.',
      teacher: {
        id: 4,
        name: 'Neha Gupta',
        image: 'https://randomuser.me/api/portraits/women/68.jpg'
      },
      date: '2025-04-28',
      time: '5:30 PM - 6:30 PM',
      duration: 60,
      status: 'scheduled',
      materials: [
        { id: 3, name: 'Chemical Reactions - Slides.pptx', type: 'ppt' },
        { id: 4, name: 'Lab Instructions.pdf', type: 'pdf' }
      ],
      participants: [
        { id: 4, name: 'Neha Gupta', role: 'teacher', image: 'https://randomuser.me/api/portraits/women/68.jpg', isOnline: true },
        { id: 2, name: 'Rahul Sharma', role: 'student', image: 'https://randomuser.me/api/portraits/men/22.jpg', isOnline: false },
        { id: 3, name: 'Priya Patel', role: 'student', image: 'https://randomuser.me/api/portraits/women/29.jpg', isOnline: false },
        { id: 5, name: 'Sneha Verma', role: 'student', image: 'https://randomuser.me/api/portraits/women/33.jpg', isOnline: false }
      ],
      messages: []
    }
  ];
  
  return classes.find(classItem => classItem.id === parseInt(id));
};

const ClassRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const { currentUser } = useAuth();
  
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [message, setMessage] = useState('');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [screenShareEnabled, setScreenShareEnabled] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [whiteboardActive, setWhiteboardActive] = useState(false);
  const [whiteboardData, setWhiteboardData] = useState(null);
  
  const chatContainerRef = useRef(null);
  const whiteboardRef = useRef(null);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchClass = () => {
      setLoading(true);
      try {
        const data = getClassById(id);
        setClassData(data);
      } catch (error) {
        console.error('Error fetching class:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchClass();
  }, [id]);
  
  useEffect(() => {
    // Scroll to bottom of chat when new messages arrive
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [classData?.messages]);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // In a real app, this would send the message to a backend API
    const newMessage = {
      id: classData.messages.length + 1,
      sender: {
        id: currentUser?.id || 2, // Using a default ID for demo
        name: currentUser?.name || 'You',
        role: currentUser?.role || 'student',
        image: currentUser?.profilePicture || 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setClassData({
      ...classData,
      messages: [...classData.messages, newMessage]
    });
    
    setMessage('');
  };
  
  const handleLeaveClass = () => {
    // In a real app, this would disconnect from the video call
    if (window.confirm('Are you sure you want to leave this class?')) {
      navigate(-1);
    }
  };
  
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };
  
  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
  };
  
  const toggleScreenShare = () => {
    setScreenShareEnabled(!screenShareEnabled);
  };
  
  const toggleHandRaise = () => {
    setHandRaised(!handRaised);
  };
  
  const toggleWhiteboard = () => {
    setWhiteboardActive(!whiteboardActive);
  };
  
  const handleWhiteboardChange = (data) => {
    setWhiteboardData(data);
    // In a real app, this would sync the whiteboard data with other participants
  };
  
  const openSettingsDialog = () => {
    setSettingsDialogOpen(true);
  };
  
  const closeSettingsDialog = () => {
    setSettingsDialogOpen(false);
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h5">Loading classroom...</Typography>
      </Box>
    );
  }
  
  if (!classData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h5">Class not found</Typography>
      </Box>
    );
  }
  
  const isTeacher = currentUser?.role === 'teacher';
  
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box sx={{ 
        px: 2, 
        py: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: 1,
        borderColor: 'divider'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography variant="h6" component="h1">
              {classData.subject}: {classData.topic}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(classData.date).toLocaleDateString()} | {classData.time}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Chip 
            label={classData.status === 'active' ? 'Live' : 'Scheduled'} 
            color={classData.status === 'active' ? 'error' : 'primary'} 
            size="small"
            sx={{ mr: 1 }}
          />
          <IconButton onClick={openSettingsDialog}>
            <SettingsIcon />
          </IconButton>
        </Box>
      </Box>
      
      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Video Call Area */}
        <Box sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {/* Main Video Area */}
          <Box sx={{ 
            flex: 1, 
            bgcolor: 'grey.900',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {whiteboardActive ? (
              <Whiteboard 
                ref={whiteboardRef}
                initialData={whiteboardData}
                onChange={handleWhiteboardChange}
                readOnly={!isTeacher}
                collaborative={true}
                sx={{ width: '100%', height: '100%' }}
              />
            ) : (
              <VideoCall 
                participants={classData.participants}
                audioEnabled={audioEnabled}
                videoEnabled={videoEnabled}
                screenShareEnabled={screenShareEnabled}
                currentUserId={currentUser?.id || 2}
              />
            )}
          </Box>
          
          {/* Video Controls */}
          <Box sx={{ 
            py: 1.5, 
            px: 2, 
            display: 'flex', 
            justifyContent: 'center',
            bgcolor: 'background.paper',
            borderTop: 1,
            borderColor: 'divider'
          }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title={audioEnabled ? 'Mute' : 'Unmute'}>
                <IconButton 
                  onClick={toggleAudio}
                  color={audioEnabled ? 'primary' : 'default'}
                  sx={{ 
                    bgcolor: audioEnabled ? 'primary.light' : 'action.hover',
                    '&:hover': { bgcolor: audioEnabled ? 'primary.light' : 'action.hover' }
                  }}
                >
                  {audioEnabled ? <MicIcon /> : <MicOffIcon />}
                </IconButton>
              </Tooltip>
              
              <Tooltip title={videoEnabled ? 'Turn off camera' : 'Turn on camera'}>
                <IconButton 
                  onClick={toggleVideo}
                  color={videoEnabled ? 'primary' : 'default'}
                  sx={{ 
                    bgcolor: videoEnabled ? 'primary.light' : 'action.hover',
                    '&:hover': { bgcolor: videoEnabled ? 'primary.light' : 'action.hover' }
                  }}
                >
                  {videoEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
                </IconButton>
              </Tooltip>
              
              <Tooltip title={screenShareEnabled ? 'Stop sharing screen' : 'Share screen'}>
                <IconButton 
                  onClick={toggleScreenShare}
                  color={screenShareEnabled ? 'primary' : 'default'}
                  sx={{ 
                    bgcolor: screenShareEnabled ? 'primary.light' : 'action.hover',
                    '&:hover': { bgcolor: screenShareEnabled ? 'primary.light' : 'action.hover' }
                  }}
                >
                  {screenShareEnabled ? <StopScreenShareIcon /> : <ScreenShareIcon />}
                </IconButton>
              </Tooltip>
              
              <Tooltip title={handRaised ? 'Lower hand' : 'Raise hand'}>
                <IconButton 
                  onClick={toggleHandRaise}
                  color={handRaised ? 'primary' : 'default'}
                  sx={{ 
                    bgcolor: handRaised ? 'primary.light' : 'action.hover',
                    '&:hover': { bgcolor: handRaised ? 'primary.light' : 'action.hover' }
                  }}
                >
                  <RaisedHandIcon />
                </IconButton>
              </Tooltip>
              
              <Tooltip title={whiteboardActive ? 'Hide whiteboard' : 'Show whiteboard'}>
                <IconButton 
                  onClick={toggleWhiteboard}
                  color={whiteboardActive ? 'primary' : 'default'}
                  sx={{ 
                    bgcolor: whiteboardActive ? 'primary.light' : 'action.hover',
                    '&:hover': { bgcolor: whiteboardActive ? 'primary.light' : 'action.hover' }
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              
              <Tooltip title="Leave class">
                <IconButton 
                  onClick={handleLeaveClass}
                  sx={{ 
                    bgcolor: 'error.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'error.dark' }
                  }}
                >
                  <CallEndIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
        
        {/* Sidebar */}
        <Box sx={{ 
          width: 320, 
          borderLeft: 1, 
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.paper'
        }}>
          {/* Tabs */}
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab 
              icon={<ChatIcon />} 
              label="Chat" 
              id="classroom-tab-0"
              aria-controls="classroom-tabpanel-0"
            />
            <Tab 
              icon={<PeopleIcon />} 
              label="People" 
              id="classroom-tab-1"
              aria-controls="classroom-tabpanel-1"
            />
            <Tab 
              icon={<DescriptionIcon />} 
              label="Materials" 
              id="classroom-tab-2"
              aria-controls="classroom-tabpanel-2"
            />
          </Tabs>
          
          {/* Tab Panels */}
          <Box sx={{ flex: 1, overflow: 'hidden' }}>
            {/* Chat Panel */}
            <Box
              role="tabpanel"
              hidden={tabValue !== 0}
              id="classroom-tabpanel-0"
              aria-labelledby="classroom-tab-0"
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box 
                ref={chatContainerRef}
                sx={{ 
                  flex: 1, 
                  overflowY: 'auto',
                  p: 2
                }}
              >
                <Chat 
                  messages={classData.messages}
                  currentUserId={currentUser?.id || 2}
                />
              </Box>
              
              <Box sx={{ 
                p: 2, 
                borderTop: 1, 
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center'
              }}>
                <TextField
                  fullWidth
                  placeholder="Type a message..."
                  variant="outlined"
                  size="small"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                  sx={{ mr: 1 }}
                />
                <IconButton 
                  color="primary" 
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </Box>
            
            {/* People Panel */}
            <Box
              role="tabpanel"
              hidden={tabValue !== 1}
              id="classroom-tabpanel-1"
              aria-labelledby="classroom-tab-1"
              sx={{ 
                height: '100%',
                overflowY: 'auto',
                p: 2
              }}
            >
              <List>
                {classData.participants.map((participant) => (
                  <ListItem 
                    key={participant.id}
                    secondaryAction={
                      participant.isOnline ? (
                        <Chip 
                          label="Online" 
                          color="success" 
                          size="small"
                        />
                      ) : (
                        <Chip 
                          label="Offline" 
                          color="default" 
                          size="small"
                        />
                      )
                    }
                  >
                    <ListItemAvatar>
                      <UserAvatar 
                        name={participant.name}
                        image={participant.image}
                        role={participant.role}
                      />
                    </ListItemAvatar>
                    <ListItemText 
                      primary={participant.name} 
                      secondary={participant.role.charAt(0).toUpperCase() + participant.role.slice(1)}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
            
            {/* Materials Panel */}
            <Box
              role="tabpanel"
              hidden={tabValue !== 2}
              id="classroom-tabpanel-2"
              aria-labelledby="classroom-tab-2"
              sx={{ 
                height: '100%',
                overflowY: 'auto',
                p: 2
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Class Materials
              </Typography>
              <List>
                {classData.materials.map((material) => (
                  <ListItem 
                    key={material.id}
                    button
                    onClick={() => {
                      // In a real app, this would download or open the material
                      alert(`Opening ${material.name}`);
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 
                        material.type === 'pdf' ? 'error.light' : 
                        material.type === 'doc' ? 'primary.light' : 
                        material.type === 'ppt' ? 'warning.light' : 
                        'info.light'
                      }}>
                        <DescriptionIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={material.name} 
                      secondary={material.type.toUpperCase()}
                    />
                  </ListItem>
                ))}
              </List>
              
              {isTeacher && (
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<PresentToAllIcon />}
                  sx={{ mt: 2 }}
                  onClick={() => {
                    // In a real app, this would open a file picker
                    alert('Share new material');
                  }}
                >
                  Share New Material
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      
      {/* Settings Dialog */}
      <Dialog open={settingsDialogOpen} onClose={closeSettingsDialog}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" gutterBottom>
            Audio Settings
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" gutterBottom>
              Microphone
            </Typography>
            {/* Microphone selection would go here */}
            <Typography variant="body2" gutterBottom sx={{ mt: 2 }}>
              Speaker
            </Typography>
            {/* Speaker selection would go here */}
          </Box>
          
          <Typography variant="subtitle1" gutterBottom>
            Video Settings
          </Typography>
          <Box>
            <Typography variant="body2" gutterBottom>
              Camera
            </Typography>
            {/* Camera selection would go here */}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeSettingsDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClassRoom;
