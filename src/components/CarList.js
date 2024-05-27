import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CarList.css';
import { getAllCars, getImageForCar } from '../api/carsApi';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

const CarList = () => {
  
  const [cars, setCars] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [page, setPage] = useState(0);
  const handleChange = (event, value) => {
    console.log(value);
    setPage(value);

  };
  const fetchData = async () => {
    try {
      const data = await getAllCars();
      setCars(data);

      // Fetch images for all cars
      const fetchedImageUrls = await Promise.all(
        data.map((car) => getImageForCar(car.make, car.model, car.year))
      );
      setImageUrls(fetchedImageUrls);
    } catch (error) {
      console.error('Error fetching car data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page]);
  return (
    <div>
      <Grid container spacing={3} sx={{ padding: '20px' }}>
        {cars.map((car, index) => (
          <Grid item xs={12} sm={6} md={4} key={car.id}>
            <Card sx={{ maxWidth: 345, height: '100%' }}>
              <Link to={`/cars/${car.make}/${car.model}/${car.year}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={imageUrls[index] || '/placeholder.jpg'}
                  alt={car.make + ' ' + car.model}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {car.make} {car.model}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Year: {car.year}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination count={Math.ceil(cars.length / 10)} page={page} onChange={handleChange} />
    </div>
  );
};

export default CarList;