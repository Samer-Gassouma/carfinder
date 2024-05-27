import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = '6c61151c98msh14315edc8787c63p1636a0jsn839077f6b57e';
//api url 1
const apiUrl = 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars';
//api url 2
const apiUrl2 = 'https://car-data.p.rapidapi.com/cars';




const getCars = async () => {
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com',
        'x-rapidapi-key': apiKey,
      },
      params: { make: 'toyota' },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching car data:', error);
    throw error; // Re-throw for error handling in calling components
  }
};


const getAllCars = async (nb_page) => {
  try {
    const response = await axios.get(apiUrl2, {
      headers: {
        'X-RapidAPI-Host': 'car-data.p.rapidapi.com',
        'x-rapidapi-key': apiKey,
      },
      params: {
        limit: '50',
        page: '0',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching car data:', error);
    throw error; // Re-throw for error handling in calling components
  }
};

const getCarDetails = async (make, model, year) => {
  try {
    let params = {};
    if (make) {
      params.make = make;
    }
    if (model) {
      params.model = model;
    }
    if (year) {
      params.year = year;
    }

    const response = await axios.get(`${apiUrl}`, {
      headers: {
        'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com',
        'x-rapidapi-key': apiKey,
      },
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching car details:', error);
    throw error;
  }
};


const getImageForCar = async (make, model, year) => {
  try {
    const imageApiUrl = 'https://pixabay.com/api/'; // Adjust for your chosen image API
    const response = await axios.get(imageApiUrl, {
      params: {
        key: '16714114-bd22814cff0b9d564cfe9d705', // Replace with your Pixabay API key
        q: `${make} ${model} ${year}`, // Search query
        image_type: 'photo', // Specify photo type (optional)
      },
    });
    return response.data.hits[0].webformatURL; // Get the first image URL
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error;
  }
};

// Access your API key as an environment variable (see "Set up your API key" above)

async function getLocationDetials(brand) {
  const genAI = new GoogleGenerativeAI('AIzaSyDPnQLnuzWNbcPCF6TZWh2y45AzLl3djMo');
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `You are a dealership assistant. Find the location of a dealership for a car with the brand "${brand}". The user is located in Tunisia. Provide the closest dealership locations in Tunisia, including the dealership name and address.it dosnt matter if the dealership is closed or not, just provide the location. just give any dealership location that u think is the closest to the user.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);

}



const getDealershipLocations = async (brand, userLocation) => {
  try {
    const location = await getLocationDetials(brand);
    console.log(location);
    const googleMapsApiKey = 'AIzaSyDQfmBdnLfUX3VXP3x_igltmKrb_upQUOY'; // Replace with your API key
    const placesApiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json
    ?keyword=cruise
    &location=-33.8670522%2C151.1957362
    &radius=1500
    &type=restaurant
    &key=${googleMapsApiKey}`;
    const response = await axios.get(placesApiUrl);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching dealership locations:', error);
    throw error;
  }
};


export { getCars, getCarDetails, getAllCars, getImageForCar, getDealershipLocations };