// import L from "leaflet";
import "leaflet/dist/leaflet.css"
import { Box } from '@chakra-ui/react'
import React, { useRef, useEffect } from "react";
import { useMapEventListeners } from '../hooks/use-map-event-listeners';
import { LeafletMapService as MapService } from '../services/';

export const Map = () => {
  const CONTAINER_ID = 'map-container';
  const mapRef = useRef(CONTAINER_ID);

  const { setMapEventListeners, removeMapEventListeners } = useMapEventListeners(MapService);

  useEffect(() => {
    MapService.setMap(mapRef.current);
    setMapEventListeners();
    return removeMapEventListeners;
  }, [mapRef])


  return <Box w="100%" h="100vh" bg="yellow" id={CONTAINER_ID}></Box>
}