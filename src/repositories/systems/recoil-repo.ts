import { useRecoilCallback, useRecoilValue } from 'recoil';
import { IGbfsClient } from '../../interfaces/IGbfsClient';
import { ILogger } from '../../interfaces/ILogger';
import { StationInformation, StationStatus, System } from '../../types';
import { IGbfsSystemRepo } from './interface';
import { createSystemsState } from './recoil-state';

type CreateGbfsHooksDeps<GbfsStateStore> = {
  logger: ILogger,
  client: IGbfsClient,
  state: GbfsStateStore
}

type RecoilGbfsHooksDeps = CreateGbfsHooksDeps<ReturnType<typeof createSystemsState>>

export function createSystemServiceHooks(opts: RecoilGbfsHooksDeps): IGbfsSystemRepo {
  const { client } = opts;
  const systemState = createSystemsState(opts);

  const controller = {
    useSelectedSystemValue() {
      return useRecoilValue(systemState.selectedSystem);
    },

    /**
     * Creates function for setting the selected system.
     * @returns
     */
    useSetSelectedSystem() {
      return useRecoilCallback(({ set }) => async (system: System) => {
        client.setSystem(system);
        set(systemState.selectedSystem, system);
      });
    },
    /**
     * Get a GBFS System.
     * @param id ID of the target system.
     * @returns Basic system data.
     */
    useSystemValue(id: System["system_id"]) {
      return useRecoilValue(systemState.availableSystems(id));
    },
    /**
     * Get all available systems.
     * @returns ALLLLLL THE SYSTEMS!
     */
    useSystemsValue() {
      return useRecoilValue(systemState.getAllSystems)
    },
    /**
     * Get system_information for a system.
     * @param id ID of the target system. Defaults to selected system.
     * @returns Information for the target system.
     */
    useSystemInformationValue(id: System["system_id"]) {
      return useRecoilValue(systemState.systemInformation(id));
    },
    /**
     * Get available vehicle types for a system.
     * @param id ID of the target system. Defaults to selected system.
     * @returns The available vehicle types.
     */
    useSystemVehicleTypesValue(id: System["system_id"]) {
      return useRecoilValue(systemState.systemVehicleTypes(id));
    },
    useStationsValue() {
      return [] as StationInformation[]
    },
    useStationInformationValue() {
      return {} as StationInformation
    },
    useStationStatusValue() {
      return {} as StationStatus
    },
  }

  return controller;
}
