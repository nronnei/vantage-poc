import { NotFoundError } from '../../errors';
import { CreateGbfsRepoDeps, IGbfsStationRepo } from '../../repositories';
import { StationStatus } from '../../types';
import { IStationService } from './interface';

export type CreateStationServiceDeps = CreateGbfsRepoDeps & { repo: IGbfsStationRepo }

export function createStationService(deps: CreateStationServiceDeps) {
  const { repo, logger, client } = deps;

  const controller: IStationService = {
    useStation: (id) => {
      const station = repo.useStationInformationValue(id);
      if (!station) {
        throw new NotFoundError(`Could not find station ${id}`);
      }
      return station;
    },
    useStationStatus: (id) => {
      const station = repo.useStationStatusValue(id);
      if (!station) {
        throw new NotFoundError(`Could not find station ${id}`);
      }
      return station;
    },

    useAllStations: () => {
      const stations = repo.useStationsValue();
      if (stations.length < 1) {
        throw new NotFoundError('No stations found.');
      }
      return stations;
    },
    useSetAllStations: repo.useSetStationsState,
    useAllStationsState: () => [controller.useAllStations(), controller.useSetAllStations],

    useLoadStations: () => {
      const setStationInfo = repo.useSetStationsState();
      const setStationStatus = repo.useSetStationsStatusState();
      // const setStationLayer = layerRepo.useSetStationLayer();

      return async (): Promise<void> => {
        // Make sure we have a system set
        const sys = client.getSystem();

        logger.info('[useLoadStations] Loading stations for', sys.system_id);
        const stationInfo = await client.getStationInformation();
        const stationStatus = await client.getStationStatus();

        logger.info('[useLoadStations] feeds retrieved...');
        // setStationLayer(stationInfo.data);
        setStationInfo(stationInfo.data.stations);
        setStationStatus(stationStatus.data.stations);

        logger.info('[useLoadStations] Stations loaded');
      }
    },

    useAllStationStatuses: function (): StationStatus[] {
      throw new Error('Function not implemented.');
    },
    useSetAllStationStatuses: function (stations: StationStatus[]): void {
      throw new Error('Function not implemented.');
    },
    useAllStationStatusesState: function (): [StationStatus[], (stations: StationStatus[]) => void] {
      throw new Error('Function not implemented.');
    },

    useAvailableStations: function (): string[] {
      throw new Error('Function not implemented.');
    },
    useStatusLastUpdated: function (): Date {
      throw new Error('Function not implemented.');
    }
  };

  return controller
}
