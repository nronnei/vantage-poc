import { StationInformation, StationStatus } from '../../types';

export interface IStationService {
  useStation: (id: StationInformation["station_id"]) => StationInformation,
  useStationStatus: (id: StationInformation["station_id"]) => StationStatus,
  useAllStations: () => StationInformation[],
  useSetAllStations: () => (stations: StationInformation[]) => void,
  useAllStationsState: () => [
    StationInformation[],
    (stations: StationInformation[]) => void
  ],
  useAllStationStatuses: () => StationStatus[],
  useSetAllStationStatuses: (stations: StationStatus[]) => void,
  useAllStationStatusesState: () => [
    StationStatus[],
    (stations: StationStatus[]) => void
  ],
  useAvailableStations: () => StationInformation["station_id"][],
  useStatusLastUpdated: () => Date,

  useLoadStations: () => () => void,
}
