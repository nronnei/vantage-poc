import { atom, atomFamily, selector } from 'recoil';
import { StationInformation } from '../../types';
import { RecoilGbfsRepoOptions } from '../systems/interface';

export function createStationsState({ client, logger }: RecoilGbfsRepoOptions) {

  const getStationInfoQuery = selector({
    key: 'getStationInfoQuery',
    get: async () => {
      const res = await client.getStationInformation();
      return res.data.stations.map((s) => {
        s.station_id = window.crypto.randomUUID()
        return s;
      });
    }
  });

  const selectedStation = atom({
    key: 'selectedStation',
    default: {} as StationInformation
  });

  const feedLastUpdated = atomFamily({
    key: 'feedLastUpdated'
  })

  const availableStationsIdx = atom({
    key: 'availableStationsIdx',
    default: selector({
      key: 'defaultAvailableStationsIdx',
      get: ({ get }) => {
        const stations = get(getStationInfoQuery)
        return stations.map(({ station_id }) => station_id);
      }
    })
  });

  return {
    selectedStation,
    feedLastUpdated,
    availableStationsIdx,
  };

}
