import { ChakraProvider, Flex, Box, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { AppBar } from './components/AppBar';
import { Map } from "./components/Map";
import { Sidebar } from './components/Sidebar';
import { SidebarContent } from './components/SidebarContent';
import { InjectionProvider } from './context/injection';

const APP_BAR_WIDTH_DESKTOP = 16

export const App = () => {

  const { getDisclosureProps, getButtonProps, isOpen } = useDisclosure();
  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps({ isOpen });

  return (
    <ChakraProvider>
      <RecoilRoot>
        <InjectionProvider>
          <Flex>
            <AppBar buttonProps={buttonProps} />
            <Sidebar {...disclosureProps}>
              <SidebarContent />
            </Sidebar>
            <Map />
          </Flex>
        </InjectionProvider>
      </RecoilRoot>
    </ChakraProvider>
  )
};
