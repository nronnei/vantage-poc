// import L from "leaflet";
// import "leaflet/dist/leaflet.css"
import { Box } from '@chakra-ui/react'
import React, { useRef, useEffect } from "react";
import { useMapEventListeners } from '../hooks/use-map-event-listeners';
import { MockMapService as MapService } from '../services/';

export const Map = () => {
  const CONTAINER_ID = 'map-container';
  const mapRef = useRef(CONTAINER_ID);

  const registerListeners = useMapEventListeners();

  useEffect(() => {
    MapService.setMap(mapRef.current);
    registerListeners(MapService);
  }, [])


  return <Box w="100%" h="100vh" bg="teal" id={CONTAINER_ID}></Box>
}