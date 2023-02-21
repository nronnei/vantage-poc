import { GbfsMetadata } from "./Gbfs"

export type VehicleType = {
  vehicle_type_id: string,
  form_factor: string,
  propulsion_type: string,
  name: string,
  wheel_count: number,
  default_reserve_time?: number,
  return_constraint: string,
  vehicle_assets?: {
    [key: string]: string
  },
  default_pricing_plan_id?: string,
  pricing_plan_ids?: string[]
}

export interface VehicleTypesResponse extends GbfsMetadata {
  data: {
    vehicle_types: VehicleType[]
  }
} 