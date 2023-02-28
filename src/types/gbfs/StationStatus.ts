import { GbfsResponse } from "./Gbfs"

export type AvailableVehicleCount = {
  /**
   * A vehcile type ID. Corresponds to an entry from a VehicleTypesReponse.
   */
  vehicle_type: string,
  /**
   * The number of available vehicles of that type.
   */
  count: number
}

export type AvailableDockCount = {
  /**
   * An array of vehicle type IDs.
   */
  vehicle_type_ids: string[],
  /**
   * The number of available parking spaces for those vehicle types.
   */
  count: number
}

export type StationStatus = {
  station_id: string,
  is_installed: boolean,
  is_renting: boolean,
  is_returning: boolean,
  last_reported: EpochTimeStamp,
  num_docks_available: number,
  num_docks_disabled: number,
  vehicle_docks_available: AvailableDockCount[],
  num_bikes_available: number,
  num_bikes_disabled: number,
  vehicle_types_available: AvailableVehicleCount[]
}

export type StationStatusResponse = GbfsResponse<{ stations: StationStatus[] }>
