import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { System } from '../../types';
import { CreateGbfsRepoDeps } from '../types';
import { IGbfsSystemRepo } from './interface';
import { createSystemsState } from './recoil-state';

export function createSystemRepo(opts: CreateGbfsRepoDeps): IGbfsSystemRepo {
  const { client } = opts;
  const state = createSystemsState(opts);

  const controller: IGbfsSystemRepo = {
    useSelectedSystemValue() {
      return useRecoilValue(state.selectedSystem);
    },

    /**
     * Creates function for setting the selected system.
     * @returns
     */
    useSetSelectedSystem() {
      return useRecoilCallback(({ set }) => async (system: System) => {
        client.setSystem(system);
        set(state.selectedSystem, system);
      });
    },

    useSelectedSystemState() {
      return useRecoilState(state.selectedSystem);
    },
    /**
     * Get a GBFS System.
     * @param id ID of the target system.
     * @returns Basic system data.
     */
    useSystemValue(id: System["system_id"]) {
      return useRecoilValue(state.availableSystems(id));
    },
    /**
     * Get all available systems.
     * @returns ALLLLLL THE SYSTEMS!
     */
    useSystemsValue() {
      return useRecoilValue(state.getAllSystems)
    },
    /**
     * Get system_information for a system.
     * @param id ID of the target system. Defaults to selected system.
     * @returns Information for the target system.
     */
    useSystemInformationValue(id: System["system_id"]) {
      return useRecoilValue(state.systemInformation(id));
    },
    /**
     * Get available vehicle types for a system.
     * @param id ID of the target system. Defaults to selected system.
     * @returns The available vehicle types.
     */
    useSystemVehicleTypesValue(id: System["system_id"]) {
      return useRecoilValue(state.systemVehicleTypes(id));
    },
  }

  return controller;
}
