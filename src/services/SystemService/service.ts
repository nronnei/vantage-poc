import { CreateGbfsRepoDeps, IGbfsSystemRepo } from '../../repositories';
import { System } from '../../types';
import { ISystemService } from './interface';

export type CreateSystemServiceDeps = CreateGbfsRepoDeps & { repo: IGbfsSystemRepo }

export function createSystemService(deps: CreateSystemServiceDeps) {
  const { logger, client, repo } = deps;

  const controller: ISystemService = {
    useSelectedSytemState: () => repo.useSelectedSystemState(),
    useSelectedSystem: () => repo.useSelectedSystemValue(),
    useSetSelectedSystemState: () => repo.useSetSelectedSystem(),
    useLoadSystem: () => {
      const setSelected = repo.useSetSelectedSystem();
      return async (system?: System | undefined) => {
        await client.loadSystemData(system);
        if (system) setSelected(system);
      };
    },
    useSystemInfo: (id) => repo.useSystemInformationValue(id),
    useSystemVehicleTypes: (id) => repo.useSystemVehicleTypesValue(id),
    getSystems: () => repo.useSystemsValue()
  }

  return controller;
}
