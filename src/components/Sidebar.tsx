import React from "react";
import { Container } from "@chakra-ui/react";
import { motion } from "framer-motion";

type SidebarProps = React.PropsWithChildren<{ isOpen: boolean }>;

export function Sidebar(props: SidebarProps) {

  const { isOpen, children } = props;

  return (
    <motion.div
      initial={false}
      animate={{ width: isOpen ? 'initial' : 0 }}
      transition={{ type: 'tween', duration: 0.3 }}
    >
      <Container
        bg='red.100'
        h="100vh"
        whiteSpace="nowrap"
        overflowX="hidden"
        overflowY="auto"
      >
        {children}
      </Container>
    </motion.div>
  )
}
