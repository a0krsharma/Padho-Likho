import React, { useState, useRef } from 'react';

import {
  Box,
  Paper,
  Typography,
  IconButton,
  Grid,
  Button,
  Tooltip,
  useTheme
} from '@mui/material';
import {
  Videocam as VideocamIcon,
  VideocamOff as VideocamOffIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  ScreenShare as ScreenShareIcon,
  StopScreenShare as StopScreenShareIcon,
  Chat as ChatIcon,
  CallEnd as CallEndIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

/**
 * A reusable video call component for online classes
 * 
 * @param {Object} props - Component props
 * @param {Object} props.localUser - Local user information
 * @param {Array} props.remoteUsers - Array of remote users
 * @param {function} props.onJoin - Callback when joining call
 * @param {function} props.onLeave - Callback when leaving call
 * @param {function} props.onToggleAudio - Callback when toggling audio
 * @param {function} props.onToggleVideo - Callback when toggling video
 * @param {function} props.onToggleScreenShare - Callback when toggling screen share
 * @param {function} props.onToggleChat - Callback when toggling chat
 * @param {Object} props.sx - Additional styles to apply
 */
const VideoCall = ({
  localUser = { name: 'You', audio: true, video: true },
  remoteUsers = [],
  onJoin,
  onLeave,
  onToggleAudio,
  onToggleVideo,
  onToggleScreenShare,
  onToggleChat,
  sx = {}
}) => {

  const theme = useTheme();
  const [isJoined, setIsJoined] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(localUser.audio);
  const [videoEnabled, setVideoEnabled] = useState(localUser.video);
  const [screenShareEnabled, setScreenShareEnabled] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const localVideoRef = useRef(null);
  
  // Join call
  const handleJoin = () => {
    setIsJoined(true);
    if (onJoin) onJoin();
  };
  
  // Leave call
  const handleLeave = () => {
    setIsJoined(false);
    if (onLeave) onLeave();
  };
  
  // Toggle audio
  const handleToggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    if (onToggleAudio) onToggleAudio(!audioEnabled);
  };
  
  // Toggle video
  const handleToggleVideo = () => {
    setVideoEnabled(!videoEnabled);
    if (onToggleVideo) onToggleVideo(!videoEnabled);
  };
  
  // Toggle screen share
  const handleToggleScreenShare = () => {
    setScreenShareEnabled(!screenShareEnabled);
    if (onToggleScreenShare) onToggleScreenShare(!screenShareEnabled);
  };
  
  // Toggle chat
  const handleToggleChat = () => {
    setChatOpen(!chatOpen);
    if (onToggleChat) onToggleChat(!chatOpen);
  };
  
  // Render video participant
  const renderParticipant = (user, isLocal = false) => {
    return (
      <Paper
        elevation={2}
        sx={{
          position: 'relative',
          borderRadius: 2,
          overflow: 'hidden',
          aspectRatio: '16/9',
          backgroundColor: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Video element */}
        {(isLocal ? videoEnabled : user.video) ? (
          <Box
            component="video"
            ref={isLocal ? localVideoRef : null}
            autoPlay
            muted={isLocal}
            playsInline
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.palette.grey[900]
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: theme.palette.primary.main,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography variant="h4" color="white">
                {user.name.charAt(0).toUpperCase()}
              </Typography>
            </Box>
          </Box>
        )}
        
        {/* User name and status */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography variant="body2" color="white" sx={{ flex: 1 }}>
            {user.name} {isLocal && '(You)'}
          </Typography>
          
          {!isLocal && (
            <Box>
              {!user.audio && (
                <MicOffIcon fontSize="small" sx={{ color: 'white', opacity: 0.7 }} />
              )}
            </Box>
          )}
        </Box>
      </Paper>
    );
  };
  
  return (
    <Box sx={{ ...sx }}>
      {!isJoined ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
            textAlign: 'center'
          }}
        >
          <Typography variant="h5" gutterBottom>
            Ready to join the class?
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Make sure your camera and microphone are working properly.
          </Typography>
          
          <Box sx={{ my: 3 }}>
            {renderParticipant(localUser, true)}
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button
              variant="outlined"
              startIcon={audioEnabled ? <MicIcon /> : <MicOffIcon />}
              onClick={handleToggleAudio}
            >
              {audioEnabled ? 'Mute' : 'Unmute'}
            </Button>
            <Button
              variant="outlined"
              startIcon={videoEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
              onClick={handleToggleVideo}
            >
              {videoEnabled ? 'Stop Video' : 'Start Video'}
            </Button>
          </Box>
          
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleJoin}
            sx={{ mt: 3 }}
          >
            Join Class
          </Button>
        </Box>
      ) : (
        <Box>
          {/* Video grid */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {/* Local user */}
            <Grid item xs={12} md={remoteUsers.length > 0 ? 6 : 12}>
              {renderParticipant(localUser, true)}
            </Grid>
            
            {/* Remote users */}
            {remoteUsers.map((user, index) => (
              <Grid key={index} item xs={12} md={6}>
                {renderParticipant(user)}
              </Grid>
            ))}
          </Grid>
          
          {/* Controls */}
          <Paper
            elevation={3}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              p: 1,
              borderRadius: 3
            }}
          >
            <Tooltip title={audioEnabled ? 'Mute' : 'Unmute'}>
              <IconButton onClick={handleToggleAudio}>
                {audioEnabled ? <MicIcon /> : <MicOffIcon color="error" />}
              </IconButton>
            </Tooltip>
            
            <Tooltip title={videoEnabled ? 'Stop Video' : 'Start Video'}>
              <IconButton onClick={handleToggleVideo}>
                {videoEnabled ? <VideocamIcon /> : <VideocamOffIcon color="error" />}
              </IconButton>
            </Tooltip>
            
            <Tooltip title={screenShareEnabled ? 'Stop Sharing' : 'Share Screen'}>
              <IconButton onClick={handleToggleScreenShare}>
                {screenShareEnabled ? <StopScreenShareIcon color="primary" /> : <ScreenShareIcon />}
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Chat">
              <IconButton onClick={handleToggleChat} color={chatOpen ? 'primary' : 'default'}>
                <ChatIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Settings">
              <IconButton>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Leave Call">
              <IconButton color="error" onClick={handleLeave}>
                <CallEndIcon />
              </IconButton>
            </Tooltip>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default VideoCall;
