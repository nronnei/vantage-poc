import React from "react";
import { Box, VStack, Text, ButtonGroup, IconButton } from "@chakra-ui/react";
import { GlobeIcon, MapIcon, MenuIcon, SearchIcon } from "./icons";

export const AppBar = ({ onOpen }) => {
  return (
    <VStack bg="silver" h="100vh" w={16} spacing={8} justifyContent="center">
      <Text> Vantage </Text>
      <IconButton aria-label="Open Sidebar" icon={<MenuIcon />} onClick={onOpen} />
      <IconButton aria-label="View Map" icon={<MapIcon />} onClick={onOpen} />
      <IconButton aria-label="Search Stations" icon={<SearchIcon />} onClick={onOpen} />
      <IconButton aria-label="View Global Systems" icon={<GlobeIcon />} onClick={onOpen} />
      {/* <Box w={8} h={8} bg="red" as="button" >O</Box>
      <Box w={8} h={8} bg="green"></Box>
      <Box w={8} h={8} bg="blue"></Box>
      <Box w={8} h={8} bg="yellow"></Box> */}
    </VStack>
  )
}