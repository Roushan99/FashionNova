import React from 'react';
import { Button, Modal, Text, grid, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure} from '@chakra-ui/react'

function BasicUsage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button onClick={onOpen} colorScheme='teal'>Open Modal</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            
            <ModalBody>

              <grid >
                <Button  colorScheme='red'>Open Modal-1</Button><br /><br />
                <Button  colorScheme='green'>Open Modal-2</Button><br /><br />
                <Button  colorScheme='blue'>Open Modal-3</Button>
              </grid>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default BasicUsage;