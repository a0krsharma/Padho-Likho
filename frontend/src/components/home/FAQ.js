import React from 'react';
import { 
  Box, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Container,
  Grid,
  Button
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon,
  QuestionAnswer as QuestionIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const faqItems = [
  {
    question: "How does Padho Likho work?",
    answer: "Padho Likho connects students with qualified teachers for personalized online learning. Students can browse teacher profiles, book sessions, attend classes via our integrated virtual classroom, and track their progress through assessments and feedback."
  },
  {
    question: "What subjects are offered on Padho Likho?",
    answer: "We offer a wide range of subjects including Mathematics, Science (Physics, Chemistry, Biology), English, Hindi, Social Studies, Computer Science, and more for students from Class 1 to 12, following CBSE, ICSE, and State Board curricula."
  },
  {
    question: "How are the teachers verified?",
    answer: "All teachers on Padho Likho go through a rigorous verification process. We verify their educational qualifications, teaching experience, and identity documents. Teachers also undergo a demo teaching session before being approved on our platform."
  },
  {
    question: "What are the payment options available?",
    answer: "We accept various payment methods including credit/debit cards, UPI, net banking, and popular digital wallets. All payments are secure and processed through trusted payment gateways."
  },
  {
    question: "Can I get a refund if I'm not satisfied with a class?",
    answer: "Yes, we have a satisfaction guarantee policy. If you're not satisfied with a class, you can request a refund within 24 hours of the class completion, subject to our refund policy terms and conditions."
  },
  {
    question: "How do I attend online classes?",
    answer: "Once you book a class, you'll receive a confirmation with a link to join the virtual classroom. Our platform has an integrated video conferencing system with interactive whiteboard, chat, and screen sharing features for an effective learning experience."
  }
];

const FAQ = () => {
  const navigate = useNavigate();
  
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box sx={{ pr: { md: 6 } }}>
              <Typography 
                variant="h3" 
                component="h2" 
                gutterBottom 
                sx={{ fontWeight: 'bold' }}
              >
                Frequently Asked Questions
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                paragraph
                sx={{ mb: 4 }}
              >
                Find answers to common questions about our platform, teaching methodology, and more. If you don't find what you're looking for, feel free to contact our support team.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/contact')}
                sx={{ borderRadius: 2, px: 3 }}
              >
                Contact Support
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={7}>
            <Box>
              {faqItems.map((item, index) => (
                <Accordion 
                  key={index} 
                  elevation={0}
                  sx={{ 
                    mb: 2, 
                    borderRadius: '8px !important', 
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:before': { display: 'none' },
                    '&.Mui-expanded': { 
                      margin: '0 0 16px 0',
                      borderColor: 'primary.main',
                      borderWidth: '1px'
                    }
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ 
                      backgroundColor: 'background.paper',
                      '&.Mui-expanded': {
                        backgroundColor: 'primary.lighter',
                        color: 'primary.dark'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <QuestionIcon sx={{ mr: 1.5, color: 'primary.main' }} />
                      <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        {item.question}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ backgroundColor: 'background.paper', p: 3 }}>
                    <Typography variant="body1">
                      {item.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FAQ;
