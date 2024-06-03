import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, Flex, Text, Button, VStack, HStack, useToast, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const toast = useToast();
  
  const [cartData, setCartData] = useState({
    image: '',
    title: '',
    quantity: 1,
    price: '',
    email: localStorage.getItem('email')
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  useEffect(() => {
    // Fetch product details based on the product ID
    const fetchProduct = async () => {
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setProduct(res.data);
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      setCartData(prevData => ({
        ...prevData,
        image: product.image,
        title: product.title,
        price: product.price,
        email: localStorage.getItem('email')
      }));
    }
  }, [product]);

  const sendData = async () => {
    if (!cartData.email) {
      onOpen();
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/cartproduct", cartData);
      console.log(res);
      // Show toast notification
      toast({
        title: 'Product added to cart',
        description: `${product.title} has been added to your cart.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast({
        title: 'Error',
        description: 'There was an error adding the product to the cart.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box p={5} maxW="1200px" mx="auto">
      <Flex direction={{ base: 'column', md: 'row' }} gap={10}>
        <Box flex="1">
          <Image src={product.image} alt={product.title} borderRadius="md" />
        </Box>

        <Box flex="2">
          <VStack align="start" spacing={4}>
            <Text fontSize="2xl" fontWeight="bold">{product.title}</Text>

            <HStack>
              {Array(5)
                .fill('')
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    color={i < product.rating.rate ? 'teal.500' : 'gray.300'}
                  />
                ))}
            </HStack>

            <Text fontSize="xl" color="teal.600">${product.price}</Text>

            <Button colorScheme="teal" size="lg" onClick={sendData}>
              Add to Cart
            </Button>
          </VStack>
        </Box>
      </Flex>

      <Box mt={10}>
        <Text fontSize="lg" fontWeight="bold" mb={2}>Description</Text>
        <Text>{product.description}</Text>
      </Box>

      <Box mt={10}>
        <Text fontSize="lg" fontWeight="bold" mb={2}>Reviews</Text>
        {product.rating.count > 0 ? (
          <Text>{product.rating.count} reviews</Text>
        ) : (
          <Text>No reviews available</Text>
        )}
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Login Required
            </AlertDialogHeader>
            <AlertDialogBody>
              You need to be logged in to add products to your cart. Please log in to continue.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="teal" onClick={() => {
                // Add your login redirection logic here
                window.location.href = "/signIn"
                onClose();
              }} ml={3}>
                Login
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default ProductDetail;
