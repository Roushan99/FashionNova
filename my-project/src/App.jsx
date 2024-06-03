import React from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from './Components/Navbar';
import AllRoutes from './Components/AllRoutes';
import Home from './Components/Home'
import ProductDetail from './Components/ProductDetails';
import Footer from './Components/Footer';

function App() {

  const product = {
    image: 'https://via.placeholder.com/400',
    name: 'Sample Product',
    rating: 4,
    price: 99.99,
    description: 'This is a sample product description. It provides details about the product features and benefits.',
    reviews: [
      { user: 'John Doe', comment: 'Great product! Highly recommend it.' },
      { user: 'Jane Smith', comment: 'Not bad, but could be better.' },
    ],
  };

  return (
    <Box w='100vw' h='100vh' bgColor='#e9e7e8' minH="100vh" maxW="100vw" overflowX="hidden">
      <Navbar />
      <AllRoutes />
      {/* <Home/> */}
      <Footer/>
    </Box>
  );
}

export default App;
