import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Image,
  Text,
  Flex,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import emptyCartImage from '../assets/images/emptyCart.jpg';

function Cartpage() {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const email = localStorage.getItem('email');
      try {
        const { data } = await axios.get('http://localhost:5000/cartproduct', {
          params: { email },
        });
        setCartData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const updatedTotalAmount = cartData.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalAmount(updatedTotalAmount);
  }, [cartData]);

  const handleQuantityChange = (id, delta) => {
    setCartData((prevData) =>
      prevData.map((item) =>
        item.product_id === id
          ? {
              ...item,
              quantity: item.quantity + delta > 0 ? item.quantity + delta : 1,
            }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setCartData((prevData) => prevData.filter((item) => item.product_id !== id));
    toast({
      title: 'Product removed.',
      description: 'The product has been removed from your cart.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const handlePurchase = async () => {
    toast({
      title: 'Proceed to payment.',
      description: 'Redirecting to the payment page...',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });

    const amount = totalAmount * 100;
    const currency = "INR";
    const receiptId = "qwsa1";
    const response = await fetch("http://localhost:5000/payment", {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(order);

    var options = {
      key: "rzp_test_LRJNw7PDawVVXF",
      amount,
      currency,
      name: "FASHION NOVA",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id,
      handler: function (response) {
        handlePaymentSuccess();
      },
      prefill: {
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  };

  const handlePaymentSuccess = async () => {
    try {
      const email = localStorage.getItem('email');
      await axios.post('http://localhost:5000/clearcart', { email });
      setCartData([]);
      toast({
        title: 'Purchase successful!',
        description: 'Your order has been placed and your cart is now empty.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast({
        title: 'Error',
        description: 'There was an error clearing your cart.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return <Box>Loading...</Box>;
  }

  if (cartData.length === 0) {
    return (
      <Flex bg={'#ffffff'} justifyContent={'center'}>
        <Image h={{ md: '70vh', base: '50vh' }} w={{ md: '45vw', base: '90vw' }} src={emptyCartImage} alt='empty cart' />
      </Flex>
    );
  }

  return (
    <Box>
      <Flex direction="column" align="center" mt={30}>
        {cartData.map((product) => (
          <Flex
            key={product.product_id}
            border="1px solid #ccc"
            borderRadius="md"
            padding="4"
            alignItems="center"
            marginBottom="4"
            width={{ base: '100%', md: '80%' }}
            justifyContent="space-between"
            flexDirection={{ base: 'column', md: 'row' }}
            textAlign={{ base: 'center', md: 'left' }}
          >
            <Image
              src={product.image}
              alt={product.title}
              boxSize={{ base: '150px', md: '100px' }}
              objectFit="cover"
              marginBottom={{ base: '4', md: '0' }}
              marginRight={{ md: '4' }}
            />
            <Text
              fontWeight="bold"
              width="200px"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {product.title}
            </Text>
            <Box>
              <Flex alignItems="center" justifyContent="center">
                <IconButton
                  icon={<MinusIcon />}
                  onClick={() => handleQuantityChange(product.product_id, -1)}
                  isDisabled={product.quantity === 1}
                />
                <Text marginX="2">{product.quantity}</Text>
                <IconButton
                  icon={<AddIcon />}
                  onClick={() => handleQuantityChange(product.product_id, 1)}
                />
              </Flex>
            </Box>
            <Text>${product.price * product.quantity}</Text>
            <IconButton
              icon={<DeleteIcon />}
              colorScheme="red"
              onClick={() => handleDelete(product.product_id)}
            />
          </Flex>
        ))}
        <Flex
          justifyContent="space-between"
          width={{ base: '100%', md: '80%' }}
          padding="4"
          flexDirection={{ base: 'column', md: 'row' }}
          textAlign={{ base: 'center', md: 'left' }}
        >
          <Text fontWeight="bold">Total: ${totalAmount.toFixed(2)}</Text>
          <Button
            colorScheme="teal"
            onClick={handlePurchase}
            marginTop={{ base: '4', md: '0' }}
          >
            Purchase
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Cartpage;
