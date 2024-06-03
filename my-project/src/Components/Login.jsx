import React, { useState, useEffect } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Stack, Heading, Text, IconButton, InputGroup, InputRightElement, Alert, AlertIcon } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    const { email, password } = formData; // Destructure email and password from formData
  
    try {
      const res = await axios.post('http://localhost:5000/login', { email, password });
      if (res.data.token) {
        // Store token in localStorage or sessionStorage
        localStorage.setItem('name', res.data.name);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('email', res.data.email);
        console.log("Login successful, token stored");
        navigate('/'); // Redirect to home page
      } else {
        setError("Invalid credentials");
        console.error("Login failed, no token received");
      }
      console.log(res.data);
    } catch (error) {
      setError("Invalid credentials");
      console.log("An error occurred:", error);
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" bg="#e9e7e8" minH="100vh" maxW="100vw" overflowX="hidden" p={5}>
      <Box bg="white" p={8} borderRadius="lg" boxShadow="xl" w="full" maxW="md" overflow="hidden">
        <Heading as="h2" textAlign="center" mb={6}>Login</Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {error && (
              <Alert status="error">
                <AlertIcon />
                {error}
              </Alert>
            )}
            <FormControl id="email" isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} required/>
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
            <Link to='/signUp'>
              <Text color='blue'>New to FASHIONNOVA? Create an account</Text>
            </Link>
            <Button type="submit" colorScheme="blue" w="full">Login</Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
