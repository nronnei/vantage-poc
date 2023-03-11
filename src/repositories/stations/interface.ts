import { SetterOrUpdater } from 'recoil';
import { StationInformation, StationStatus } from '../../types';

export interface IGbfsStationRepo {
  // Individual station interactions
  useStationInformationValue: (id: string) => StationInformation | null,
  useStationStatusValue: (id: string) => StationStatus | null,
  // Bulk Station Info interactions
  useStationsIdxValue: () => StationInformation["station_id"][],
  useStationsValue: () => StationInformation[],
  useSetStationsState: () => (stations: StationInformation[]) => void,
  useStationsState: () => [
    StationInformation[],
    SetterOrUpdater<StationInformation[]>
  ]
  // Bulk Station Status interactions
  useStationsStatusValue: () => StationStatus[],
  useSetStationsStatusState: () => (stations: StationStatus[]) => void,
  useStationsStatusState: () => [
    StationStatus[],
    SetterOrUpdater<StationStatus[]>
  ]
  // Selected Station interactions
  useSelectedStationValue: () => StationInformation["station_id"] | null,
  useSetSelectedStationState: () => (id: StationInformation["station_id"]) => void,
  useSelectedStationState: () => [
    StationInformation["station_id"] | null,
    SetterOrUpdater<StationInformation["station_id"] | null>
  ],
  // Last Updated interactions
  useStationLastUpdatedValue: () => Date | null,
  useStationLastUpdatedState: () => [
    Date | null,
    SetterOrUpdater<Date | null>
  ],
}
