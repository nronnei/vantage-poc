import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Text, } from '@chakra-ui/react';
import React from 'react';
import { useInjection } from '../../context/injection';
import { System } from '../../types';


export function SystemCard({ system, onChangeSystem }: { system: System, onChangeSystem: () => void }) {
  const { systemService } = useInjection();
  const setSystem = systemService.useSetSelectedSystem();
  const handleClick = () => {
    setSystem(system);
    onChangeSystem();
  }

  return (
    <Card mb={8}>
      <CardHeader>
        <Heading as="h2" size="lg"> {system.name} </Heading>
      </CardHeader>
      <CardBody>
        <Text> {system.location} </Text>
      </CardBody>
      <CardFooter>
        <Button onClick={handleClick}>View Feeds</Button>
      </CardFooter>
    </Card>
  )
}
