import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useInjection } from '../context/injection';
import { IHttpClient } from '../interfaces/IHttpClient';
import { ILogger } from '../interfaces/ILogger';
import { GbfsService } from '../services/GbfsService';
import { Feed, System } from '../types';

type ServiceDeps = {
  gbfsClient: GbfsService,
  logger: ILogger,
  httpClient: IHttpClient,
}

function FeedDisplay({ onBack }: { onBack: () => void }) {

  const { gbfsClient } = useInjection() as ServiceDeps;
  const system = gbfsClient.getSystem();
  const [feeds, setFeeds] = useState([] as Feed[]);

  useEffect(() => {
    (async () => setFeeds(await gbfsClient.getSystemFeeds()))();
  }, [])

  return <VStack alignItems="left">
    <Heading as="h1" size="xl" wordBreak="break-all">
      {system.name}
    </Heading>
    <Text>{system.location}</Text>
    <Heading as="h2" size="lg">Feeds</Heading>
    {feeds.map(f => (
      <div key={f.name}>
        <Heading as="h3" size="md">
          {f.name}
        </Heading>
        <Text>
          {f.url}
        </Text>
      </div>
    ))}
    <Button onClick={onBack}>Go Back</Button>
  </VStack>
}

function SystemDisplay({ system, onChangeSystem }: { system: System, onChangeSystem: () => void }) {
  const { gbfsClient } = useInjection() as ServiceDeps;
  const handleClick = () => {
    gbfsClient.setSystem(system);
    onChangeSystem()
  }

  return <VStack mb={8}>
    <Heading as="h2" size="lg"> {system.name} </Heading>
    <Text> {system.location} </Text>
    <Button onClick={handleClick}>View Feeds</Button>
  </VStack>
}

function SystemsList({ onChangeSystem }: { onChangeSystem: () => void }) {
  const [systems, setSystems] = useState([] as System[]);

  useMemo(() => {
    (async () => setSystems(await GbfsService.getSystems()))();
  }, [])

  return <>
    <Heading as="h1">Systems</Heading>
    {systems.map((system, i) => <SystemDisplay
      key={`${system.system_id}-${system.name}-${i}`}
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
        ? <FeedDisplay onBack={toggleViewFeed} />
        : <SystemsList onChangeSystem={toggleViewFeed} />

    }
  </Suspense>
}
