import { Box, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, UseDisclosureProps } from "@chakra-ui/react";
import React from "react";
import { AppBar } from "./AppBar";

export const AppDrawer = ({ onClose, isOpen }: { onClose: () => void, isOpen: boolean }) => {
  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="md" closeOnOverlayClick={true}>
      <DrawerOverlay />
      <DrawerContent>
        <Flex>
          <AppBar onOpen={() => { }} />
          <Box>
            <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
            <DrawerBody>
              <p>MORE CONTENT</p>
            </DrawerBody>
          </Box>
        </Flex>
      </DrawerContent>
    </Drawer>
  )
}