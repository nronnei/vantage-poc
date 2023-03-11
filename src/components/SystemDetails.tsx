import React, { useEffect } from 'react';
import { Heading, Text, Button, VStack } from '@chakra-ui/react';
import { useInjection } from '../context/injection';

export function SystemDetails({ onBack }: { onBack: () => void }) {

  const { systemService, stationService } = useInjection();
  const system = systemService.useSelectedSystem();
  const info = systemService.useSystemInfo(system.system_id);

  const stations = stationService.useAllStations()

  return (
    <VStack alignItems="left">
      <Heading as="h1" size="xl" noOfLines={2}>{info.name}</Heading>
      <Heading as="h2" size="lg">Details</Heading>
      <Text>Location: {system.location}</Text>
      <Text>Language: {info.language ?? 'Unknown'}</Text>
      <Text>Operator: {info.operator ?? 'Unknown'}</Text>
      <Text>Timezone: {info.timezone ?? 'Unknown'}</Text>

      <Heading as="h2" size="lg">Stations</Heading>
      <Text> The system contains {stations.length} stations. The first one is below.</Text>
      <pre>
        {JSON.stringify(stations[0], null, 2)}
      </pre>
      <Button onClick={onBack}>Go Back</Button>
    </VStack>
  )
}
