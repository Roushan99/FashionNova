import { Flex, Image } from '@chakra-ui/react'
import React from 'react'
import image from '../assets/images/construction.jpg';


function Maintenance() {
  return (
    <>
        <Flex bg={'#ffffff'} justifyContent={'center'}>
          <Image h={{ md: '80vh', base: '50vh' }} w={{ md: '45vw', base: '90vw' }} src={image} alt='empty cart' />
        </Flex>
    </>
  )
}

export default Maintenance