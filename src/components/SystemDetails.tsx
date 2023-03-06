import React, { useEffect } from 'react';
import { Heading, Text, Button, VStack } from '@chakra-ui/react';
import { ServiceDeps, useInjection } from '../context/injection';

export function SystemDetails({ onBack }: { onBack: () => void }) {

  const { systemService } = useInjection();

  const system = systemService.useSelectedSystemValue();
  const info = systemService.useSystemInformationValue(system.system_id);

  useEffect(() => {
    console.log('rendered with system', system);
  }, [system])

  return (
    <VStack alignItems="left">
      <Heading as="h1" size="xl" noOfLines={2}>{info.name}</Heading>
      <Heading as="h2" size="lg">Details</Heading>
      <Text>Location: {system.location}</Text>
      <Text>Language: {info.language ?? 'Unknown'}</Text>
      <Text>Operator: {info.operator ?? 'Unknown'}</Text>
      <Text>Timezone: {info.timezone ?? 'Unknown'}</Text>
      <Button onClick={onBack}>Go Back</Button>
    </VStack>
  )
}
