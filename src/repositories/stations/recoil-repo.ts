import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { StationInformation, StationStatus } from '../../types';
import { CreateGbfsRepoDeps } from '../types';
import { IGbfsStationRepo } from './interface';
import { createStationsState } from './recoil-state';


export function createStationRepoHooks(opts: CreateGbfsRepoDeps) {
  const state = createStationsState();

  const controller: IGbfsStationRepo = {
    // Individual Station Stuff
    useStationInformationValue: (id) => useRecoilValue(state.stationInformation(id)),
    useStationStatusValue: (id) => useRecoilValue(state.stationStatus(id)),
    useSelectedStationValue: () => useRecoilValue(state.selectedStation),
    useSetSelectedStationState: () => useRecoilCallback(({ set }) => {
      return (id) => set(state.selectedStation, id);
    }),
    useSelectedStationState: () => useRecoilState(state.selectedStation),

    // Bulk Station Stuff
    useStationsIdxValue: () => useRecoilValue(state.availableStationsIdx),
    useStationsValue: () => useRecoilValue(state.allStationsInformation),
    useSetStationsState: () => useRecoilCallback(({ set }) => (stations: StationInformation[]) => {
      return set(state.allStationsInformation, stations);
    }),
    useStationsState: () => useRecoilState(state.allStationsInformation),
    useStationsStatusValue: () => useRecoilValue(state.allStationsStatus),
    useSetStationsStatusState: () => useRecoilCallback(({ set }) => (stations: StationStatus[]) => {
      return set(state.allStationsStatus, stations);
    }),
    useStationsStatusState: () => useRecoilState(state.allStationsStatus),

    // Last Updated Stuff
    useStationLastUpdatedState: () => useRecoilState(state.stationStatusLastUpdated),
    useStationLastUpdatedValue: () => useRecoilValue(state.stationStatusLastUpdated),
  };

  return controller;
}
