import React from "react";
import { Box, VStack, Text, ButtonGroup, IconButton, useDisclosure } from "@chakra-ui/react";
import { GlobeIcon, MapIcon, MenuIcon, SearchIcon } from "./icons";

export const AppBar = (props: { buttonProps: any, [key: string]: any }) => {

  // const handleClick = () => {
  //   console.log('click!');
  // }

  return (
    <Box bg="silver" h="100vh">
      <VStack spacing={8} justifyContent="center">
        <Text> Vantage </Text>
        <IconButton
          aria-label="Open Sidebar"
          icon={<MenuIcon />}
          {...props.buttonProps}
        />
        <IconButton
          aria-label="View Map"
          icon={<MapIcon />}
          {...props.buttonProps}
        />
        <IconButton
          aria-label="Search Stations"
          icon={<SearchIcon />}
          {...props.buttonProps}
        />
        <IconButton
          aria-label="View Global Systems"
          icon={<GlobeIcon />}
          {...props.buttonProps}
        />
      </VStack>
    </Box>
  )
}
