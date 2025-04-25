import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  LinearProgress,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  useTheme,
  alpha
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  InsertDriveFile as FileIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  VideoLibrary as VideoIcon,
  AudioFile as AudioIcon,
  Code as CodeIcon,
  Archive as ArchiveIcon,
  Description as TextIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';

/**
 * A reusable file upload component
 * 
 * @param {Object} props - Component props
 * @param {function} props.onUpload - Callback when files are uploaded
 * @param {function} props.onRemove - Callback when a file is removed
 * @param {function} props.onPreview - Callback when a file is previewed
 * @param {Array} props.acceptedTypes - Array of accepted file types (e.g. ['.pdf', '.jpg'])
 * @param {boolean} props.multiple - Whether multiple files can be uploaded
 * @param {number} props.maxFiles - Maximum number of files allowed
 * @param {number} props.maxSize - Maximum file size in bytes
 * @param {Array} props.initialFiles - Array of initial files
 * @param {string} props.uploadText - Text to display on upload button
 * @param {string} props.dropzoneText - Text to display in dropzone
 * @param {Object} props.sx - Additional styles to apply
 */
const FileUpload = ({
  onUpload,
  onRemove,
  onPreview,
  acceptedTypes = [],
  multiple = false,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB
  initialFiles = [],
  uploadText = 'Upload Files',
  dropzoneText = 'Drag and drop files here, or click to browse',
  sx = {}
}) => {
  const theme = useTheme();
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState(initialFiles);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [errors, setErrors] = useState([]);
  
  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Get file icon based on type
  const getFileIcon = (file) => {
    const fileType = file.type || '';
    
    if (fileType.includes('pdf')) return <PdfIcon color="error" />;
    if (fileType.includes('image')) return <ImageIcon color="success" />;
    if (fileType.includes('video')) return <VideoIcon color="primary" />;
    if (fileType.includes('audio')) return <AudioIcon color="secondary" />;
    if (fileType.includes('text')) return <TextIcon color="info" />;
    if (fileType.includes('zip') || fileType.includes('rar') || fileType.includes('tar')) {
      return <ArchiveIcon color="warning" />;
    }
    if (fileType.includes('javascript') || fileType.includes('html') || fileType.includes('css')) {
      return <CodeIcon color="info" />;
    }
    
    return <FileIcon color="action" />;
  };
  
  // Handle file selection
  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    processFiles(selectedFiles);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files || []);
    processFiles(droppedFiles);
  };
  
  // Process and validate files
  const processFiles = (newFiles) => {
    const newErrors = [];
    const validFiles = [];
    
    // Check if adding new files would exceed max files
    if (!multiple && (files.length + newFiles.length > 1)) {
      newErrors.push('Only one file can be uploaded');
      return;
    }
    
    if (files.length + newFiles.length > maxFiles) {
      newErrors.push(`Maximum ${maxFiles} files allowed`);
      return;
    }
    
    // Validate each file
    newFiles.forEach(file => {
      // Check file size
      if (file.size > maxSize) {
        newErrors.push(`File "${file.name}" exceeds maximum size of ${formatFileSize(maxSize)}`);
        return;
      }
      
      // Check file type if acceptedTypes is provided
      if (acceptedTypes.length > 0) {
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        if (!acceptedTypes.includes(fileExtension) && !acceptedTypes.includes(file.type)) {
          newErrors.push(`File "${file.name}" has an invalid file type`);
          return;
        }
      }
      
      // Add unique ID to file
      const fileWithId = Object.assign(file, {
        id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      });
      
      validFiles.push(fileWithId);
      
      // Simulate upload progress
      simulateUploadProgress(fileWithId.id);
    });
    
    if (validFiles.length > 0) {
      const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
      setFiles(updatedFiles);
      
      if (onUpload) {
        onUpload(updatedFiles);
      }
    }
    
    if (newErrors.length > 0) {
      setErrors(newErrors);
      // Clear errors after 5 seconds
      setTimeout(() => setErrors([]), 5000);
    }
  };
  
  // Simulate file upload progress
  const simulateUploadProgress = (fileId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      
      setUploadProgress(prev => ({
        ...prev,
        [fileId]: progress
      }));
    }, 200);
  };
  
  // Handle file removal
  const handleRemoveFile = (fileId) => {
    const updatedFiles = files.filter(file => file.id !== fileId);
    setFiles(updatedFiles);
    
    if (onRemove) {
      onRemove(fileId, updatedFiles);
    }
  };
  
  // Handle file preview
  const handlePreviewFile = (file) => {
    if (onPreview) {
      onPreview(file);
    } else {
      // Default preview behavior - open file in new tab if it's an image
      if (file.type.includes('image')) {
        const fileUrl = URL.createObjectURL(file);
        window.open(fileUrl, '_blank');
      }
    }
  };
  
  return (
    <Box sx={{ ...sx }}>
      {/* Dropzone */}
      <Paper
        elevation={0}
        sx={{
          border: '2px dashed',
          borderColor: isDragging ? 'primary.main' : 'divider',
          borderRadius: 2,
          backgroundColor: isDragging ? alpha(theme.palette.primary.main, 0.05) : 'background.paper',
          p: 3,
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          mb: 2
        }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        
        <CloudUploadIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
        
        <Typography variant="h6" gutterBottom>
          {dropzoneText}
        </Typography>
        
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
          onClick={(e) => e.stopPropagation()}
        >
          {uploadText}
        </Button>
        
        {acceptedTypes.length > 0 && (
          <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
            Accepted file types: {acceptedTypes.join(', ')}
          </Typography>
        )}
        
        <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
          Maximum file size: {formatFileSize(maxSize)}
        </Typography>
      </Paper>
      
      {/* Error messages */}
      {errors.length > 0 && (
        <Box sx={{ mb: 2 }}>
          {errors.map((error, index) => (
            <Typography key={index} color="error" variant="body2">
              {error}
            </Typography>
          ))}
        </Box>
      )}
      
      {/* File list */}
      {files.length > 0 && (
        <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <List dense>
            {files.map((file, index) => (
              <ListItem key={file.id || index} divider={index < files.length - 1}>
                <ListItemIcon>
                  {getFileIcon(file)}
                </ListItemIcon>
                
                <ListItemText
                  primary={file.name}
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                      <Typography variant="caption" component="span">
                        {formatFileSize(file.size)}
                      </Typography>
                      
                      {file.type && (
                        <Chip
                          label={file.type.split('/')[1]?.toUpperCase() || file.type}
                          size="small"
                          variant="outlined"
                          sx={{ height: 20 }}
                        />
                      )}
                    </Box>
                  }
                />
                
                {uploadProgress[file.id] !== undefined && uploadProgress[file.id] < 100 && (
                  <Box sx={{ width: '50%', mr: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={uploadProgress[file.id]}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                    <Typography variant="caption" sx={{ display: 'block', textAlign: 'right' }}>
                      {uploadProgress[file.id]}%
                    </Typography>
                  </Box>
                )}
                
                <ListItemSecondaryAction>
                  {file.type && file.type.includes('image') && (
                    <IconButton edge="end" onClick={() => handlePreviewFile(file)} size="small" sx={{ mr: 1 }}>
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  )}
                  
                  <IconButton edge="end" onClick={() => handleRemoveFile(file.id)} size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default FileUpload;
