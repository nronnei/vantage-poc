import React, { Suspense, useState } from "react";
import { Heading, Text } from '@chakra-ui/react';
import { ServiceDeps, useInjection } from '../context/injection';
import { SystemDetails } from './SystemDetails';
import { SystemCard } from './systems-list/SystemCard';



function SystemsList({ onChangeSystem }: { onChangeSystem: () => void }) {
  const { systemService } = useInjection();
  const systems = systemService.useSystemsValue();

  return <>
    <Heading as="h1">Systems</Heading>
    {systems.map((system, i) => <SystemCard
      key={system.system_id}
      {...{ onChangeSystem, system }}
    />)}
  </>
}

export function SidebarContent() {
  const [viewFeed, setViewFeed] = useState(false);
  const toggleViewFeed = () => setViewFeed(!viewFeed);

  return <Suspense fallback={<Text>Loading...</Text>}>
    {
      viewFeed
        ? <SystemDetails onBack={toggleViewFeed} />
        : <SystemsList onChangeSystem={toggleViewFeed} />

    }
  </Suspense>
}
