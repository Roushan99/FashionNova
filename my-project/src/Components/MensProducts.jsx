import React, { useState, useEffect } from 'react';
import {
  Box,
  Select,
  Grid,
  GridItem,
  Text,
  Image,
  Input,
  Heading,
  Flex,
} from '@chakra-ui/react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MensProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch products data
    const fetchProducts = async () => {
      const res = await axios.get('https://fakestoreapi.com/products');
      setProducts(res.data);
      setFilteredProducts(res.data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let sortedProducts = [...products];
    if (sortOrder === 'asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    if (filterPrice) {
      sortedProducts = sortedProducts.filter(product => product.price <= filterPrice);
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(sortedProducts);
  }, [sortOrder, filterPrice, searchQuery, products]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterPrice(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box p={5}>
      <Heading as="h2" size="xl" mb={6} textAlign="center">
        Men's Products
      </Heading>
      <Flex justify="space-between" mb={6}>
        <Select placeholder="Sort by" onChange={handleSortChange} w="45%">
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </Select>
        <Input
          placeholder="Search by title"
          type="text"
          onChange={handleSearchChange}
          w="45%"
        />
        {/* <Input
          placeholder="Filter by max price"
          type="number"
          onChange={handleFilterChange}
          w="45%"
        /> */}
      </Flex>
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {filteredProducts.map((product) => (
          <Link key={product.id} to={`/productdetail/${product.id}`}>
            <GridItem
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              cursor="pointer"
            >
              <Image src={product.image} alt={product.title} boxSize="200px" objectFit="cover" mx="auto" />
              <Box p={6}>
                <Text fontWeight="bold" fontSize="xl" mb={2}>{product.title}</Text>
                <Text>${product.price.toFixed(2)}</Text>
              </Box>
            </GridItem>
          </Link>
        ))}
      </Grid>
    </Box>
  );
}

export default MensProducts;
