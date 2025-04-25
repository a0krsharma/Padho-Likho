import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  Button,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Radio,
  RadioGroup,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  FilterList as FilterListIcon,
  Clear as ClearIcon,
  Search as SearchIcon
} from '@mui/icons-material';

/**
 * A reusable filter panel component
 * 
 * @param {Object} props - Component props
 * @param {Array} props.filters - Array of filter configurations
 * @param {Object} props.values - Current filter values
 * @param {function} props.onChange - Callback when filters change
 * @param {function} props.onReset - Callback when filters are reset
 * @param {function} props.onApply - Callback when filters are applied
 * @param {boolean} props.collapsible - Whether filters can be collapsed
 * @param {boolean} props.showApplyButton - Whether to show apply button
 * @param {boolean} props.showResetButton - Whether to show reset button
 * @param {Object} props.sx - Additional styles to apply
 */
const FilterPanel = ({
  filters = [],
  values = {},
  onChange,
  onReset,
  onApply,
  collapsible = true,
  showApplyButton = true,
  showResetButton = true,
  sx = {}
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [expanded, setExpanded] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Handle accordion change
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };
  
  // Handle filter change
  const handleFilterChange = (filterId, value) => {
    if (onChange) {
      onChange({
        ...values,
        [filterId]: value
      });
    }
  };
  
  // Handle reset filters
  const handleResetFilters = () => {
    if (onReset) {
      onReset();
    }
  };
  
  // Handle apply filters
  const handleApplyFilters = () => {
    if (onApply) {
      onApply(values);
    }
    
    if (isMobile) {
      setMobileFiltersOpen(false);
    }
  };
  
  // Render filter based on type
  const renderFilter = (filter) => {
    const { id, type, label, options, min, max, step, marks } = filter;
    const value = values[id] !== undefined ? values[id] : (filter.defaultValue || '');
    
    switch (type) {
      case 'checkbox':
        return (
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    checked={Array.isArray(value) ? value.includes(option.value) : false}
                    onChange={(e) => {
                      const newValue = Array.isArray(value) ? [...value] : [];
                      if (e.target.checked) {
                        newValue.push(option.value);
                      } else {
                        const index = newValue.indexOf(option.value);
                        if (index !== -1) {
                          newValue.splice(index, 1);
                        }
                      }
                      handleFilterChange(id, newValue);
                    }}
                    size="small"
                  />
                }
                label={
                  <Typography variant="body2">
                    {option.label}
                    {option.count !== undefined && (
                      <Typography
                        component="span"
                        variant="caption"
                        color="text.secondary"
                        sx={{ ml: 0.5 }}
                      >
                        ({option.count})
                      </Typography>
                    )}
                  </Typography>
                }
              />
            ))}
          </FormGroup>
        );
        
      case 'radio':
        return (
          <RadioGroup
            value={value}
            onChange={(e) => handleFilterChange(id, e.target.value)}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio size="small" />}
                label={
                  <Typography variant="body2">
                    {option.label}
                    {option.count !== undefined && (
                      <Typography
                        component="span"
                        variant="caption"
                        color="text.secondary"
                        sx={{ ml: 0.5 }}
                      >
                        ({option.count})
                      </Typography>
                    )}
                  </Typography>
                }
              />
            ))}
          </RadioGroup>
        );
        
      case 'slider':
        return (
          <Box sx={{ px: 2, mt: 2 }}>
            <Slider
              value={value || [min, max]}
              onChange={(e, newValue) => handleFilterChange(id, newValue)}
              valueLabelDisplay="auto"
              min={min}
              max={max}
              step={step}
              marks={marks}
              sx={{ mt: 4 }}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 2
              }}
            >
              <TextField
                size="small"
                label="Min"
                type="number"
                value={value ? value[0] : min}
                onChange={(e) => {
                  const newValue = [...(value || [min, max])];
                  newValue[0] = Number(e.target.value);
                  handleFilterChange(id, newValue);
                }}
                InputProps={{
                  inputProps: {
                    min: min,
                    max: value ? value[1] : max
                  }
                }}
                sx={{ width: '45%' }}
              />
              <TextField
                size="small"
                label="Max"
                type="number"
                value={value ? value[1] : max}
                onChange={(e) => {
                  const newValue = [...(value || [min, max])];
                  newValue[1] = Number(e.target.value);
                  handleFilterChange(id, newValue);
                }}
                InputProps={{
                  inputProps: {
                    min: value ? value[0] : min,
                    max: max
                  }
                }}
                sx={{ width: '45%' }}
              />
            </Box>
          </Box>
        );
        
      case 'search':
        return (
          <TextField
            fullWidth
            size="small"
            placeholder={filter.placeholder || 'Search...'}
            value={value}
            onChange={(e) => handleFilterChange(id, e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} />
            }}
            sx={{ mb: 1 }}
          />
        );
        
      default:
        return null;
    }
  };
  
  // Count active filters
  const countActiveFilters = () => {
    return Object.keys(values).filter(key => {
      const value = values[key];
      if (Array.isArray(value) && value.length === 0) return false;
      if (value === '' || value === null || value === undefined) return false;
      return true;
    }).length;
  };
  
  // Render active filter chips
  const renderActiveFilters = () => {
    const activeFilters = [];
    
    filters.forEach(filter => {
      const value = values[filter.id];
      
      if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
        return;
      }
      
      if (filter.type === 'checkbox' && Array.isArray(value)) {
        value.forEach(val => {
          const option = filter.options.find(opt => opt.value === val);
          if (option) {
            activeFilters.push({
              id: `${filter.id}-${val}`,
              label: `${filter.label}: ${option.label}`,
              onDelete: () => {
                const newValue = [...value];
                const index = newValue.indexOf(val);
                if (index !== -1) {
                  newValue.splice(index, 1);
                  handleFilterChange(filter.id, newValue);
                }
              }
            });
          }
        });
      } else if (filter.type === 'radio') {
        const option = filter.options.find(opt => opt.value === value);
        if (option) {
          activeFilters.push({
            id: filter.id,
            label: `${filter.label}: ${option.label}`,
            onDelete: () => handleFilterChange(filter.id, '')
          });
        }
      } else if (filter.type === 'slider' && Array.isArray(value)) {
        activeFilters.push({
          id: filter.id,
          label: `${filter.label}: ${value[0]} - ${value[1]}`,
          onDelete: () => handleFilterChange(filter.id, [filter.min, filter.max])
        });
      } else if (filter.type === 'search' && value) {
        activeFilters.push({
          id: filter.id,
          label: `${filter.label}: ${value}`,
          onDelete: () => handleFilterChange(filter.id, '')
        });
      }
    });
    
    return activeFilters;
  };
  
  // Render desktop filters
  const renderDesktopFilters = () => {
    return (
      <Paper 
        elevation={1} 
        sx={{ 
          p: 2, 
          borderRadius: 2,
          ...sx
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FilterListIcon sx={{ mr: 1 }} />
          <Typography variant="subtitle1" fontWeight="medium">
            Filters
          </Typography>
          
          {showResetButton && countActiveFilters() > 0 && (
            <Button
              size="small"
              startIcon={<ClearIcon />}
              onClick={handleResetFilters}
              sx={{ ml: 'auto' }}
            >
              Reset
            </Button>
          )}
        </Box>
        
        {/* Active filters */}
        {countActiveFilters() > 0 && (
          <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {renderActiveFilters().map((filter) => (
              <Chip
                key={filter.id}
                label={filter.label}
                onDelete={filter.onDelete}
                size="small"
                sx={{ borderRadius: 2 }}
              />
            ))}
          </Box>
        )}
        
        <Divider sx={{ mb: 2 }} />
        
        {/* Filter sections */}
        {filters.map((filter) => (
          <Box key={filter.id} sx={{ mb: 3 }}>
            {collapsible ? (
              <Accordion
                expanded={expanded === filter.id}
                onChange={handleAccordionChange(filter.id)}
                elevation={0}
                disableGutters
                sx={{
                  '&:before': {
                    display: 'none',
                  },
                  '&.Mui-expanded': {
                    margin: 0,
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ 
                    p: 0,
                    minHeight: 'unset',
                    '& .MuiAccordionSummary-content': {
                      margin: '10px 0',
                    }
                  }}
                >
                  <Typography variant="subtitle2">{filter.label}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0, pt: 1 }}>
                  {renderFilter(filter)}
                </AccordionDetails>
              </Accordion>
            ) : (
              <>
                <Typography variant="subtitle2" gutterBottom>
                  {filter.label}
                </Typography>
                {renderFilter(filter)}
              </>
            )}
          </Box>
        ))}
        
        {/* Apply button */}
        {showApplyButton && (
          <Button
            variant="contained"
            fullWidth
            onClick={handleApplyFilters}
            sx={{ mt: 2 }}
          >
            Apply Filters
          </Button>
        )}
      </Paper>
    );
  };
  
  // Render mobile filters
  const renderMobileFilters = () => {
    return (
      <>
        {/* Filter button */}
        <Box sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setMobileFiltersOpen(true)}
            sx={{ borderRadius: 2 }}
          >
            Filters {countActiveFilters() > 0 && `(${countActiveFilters()})`}
          </Button>
          
          {/* Active filter chips */}
          {countActiveFilters() > 0 && (
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {renderActiveFilters().map((filter) => (
                <Chip
                  key={filter.id}
                  label={filter.label}
                  onDelete={filter.onDelete}
                  size="small"
                  sx={{ borderRadius: 2 }}
                />
              ))}
            </Box>
          )}
        </Box>
        
        {/* Mobile filter drawer */}
        {mobileFiltersOpen && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1300,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}
            onClick={() => setMobileFiltersOpen(false)}
          >
            <Box
              sx={{
                bgcolor: 'background.paper',
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                p: 2,
                maxHeight: '80vh',
                overflowY: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Filters</Typography>
                <IconButton
                  onClick={() => setMobileFiltersOpen(false)}
                  sx={{ ml: 'auto' }}
                >
                  <ClearIcon />
                </IconButton>
              </Box>
              
              <Divider sx={{ mb: 2 }} />
              
              {/* Filter sections */}
              {filters.map((filter) => (
                <Box key={filter.id} sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    {filter.label}
                  </Typography>
                  {renderFilter(filter)}
                </Box>
              ))}
              
              {/* Actions */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  mt: 2,
                  position: 'sticky',
                  bottom: 0,
                  bgcolor: 'background.paper',
                  py: 2
                }}
              >
                {showResetButton && (
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleResetFilters}
                  >
                    Reset
                  </Button>
                )}
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleApplyFilters}
                >
                  Apply
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </>
    );
  };
  
  return isMobile ? renderMobileFilters() : renderDesktopFilters();
};

export default FilterPanel;
