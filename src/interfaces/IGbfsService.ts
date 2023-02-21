import { System, SystemFeeds, SystemInformationResponse, StationInformationResponse, StationStatusResponse } from "../types";
import { VehicleTypesResponse } from "../types/gbfs/VehicleType";
import { HttpClient } from "./IHttpClient";

type GbfsRequestArgs = {
  /**
   * The URL to make the request to.
   */
  url: string,
  /**
   * The target language for the response data.
   */
  language: string
};

export interface GbfsClient {

  /**
   * The Client to use when making requests.
   */
  client: HttpClient,

  /**
   * Gets all available systems.
   */
  getSystems: () => System[]

  /**
   * Given a system URL, gets all available GBFS feeds.
   * @returns GBFS Feeds for the target system.
   */
  getSystemFeed: (opts: GbfsRequestArgs) => SystemFeeds

  /**
   * Get system information in the target lanaguage.
   * @param url A station_information URL.
   * @param language The target language.
   * @returns Sytem information details.
   */
  getSystemInformation: (url: string) => SystemInformationResponse

  /**
   * Get information about system hours.
   * @param url A system hours URL.
   * @returns 
   */
  getSystemHours: (url: string) => JSON

  /**
   * Gets information about system pricing.
   * @param url A system pricing URL.
   * @returns
   */
  getSystemPricing: (url: string) => JSON

  /**
   * Gets data about what vehicle types are available within the system.
   * @param url A vehicle_types URL.
   * @returns An array of vehicle types available in the system.
   */
  getSystemVehicleTypes: (url: string) => VehicleTypesResponse

  /**
   * Get descriptions of and information about all public stations in the system.
   * @param url Station feed URL.
   * @param language The target language.
   * @returns An array containing all the stations in the system.
   */
  getStationInformation: (url: string) => StationInformationResponse

  /**
   * Get station statuses for the system.
   * @param url A station_status URL.
   * @returns An array of station statuses.
   */
  getStationStatus: (url: string) => StationStatusResponse

}