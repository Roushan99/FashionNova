import React, { useEffect, useState } from 'react';
import { Box, Flex, Image, Text, Heading, VStack, Spinner } from '@chakra-ui/react';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/orders'); // Change the URL to your API endpoint
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (orders.length === 0) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Text>No orders found.</Text>
      </Flex>
    );
  }

  return (
    <Box p={5}>
      {orders.map((order) => (
        <Box key={order.orderId} borderWidth="1px" borderRadius="lg" overflow="hidden" mb={5}>
          <Box p={5}>
            <Heading as="h4" size="md" mb={4}>Order ID: {order.orderId}</Heading>
            <VStack spacing={4} align="stretch">
              {order.products.map((product, index) => (
                <Flex key={product.id} align="center">
                  <Image boxSize="100px" src={product.image} alt={product.title} mr={4} />
                  <Box>
                    <Text fontWeight="bold">{product.title}</Text>
                    <Text>Quantity: {product.quantity}</Text>
                    <Text>Price: ${product.price.toFixed(2)}</Text>
                  </Box>
                </Flex>
              ))}
            </VStack>
            <Text fontWeight="bold" mt={4}>Total Amount: ${order.totalAmount.toFixed(2)}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default Orders;
