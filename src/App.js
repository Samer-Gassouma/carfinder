import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CarList from './components/CarList';
import CarDetails from './components/CarDetails';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Header from './components/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <BrowserRouter>
        <div className="App">
          <Header />
          <main>
            <Routes>
              
              <Route path="/" element={<CarList />} />
              <Route path="/cars/:make/:model/:year" element={<CarDetails />} /> 
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export default App;