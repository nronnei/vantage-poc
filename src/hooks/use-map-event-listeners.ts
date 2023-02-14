import { IMapService } from "../interfaces/IMapService";
import { MapServiceEvent, MapServiceEventHandler } from "../types/Events";

const handleMapClick: MapServiceEventHandler = (event: MapServiceEvent) => {
  console.log('click', event);
};

const handleMapHover: MapServiceEventHandler = (event: MapServiceEvent) => {
  console.log('hover', event);
};

const handleMapMoveStart: MapServiceEventHandler = (event: MapServiceEvent) => {
  console.log('movestart', event);
};

const handleMapMoveEnd: MapServiceEventHandler = (event: MapServiceEvent) => {
  console.log('moveend', event);
};

export const useMapEventListeners = (mapSvc: IMapService) => {

  function setMapEventListeners() {
    mapSvc.on('click', handleMapClick);
    mapSvc.on('hover', handleMapHover);
    mapSvc.on('movestart', handleMapMoveStart);
    mapSvc.on('moveend', handleMapMoveEnd);
  }

  function removeMapEventListeners() {
    mapSvc.off('click');
    mapSvc.off('hover');
    mapSvc.off('movestart');
    mapSvc.off('moveend');
  }

  return { setMapEventListeners, removeMapEventListeners };

};
