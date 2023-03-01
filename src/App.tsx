import { ChakraProvider, Flex, Box, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { AppBar } from './components/AppBar';
import { AppDrawer } from './components/AppDrawer';
import { Map } from "./components/Map";
import { InjectionProvider } from './context/injection';
import logger from './services/ConsoleLogger';
import { GbfsService } from './services/GbfsService';
import { FetchHttpService } from './services/HttpService';

export const App = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Injectaroo :-D
  const httpClient = new FetchHttpService({ logger });
  const gbfsClient = new GbfsService({ logger, client: httpClient, language: 'en' })

  return (
    <ChakraProvider>
      <InjectionProvider {...{ logger, httpClient, gbfsClient }}>
        <Flex direction="row">
          <Box>
            <AppBar onOpen={onOpen}></AppBar>
            <AppDrawer isOpen={isOpen} onClose={onClose}></AppDrawer>
          </Box>
          <Map />
        </Flex>
      </InjectionProvider>
    </ChakraProvider>
  )
};
