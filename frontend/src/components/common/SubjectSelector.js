import React, { useState, useEffect } from 'react';
import {
  Box,
  Chip,
  Autocomplete,
  TextField,
  Typography,
  Paper,
  Avatar,
  useTheme
} from '@mui/material';
import {
  Science as ScienceIcon,
  Calculate as MathIcon,
  Language as EnglishIcon,
  History as HistoryIcon,
  Palette as ArtsIcon,
  Public as GeographyIcon,
  Computer as ComputerIcon,
  FitnessCenter as PhysicalEducationIcon,
  Psychology as PsychologyIcon,
  AccountBalance as EconomicsIcon
} from '@mui/icons-material';

// Common subjects with their respective icons and colors
const commonSubjects = [
  { id: 1, name: 'Mathematics', icon: <MathIcon />, color: '#4361ee' },
  { id: 2, name: 'Science', icon: <ScienceIcon />, color: '#3a86ff' },
  { id: 3, name: 'Physics', icon: <ScienceIcon />, color: '#3a0ca3' },
  { id: 4, name: 'Chemistry', icon: <ScienceIcon />, color: '#7209b7' },
  { id: 5, name: 'Biology', icon: <ScienceIcon />, color: '#4cc9f0' },
  { id: 6, name: 'English', icon: <EnglishIcon />, color: '#4895ef' },
  { id: 7, name: 'Hindi', icon: <EnglishIcon />, color: '#f72585' },
  { id: 8, name: 'History', icon: <HistoryIcon />, color: '#bc6c25' },
  { id: 9, name: 'Geography', icon: <GeographyIcon />, color: '#2a9d8f' },
  { id: 10, name: 'Computer Science', icon: <ComputerIcon />, color: '#560bad' },
  { id: 11, name: 'Economics', icon: <EconomicsIcon />, color: '#e63946' },
  { id: 12, name: 'Arts', icon: <ArtsIcon />, color: '#f4a261' },
  { id: 13, name: 'Physical Education', icon: <PhysicalEducationIcon />, color: '#e76f51' },
  { id: 14, name: 'Psychology', icon: <PsychologyIcon />, color: '#9d4edd' }
];

/**
 * A reusable subject selector component
 * 
 * @param {Object} props - Component props
 * @param {Array} props.value - Selected subjects
 * @param {function} props.onChange - Callback when selection changes
 * @param {Array} props.options - Custom subject options
 * @param {boolean} props.multiple - Whether multiple subjects can be selected
 * @param {boolean} props.required - Whether selection is required
 * @param {string} props.label - Input label
 * @param {string} props.placeholder - Input placeholder
 * @param {string} props.helperText - Helper text
 * @param {boolean} props.error - Whether there is an error
 * @param {Object} props.sx - Additional styles to apply
 */
const SubjectSelector = ({
  value = [],
  onChange,
  options = [],
  multiple = true,
  required = false,
  label = 'Subjects',
  placeholder = 'Select subjects',
  helperText = '',
  error = false,
  sx = {}
}) => {
  const theme = useTheme();
  
  // Combine common subjects with custom options
  const [subjectOptions, setSubjectOptions] = useState([]);
  
  useEffect(() => {
    // If custom options are provided, merge them with common subjects
    if (options && options.length > 0) {
      // Convert options to the required format if needed
      const formattedOptions = options.map(option => {
        if (typeof option === 'string') {
          // Find if this subject exists in common subjects
          const existingSubject = commonSubjects.find(
            subject => subject.name.toLowerCase() === option.toLowerCase()
          );
          
          if (existingSubject) {
            return existingSubject;
          }
          
          // Create a new subject with default icon and random color
          return {
            id: `custom-${option}`,
            name: option,
            icon: <EnglishIcon />,
            color: getRandomColor()
          };
        }
        
        return option;
      });
      
      setSubjectOptions(formattedOptions);
    } else {
      // Use common subjects as default
      setSubjectOptions(commonSubjects);
    }
  }, [options]);
  
  // Generate a random color for custom subjects
  const getRandomColor = () => {
    const colors = [
      '#4361ee', '#3a86ff', '#3a0ca3', '#7209b7', '#4cc9f0',
      '#4895ef', '#f72585', '#bc6c25', '#2a9d8f', '#560bad',
      '#e63946', '#f4a261', '#e76f51', '#9d4edd'
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  // Handle selection change
  const handleChange = (event, newValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };
  
  return (
    <Box sx={{ ...sx }}>
      <Autocomplete
        multiple={multiple}
        id="subject-selector"
        options={subjectOptions}
        value={value}
        onChange={handleChange}
        getOptionLabel={(option) => option.name || option}
        isOptionEqualToValue={(option, value) => 
          option.id === value.id || option.name === value.name
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            required={required}
            error={error}
            helperText={helperText}
            InputProps={{
              ...params.InputProps,
              sx: {
                borderRadius: 2
              }
            }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  mr: 1,
                  bgcolor: option.color || theme.palette.primary.main
                }}
              >
                {option.icon || <EnglishIcon fontSize="small" />}
              </Avatar>
              <Typography variant="body2">{option.name}</Typography>
            </Box>
          </li>
        )}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              label={option.name}
              {...getTagProps({ index })}
              avatar={
                <Avatar sx={{ bgcolor: option.color || theme.palette.primary.main }}>
                  {option.icon || <EnglishIcon fontSize="small" />}
                </Avatar>
              }
              variant="outlined"
              sx={{ borderRadius: 4 }}
            />
          ))
        }
        PaperComponent={(props) => (
          <Paper elevation={3} {...props} sx={{ borderRadius: 2, mt: 1 }} />
        )}
      />
    </Box>
  );
};

export default SubjectSelector;
