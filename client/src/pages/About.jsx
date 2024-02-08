import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import Layout from '../components/Layout'
import {styled} from '@mui/system'
import CustomeButton from '../components/CustomeButton';

function About() { 

  const CustomePaper=styled(Paper)(({theme})=>({
    backgroundColor:'#111',
    marginBottom:'20px',
    color:'#fff'
  }))
  return (
    <Layout>
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <CustomePaper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            About Us
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <img
              src="https://static.wingify.com/gcp/uploads/sites/3/2021/09/Feature-image-7-ecommerce.png" // Replace with your image source
              alt="Company"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </Box>

          <Typography variant="body1" paragraph>
            Welcome to <strong>EcoHome Devices</strong>!
          </Typography>

          <Typography variant="h6" gutterBottom>
            Our Story
          </Typography>

          <Typography variant="body1" paragraph>
            At <strong>EcoHome Devices</strong>, we believe in [your mission or vision statement]. Established in [year], we embarked on a journey to [describe your main goals or purposes]. Since then, we have been dedicated to [describe the core values or principles that drive your company].
          </Typography>

          <Typography variant="h6" gutterBottom>
            What We Do
          </Typography>

          <Typography variant="body1" paragraph>
            Our primary focus is on [briefly describe your main products or services]. Through [innovation, creativity, exceptional service, etc.], we aim to [impact or change you're striving to achieve].
          </Typography>

          <Typography variant="h6" gutterBottom>
            Our Team
          </Typography>

          <Typography variant="body1" paragraph>
            Meet the passionate minds behind <strong>EcoHome Devices</strong>. Our team comprises [mention any notable team members, their roles, and expertise]. Together, we work tirelessly to [your team's collective mission].
          </Typography>

          <Typography variant="h6" gutterBottom>
            Our Commitment
          </Typography>

          <Typography variant="body1" paragraph>
            At <strong>EcoHome Devices</strong>, we are committed to [describe your commitment, whether it's customer satisfaction, sustainability, social responsibility, etc.]. Our dedication to [specific values] sets us apart and fuels our drive to [your overarching goals].
          </Typography>

          <Typography variant="h6" gutterBottom>
            Join Us on Our Journey
          </Typography>

          <Typography variant="body1" paragraph>
            Whether you're a [customer, partner, or supporter], we invite you to join us on this exciting journey. Together, let's [describe a call-to-action or involvement opportunity].
          </Typography>

        </CustomePaper>
      </Container>
      <CustomeButton/>
    </Layout>
  )
}

export default About