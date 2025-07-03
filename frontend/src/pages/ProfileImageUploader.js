import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Button,
  Avatar,
  Grid
} from '@mui/material';
import ImageUploader from '../components/ImageUploader';

const ProfileImageUploader = () => {
  const [currentImage, setCurrentImage] = useState('/images/profile-image.jpg');
  const [uploadedImage, setUploadedImage] = useState(null);
  
  useEffect(() => {
    // Check if there's a previously uploaded image in localStorage
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setUploadedImage(savedImage);
    }
  }, []);
  
  const handleImageUploaded = (imagePath) => {
    // This will be called when an image is uploaded via ImageUploader
    const savedImage = localStorage.getItem('profileImage');
    setUploadedImage(savedImage);
  };
  
  const applyImageToAllPages = () => {
    // In a real application, this would update the database
    // For this demo, we're just using localStorage
    alert('Profile image updated successfully! Please refresh the pages to see the changes.');
  };
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Profile Image Manager
        </Typography>
        
        <Typography variant="body1" paragraph>
          Use this page to upload and manage the profile image for Amit Patel across the platform.
        </Typography>
        
        <Box sx={{ my: 3 }}>
          <Typography variant="h6" gutterBottom>
            Current Profile Images
          </Typography>
          
          <Grid container spacing={4} alignItems="center">
            <Grid item>
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Current Image
                </Typography>
                <Avatar 
                  src={currentImage} 
                  alt="Current Profile" 
                  sx={{ width: 100, height: 100 }}
                />
              </Box>
            </Grid>
            
            {uploadedImage && (
              <Grid item>
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    New Uploaded Image
                  </Typography>
                  <Avatar 
                    src={uploadedImage} 
                    alt="Uploaded Profile" 
                    sx={{ width: 100, height: 100 }}
                  />
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h6" gutterBottom>
            Upload New Image
          </Typography>
          <ImageUploader onImageUploaded={handleImageUploaded} />
        </Box>
        
        {uploadedImage && (
          <Box sx={{ mt: 4 }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={applyImageToAllPages}
            >
              Apply Image Across Platform
            </Button>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              This will update the profile image for Amit Patel on all pages
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ProfileImageUploader;
