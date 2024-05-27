import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} carFinder
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body2" color="text.secondary" align="center">
            Contact: <Link href="mailto:info@mydealership.com">info@carFinder.com</Link>
            
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;