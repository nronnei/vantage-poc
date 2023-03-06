import { IGbfsClient } from '../../interfaces/IGbfsClient'
import { GbfsRepoOptions } from '../../interfaces/IGbfsRepo'
import { System, SystemInformation, VehicleType } from '../../types';

export type RecoilGbfsRepoOptions = GbfsRepoOptions & { client: IGbfsClient }

export interface IGbfsSystemRepo {
  useSelectedSystemValue: () => System
  useSetSelectedSystem: () => (system: System) => void
  useSystemValue: (id: System["system_id"]) => System
  useSystemsValue: () => System[]
  useSystemInformationValue: (id: System["system_id"]) => SystemInformation
  useSystemVehicleTypesValue: (id: System["system_id"]) => VehicleType[]
  // useSystemHours: () => {}[]
  // useSystemPricingPlans: () => {}[]
}

