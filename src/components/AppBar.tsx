import React from "react";
import { Box, VStack, Text } from "@chakra-ui/react";

export const AppBar = ({ onOpen }) => {
  return (
    <VStack bg="silver" h="100vh" w={16} spacing={8} justifyContent="center">
      <Text> Vantage </Text>
      <Box w={8} h={8} bg="red" as="button" onClick={onOpen}>O</Box>
      <Box w={8} h={8} bg="green"></Box>
      <Box w={8} h={8} bg="blue"></Box>
      <Box w={8} h={8} bg="yellow"></Box>
    </VStack>
  )
}