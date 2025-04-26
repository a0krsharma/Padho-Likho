import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  Avatar, 
  Paper, 
  Chip, 
  Tabs,
  Tab,
  Divider,
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText
} from '@mui/material';
import { useTheme } from '@mui/material';
import { 
  School as SchoolIcon, 
  Search as SearchIcon, 
  VideoCall as VideoCallIcon, 
  Assignment as AssignmentIcon, 
  Star as StarIcon,
  Group as GroupIcon,
  Payments as PaymentsIcon,
  Celebration as CelebrationIcon,
  Dashboard as DashboardIcon,
  Help as HelpIcon,
  Class as ClassIcon,
  Verified as VerifiedIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Feature card component
const FeatureCard = ({ icon, title, description }) => (
  <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-5px)' } }}>
    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 3 }}>
      <Box sx={{ 
        backgroundColor: 'primary.light', 
        borderRadius: '50%', 
        width: 70, 
        height: 70, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        mb: 2
      }}>
        {icon}
      </Box>
      <Typography variant="h5" component="h2" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

// Testimonial card component
const TestimonialCard = ({ name, role, image, testimonial }) => (
  <Paper elevation={2} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Avatar src={image} sx={{ width: 60, height: 60, mr: 2 }} />
      <Box>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" color="text.secondary">{role}</Typography>
      </Box>
    </Box>
    <Typography variant="body1">"{testimonial}"</Typography>
    <Box sx={{ display: 'flex', mt: 2 }}>
      <StarIcon sx={{ color: 'warning.main' }} />
      <StarIcon sx={{ color: 'warning.main' }} />
      <StarIcon sx={{ color: 'warning.main' }} />
      <StarIcon sx={{ color: 'warning.main' }} />
      <StarIcon sx={{ color: 'warning.main' }} />
    </Box>
  </Paper>
);

// Pricing card component
const PricingCard = ({ title, price, description, features, recommended }) => {
  const theme = useTheme();
  
  const navigate = useNavigate();
  
  return (
    <Card 
      elevation={recommended ? 8 : 2} 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        borderRadius: 3,
        position: 'relative',
        border: recommended ? `2px solid ${theme.palette.primary.main}` : 'none',
        transition: 'transform 0.3s',
        '&:hover': { transform: 'translateY(-5px)' }
      }}
    >
      {recommended && (
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 10, 
            right: 10, 
            backgroundColor: 'primary.main',
            color: 'white',
            px: 2,
            py: 0.5,
            borderRadius: 5,
            fontSize: '0.75rem',
            fontWeight: 'bold'
          }}
        >
          POPULAR
        </Box>
      )}
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom align="center">
          {title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', mb: 2 }}>
          <Typography variant="h3" component="span" color="primary.main">
            ₹{price}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            /month
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
          {description}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {features.map((feature, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <SchoolIcon sx={{ color: 'primary.main', mr: 1, fontSize: 20 }} />
            <Typography variant="body2">{feature}</Typography>
          </Box>
        ))}
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
        <Button 
          variant={recommended ? "contained" : "outlined"} 
          color="primary" 
          fullWidth
          size="large"
          onClick={() => navigate('/register')}
        >
          Get Started
        </Button>
      </Box>
    </Card>
  );
};

// Subject card component
const SubjectCard = ({ icon, title, color, onClick }) => (
  <Paper 
    elevation={2} 
    sx={{ 
      p: 2, 
      borderRadius: 3, 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': { 
        transform: 'translateY(-5px)',
        boxShadow: 6
      }
    }}
    onClick={onClick}
  >
    <Box sx={{ 
      color: 'white', 
      bgcolor: color, 
      p: 2, 
      borderRadius: '50%', 
      mb: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {icon}
    </Box>
    <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
      {title}
    </Typography>
  </Paper>
);

const Home = () => {
  
  const navigate = useNavigate();
  
  // State for quick booking widget
  const [bookingClass, setBookingClass] = useState('');
  const [bookingSubject, setBookingSubject] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  
  // State for pricing plan selection
  const [selectedPlan, setSelectedPlan] = useState(1);
  
  // State for dashboard tabs
  const [dashboardTabValue, setDashboardTabValue] = useState(0);
  
  const handleDashboardTabChange = (event, newValue) => {
    setDashboardTabValue(newValue);
  };
  
  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          backgroundColor: 'primary.light',
          backgroundImage: 'linear-gradient(135deg, #4361ee 0%, #738eef 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          borderRadius: 4,
          mb: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom
                sx={{ 
                  fontWeight: 'bold',
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                Learn From The Best IITians Teachers Online
              </Typography>
              <Typography 
                variant="h5" 
                paragraph
                sx={{ mb: 4, opacity: 0.9 }}
              >
                Connect with qualified IITian teachers for personalized learning experiences from Class 1 to 10.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                <Button 
                  variant="contained" 
                  size="large"
                  color="secondary"
                  startIcon={<SearchIcon />}
                  onClick={() => navigate('/find-teachers')}
                  sx={{ 
                    py: 1.5, 
                    px: 3,
                    fontSize: '1rem',
                    boxShadow: '0 8px 16px rgba(255, 107, 107, 0.3)'
                  }}
                >
                  Find a Teacher
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  sx={{ 
                    py: 1.5, 
                    px: 3,
                    fontSize: '1rem',
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                  onClick={() => navigate('/register')}
                >
                  Register Now
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box 
                component="img"
                src="https://img.freepik.com/free-vector/online-learning-concept-illustration_114360-4735.jpg"
                alt="Online Learning"
                sx={{ 
                  width: '100%',
                  maxWidth: 500,
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  transform: 'perspective(1000px) rotateY(-10deg)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Book Free Trial Section */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: { xs: 4, md: 6 } }}>
        <Container maxWidth="md">
          <Paper elevation={6} sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            boxShadow: '0 8px 32px 0 rgba(67,97,238,0.10)',
            background: 'rgba(255,255,255,0.98)',
            maxWidth: 600,
            mx: 'auto',
            mt: { xs: -8, md: -12 }
          }}>
            <Typography variant="h4" fontWeight="bold" align="center" gutterBottom color="primary.main">
              Book a Free Trial Class
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
              Start your child’s journey to academic excellence! Simply fill out the form below to book your free trial class.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" style={{ width: '100%', maxWidth: 400 }}>
  <input type="hidden" name="form-name" value="contact" />
  <input type="hidden" name="bot-field" />
                <input type="hidden" name="form-name" value="contact" />
                <p>
                  <label>Name <input type="text" name="name" required style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', marginTop: 4 }} /></label>
                </p>
                <p>
                  <label>Email <input type="email" name="email" required style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', marginTop: 4 }} /></label>
                </p>
                <p>
                  <label>Phone Number <input type="tel" name="phone" required maxLength="15" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', marginTop: 4 }} /></label>
                </p>
                <p>
                  <label>Subject <input type="text" name="subject" required style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', marginTop: 4 }} placeholder="e.g. Math, Science" /></label>
                </p>
                <p>
                  <label>Class
                    <select name="class" required style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', marginTop: 4 }}>
                      <option value="">Select Class</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </label>
                </p>
                <p>
                  <label>Language
                    <select name="language" required style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', marginTop: 4 }}>
                      <option value="">Select Language</option>
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Hinglish">Hinglish</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>
                </p>
                <p>
                  <button type="submit" style={{ padding: '10px 24px', borderRadius: 4, background: '#4361ee', color: 'white', border: 'none', fontWeight: 'bold', fontSize: 16, cursor: 'pointer' }}>Book</button>
                </p>
              </form>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* IITian Teachers Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Learn From India's Top IITians
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Our platform connects you with the brightest minds from IITs who are passionate about teaching and mentoring the next generation
          </Typography>
        </Box>
        
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              height: '100%', 
              justifyContent: 'center',
              pr: { md: 4 }
            }}>
              <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Why IITian Teachers Make a Difference
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <StarIcon sx={{ mr: 1, color: 'secondary.main' }} /> Strong foundation in concepts
                </Typography>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <StarIcon sx={{ mr: 1, color: 'secondary.main' }} /> Problem-solving approach to learning
                </Typography>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <StarIcon sx={{ mr: 1, color: 'secondary.main' }} /> Proven teaching methodologies
                </Typography>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <StarIcon sx={{ mr: 1, color: 'secondary.main' }} /> Expertise in competitive exam preparation
                </Typography>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                  <StarIcon sx={{ mr: 1, color: 'secondary.main' }} /> Mentorship beyond academics
                </Typography>
              </Box>
              <Button 
                variant="contained" 
                color="primary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/find-teachers')}
                sx={{ alignSelf: 'flex-start', mt: 2 }}
              >
                Meet Our IITian Teachers
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden' }}>
              <Box component="img" src="https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" alt="IITian Teachers" sx={{ width: '100%', height: 'auto' }} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
      
      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Why Choose Padho Likho?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Our platform offers a comprehensive learning experience with features designed to enhance education.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard 
              icon={<SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
              title="Qualified Teachers"
              description="Connect with verified teachers who are experts in their subjects and passionate about teaching."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard 
              icon={<VideoCallIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
              title="Interactive Classes"
              description="Engage in live interactive classes with screen sharing, digital whiteboard, and file sharing."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard 
              icon={<AssignmentIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
              title="Personalized Assessments"
              description="Track progress with customized quizzes, practice tests, and performance analytics."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard 
              icon={<GroupIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
              title="Flexible Group Sizes"
              description="Choose between one-on-one sessions or group classes based on your learning preferences."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard 
              icon={<PaymentsIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
              title="Affordable Pricing"
              description="Access quality education at competitive prices with flexible booking durations."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard 
              icon={<CelebrationIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
              title="Rewards & Recognition"
              description="Earn achievement badges and rewards as you progress in your learning journey."
            />
          </Grid>
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ backgroundColor: 'background.paper', py: 8, mb: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h2" gutterBottom>
              How It Works
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              Get started with Padho Likho in just a few simple steps
            </Typography>
          </Box>
          
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="https://img.freepik.com/free-vector/online-learning-concept-illustration_114360-4766.jpg"
                alt="How It Works"
                sx={{ 
                  width: '100%',
                  maxWidth: 500,
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  mx: 'auto',
                  display: 'block'
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: 'primary.main', 
                      width: 50, 
                      height: 50, 
                      mr: 2,
                      fontSize: '1.5rem',
                      fontWeight: 'bold'
                    }}
                  >
                    1
                  </Avatar>
                  <Box>
                    <Typography variant="h5" gutterBottom>Register an Account</Typography>
                    <Typography variant="body1" color="text.secondary">
                      Sign up as a student, parent, or teacher and complete your profile.
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: 'primary.main', 
                      width: 50, 
                      height: 50, 
                      mr: 2,
                      fontSize: '1.5rem',
                      fontWeight: 'bold'
                    }}
                  >
                    2
                  </Avatar>
                  <Box>
                    <Typography variant="h5" gutterBottom>Find the Perfect Teacher</Typography>
                    <Typography variant="body1" color="text.secondary">
                      Search for teachers based on subject, class, and other preferences.
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: 'primary.main', 
                      width: 50, 
                      height: 50, 
                      mr: 2,
                      fontSize: '1.5rem',
                      fontWeight: 'bold'
                    }}
                  >
                    3
                  </Avatar>
                  <Box>
                    <Typography variant="h5" gutterBottom>Book Your Sessions</Typography>
                    <Typography variant="body1" color="text.secondary">
                      Choose your preferred schedule and booking duration.
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: 'primary.main', 
                      width: 50, 
                      height: 50, 
                      mr: 2,
                      fontSize: '1.5rem',
                      fontWeight: 'bold'
                    }}
                  >
                    4
                  </Avatar>
                  <Box>
                    <Typography variant="h5" gutterBottom>Start Learning</Typography>
                    <Typography variant="body1" color="text.secondary">
                      Attend interactive classes, take assessments, and track your progress.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Affordable Pricing Plans
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Choose the plan that best suits your learning needs
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Tabs 
            value={selectedPlan} 
            onChange={(e, newValue) => setSelectedPlan(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ 
              '& .MuiTabs-indicator': { height: 3 },
              '& .MuiTab-root': { minWidth: 120, fontWeight: 'bold' }
            }}
          >
            <Tab label="1:1 Session" value={0} />
            <Tab label="1:2 Session" value={1} />
            <Tab label="1:5 Session" value={2} />
            <Tab label="1:10 Session" value={3} />
          </Tabs>
        </Box>
        
        <Grid container spacing={4} justifyContent="center">
          {selectedPlan === 0 && (
            <Grid item xs={12} md={8} lg={6}>
              <PricingCard 
                title="1:1 Session"
                price="2999"
                description="One-on-one personalized learning experience"
                features={[
                  "Personalized attention",
                  "Customized learning pace",
                  "Focused doubt clearing",
                  "Flexible scheduling",
                  "Direct teacher interaction"
                ]}
                recommended={true}
              />
            </Grid>
          )}
          {selectedPlan === 1 && (
            <Grid item xs={12} md={8} lg={6}>
              <PricingCard 
                title="1:2 Session"
                price="1499"
                description="Learn with a friend for better engagement"
                features={[
                  "Shared learning experience",
                  "Peer discussion",
                  "Competitive environment",
                  "Cost-effective",
                  "Collaborative projects"
                ]}
                recommended={true}
              />
            </Grid>
          )}
          {selectedPlan === 2 && (
            <Grid item xs={12} md={8} lg={6}>
              <PricingCard 
                title="1:5 Session"
                price="599"
                description="Small group learning for better interaction"
                features={[
                  "Group discussions",
                  "Diverse perspectives",
                  "Team activities",
                  "Affordable pricing",
                  "Social learning environment"
                ]}
                recommended={true}
              />
            </Grid>
          )}
          {selectedPlan === 3 && (
            <Grid item xs={12} md={8} lg={6}>
              <PricingCard 
                title="1:10 Session"
                price="299"
                description="Classroom-like experience at home"
                features={[
                  "Classroom environment",
                  "Group projects",
                  "Peer learning",
                  "Most economical option",
                  "Broader discussions"
                ]}
                recommended={true}
              />
            </Grid>
          )}
        </Grid>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button 
            variant="outlined" 
            color="primary"
            onClick={() => navigate('/find-teachers')}
            endIcon={<ArrowForwardIcon />}
          >
            Find Teachers
          </Button>
        </Box>
      </Container>

      {/* Testimonials Section */}
      <Box sx={{ backgroundColor: 'background.paper', py: 8, mb: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h2" gutterBottom>
              What Our Students Say
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              Hear from students who have transformed their learning journey with Padho Likho
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <TestimonialCard 
                name="Ravi Kumar"
                role="Class 8 Student"
                image="https://randomuser.me/api/portraits/men/32.jpg"
                testimonial="Padho Likho helped me improve my math grades from C to A+. My teacher explains concepts in a way that makes them easy to understand."
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TestimonialCard 
                name="Priya Sharma"
                role="Class 10 Student"
                image="https://randomuser.me/api/portraits/women/44.jpg"
                testimonial="The interactive classes and practice tests on Padho Likho have been instrumental in my board exam preparation. Highly recommended!"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TestimonialCard 
                name="Amit Patel"
                role="Parent"
                image="https://randomuser.me/api/portraits/men/62.jpg"
                testimonial="As a parent, I love the detailed progress reports and the ability to communicate directly with teachers. My daughter's confidence has improved significantly."
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Dashboard Access Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Access Your Dashboard
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Manage your learning journey or teaching activities with our comprehensive dashboards
          </Typography>
        </Box>
        
        <Box sx={{ mb: 5 }}>
          <Tabs 
            value={dashboardTabValue} 
            onChange={handleDashboardTabChange}
            variant="fullWidth"
            sx={{ 
              mb: 4,
              '& .MuiTabs-indicator': { height: 3 },
              '& .MuiTab-root': { fontWeight: 'bold' }
            }}
          >
            <Tab label="For Students" value={0} icon={<SchoolIcon />} iconPosition="start" />
            <Tab label="For Teachers" value={1} icon={<GroupIcon />} iconPosition="start" />
          </Tabs>
          
          {dashboardTabValue === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Card 
                  elevation={4} 
                  sx={{ 
                    height: '100%', 
                    borderRadius: 3, 
                    transition: 'all 0.3s',
                    '&:hover': { 
                      transform: 'translateY(-8px)', 
                      boxShadow: 8,
                      '& .dashboard-icon': {
                        transform: 'scale(1.1)'
                      }
                    } 
                  }}
                >
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 3 }}>
                    <Avatar 
                      sx={{ 
                        width: 70, 
                        height: 70, 
                        mb: 2, 
                        bgcolor: 'primary.main',
                        transition: 'transform 0.3s'
                      }}
                      className="dashboard-icon"
                    >
                      <DashboardIcon fontSize="large" />
                    </Avatar>
                    <Typography variant="h5" component="h3" gutterBottom>
                      Student Dashboard
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                      Access your classes, track progress, and manage your learning schedule all in one place
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', gap: 1 }}>
                      <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => navigate('/student/dashboard')}
                        sx={{ flexGrow: 1 }}
                        startIcon={<ArrowForwardIcon />}
                      >
                        Go to Dashboard
                      </Button>
                      <Chip 
                        label="New" 
                        color="error" 
                        size="small" 
                        sx={{ 
                          animation: 'pulse 1.5s infinite',
                          '@keyframes pulse': {
                            '0%': { opacity: 0.7 },
                            '50%': { opacity: 1 },
                            '100%': { opacity: 0.7 }
                          }
                        }} 
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card 
                  elevation={4} 
                  sx={{ 
                    height: '100%', 
                    borderRadius: 3, 
                    transition: 'all 0.3s',
                    '&:hover': { 
                      transform: 'translateY(-8px)', 
                      boxShadow: 8,
                      '& .dashboard-icon': {
                        transform: 'scale(1.1)'
                      }
                    } 
                  }}
                >
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 3 }}>
                    <Avatar 
                      sx={{ 
                        width: 70, 
                        height: 70, 
                        mb: 2, 
                        bgcolor: 'secondary.main',
                        transition: 'transform 0.3s'
                      }}
                      className="dashboard-icon"
                    >
                      <AssignmentIcon fontSize="large" />
                    </Avatar>
                    <Typography variant="h5" component="h3" gutterBottom>
                      Take Assessments
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                      Complete assignments, quizzes, and tests to evaluate your understanding and track your progress
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', gap: 1 }}>
                      <Button 
                        variant="contained" 
                        color="secondary"
                        onClick={() => navigate('/student/assessments')}
                        sx={{ flexGrow: 1 }}
                        startIcon={<AssignmentIcon />}
                      >
                        View Assessments
                      </Button>
                      <Chip 
                        label="3 Due" 
                        color="warning" 
                        size="small" 
                        sx={{ fontWeight: 'bold' }} 
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card 
                  elevation={4} 
                  sx={{ 
                    height: '100%', 
                    borderRadius: 3, 
                    transition: 'all 0.3s',
                    '&:hover': { 
                      transform: 'translateY(-8px)', 
                      boxShadow: 8,
                      '& .dashboard-icon': {
                        transform: 'scale(1.1)'
                      }
                    } 
                  }}
                >
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 3 }}>
                    <Avatar 
                      sx={{ 
                        width: 70, 
                        height: 70, 
                        mb: 2, 
                        bgcolor: 'info.main',
                        transition: 'transform 0.3s'
                      }}
                      className="dashboard-icon"
                    >
                      <HelpIcon fontSize="large" />
                    </Avatar>
                    <Typography variant="h5" component="h3" gutterBottom>
                      Student Help Center
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                      Find answers to common questions, access learning resources, and get support when you need it
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="info"
                      fullWidth
                      onClick={() => navigate('/student/help')}
                      startIcon={<HelpIcon />}
                    >
                      Get Help
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
          
          {dashboardTabValue === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Card 
                  elevation={4} 
                  sx={{ 
                    height: '100%', 
                    borderRadius: 3, 
                    transition: 'all 0.3s',
                    '&:hover': { 
                      transform: 'translateY(-8px)', 
                      boxShadow: 8,
                      '& .dashboard-icon': {
                        transform: 'scale(1.1)'
                      }
                    } 
                  }}
                >
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 3 }}>
                    <Avatar 
                      sx={{ 
                        width: 70, 
                        height: 70, 
                        mb: 2, 
                        bgcolor: 'primary.main',
                        transition: 'transform 0.3s'
                      }}
                      className="dashboard-icon"
                    >
                      <DashboardIcon fontSize="large" />
                    </Avatar>
                    <Typography variant="h5" component="h3" gutterBottom>
                      Teacher Dashboard
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                      Manage your teaching schedule, student interactions, and track your teaching performance
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', gap: 1 }}>
                      <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => navigate('/teacher/dashboard')}
                        sx={{ flexGrow: 1 }}
                        startIcon={<ArrowForwardIcon />}
                      >
                        Go to Dashboard
                      </Button>
                      <Chip 
                        label="5 Classes" 
                        color="success" 
                        size="small" 
                        sx={{ fontWeight: 'bold' }} 
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card 
                  elevation={4} 
                  sx={{ 
                    height: '100%', 
                    borderRadius: 3, 
                    transition: 'all 0.3s',
                    '&:hover': { 
                      transform: 'translateY(-8px)', 
                      boxShadow: 8,
                      '& .dashboard-icon': {
                        transform: 'scale(1.1)'
                      }
                    } 
                  }}
                >
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 3 }}>
                    <Avatar 
                      sx={{ 
                        width: 70, 
                        height: 70, 
                        mb: 2, 
                        bgcolor: 'secondary.main',
                        transition: 'transform 0.3s'
                      }}
                      className="dashboard-icon"
                    >
                      <ClassIcon fontSize="large" />
                    </Avatar>
                    <Typography variant="h5" component="h3" gutterBottom>
                      Manage Classes
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                      Create and manage your classes, upload materials, and track student attendance
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', gap: 1 }}>
                      <Button 
                        variant="contained" 
                        color="secondary"
                        onClick={() => navigate('/teacher/manage-classes')}
                        sx={{ flexGrow: 1 }}
                        startIcon={<ClassIcon />}
                      >
                        Manage Classes
                      </Button>
                      <Chip 
                        label="New" 
                        color="error" 
                        size="small" 
                        sx={{ 
                          animation: 'pulse 1.5s infinite',
                          '@keyframes pulse': {
                            '0%': { opacity: 0.7 },
                            '50%': { opacity: 1 },
                            '100%': { opacity: 0.7 }
                          }
                        }} 
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card 
                  elevation={4} 
                  sx={{ 
                    height: '100%', 
                    borderRadius: 3, 
                    transition: 'all 0.3s',
                    '&:hover': { 
                      transform: 'translateY(-8px)', 
                      boxShadow: 8,
                      '& .dashboard-icon': {
                        transform: 'scale(1.1)'
                      }
                    } 
                  }}
                >
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 3 }}>
                    <Avatar 
                      sx={{ 
                        width: 70, 
                        height: 70, 
                        mb: 2, 
                        bgcolor: 'info.main',
                        transition: 'transform 0.3s'
                      }}
                      className="dashboard-icon"
                    >
                      <HelpIcon fontSize="large" />
                    </Avatar>
                    <Typography variant="h5" component="h3" gutterBottom>
                      Teacher Help Center
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                      Access teaching resources, best practices, and get support for your teaching activities
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="info"
                      fullWidth
                      onClick={() => navigate('/teacher/help')}
                      startIcon={<HelpIcon />}
                    >
                      Get Help
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card 
                  elevation={4} 
                  sx={{ 
                    height: '100%', 
                    borderRadius: 3, 
                    transition: 'all 0.3s',
                    '&:hover': { 
                      transform: 'translateY(-8px)', 
                      boxShadow: 8,
                      '& .dashboard-icon': {
                        transform: 'scale(1.1)'
                      }
                    } 
                  }}
                >
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 3 }}>
                    <Avatar 
                      sx={{ 
                        width: 70, 
                        height: 70, 
                        mb: 2, 
                        bgcolor: 'success.main',
                        transition: 'transform 0.3s'
                      }}
                      className="dashboard-icon"
                    >
                      <VerifiedIcon fontSize="large" />
                    </Avatar>
                    <Typography variant="h5" component="h3" gutterBottom>
                      Verification Process
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                      Complete your verification to become a certified teacher on our platform
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="success"
                      fullWidth
                      onClick={() => navigate('/teacher/verification')}
                      startIcon={<VerifiedIcon />}
                    >
                      Get Verified
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
      
      {/* CTA Section */}
      <Container maxWidth="md" sx={{ mb: 8 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 4, md: 6 }, 
            borderRadius: 4,
            backgroundImage: 'linear-gradient(135deg, #4361ee 0%, #738eef 100%)',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Typography variant="h3" component="h2" gutterBottom>
            Ready to Start Your Learning Journey?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of students who are already benefiting from Padho Likho's personalized learning experience.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
            <Button 
              variant="contained" 
              size="large"
              color="secondary"
              onClick={() => navigate('/register')}
              sx={{ 
                py: 1.5, 
                px: 4,
                fontSize: '1rem',
                boxShadow: '0 8px 16px rgba(255, 107, 107, 0.3)'
              }}
            >
              Register Now
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              onClick={() => navigate('/find-teachers')}
              sx={{ 
                py: 1.5, 
                px: 4,
                fontSize: '1rem',
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Browse Teachers
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
