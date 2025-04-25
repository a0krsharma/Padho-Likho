import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Grid,
  Button,
  Tooltip,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Today as TodayIcon,
  Event as EventIcon,
  AccessTime as AccessTimeIcon
} from '@mui/icons-material';

/**
 * A reusable calendar component for scheduling
 * 
 * @param {Object} props - Component props
 * @param {Array} props.events - Array of event objects
 * @param {function} props.onEventClick - Callback when an event is clicked
 * @param {function} props.onDateClick - Callback when a date is clicked
 * @param {function} props.onAddEvent - Callback when add event is triggered
 * @param {Date} props.initialDate - Initial date to display
 * @param {string} props.view - Calendar view (month, week, day)
 * @param {Object} props.sx - Additional styles to apply
 */
const Calendar = ({
  events = [],
  onEventClick,
  onDateClick,
  onAddEvent,
  initialDate = new Date(),
  view = 'month',
  sx = {}
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [currentView, setCurrentView] = useState(view);
  
  // Get month and year for header
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();
  
  // Navigation handlers
  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    
    if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (currentView === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    }
    
    setCurrentDate(newDate);
  };
  
  const handleNext = () => {
    const newDate = new Date(currentDate);
    
    if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (currentView === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    }
    
    setCurrentDate(newDate);
  };
  
  const handleToday = () => {
    setCurrentDate(new Date());
  };
  
  const handleViewChange = (newView) => {
    setCurrentView(newView);
  };
  
  // Helper to get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Helper to get day of week (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Generate days for month view
  const generateMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    // Get previous month's days to fill in first week
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);
    
    const days = [];
    
    // Add previous month's days
    for (let i = 0; i < firstDayOfMonth; i++) {
      const day = daysInPrevMonth - firstDayOfMonth + i + 1;
      days.push({
        day,
        month: prevMonth,
        year: prevMonthYear,
        isCurrentMonth: false
      });
    }
    
    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        month,
        year,
        isCurrentMonth: true
      });
    }
    
    // Add next month's days to fill remaining cells (6 rows x 7 days = 42 cells)
    const remainingDays = 42 - days.length;
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? year + 1 : year;
    
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        month: nextMonth,
        year: nextMonthYear,
        isCurrentMonth: false
      });
    }
    
    return days;
  };
  
  // Generate days for week view
  const generateWeekDays = () => {
    const date = new Date(currentDate);
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday
    
    // Adjust to start from Sunday
    date.setDate(date.getDate() - day);
    
    const days = [];
    
    // Generate 7 days of the week
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(date);
      days.push({
        date: currentDay,
        day: currentDay.getDate(),
        month: currentDay.getMonth(),
        year: currentDay.getFullYear(),
        isCurrentMonth: currentDay.getMonth() === currentDate.getMonth()
      });
      
      date.setDate(date.getDate() + 1);
    }
    
    return days;
  };
  
  // Generate hours for day view
  const generateDayHours = () => {
    const hours = [];
    
    for (let i = 8; i < 20; i++) { // 8 AM to 8 PM
      hours.push({
        hour: i,
        label: i > 12 ? `${i - 12} PM` : i === 12 ? '12 PM' : `${i} AM`
      });
    }
    
    return hours;
  };
  
  // Check if a date has events
  const getEventsForDate = (year, month, day) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === year &&
        eventDate.getMonth() === month &&
        eventDate.getDate() === day
      );
    });
  };
  
  // Check if a date is today
  const isToday = (year, month, day) => {
    const today = new Date();
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  };
  
  // Render month view
  const renderMonthView = () => {
    const days = generateMonthDays();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return (
      <Box>
        {/* Day names header */}
        <Grid container>
          {dayNames.map((dayName) => (
            <Grid item xs key={dayName} sx={{ textAlign: 'center' }}>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  py: 1, 
                  fontWeight: 'bold',
                  color: dayName === 'Sun' || dayName === 'Sat' 
                    ? 'text.secondary' 
                    : 'text.primary'
                }}
              >
                {dayName}
              </Typography>
            </Grid>
          ))}
        </Grid>
        
        {/* Calendar grid */}
        <Grid container>
          {days.map((day, index) => {
            const dateEvents = getEventsForDate(day.year, day.month, day.day);
            const isCurrentDay = isToday(day.year, day.month, day.day);
            
            return (
              <Grid 
                item 
                xs 
                key={index} 
                sx={{ 
                  height: '100px',
                  border: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: isCurrentDay 
                    ? alpha(theme.palette.primary.main, 0.1)
                    : day.isCurrentMonth 
                      ? 'background.paper' 
                      : 'action.hover',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.05)
                  }
                }}
                onClick={() => onDateClick && onDateClick(new Date(day.year, day.month, day.day))}
              >
                <Box sx={{ p: 1 }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: isCurrentDay ? 'bold' : day.isCurrentMonth ? 'medium' : 'normal',
                      color: !day.isCurrentMonth 
                        ? 'text.disabled' 
                        : isCurrentDay 
                          ? 'primary.main' 
                          : 'text.primary'
                    }}
                  >
                    {day.day}
                  </Typography>
                  
                  {/* Events */}
                  <Box sx={{ mt: 0.5 }}>
                    {dateEvents.slice(0, 2).map((event, idx) => (
                      <Chip
                        key={idx}
                        label={event.title}
                        size="small"
                        color={event.color || 'primary'}
                        variant="outlined"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick && onEventClick(event);
                        }}
                        sx={{ 
                          mb: 0.5, 
                          fontSize: '0.7rem',
                          height: '20px',
                          maxWidth: '100%',
                          '& .MuiChip-label': {
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }
                        }}
                      />
                    ))}
                    {dateEvents.length > 2 && (
                      <Typography variant="caption" color="text.secondary">
                        +{dateEvents.length - 2} more
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  };
  
  // Render week view
  const renderWeekView = () => {
    const weekDays = generateWeekDays();
    const hours = generateDayHours();
    
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {/* Day headers */}
        <Box sx={{ display: 'flex', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ width: '60px' }} /> {/* Time column */}
          {weekDays.map((day, index) => {
            const isCurrentDay = isToday(day.year, day.month, day.day);
            const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(day.year, day.month, day.day).getDay()];
            
            return (
              <Box 
                key={index} 
                sx={{ 
                  flex: 1, 
                  textAlign: 'center',
                  py: 1,
                  backgroundColor: isCurrentDay ? alpha(theme.palette.primary.main, 0.1) : 'transparent'
                }}
              >
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: isCurrentDay ? 'primary.main' : 'text.primary'
                  }}
                >
                  {dayName}
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{ 
                    color: isCurrentDay ? 'primary.main' : 'text.secondary'
                  }}
                >
                  {day.day}
                </Typography>
              </Box>
            );
          })}
        </Box>
        
        {/* Hours and events */}
        {hours.map((hour) => (
          <Box 
            key={hour.hour} 
            sx={{ 
              display: 'flex', 
              borderBottom: '1px solid', 
              borderColor: 'divider',
              minHeight: '60px'
            }}
          >
            {/* Time column */}
            <Box 
              sx={{ 
                width: '60px', 
                borderRight: '1px solid', 
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {hour.label}
              </Typography>
            </Box>
            
            {/* Day columns */}
            {weekDays.map((day, index) => {
              const dateEvents = events.filter(event => {
                const eventDate = new Date(event.date);
                const eventHour = new Date(event.time).getHours();
                
                return (
                  eventDate.getFullYear() === day.year &&
                  eventDate.getMonth() === day.month &&
                  eventDate.getDate() === day.day &&
                  eventHour === hour.hour
                );
              });
              
              return (
                <Box 
                  key={index} 
                  sx={{ 
                    flex: 1,
                    borderRight: '1px solid', 
                    borderColor: 'divider',
                    position: 'relative',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.03)
                    }
                  }}
                  onClick={() => {
                    const date = new Date(day.year, day.month, day.day);
                    date.setHours(hour.hour);
                    onDateClick && onDateClick(date);
                  }}
                >
                  {dateEvents.map((event, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        position: 'absolute',
                        top: '2px',
                        left: '2px',
                        right: '2px',
                        backgroundColor: event.color ? `${event.color}.light` : 'primary.light',
                        borderLeft: '3px solid',
                        borderColor: event.color ? `${event.color}.main` : 'primary.main',
                        borderRadius: 1,
                        p: 0.5,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        '&:hover': {
                          opacity: 0.9
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick && onEventClick(event);
                      }}
                    >
                      <Typography variant="caption" sx={{ fontWeight: 'medium' }}>
                        {event.title}
                      </Typography>
                      {event.subtitle && (
                        <Typography variant="caption" display="block" sx={{ fontSize: '0.7rem' }}>
                          {event.subtitle}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>
    );
  };
  
  // Render day view
  const renderDayView = () => {
    const hours = generateDayHours();
    const dayEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === currentDate.getFullYear() &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getDate() === currentDate.getDate()
      );
    });
    
    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
          {currentDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Typography>
        
        {/* Hours and events */}
        {hours.map((hour) => {
          const hourEvents = dayEvents.filter(event => {
            const eventHour = new Date(event.time).getHours();
            return eventHour === hour.hour;
          });
          
          return (
            <Box 
              key={hour.hour} 
              sx={{ 
                display: 'flex', 
                borderBottom: '1px solid', 
                borderColor: 'divider',
                minHeight: '80px'
              }}
            >
              {/* Time column */}
              <Box 
                sx={{ 
                  width: '80px', 
                  borderRight: '1px solid', 
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {hour.label}
                </Typography>
              </Box>
              
              {/* Events column */}
              <Box 
                sx={{ 
                  flex: 1,
                  p: 1,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.03)
                  }
                }}
                onClick={() => {
                  const date = new Date(currentDate);
                  date.setHours(hour.hour);
                  onDateClick && onDateClick(date);
                }}
              >
                {hourEvents.length > 0 ? (
                  hourEvents.map((event, idx) => (
                    <Paper
                      key={idx}
                      elevation={1}
                      sx={{
                        p: 1,
                        mb: 1,
                        borderLeft: '3px solid',
                        borderColor: event.color ? `${event.color}.main` : 'primary.main',
                        backgroundColor: event.color ? `${event.color}.light` : 'primary.light',
                        cursor: 'pointer',
                        '&:hover': {
                          opacity: 0.9
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick && onEventClick(event);
                      }}
                    >
                      <Typography variant="subtitle2">
                        {event.title}
                      </Typography>
                      {event.subtitle && (
                        <Typography variant="body2" color="text.secondary">
                          {event.subtitle}
                        </Typography>
                      )}
                      {event.time && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, fontSize: '0.875rem' }} />
                          <Typography variant="caption">
                            {new Date(event.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </Typography>
                        </Box>
                      )}
                    </Paper>
                  ))
                ) : (
                  <Box 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0.5
                    }}
                  >
                    {onAddEvent && (
                      <Button 
                        variant="text" 
                        size="small"
                        startIcon={<EventIcon />}
                        onClick={(e) => {
                          e.stopPropagation();
                          const date = new Date(currentDate);
                          date.setHours(hour.hour);
                          onAddEvent(date);
                        }}
                      >
                        Add Event
                      </Button>
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    );
  };
  
  return (
    <Paper elevation={1} sx={{ p: 2, borderRadius: 2, ...sx }}>
      {/* Calendar header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {currentView === 'month' 
            ? `${currentMonth} ${currentYear}`
            : currentView === 'week'
              ? `Week of ${currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
              : currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
          }
        </Typography>
        
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
          {/* View switcher */}
          {!isMobile && (
            <Box sx={{ mr: 2 }}>
              <Button
                size="small"
                variant={currentView === 'month' ? 'contained' : 'outlined'}
                onClick={() => handleViewChange('month')}
                sx={{ mr: 1 }}
              >
                Month
              </Button>
              <Button
                size="small"
                variant={currentView === 'week' ? 'contained' : 'outlined'}
                onClick={() => handleViewChange('week')}
                sx={{ mr: 1 }}
              >
                Week
              </Button>
              <Button
                size="small"
                variant={currentView === 'day' ? 'contained' : 'outlined'}
                onClick={() => handleViewChange('day')}
              >
                Day
              </Button>
            </Box>
          )}
          
          {/* Navigation */}
          <Tooltip title="Today">
            <IconButton onClick={handleToday} size="small">
              <TodayIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Previous">
            <IconButton onClick={handlePrevious} size="small">
              <ChevronLeftIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Next">
            <IconButton onClick={handleNext} size="small">
              <ChevronRightIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      {/* Calendar body */}
      <Box sx={{ overflow: 'auto' }}>
        {currentView === 'month' && renderMonthView()}
        {currentView === 'week' && renderWeekView()}
        {currentView === 'day' && renderDayView()}
      </Box>
    </Paper>
  );
};

// Helper function for theme alpha
const alpha = (color, opacity) => {
  return color ? `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}` : undefined;
};

export default Calendar;
