import { ChakraProvider, Box, HStack, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { AppBar } from './components/AppBar';
import { AppDrawer } from './components/AppDrawer';

export const App = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <ChakraProvider>
      <HStack spacing={0}>
        <AppBar onOpen={onOpen}></AppBar>
        <AppDrawer isOpen={isOpen} onClose={onClose}></AppDrawer>
        <Box w="100%" h="100vh" bg="teal" />
      </HStack>
    </ChakraProvider>
  )
};
