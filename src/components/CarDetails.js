import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { getCarDetails, getImageForCar, getDealershipLocations } from '../api/carsApi';

const CarDetails = () => {
  const [cars, setCars] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [dealerships, setDealerships] = useState([]);
  const { make, model, year } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCarDetails(make, model, year);
        setCars(data);

        const fetchedImageUrls = await Promise.all(
          data.map((car) => getImageForCar(car.make, car.model, car.year))
        );
        setImageUrls(fetchedImageUrls);

        const userLocation = "Tunis, Tunisia"; // Example
        const locations = await getDealershipLocations(make, userLocation);
        setDealerships(locations);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchData();
  }, [make, model, year]);

  if (cars.length === 0) {
    return <div>No cars found matching your search criteria.</div>;
  }

  return (
    <Grid container spacing={3} sx={{ padding: '20px' }}>
      {cars.map((car, index) => (
        <Grid item xs={12} md={6} key={index}>
          <Card sx={{ maxWidth: 500 }}>
            <CardMedia
              component="img"
              height="300"
              image={imageUrls[index] || '/placeholder.jpg'}
              alt={car.make + ' ' + car.model}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {car.make} {car.model}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <p>Year: {car.year}</p>
                <p>Drive: {car.drive}</p> {/* Add other details like drive, transmission, etc. */}
                <p>City MPG: {car.city_mpg}</p>
                <p>Highway MPG: {car.highway_mpg}</p>
                <br />
                <br />
                <Typography variant="h6">Nearby Dealerships:</Typography>
                <List>
                  {dealerships.map((dealership, i) => (
                    <ListItem key={i}>
                      <ListItemText
                        primary={dealership.name}
                        secondary={dealership.vicinity}
                      />
                    </ListItem>
                  ))}
                </List>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CarDetails;