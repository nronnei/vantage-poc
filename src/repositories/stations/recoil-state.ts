import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { StationInformation, StationStatus } from '../../types';
import { RecoilGbfsRepoOptions } from '../systems/interface';

export function createStationsState() {

  const selectedStation = atom<null | string>({
    key: 'selectedStation',
    default: null
  });

  const stationStatusLastUpdated = atom<null | Date>({
    key: 'stationStatusLastUpdated',
    default: null,
  });

  const allStationsInformation = atom({
    key: 'allStationsInformation',
    default: [] as StationInformation[],
  });

  const allStationsStatus = atom({
    key: 'stationInformation',
    default: [] as StationStatus[],
  });

  const stationInformation = selectorFamily({
    key: 'stationInformation',
    get: (id: StationInformation["station_id"]) => ({ get }) => {
      const stations = get(allStationsInformation);
      return stations.find(s => s.station_id === id) || null;
    },
  });

  const stationStatus = selectorFamily({
    key: 'stationStatus',
    get: (id: StationInformation["station_id"]) => ({ get }) => {
      const stations = get(allStationsStatus);
      return stations.find(s => s.station_id === id) || null;
    },
  });

  const availableStationsIdx = atom({
    key: 'availableStationsIdx',
    default: selector({
      key: 'defaultStationsIdx',
      get: ({ get }) => {
        return get(allStationsInformation).map(s => s.station_id);
      }
    }),
  });

  return {
    selectedStation,
    stationStatusLastUpdated,
    availableStationsIdx,
    allStationsInformation,
    stationInformation,
    allStationsStatus,
    stationStatus,
  };

}
