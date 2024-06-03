import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';

function UserDetails() {
  const [userDetails, setUserDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();

  useEffect(() => {
    // Fetch user details from the database
    const email = localStorage.getItem("email");
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/user/${email}`);
        const userData = res.data;
        
        // Convert the dob to YYYY-MM-DD format
        if (userData.dob) {
          userData.dob = new Date(userData.dob).toISOString().split('T')[0];
        }

        setUserDetails(userData);
        setFormData(userData);
        console.log(email, res);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    // const email = localStorage.getItem("email");
    try {
      await axios.put(`http://localhost:5000/userdetails`, formData);
      setUserDetails(formData);
      setIsEditing(false);
      toast({
        title: 'Profile updated.',
        description: 'Your profile has been updated successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      console.log(formData)
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const email = localStorage.getItem('email');
      await axios.delete(`http://localhost:5000/userdetails/${email}`);
      // Handle post-deletion logic, e.g., redirect to login or home page
      toast({
        title: 'Profile deleted.',
        description: 'Your profile has been deleted successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      localStorage.clear();
      window.location.href = '/signIn'
    } catch (error) {
      console.error('Error deleting user profile:', error);
    }
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (!userDetails) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box p={5} maxW="600px" mx="auto">
      <Heading as="h2" size="xl" mb={6} textAlign="center">
        Your Details
      </Heading>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Full Name</FormLabel>
          <Input
            type="text"
            name="full_name"
            value={formData.full_name || ''}
            onChange={handleInputChange}
            isReadOnly={!isEditing}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Contact</FormLabel>
          <Input
            type="text"
            name="contact"
            value={formData.contact || ''}
            onChange={handleInputChange}
            isReadOnly={!isEditing}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email || ''}
            isReadOnly
          />
        </FormControl>
        <FormControl>
          <FormLabel>Address</FormLabel>
          <Input
            type="text"
            name="address"
            value={formData.address || ''}
            onChange={handleInputChange}
            isReadOnly={!isEditing}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Date of Birth</FormLabel>
          <Input
            type="date"
            name="dob"
            value={formData.dob || ''}
            onChange={handleInputChange}
            isReadOnly={!isEditing}
          />
        </FormControl>
        {isEditing ? (
          <Button colorScheme="teal" onClick={handleSave}>
            Save
          </Button>
        ) : (
          <Button colorScheme="blue" onClick={handleEdit}>
            Edit
          </Button>
        )}
        <Button colorScheme="red" onClick={onOpen}>
          Delete Your Account
        </Button>
      </VStack>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Your Account
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete your profile? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}

export default UserDetails;
