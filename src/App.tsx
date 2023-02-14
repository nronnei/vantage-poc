import { ChakraProvider, Flex, Box, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { AppBar } from './components/AppBar';
import { AppDrawer } from './components/AppDrawer';
import { Map } from "./components/Map";

export const App = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <ChakraProvider>
      <Flex direction="row">
        <Box>
          <AppBar onOpen={onOpen}></AppBar>
          <AppDrawer isOpen={isOpen} onClose={onClose}></AppDrawer>
        </Box>
        <Map />
      </Flex>
    </ChakraProvider>
  )
};
