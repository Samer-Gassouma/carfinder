import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Contact = () => {
  return (
    <Grid container spacing={2} sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          margin="normal"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Message"
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" fullWidth>
          Send
        </Button>
      </Grid>
    </Grid>
  );
};

export default Contact;