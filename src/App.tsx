import { ChakraProvider, Flex, Box, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { AppBar } from './components/AppBar';
import { Map } from "./components/Map";
import { Sidebar } from './components/Sidebar';
import { SidebarContent } from './components/SidebarContent';
import { InjectionProvider } from './context/injection';
import logger from './services/ConsoleLogger';
import { GbfsService } from './services/GbfsService';
import { FetchHttpService } from './services/HttpService';

const APP_BAR_WIDTH_DESKTOP = 16

export const App = () => {

  const { getDisclosureProps, getButtonProps, isOpen, onClose } = useDisclosure();
  const buttonProps = getButtonProps({ onClick: () => console.log('click!') });
  const disclosureProps = getDisclosureProps({ isOpen });

  // Injectaroo :-D
  const httpClient = new FetchHttpService({ logger });
  const gbfsClient = new GbfsService({ logger, client: httpClient, language: 'en' })

  return (
    <ChakraProvider>
      <InjectionProvider {...{ logger, httpClient, gbfsClient }}>
        <Flex direction="row">
          <Box>
            <AppBar width={APP_BAR_WIDTH_DESKTOP} buttonProps={buttonProps}></AppBar>
            <Sidebar ml={APP_BAR_WIDTH_DESKTOP} {...disclosureProps}>
              <SidebarContent></SidebarContent>
            </Sidebar>
          </Box>
          <Map />
        </Flex>
      </InjectionProvider>
    </ChakraProvider>
  )
};
