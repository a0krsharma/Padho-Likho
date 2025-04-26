import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  Checkbox,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
  TextField,
  InputAdornment,
  Chip,
  alpha
} from '@mui/material';
import {
  Search as SearchIcon,

  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';

/**
 * A reusable data table component with sorting, filtering, and pagination
 * 
 * @param {Object} props - Component props
 * @param {Array} props.columns - Array of column definitions
 * @param {Array} props.data - Array of data objects
 * @param {string} props.title - Table title
 * @param {boolean} props.selectable - Whether rows are selectable
 * @param {function} props.onRowClick - Callback when a row is clicked
 * @param {function} props.onEdit - Callback when edit action is triggered
 * @param {function} props.onDelete - Callback when delete action is triggered
 * @param {function} props.onView - Callback when view action is triggered
 * @param {boolean} props.loading - Whether the table is loading
 * @param {Object} props.sx - Additional styles to apply
 */
const DataTable = ({
  columns = [],
  data = [],
  title = '',
  selectable = false,
  onRowClick,
  onEdit,
  onDelete,
  onView,
  loading = false,
  sx = {}
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };
  
  // Filter data based on search term
  const filteredData = data.filter(item => {
    if (!searchTerm) return true;
    
    // Search across all string and number fields
    return Object.keys(item).some(key => {
      const value = item[key];
      if (typeof value === 'string' || typeof value === 'number') {
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });
  });
  
  // Handle sort
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  
  // Sort data
  const sortedData = React.useMemo(() => {
    if (!orderBy) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];
      
      if (aValue === undefined || bValue === undefined) return 0;
      
      // Handle different data types
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      // Default string comparison
      return order === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [filteredData, order, orderBy]);
  
  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Selection handlers
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = sortedData.map(n => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  
  const handleSelectClick = (event, id) => {
    event.stopPropagation();
    
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    
    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else if (selectedIndex === 0) {
      newSelected = selected.slice(1);
    } else if (selectedIndex === selected.length - 1) {
      newSelected = selected.slice(0, -1);
    } else if (selectedIndex > 0) {
      newSelected = [
        ...selected.slice(0, selectedIndex),
        ...selected.slice(selectedIndex + 1),
      ];
    }
    
    setSelected(newSelected);
  };
  
  const isSelected = (id) => selected.indexOf(id) !== -1;
  
  // Calculate empty rows for pagination
  const emptyRows = page > 0
    ? Math.max(0, (1 + page) * rowsPerPage - sortedData.length)
    : 0;
  
  // Render cell content based on type
  const renderCellContent = (column, value) => {
    if (value === undefined || value === null) return '-';
    
    if (column.renderCell) {
      return column.renderCell(value);
    }
    
    if (column.type === 'date') {
      return new Date(value).toLocaleDateString();
    }
    
    if (column.type === 'datetime') {
      return new Date(value).toLocaleString();
    }
    
    if (column.type === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    
    if (column.type === 'status') {
      const statusColors = {
        active: 'success',
        inactive: 'error',
        pending: 'warning',
        completed: 'success',
        confirmed: 'success',
        cancelled: 'error',
        'in progress': 'info',
        'pending_review': 'warning'
      };
      
      const statusText = String(value).replace('_', ' ');
      const color = statusColors[value.toLowerCase()] || 'default';
      
      return (
        <Chip 
          label={statusText.charAt(0).toUpperCase() + statusText.slice(1)} 
          size="small" 
          color={color}
          variant="outlined"
        />
      );
    }
    
    return String(value);
  };
  
  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Paper sx={{ width: '100%', mb: 2, borderRadius: 2, overflow: 'hidden' }}>
        {/* Toolbar with title, search and actions */}
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(selected.length > 0 && {
              bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
          }}
        >
          {selected.length > 0 ? (
            <Typography
              sx={{ flex: '1 1 100%' }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {selected.length} selected
            </Typography>
          ) : (
            <>
              {title && (
                <Typography
                  sx={{ flex: '1 1 100%', fontWeight: 'bold' }}
                  variant="h6"
                  id="tableTitle"
                  component="div"
                >
                  {title}
                </Typography>
              )}
              <TextField
                size="small"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                sx={{ ml: 'auto', width: { xs: '100%', sm: 'auto' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}

          {selected.length > 0 && onDelete && (
            <Tooltip title="Delete">
              <IconButton onClick={() => onDelete(selected)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
        
        {/* Table */}
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableHead>
              <TableRow>
                {selectable && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      indeterminate={selected.length > 0 && selected.length < sortedData.length}
                      checked={sortedData.length > 0 && selected.length === sortedData.length}
                      onChange={handleSelectAllClick}
                      inputProps={{
                        'aria-label': 'select all',
                      }}
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    align={column.align || 'left'}
                    padding={column.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === column.field ? order : false}
                    sx={{ fontWeight: 'bold' }}
                  >
                    {column.sortable !== false ? (
                      <TableSortLabel
                        active={orderBy === column.field}
                        direction={orderBy === column.field ? order : 'asc'}
                        onClick={() => handleRequestSort(column.field)}
                      >
                        {column.headerName}
                      </TableSortLabel>
                    ) : (
                      column.headerName
                    )}
                  </TableCell>
                ))}
                {(onEdit || onDelete || onView) && (
                  <TableCell align="right">Actions</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  
                  return (
                    <TableRow
                      hover
                      onClick={onRowClick ? () => onRowClick(row) : undefined}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id || index}
                      selected={isItemSelected}
                      sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                    >
                      {selectable && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onClick={(event) => handleSelectClick(event, row.id)}
                          />
                        </TableCell>
                      )}
                      {columns.map((column) => (
                        <TableCell 
                          key={`${row.id}-${column.field}`} 
                          align={column.align || 'left'}
                        >
                          {renderCellContent(column, row[column.field])}
                        </TableCell>
                      ))}
                      {(onEdit || onDelete || onView) && (
                        <TableCell align="right">
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {onView && (
                              <Tooltip title="View">
                                <IconButton 
                                  size="small" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onView(row);
                                  }}
                                >
                                  <VisibilityIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                            {onEdit && (
                              <Tooltip title="Edit">
                                <IconButton 
                                  size="small" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(row);
                                  }}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                            {onDelete && (
                              <Tooltip title="Delete">
                                <IconButton 
                                  size="small" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete([row.id]);
                                  }}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Box>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={columns.length + (selectable ? 1 : 0) + ((onEdit || onDelete || onView) ? 1 : 0)} />
                </TableRow>
              )}
              {sortedData.length === 0 && (
                <TableRow>
                  <TableCell 
                    colSpan={columns.length + (selectable ? 1 : 0) + ((onEdit || onDelete || onView) ? 1 : 0)}
                    align="center"
                    sx={{ py: 3 }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      {loading ? 'Loading...' : 'No data found'}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sortedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default DataTable;
