import { Drawer, DrawerBody, DrawerContent, DrawerHeader, UseDisclosureProps } from "@chakra-ui/react";
import React from "react";

export const AppDrawer = ({ onClose, isOpen }: UseDisclosureProps) => {
  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="md">
      <DrawerContent ml={16}>
        <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
        <DrawerBody>
          <p>MORE CONTENT</p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}