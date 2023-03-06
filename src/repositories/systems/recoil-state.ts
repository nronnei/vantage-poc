import { atom, selector, selectorFamily } from 'recoil';
import { NotFoundError } from '../../errors';
import { System } from '../../types';
import { RecoilGbfsRepoOptions } from './interface';

const logTag = 'RecoilGbfsRepo::';

export function createSystemsState({ client, logger }: RecoilGbfsRepoOptions) {

  const getAllSystems = selector({
    key: 'getAllSystems',
    get: async () => {
      const systems = await client.getSystems();
      // GBFS System IDs don't need to be random 🙃 we're gonna fix that.
      systems.forEach(s => s.system_id = window.crypto.randomUUID());
      return systems;
    }
  });

  const selectedSystem = atom({
    key: 'selectedSystem',
    default: (() => {
      try {
        return client.getSystem();
      } catch (error) {
        if (error instanceof NotFoundError) {
          logger.warn(`${logTag}selectedSystemDefault: no system found`);
          return {} as System;
        }
        throw error;
      }
    })(),
  });

  const availableSystemsIdx = selector({
    key: 'availableSystemsIdx',
    get: async ({ get }) => {
      const systems = await get(getAllSystems);
      return systems.map(s => s.system_id);
    }
  });

  const availableSystems = selectorFamily({
    key: 'availableSystems',
    get: (id: string) => async ({ get }) => {
      const systems = await get(getAllSystems);
      const target = systems.find(s => s.system_id === id);
      if (!target) {
        const message = `Couldn't find system "${id}".`
        logger.debug(`${logTag}availableSystems: ${message}`);
        throw new NotFoundError(message);
      }
      return target;
    }
  });

  const systemInformation = selectorFamily({
    key: 'systemInformation',
    get: (id: System["system_id"]) => async () => {
      const systemInfo = await client.getSystemInformation();
      return systemInfo.data;
    }
  })

  const systemLanguages = selectorFamily({
    key: 'systemLanguages',
    get: (id: System["system_id"]) => async () => {
      const feeds = await client.getAutoDiscovery();
      return Object.keys(feeds.data);
    }
  });

  const systemVehicleTypes = selectorFamily({
    key: 'systemVehicleTypes',
    get: (id: System["system_id"]) => async () => {
      const vehicleTpes = await client.getSystemVehicleTypes();
      return vehicleTpes.data.vehicle_types;
    }
  });

  return {
    getAllSystems,
    selectedSystem,
    availableSystemsIdx,
    availableSystems,
    systemInformation,
    systemLanguages,
    systemVehicleTypes,
  };
}
