import React, { useState, useEffect } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Stack, Heading, Text, IconButton, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserRegistration() {
  const [formData, setFormData] = useState({
    full_name: '',
    contact: '',
    email: '',
    address: '',
    dob: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [verificationStatusNumber, setVerificationStatusNumber] = useState(false);
  const [showVerifyInputNumber, setShowVerifyInputNumber] = useState(false);
  const [verificationStatusEmail, setVerificationStatusEmail] = useState(false);
  const [showVerifyInputEmail, setShowVerifyInputEmail] = useState(false);
  const [timer, setTimer] = useState(120);

  useEffect(() => {
    let interval;
    if (showVerifyInputNumber || showVerifyInputEmail) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            setShowVerifyInputNumber(false);
            setShowVerifyInputEmail(false);
            return 120;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showVerifyInputNumber, showVerifyInputEmail]);

  const handleVerifyClickEmail = () => {
    setVerificationStatusEmail(true);
    setShowVerifyInputEmail(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/signup', formData);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    window.location.href = '/signIn';
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" bg="#e9e7e8" minH="100vh" maxW="100vw" overflowX="hidden" p={5}>
      <Box bg="white" p={8} borderRadius="lg" boxShadow="xl" w="full" maxW="md" overflow="hidden">
        <Heading as="h2" textAlign="center" mb={6}>Signup</Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <FormControl id="full_name" isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required />
            </FormControl>
            <FormControl id="contact" isRequired>
              <FormLabel>Contact Number</FormLabel>
              <Input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </FormControl>
            <FormControl id="address" isRequired>
              <FormLabel>Address</FormLabel>
              <Input type="text" name="address" value={formData.address} onChange={handleChange} required />
            </FormControl>
            <FormControl id="dob" isRequired>
              <FormLabel>Date Of Birth</FormLabel>
              <Input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required />
                <InputRightElement width="3rem">
                  <IconButton h="1.75rem" size="sm" onClick={togglePasswordVisibility} icon={showPassword ? <ViewOffIcon /> : <ViewIcon />} />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            {/* <Link to={'/signIn'}> */}
              <Button type="submit" colorScheme="blue" w="full">Register</Button>
            {/* </Link> */}
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default UserRegistration;
