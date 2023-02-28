import { Box, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, UseDisclosureProps } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { useInjection } from '../context/injection';
import { GbfsClientConstructor } from '../interfaces/IGbfsClient';
import { IHttpClient } from '../interfaces/IHttpClient';
import { ILogger } from '../interfaces/ILogger';
import { Feed, System } from '../types';
import { AppBar } from "./AppBar";

type ServiceDeps = {
  GbfsService: GbfsClientConstructor,
  logger: ILogger,
  httpClient: IHttpClient,
}

export const AppDrawer = ({ onClose, isOpen }: { onClose: () => void, isOpen: boolean }) => {

  const { GbfsService, logger, httpClient } = useInjection() as ServiceDeps;
  const [systems, setSystems] = useState([] as System[]);
  const [systemFeeds, setSystemFeeds] = useState([] as Feed[]);


  useEffect(() => {
    (async () => {
      const newSystems = await GbfsService.getSystems();
      setSystems(newSystems);
      const system = newSystems.find(s => s.system_id === 'nextbike_al') as System;
      const svc = new GbfsService({ client: httpClient, logger, system });
      try {
        const feeds = await svc.getSystemFeeds();
        setSystemFeeds(feeds);
      } catch (error) {
        logger.error('uh oh', error);
      }
    })();
  }, [])

  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="md" closeOnOverlayClick={true}>
      <DrawerOverlay />
      <DrawerContent>
        <Flex>
          <AppBar onOpen={() => { }} />
          <Box>
            <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
            <DrawerBody>
              <Box overflowY={'scroll'}>
                <p>
                  There are {systems.length} systems to choose from. Here's one of them.
                </p>
                {
                  systemFeeds.map(f => (
                    <p key={f.name}>
                      <span>Name: {f.name}</span>
                      <span>ID: {f.url}</span>
                    </p>
                  ))
                }
              </Box>
            </DrawerBody>
          </Box>
        </Flex>
      </DrawerContent>
    </Drawer>
  )
}
