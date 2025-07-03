import React, { useState } from 'react';
import { Button, Box, Typography, CircularProgress } from '@mui/material';

const ImageUploader = ({ onImageUploaded }) => {
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target.result;
      
      // Save the image to the public folder
      saveImageToPublic(imageData, file.name)
        .then(imagePath => {
          setLoading(false);
          if (onImageUploaded) {
            onImageUploaded(imagePath);
          }
        })
        .catch(error => {
          console.error('Error saving image:', error);
          setLoading(false);
        });
    };
    
    reader.readAsDataURL(file);
  };

  const saveImageToPublic = async (imageData, fileName) => {
    // In a real application, you would send this to your backend
    // For this demo, we'll simulate saving by using localStorage
    const imagePath = `/images/${fileName}`;
    localStorage.setItem('uploadedProfileImage', imageData);
    localStorage.setItem('uploadedProfileImagePath', imagePath);
    
    // Copy the image to profile-image.jpg as well for our fixed references
    localStorage.setItem('profileImage', imageData);
    
    return imagePath;
  };

  return (
    <Box sx={{ my: 2 }}>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Upload Image'}
        </Button>
      </label>
      <Typography variant="caption" display="block" sx={{ mt: 1 }}>
        Upload a profile image to replace the current one
      </Typography>
    </Box>
  );
};

export default ImageUploader;
