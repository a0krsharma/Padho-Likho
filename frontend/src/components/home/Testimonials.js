import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Grid, Rating, Container } from '@mui/material';
import { FormatQuote as QuoteIcon } from '@mui/icons-material';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Parent',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    rating: 5,
    text: 'Padho Likho has transformed my child\'s learning experience. The teachers are highly qualified and the personalized attention has helped my daughter improve her grades significantly.'
  },
  {
    id: 2,
    name: 'Rahul Verma',
    role: 'Student, Class 10',
    avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
    rating: 5,
    text: 'The interactive classes and practice assessments on Padho Likho helped me prepare for my board exams. I scored 95% in Mathematics thanks to my teacher\'s guidance!'
  },
  {
    id: 3,
    name: 'Ananya Patel',
    role: 'Teacher',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 4,
    text: 'As a teacher, Padho Likho has given me the flexibility to teach students from across the country. The platform is easy to use and the support team is always helpful.'
  },
  {
    id: 4,
    name: 'Vikram Singh',
    role: 'Student, Class 12',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    rating: 5,
    text: 'The one-on-one sessions with my Physics teacher helped me understand complex concepts that I was struggling with in school. Highly recommended!'
  }
];

const Testimonials = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            sx={{ fontWeight: 'bold' }}
          >
            What Our Users Say
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ maxWidth: 700, mx: 'auto' }}
          >
            Discover how Padho Likho is transforming education for students, teachers, and parents across India
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {testimonials.map((testimonial) => (
            <Grid item xs={12} md={6} key={testimonial.id}>
              <Card 
                elevation={2} 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 3,
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 8
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 4 }}>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <QuoteIcon sx={{ fontSize: 40, color: 'primary.main', opacity: 0.7 }} />
                  </Box>
                  
                  <Typography variant="body1" paragraph sx={{ mb: 3, fontStyle: 'italic' }}>
                    "{testimonial.text}"
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                      <Rating 
                        value={testimonial.rating} 
                        readOnly 
                        size="small" 
                        sx={{ mt: 0.5 }}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;
