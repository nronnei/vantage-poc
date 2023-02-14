import { IMapService } from "../services/IMapService";
import { MapServiceEvent, MapServiceEventHandler } from "../types/Events";

const registerListeners = (mapSvc: IMapService) => {

  const handleMapClick: MapServiceEventHandler = (event: MapServiceEvent) => {
    console.log('I gotta click, fam!', event);
  };

  const handleMapHover: MapServiceEventHandler = (event: MapServiceEvent) => {
    console.log('Hoverin, fam!', event);
  };

  mapSvc.on('click', handleMapClick);
  mapSvc.on('hover', handleMapHover);
}

export const useMapEventListeners = () => registerListeners;