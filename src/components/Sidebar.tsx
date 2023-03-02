import { Box, Container, useBreakpoint, useBreakpointValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useState } from "react";

const Z_INDEX_SIDEBAR_BASE = 1000;

type GetDisclosurePropsReturn = {
  id: string,
  hidden: boolean
}

type SidebarProps = React.PropsWithChildren<{
  isOpen: boolean,
  gap: number
} & GetDisclosurePropsReturn>;


export function Sidebar(props: SidebarProps) {

  const { isOpen, gap } = props;
  const [hidden, setHidden] = useState(!props.hidden);
  const sidebarWidth = useBreakpointValue({
    base: "100%",
    md: "24em",
    lg: "30em",
  })

  return (
    <Box ml={gap}
      as={motion.div}
      {...props}
      hidden={hidden}
      initial={false}
      onAnimationStart={() => setHidden(false)}
      onAnimationComplete={() => setHidden(!isOpen)}
      animate={{ width: isOpen ? sidebarWidth : 0 }}
      h="100vh"
      bg="red.100"
      whiteSpace="nowrap"
      overflowX="hidden"
      overflowY="auto"
      position="absolute"
      top={0}
      zIndex={Z_INDEX_SIDEBAR_BASE}
    >
      <Container maxW="md">
        {props.children}
      </Container>
    </Box>
  )
}
