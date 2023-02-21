import { MultiPolygon } from "geojson"
import { GbfsMetadata } from "./Gbfs"

/**
 * Types for data objects in the system_information feed.
 * @see https://github.com/MobilityData/gbfs/blob/v2.3/gbfs.md#station_informationjson
 */

export enum ParkingTypes {
  /**
   * Off-street parking.
   */
  ParkingLot = "parking_lot",
  /**
   * Curbside parking.
   */
  Street = "street_parking",
  /**
   * Parking that is below street level. Station may be non-communicating.
   */
  Underground = "underground_parking",
  /**
   * Park vehicle on sidewalk, out of the pedestrian right of way.
   */
  Sidewalk = "sidewalk_parking",
  /**
   * Uknown parking type.
   */
  Other = "other"

}

export type StationInformation = {
  station_id: string,
  name: string,
  lat: number,
  lon: number,
  cross_street?: string,
  region_id?: string,
  short_name?: string,
  rental_methods?: string[],
  is_valet_station?: boolean,
  is_charging_station?: boolean,
  parking_type?: ParkingTypes,
  parking_hoop?: false,
  contact_phone?: string,
  vehicle_type_capacity: {
    "abc123": 7,
    "def456": 9
  }
  station_area: MultiPolygon
}

export interface StationInformationResponse extends GbfsMetadata {
  data: {
    stations: StationInformation[]
  }
}