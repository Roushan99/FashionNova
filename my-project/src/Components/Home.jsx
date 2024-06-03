import React from 'react';
import { Box, Heading, Image, SimpleGrid } from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from '../assets/images/11.webp';
import image2 from '../assets/images/18.webp';
import image3 from '../assets/images/13.webp';
import image4 from '../assets/images/14.webp';

const products = [
  { id: 1, name: 'Product 1', image: image1 },
  { id: 2, name: 'Product 2', image: image2 },
  { id: 3, name: 'Product 3', image: image3 },
  { id: 4, name: 'Product 4', image: image4 },
];

const topProducts = [
  { id: 1, name: 'Top Product 1', image: image1 },
  { id: 2, name: 'Top Product 2', image: image2 },
  { id: 3, name: 'Top Product 3', image: image3 },
  { id: 4, name: 'Top Product 4', image: image4 },
];

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const redirectToCart = () => {
    window.location.href = '/cart';
  };

  return (
    <Box>
      <Box className="slider" w="100vw" h="100vh">
        <Slider {...settings}>
          <Box>
            <Image src={image1} alt="Slide 1" w="100%" h="100vh" objectFit="cover" />
          </Box>
          <Box>
            <Image src={image2} alt="Slide 2" w="100%" h="100vh" objectFit="cover" />
          </Box>
          <Box>
            <Image src={image3} alt="Slide 3" w="100%" h="100vh" objectFit="cover" />
          </Box>
          <Box>
            <Image src={image4} alt="Slide 4" w="100%" h="100vh" objectFit="cover" />
          </Box>
        </Slider>
      </Box>
      <Box p={8}>
        <Heading as="h2" size="xl" mb={4}>Best Products</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {products.map(product => (
            <Box key={product.id} onClick={redirectToCart} cursor="pointer">
              <Image src={product.image} alt={product.name} />
              <Heading as="h3" size="md" mt={2}>{product.name}</Heading>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
      <Box p={8}>
        <Heading as="h2" size="xl" mb={4}>Top Products</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {topProducts.map(product => (
            <Box key={product.id} onClick={redirectToCart} cursor="pointer">
              <Image src={product.image} alt={product.name} />
              <Heading as="h3" size="md" mt={2}>{product.name}</Heading>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Home;
