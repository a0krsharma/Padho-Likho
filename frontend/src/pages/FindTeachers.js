import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Avatar, 
  Chip,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Rating,
  InputAdornment,
  IconButton,
  Pagination,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Star as StarIcon,
  School as SchoolIcon,
  AccessTime as AccessTimeIcon,
  Language as LanguageIcon,
  Verified as VerifiedIcon,
  Sort as SortIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Sample teacher data
const teachersData = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    subjects: ['Mathematics', 'Physics'],
    classes: [9, 10],
    experience: 8,
    rating: 4.9,
    reviewCount: 124,
    hourlyRate: 600,
    bio: 'Experienced mathematics and physics teacher with a passion for making complex concepts easy to understand.',
    languages: ['English', 'Hindi'],
    verified: true,
    availability: 'Weekdays evenings, Weekends'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    subjects: ['English', 'Hindi'],
    classes: [1, 2, 3, 4, 5],
    experience: 5,
    rating: 4.7,
    reviewCount: 98,
    hourlyRate: 450,
    bio: 'Dedicated language teacher specializing in primary education with a focus on building strong foundations.',
    languages: ['English', 'Hindi', 'Punjabi'],
    verified: true,
    availability: 'Flexible hours'
  },
  {
    id: 3,
    name: 'Amit Patel',
    image: 'https://randomuser.me/api/portraits/men/62.jpg',
    subjects: ['Computer Science', 'Mathematics'],
    classes: [6, 7, 8, 9, 10],
    experience: 10,
    rating: 4.8,
    reviewCount: 156,
    hourlyRate: 750,
    bio: 'Tech enthusiast and educator with expertise in programming, algorithms, and mathematical concepts.',
    languages: ['English', 'Gujarati'],
    verified: true,
    availability: 'Weekday mornings, Weekends'
  },
  {
    id: 4,
    name: 'Neha Gupta',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    subjects: ['Science', 'Biology'],
    classes: [8, 9, 10],
    experience: 7,
    rating: 4.6,
    reviewCount: 87,
    hourlyRate: 550,
    bio: 'Passionate science educator with a knack for explaining complex biological concepts through practical examples.',
    languages: ['English', 'Hindi'],
    verified: true,
    availability: 'Weekday afternoons, Weekends'
  },
  {
    id: 5,
    name: 'Sanjay Verma',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    subjects: ['Social Studies', 'History'],
    classes: [6, 7, 8, 9, 10],
    experience: 12,
    rating: 4.5,
    reviewCount: 112,
    hourlyRate: 500,
    bio: 'History enthusiast with a storytelling approach to make historical events engaging and memorable.',
    languages: ['English', 'Hindi', 'Marathi'],
    verified: false,
    availability: 'Weekends only'
  },
  {
    id: 6,
    name: 'Ananya Singh',
    image: 'https://randomuser.me/api/portraits/women/90.jpg',
    subjects: ['Mathematics', 'Science'],
    classes: [1, 2, 3, 4, 5],
    experience: 4,
    rating: 4.8,
    reviewCount: 65,
    hourlyRate: 400,
    bio: 'Primary education specialist focusing on building strong mathematical and scientific foundations.',
    languages: ['English', 'Hindi', 'Bengali'],
    verified: true,
    availability: 'Flexible hours'
  }
];

// Teacher card component
const TeacherCard = ({ teacher, onBookNow }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  return (
    <Card 
      elevation={2} 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        borderRadius: 3,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': { 
          transform: 'translateY(-5px)',
          boxShadow: 6
        }
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <Avatar 
          src={teacher.image} 
          sx={{ 
            width: 80, 
            height: 80, 
            border: '2px solid',
            borderColor: 'primary.main'
          }} 
        />
        <Box sx={{ ml: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="h3">
              {teacher.name}
            </Typography>
            {teacher.verified && (
              <VerifiedIcon 
                color="primary" 
                sx={{ ml: 1, fontSize: 18 }} 
                titleAccess="Verified Teacher"
              />
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
            <Rating 
              value={teacher.rating} 
              precision={0.1} 
              size="small" 
              readOnly 
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({teacher.reviewCount} reviews)
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            ₹{teacher.hourlyRate}/hour
          </Typography>
        </Box>
      </Box>
      
      <Divider />
      
      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {teacher.bio}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <SchoolIcon color="primary" sx={{ fontSize: 18, mr: 1 }} />
          <Typography variant="body2">
            <strong>Experience:</strong> {teacher.experience} years
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <AccessTimeIcon color="primary" sx={{ fontSize: 18, mr: 1 }} />
          <Typography variant="body2">
            <strong>Availability:</strong> {teacher.availability}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <LanguageIcon color="primary" sx={{ fontSize: 18, mr: 1 }} />
          <Typography variant="body2">
            <strong>Languages:</strong> {teacher.languages.join(', ')}
          </Typography>
        </Box>
        
        <Typography variant="subtitle2" sx={{ mb: 1, mt: 2 }}>
          Subjects:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {teacher.subjects.map((subject, index) => (
            <Chip 
              key={index} 
              label={subject} 
              size="small" 
              color="primary" 
              variant="outlined" 
            />
          ))}
        </Box>
        
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Classes:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {teacher.classes.map((classNum, index) => (
            <Chip 
              key={index} 
              label={`Class ${classNum}`} 
              size="small"
              color="secondary"
              variant="outlined"
            />
          ))}
        </Box>
      </CardContent>
      
      <Box sx={{ p: 2, pt: 0, display: 'flex', gap: 2 }}>
        <Button 
          variant="outlined" 
          fullWidth
          onClick={() => navigate(`/teachers/${teacher.id}`)}
        >
          View Profile
        </Button>
        <Button 
          variant="contained" 
          fullWidth
          onClick={() => onBookNow(teacher)}
        >
          Book Now
        </Button>
      </Box>
    </Card>
  );
};

const FindTeachers = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [priceRange, setPriceRange] = useState([200, 1000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(!isMobile);
  
  // Pagination
  const [page, setPage] = useState(1);
  const teachersPerPage = 4;
  
  // Handle booking
  const handleBookNow = (teacher) => {
    console.log('Booking teacher:', teacher);
    // In a real application, this would navigate to a booking page or open a booking modal
    navigate(`/teachers/${teacher.id}/book`);
  };
  
  // Filter and sort teachers
  const filteredTeachers = teachersData.filter(teacher => {
    // Search term filter
    if (searchTerm && !teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !teacher.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }
    
    // Subject filter
    if (selectedSubject && !teacher.subjects.includes(selectedSubject)) {
      return false;
    }
    
    // Class filter
    if (selectedClass && !teacher.classes.includes(parseInt(selectedClass))) {
      return false;
    }
    
    // Price range filter
    if (teacher.hourlyRate < priceRange[0] || teacher.hourlyRate > priceRange[1]) {
      return false;
    }
    
    // Rating filter
    if (ratingFilter > 0 && teacher.rating < ratingFilter) {
      return false;
    }
    
    return true;
  });
  
  // Sort teachers
  const sortedTeachers = [...filteredTeachers].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'experience':
        return b.experience - a.experience;
      case 'price_low':
        return a.hourlyRate - b.hourlyRate;
      case 'price_high':
        return b.hourlyRate - a.hourlyRate;
      default:
        return 0;
    }
  });
  
  // Paginate teachers
  const indexOfLastTeacher = page * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = sortedTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);
  const totalPages = Math.ceil(sortedTeachers.length / teachersPerPage);
  
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <Box>
      {/* Header Section */}
      <Box 
        sx={{ 
          backgroundColor: 'primary.light',
          backgroundImage: 'linear-gradient(135deg, #4361ee 0%, #738eef 100%)',
          color: 'white',
          py: 8,
          borderRadius: 4,
          mb: 6
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Find Teachers
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
            Connect with qualified teachers who can help you excel in your studies
          </Typography>
          
          <Box 
            component="form" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              maxWidth: 600,
              mx: 'auto',
              bgcolor: 'white',
              borderRadius: 3,
              px: 2,
              py: 0.5
            }}
          >
            <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            <TextField
              fullWidth
              placeholder="Search by subject or teacher name..."
              variant="standard"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                disableUnderline: true,
              }}
            />
            <Button 
              variant="contained" 
              sx={{ borderRadius: 2, ml: 1 }}
            >
              Search
            </Button>
          </Box>
        </Container>
      </Box>
      
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {/* Filters */}
          <Grid item xs={12} md={3}>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Button 
                startIcon={<FilterListIcon />}
                onClick={toggleFilters}
                variant="outlined"
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
              
              <FormControl sx={{ minWidth: 150 }} size="small">
                <InputLabel id="sort-label">Sort By</InputLabel>
                <Select
                  labelId="sort-label"
                  id="sort"
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="rating">Top Rated</MenuItem>
                  <MenuItem value="experience">Most Experienced</MenuItem>
                  <MenuItem value="price_low">Price: Low to High</MenuItem>
                  <MenuItem value="price_high">Price: High to Low</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            {showFilters && (
              <Card elevation={2} sx={{ p: 3, borderRadius: 3, position: { md: 'sticky' }, top: { md: 20 } }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <FilterListIcon sx={{ mr: 1 }} />
                  Filters
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <FormControl fullWidth margin="normal">
                  <InputLabel id="subject-label">Subject</InputLabel>
                  <Select
                    labelId="subject-label"
                    id="subject"
                    value={selectedSubject}
                    label="Subject"
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    <MenuItem value="">All Subjects</MenuItem>
                    <MenuItem value="Mathematics">Mathematics</MenuItem>
                    <MenuItem value="Science">Science</MenuItem>
                    <MenuItem value="Physics">Physics</MenuItem>
                    <MenuItem value="Chemistry">Chemistry</MenuItem>
                    <MenuItem value="Biology">Biology</MenuItem>
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Hindi">Hindi</MenuItem>
                    <MenuItem value="Social Studies">Social Studies</MenuItem>
                    <MenuItem value="History">History</MenuItem>
                    <MenuItem value="Computer Science">Computer Science</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl fullWidth margin="normal">
                  <InputLabel id="class-label">Class</InputLabel>
                  <Select
                    labelId="class-label"
                    id="class"
                    value={selectedClass}
                    label="Class"
                    onChange={(e) => setSelectedClass(e.target.value)}
                  >
                    <MenuItem value="">All Classes</MenuItem>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((classNum) => (
                      <MenuItem key={classNum} value={classNum}>
                        Class {classNum}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <Box sx={{ mt: 3, mb: 4 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Price Range (₹/hour)
                  </Typography>
                  <Slider
                    value={priceRange}
                    onChange={(e, newValue) => setPriceRange(newValue)}
                    valueLabelDisplay="auto"
                    min={200}
                    max={1000}
                    step={50}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      ₹{priceRange[0]}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹{priceRange[1]}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Minimum Rating
                  </Typography>
                  <Rating
                    value={ratingFilter}
                    onChange={(e, newValue) => setRatingFilter(newValue)}
                    precision={0.5}
                  />
                </Box>
                
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                  <Button 
                    variant="contained" 
                    fullWidth
                    onClick={toggleFilters}
                  >
                    Apply Filters
                  </Button>
                </Box>
              </Card>
            )}
          </Grid>
          
          {/* Teacher List */}
          <Grid item xs={12} md={9}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" component="h2">
                {sortedTeachers.length} Teachers Found
              </Typography>
              
              <FormControl sx={{ minWidth: 200 }} size="small">
                <InputLabel id="sort-label">Sort By</InputLabel>
                <Select
                  labelId="sort-label"
                  id="sort"
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <SortIcon />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="rating">Top Rated</MenuItem>
                  <MenuItem value="experience">Most Experienced</MenuItem>
                  <MenuItem value="price_low">Price: Low to High</MenuItem>
                  <MenuItem value="price_high">Price: High to Low</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            {currentTeachers.length > 0 ? (
              <>
                <Grid container spacing={3}>
                  {currentTeachers.map((teacher) => (
                    <Grid item xs={12} key={teacher.id}>
                      <TeacherCard 
                        teacher={teacher} 
                        onBookNow={handleBookNow} 
                      />
                    </Grid>
                  ))}
                </Grid>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination 
                    count={totalPages} 
                    page={page} 
                    onChange={handlePageChange} 
                    color="primary" 
                    size={isMobile ? "small" : "medium"}
                  />
                </Box>
              </>
            ) : (
              <Box 
                sx={{ 
                  textAlign: 'center', 
                  py: 8,
                  bgcolor: 'background.paper',
                  borderRadius: 3
                }}
              >
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No teachers found matching your criteria
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Try adjusting your filters or search term
                </Typography>
                <Button 
                  variant="contained" 
                  sx={{ mt: 3 }}
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSubject('');
                    setSelectedClass('');
                    setPriceRange([200, 1000]);
                    setRatingFilter(0);
                  }}
                >
                  Clear All Filters
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FindTeachers;
