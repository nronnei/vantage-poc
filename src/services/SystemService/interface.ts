import { SetterOrUpdater } from 'recoil'
import { System, SystemInformation, VehicleType } from '../../types'

export interface ISystemService {
  useSelectedSytemState: () => [
    System,
    SetterOrUpdater<System>
  ],
  getSystems: () => System[],
  useSelectedSystem: () => System,
  useSetSelectedSystemState: () => void,
  useLoadSystem: () => (system?: System) => Promise<void>
  useSystemInfo: (id: System["system_id"]) => SystemInformation,
  useSystemVehicleTypes: (id: System["system_id"]) => VehicleType[],
}
