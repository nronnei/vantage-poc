import { StationInformation, StationStatus } from '../../types';

export interface IGbfsStationRepo {
  useStationInformationValue: (id: string) => StationInformation,
  useStationStatusValue: (id: string) => StationStatus,
  useStationsValue: () => StationInformation[]
}
