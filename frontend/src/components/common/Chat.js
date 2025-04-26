import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Divider,
  InputAdornment,
  CircularProgress,
  Tooltip,
  useTheme
} from '@mui/material';
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  InsertEmoticon as EmojiIcon,
  MoreVert as MoreVertIcon,
  Image as ImageIcon,
  PictureAsPdf as PdfIcon
} from '@mui/icons-material';
import UserAvatar from './UserAvatar';

/**
 * A reusable chat component
 * 
 * @param {Object} props - Component props
 * @param {Array} props.messages - Array of message objects
 * @param {function} props.onSendMessage - Callback when a message is sent
 * @param {function} props.onAttachFile - Callback when a file is attached
 * @param {Object} props.currentUser - Current user object
 * @param {Object} props.recipient - Recipient user object
 * @param {boolean} props.loading - Whether messages are loading
 * @param {boolean} props.typing - Whether recipient is typing
 * @param {Object} props.sx - Additional styles to apply
 */
const Chat = ({
  messages = [],
  onSendMessage,
  onAttachFile,
  currentUser = {},
  recipient = {},
  loading = false,
  typing = false,
  sx = {}
}) => {
  const theme = useTheme();
  const [messageText, setMessageText] = useState('');
  const [attachments, setAttachments] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Handle message send
  const handleSendMessage = () => {
    if (messageText.trim() || attachments.length > 0) {
      if (onSendMessage) {
        onSendMessage({
          text: messageText.trim(),
          attachments: [...attachments],
          timestamp: new Date()
        });
      }
      
      setMessageText('');
      setAttachments([]);
    }
  };
  
  // Handle key press (Enter to send)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Handle file attachment
  const handleAttachClick = () => {
    fileInputRef.current.click();
  };
  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
      const newAttachments = files.map(file => ({
        id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        type: file.type,
        size: file.size,
        file
      }));
      
      setAttachments([...attachments, ...newAttachments]);
      
      if (onAttachFile) {
        onAttachFile(newAttachments);
      }
    }
    
    // Reset file input
    e.target.value = null;
  };
  
  // Remove attachment
  const handleRemoveAttachment = (id) => {
    setAttachments(attachments.filter(attachment => attachment.id !== id));
  };
  
  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Get attachment icon based on file type
  const getAttachmentIcon = (type) => {
    if (type.includes('image')) return <ImageIcon />;
    if (type.includes('pdf')) return <PdfIcon />;
    return <AttachFileIcon />;
  };
  
  // Group messages by date
  const groupMessagesByDate = (messages) => {
    const groups = {};
    
    messages.forEach(message => {
      const date = new Date(message.timestamp);
      const dateStr = date.toLocaleDateString();
      
      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }
      
      groups[dateStr].push(message);
    });
    
    return groups;
  };
  
  const messageGroups = groupMessagesByDate(messages);
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', ...sx }}>
      {/* Chat header */}
      <Paper 
        elevation={1} 
        sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center',
          borderRadius: '12px 12px 0 0',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <UserAvatar 
          name={recipient.name} 
          src={recipient.avatar} 
          role={recipient.role}
          verified={recipient.verified}
        />
        
        <Box sx={{ ml: 1.5, flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
            {recipient.name || 'Chat'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {typing ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="primary" sx={{ fontStyle: 'italic' }}>
                  Typing...
                </Typography>
              </Box>
            ) : (
              recipient.status || 'Online'
            )}
          </Typography>
        </Box>
        
        <Tooltip title="More options">
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </Paper>
      
      {/* Chat messages */}
      <Box 
        sx={{ 
          flex: 1, 
          overflowY: 'auto',
          p: 2,
          backgroundColor: theme.palette.background.default
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress size={40} />
          </Box>
        ) : messages.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Typography variant="body1" color="text.secondary">
              No messages yet. Start the conversation!
            </Typography>
          </Box>
        ) : (
          Object.entries(messageGroups).map(([date, groupMessages]) => (
            <Box key={date} sx={{ mb: 3 }}>
              {/* Date divider */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Divider sx={{ flex: 1, mr: 2 }} />
                <Typography variant="caption" color="text.secondary">
                  {new Date(date).toLocaleDateString(undefined, { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Typography>
                <Divider sx={{ flex: 1, ml: 2 }} />
              </Box>
              
              {/* Messages for this date */}
              {groupMessages.map((message, index) => {
                const isCurrentUser = message.senderId === currentUser.id;
                
                return (
                  <Box 
                    key={message.id || index}
                    sx={{ 
                      display: 'flex', 
                      justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                      mb: 1.5
                    }}
                  >
                    {!isCurrentUser && (
                      <UserAvatar 
                        name={message.senderName || recipient.name} 
                        src={message.senderAvatar || recipient.avatar} 
                        role={recipient.role}
                        size="small"
                        showBadge={false}
                        sx={{ mt: 1, mr: 1 }}
                      />
                    )}
                    
                    <Box 
                      sx={{ 
                        maxWidth: '70%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isCurrentUser ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 1.5, 
                          borderRadius: 2,
                          backgroundColor: isCurrentUser 
                            ? 'primary.main' 
                            : 'background.paper',
                          color: isCurrentUser 
                            ? 'primary.contrastText' 
                            : 'text.primary',
                          border: '1px solid',
                          borderColor: isCurrentUser 
                            ? 'primary.main' 
                            : 'divider'
                        }}
                      >
                        {message.text && (
                          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                            {message.text}
                          </Typography>
                        )}
                        
                        {message.attachments && message.attachments.length > 0 && (
                          <Box sx={{ mt: message.text ? 1.5 : 0 }}>
                            {message.attachments.map((attachment, idx) => (
                              <Box 
                                key={idx}
                                sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center',
                                  p: 1,
                                  borderRadius: 1,
                                  backgroundColor: isCurrentUser 
                                    ? alpha(theme.palette.common.white, 0.1) 
                                    : alpha(theme.palette.common.black, 0.05)
                                }}
                              >
                                {getAttachmentIcon(attachment.type)}
                                <Typography variant="caption" sx={{ ml: 1, flex: 1 }}>
                                  {attachment.name}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        )}
                      </Paper>
                      
                      <Typography 
                        variant="caption" 
                        color={isCurrentUser ? 'text.secondary' : 'text.disabled'}
                        sx={{ mt: 0.5 }}
                      >
                        {formatTimestamp(message.timestamp)}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ))
        )}
        
        {/* Typing indicator */}
        {typing && (
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'flex-start',
              mb: 1.5
            }}
          >
            <UserAvatar 
              name={recipient.name} 
              src={recipient.avatar} 
              role={recipient.role}
              size="small"
              showBadge={false}
              sx={{ mt: 1, mr: 1 }}
            />
            
            <Paper 
              elevation={0} 
              sx={{ 
                p: 1.5, 
                borderRadius: 2,
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 0.5
                }}>
                  <Box 
                    sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      backgroundColor: 'primary.main',
                      animation: 'pulse 1s infinite',
                      '@keyframes pulse': {
                        '0%': { opacity: 0.5 },
                        '50%': { opacity: 1 },
                        '100%': { opacity: 0.5 }
                      }
                    }} 
                  />
                  <Box 
                    sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      backgroundColor: 'primary.main',
                      animation: 'pulse 1s infinite 0.2s',
                      '@keyframes pulse': {
                        '0%': { opacity: 0.5 },
                        '50%': { opacity: 1 },
                        '100%': { opacity: 0.5 }
                      }
                    }} 
                  />
                  <Box 
                    sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      backgroundColor: 'primary.main',
                      animation: 'pulse 1s infinite 0.4s',
                      '@keyframes pulse': {
                        '0%': { opacity: 0.5 },
                        '50%': { opacity: 1 },
                        '100%': { opacity: 0.5 }
                      }
                    }} 
                  />
                </Box>
              </Box>
            </Paper>
          </Box>
        )}
        
        <div ref={messagesEndRef} />
      </Box>
      
      {/* Attachments preview */}
      {attachments.length > 0 && (
        <Box 
          sx={{ 
            p: 1.5, 
            borderTop: '1px solid', 
            borderColor: 'divider',
            backgroundColor: 'background.paper'
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Attachments ({attachments.length})
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {attachments.map((attachment) => (
              <Paper
                key={attachment.id}
                elevation={0}
                sx={{
                  p: 1,
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  maxWidth: '100%'
                }}
              >
                {getAttachmentIcon(attachment.type)}
                <Typography 
                  variant="caption" 
                  sx={{ 
                    mx: 1, 
                    maxWidth: '150px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {attachment.name}
                </Typography>
                <IconButton 
                  size="small" 
                  onClick={() => handleRemoveAttachment(attachment.id)}
                  sx={{ p: 0.5 }}
                >
                  <Typography variant="caption" color="error">×</Typography>
                </IconButton>
              </Paper>
            ))}
          </Box>
        </Box>
      )}
      
      {/* Message input */}
      <Paper 
        elevation={1} 
        sx={{ 
          p: 2, 
          borderRadius: '0 0 12px 12px',
          borderTop: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
            multiple
          />
          
          <Tooltip title="Attach file">
            <IconButton onClick={handleAttachClick} color="primary" sx={{ p: 1 }}>
              <AttachFileIcon />
            </IconButton>
          </Tooltip>
          
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="outlined"
            sx={{
              mx: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                backgroundColor: theme.palette.background.default
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Add emoji">
                    <IconButton edge="end" color="primary">
                      <EmojiIcon />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              )
            }}
          />
          
          {/* Fix for the MUI Tooltip with disabled button issue */}
          {messageText.trim() || attachments.length > 0 ? (
            <Tooltip title="Send message">
              <IconButton 
                onClick={handleSendMessage} 
                color="primary"
                sx={{ 
                  p: 1,
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.dark'
                  }
                }}
              >
                <SendIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <span>
              <IconButton 
                disabled
                color="primary"
                sx={{ 
                  p: 1,
                  color: 'primary.main'
                }}
              >
                <SendIcon />
              </IconButton>
            </span>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

// Helper function for theme alpha
const alpha = (color, opacity) => {
  return color ? `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}` : undefined;
};

export default Chat;
