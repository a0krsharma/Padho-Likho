import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Avatar, 
  Divider,
  Paper
} from '@mui/material';
import { 
  School as SchoolIcon,
  Lightbulb as LightbulbIcon,
  Favorite as FavoriteIcon,
  Public as PublicIcon
} from '@mui/icons-material';

// Team member card component
const TeamMemberCard = ({ name, role, image, bio }) => (
  <Card elevation={2} sx={{ height: '100%', borderRadius: 3 }}>
    <CardContent sx={{ textAlign: 'center', p: 3 }}>
      <Avatar 
        src={image} 
        sx={{ 
          width: 120, 
          height: 120, 
          mx: 'auto', 
          mb: 2,
          border: '4px solid',
          borderColor: 'primary.light'
        }} 
      />
      <Typography variant="h5" component="h3" gutterBottom>
        {name}
      </Typography>
      <Typography variant="subtitle1" color="primary.main" gutterBottom>
        {role}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {bio}
      </Typography>
    </CardContent>
  </Card>
);

// Value card component
const ValueCard = ({ icon, title, description }) => (
  <Paper elevation={2} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <Box sx={{ 
        color: 'white', 
        bgcolor: 'primary.main', 
        p: 2, 
        borderRadius: '50%', 
        mb: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {icon}
      </Box>
      <Typography variant="h5" component="h3" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1">
        {description}
      </Typography>
    </Box>
  </Paper>
);

const About = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          backgroundColor: 'primary.light',
          backgroundImage: 'linear-gradient(135deg, #4361ee 0%, #738eef 100%)',
          color: 'white',
          py: 8,
          borderRadius: 4,
          mb: 8
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <SchoolIcon sx={{ fontSize: 60, mb: 2 }} />
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            About Padho Likho
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
            Transforming education through personalized online learning experiences
          </Typography>
        </Container>
      </Box>

      {/* Our Story Section */}
      <Container maxWidth="md" sx={{ mb: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Our Story
          </Typography>
          <Divider sx={{ width: 100, mx: 'auto', mb: 4, borderColor: 'primary.main', borderWidth: 2 }} />
        </Box>
        
        <Typography variant="body1" paragraph>
          Padho Likho was founded in 2023 with a simple yet powerful mission: to make quality education accessible to every student in India. We recognized the challenges faced by students, especially those in classes 1-10, in finding qualified teachers who could provide personalized attention and guidance.
        </Typography>
        
        <Typography variant="body1" paragraph>
          Our founders, a team of education enthusiasts and technology experts, came together to create a platform that bridges this gap. We believe that every student deserves access to quality education, regardless of their location or economic background.
        </Typography>
        
        <Typography variant="body1" paragraph>
          What started as a small initiative has now grown into a comprehensive educational platform connecting thousands of students with qualified teachers across the country. We continue to innovate and improve our platform to provide the best learning experience for our users.
        </Typography>
        
        <Typography variant="body1">
          At Padho Likho, we're not just building a platform; we're building the future of education in India.
        </Typography>
      </Container>

      {/* Our Values Section */}
      <Box sx={{ backgroundColor: 'background.paper', py: 8, mb: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h2" gutterBottom>
              Our Values
            </Typography>
            <Divider sx={{ width: 100, mx: 'auto', mb: 4, borderColor: 'primary.main', borderWidth: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}>
              These core principles guide everything we do at Padho Likho
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <ValueCard 
                icon={<LightbulbIcon sx={{ fontSize: 40 }} />}
                title="Quality Education"
                description="We are committed to maintaining the highest standards of educational content and teaching. Every teacher on our platform is verified and qualified to provide quality education."
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <ValueCard 
                icon={<FavoriteIcon sx={{ fontSize: 40 }} />}
                title="Student-Centered Approach"
                description="We believe in putting students first. Our platform is designed to cater to different learning styles and paces, ensuring that every student can learn effectively."
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <ValueCard 
                icon={<PublicIcon sx={{ fontSize: 40 }} />}
                title="Accessibility"
                description="We strive to make quality education accessible to all students, regardless of their location or economic background. Our flexible pricing options ensure that everyone can benefit from our platform."
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Our Team Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Our Team
          </Typography>
          <Divider sx={{ width: 100, mx: 'auto', mb: 4, borderColor: 'primary.main', borderWidth: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}>
            Meet the passionate individuals behind Padho Likho
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <TeamMemberCard 
              name="Abhishek Kumar"
              role="Founder & CEO"
              image="/abhishek_kumar.jpg"
              bio="Graduate from IIT Patna and want to do something big in the education sector. Passionate about making quality education accessible to all."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TeamMemberCard 
              name="Priya Sharma"
              role="Co-Founder & COO"
              image="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=256&h=256&facepad=2"
              bio="Education policy expert with a focus on technology integration in learning. Believes in the power of personalized education."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TeamMemberCard 
              name="Amit Patel"
              role="CTO"
              image="https://images.unsplash.com/photo-1519340333755-c2f6c937c2e3?auto=format&fit=facearea&w=256&h=256&facepad=2"
              bio="Tech enthusiast with expertise in building scalable educational platforms. Committed to creating intuitive learning experiences."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TeamMemberCard 
              name="Neha Gupta"
              role="Head of Curriculum"
              image="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=256&h=256&facepad=2"
              bio="Curriculum development specialist with a passion for creating engaging and effective learning materials for students of all ages."
            />
          </Grid>
        </Grid>
      </Container>

      {/* Our Mission Section */}
      <Box 
        sx={{ 
          backgroundColor: 'primary.dark',
          color: 'white',
          py: 8,
          mb: 8
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Our Mission
          </Typography>
          <Divider sx={{ width: 100, mx: 'auto', mb: 4, borderColor: 'white', borderWidth: 2 }} />
          <Typography variant="h5" paragraph sx={{ mb: 4, fontStyle: 'italic' }}>
            "To empower every student with access to quality education and personalized learning experiences, regardless of their location or economic background."
          </Typography>
          <Typography variant="body1">
            We are committed to transforming education in India by connecting students with qualified teachers, providing interactive learning tools, and fostering a love for learning. Our goal is to help every student reach their full potential and achieve academic success.
          </Typography>
        </Container>
      </Box>

      {/* Our Achievements Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Our Achievements
          </Typography>
          <Divider sx={{ width: 100, mx: 'auto', mb: 4, borderColor: 'primary.main', borderWidth: 2 }} />
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" component="div" color="primary.main" sx={{ fontWeight: 'bold' }}>
                10,000+
              </Typography>
              <Typography variant="h6" component="div">
                Students
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" component="div" color="primary.main" sx={{ fontWeight: 'bold' }}>
                1,000+
              </Typography>
              <Typography variant="h6" component="div">
                Qualified Teachers
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" component="div" color="primary.main" sx={{ fontWeight: 'bold' }}>
                50,000+
              </Typography>
              <Typography variant="h6" component="div">
                Classes Conducted
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" component="div" color="primary.main" sx={{ fontWeight: 'bold' }}>
                4.8/5
              </Typography>
              <Typography variant="h6" component="div">
                Average Rating
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
