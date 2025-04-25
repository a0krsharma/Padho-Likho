import React from 'react';
import {
  Box,
  Pagination as MuiPagination,
  PaginationItem,
  FormControl,
  Select,
  MenuItem,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon
} from '@mui/icons-material';

/**
 * A reusable pagination component with rows per page selector
 * 
 * @param {Object} props - Component props
 * @param {number} props.page - Current page (1-indexed)
 * @param {number} props.count - Total number of pages
 * @param {function} props.onChange - Callback when page changes
 * @param {number} props.rowsPerPage - Current rows per page
 * @param {function} props.onRowsPerPageChange - Callback when rows per page changes
 * @param {Array} props.rowsPerPageOptions - Available rows per page options
 * @param {number} props.total - Total number of items
 * @param {boolean} props.showRowsPerPage - Whether to show rows per page selector
 * @param {boolean} props.showTotal - Whether to show total items count
 * @param {Object} props.sx - Additional styles to apply
 */
const Pagination = ({
  page = 1,
  count = 1,
  onChange,
  rowsPerPage = 10,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 25, 50, 100],
  total = 0,
  showRowsPerPage = true,
  showTotal = true,
  sx = {}
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Handle page change
  const handlePageChange = (event, newPage) => {
    if (onChange) {
      onChange(newPage);
    }
  };
  
  // Handle rows per page change
  const handleRowsPerPageChange = (event) => {
    if (onRowsPerPageChange) {
      onRowsPerPageChange(event.target.value);
    }
  };
  
  // Calculate current range
  const calculateRange = () => {
    const start = (page - 1) * rowsPerPage + 1;
    const end = Math.min(page * rowsPerPage, total);
    
    return `${start}-${end}`;
  };
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 2 : 0,
        ...sx
      }}
    >
      {/* Rows per page selector */}
      {showRowsPerPage && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            Rows per page:
          </Typography>
          <FormControl size="small" variant="outlined">
            <Select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              sx={{ 
                minWidth: 80,
                '& .MuiSelect-select': {
                  py: 0.5
                }
              }}
            >
              {rowsPerPageOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
      
      {/* Total items count */}
      {showTotal && total > 0 && (
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            ml: isMobile ? 0 : 2,
            mr: isMobile ? 0 : 'auto'
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Showing {calculateRange()} of {total} items
          </Typography>
        </Box>
      )}
      
      {/* Pagination */}
      <MuiPagination
        page={page}
        count={count}
        onChange={handlePageChange}
        color="primary"
        size={isMobile ? 'small' : 'medium'}
        showFirstButton={!isMobile}
        showLastButton={!isMobile}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: KeyboardArrowLeftIcon, next: KeyboardArrowRightIcon }}
            {...item}
          />
        )}
        sx={{ 
          ml: isMobile ? 0 : 2,
          '& .MuiPaginationItem-root': {
            borderRadius: 1
          }
        }}
      />
    </Box>
  );
};

export default Pagination;
