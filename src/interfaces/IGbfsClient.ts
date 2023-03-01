import { System, SystemFeeds, SystemInformationResponse, StationInformationResponse, StationStatusResponse, Feed, AutoDisoveryResponse } from "../types";
import { VehicleTypesResponse } from "../types/gbfs/VehicleType";
import { HttpClientConstructor, IHttpClient } from "./IHttpClient";
import { ILogger } from './ILogger';

export type SystemFeedRequest = {
  /**
   * The URL to make the request to.
   */
  url: string,
  /**
   * The target language for the response data.
   */
  language: string
};

export interface GbfsClientOptions {
  /**
   * The client to use when making requests
   */
  client: IHttpClient,

  /**
   * The logger to use internally.
   */
  logger: ILogger,

  system?: System,

  /**
   * The preferred language for responses. Should default to English.
   */
  language?: string;
}

export interface GbfsClientConstructor {
  new: (opts: GbfsClientOptions) => IGbfsClient
  /**
   * Gets a list of all available systems. Pass an item from this array to the
   * constructor to initiate an instance if IGbfsClient.
   */
  getSystems: () => Promise<System[]>
}

export interface IGbfsClient extends GbfsClientOptions {

  /**
   * Get the currently active system.
   * @returns The currently active system.
   */
  getSystem: () => System

  /**
   * Sets a new active system.
   * @param system The new system.
   * @returns
   */
  setSystem: (system: System) => void;

  /**
   * Given a system URL, gets all available GBFS feeds.
   * @returns GBFS Feeds for the target system.
   */
  getAutoDiscovery: (endpoint?: string) => Promise<AutoDisoveryResponse>

  /**
   * Given a system URL, gets all available GBFS feeds.
   * @returns GBFS Feeds for the target system.
   */
  getSystemFeeds: (opts?: SystemFeedRequest) => Promise<Feed[]>

  /**
   * Get system information in the target lanaguage.
   * @param endpoint A station_information URL.
   * @param language The target language.
   * @returns Sytem information details.
   */
  getSystemInformation: (endpoint?: string) => Promise<SystemInformationResponse>

  /**
   * Get information about system hours.
   * @param endpoint A system hours URL.
   * @returns
   */
  getSystemHours: (endpoint?: string) => Promise<JSON>

  /**
   * Gets information about system pricing.
   * @param endpoint A system pricing URL.
   * @returns
   */
  getSystemPricing: (endpoint?: string) => Promise<JSON>

  /**
   * Gets data about what vehicle types are available within the system.
   * @param endpoint A vehicle_types URL.
   * @returns An array of vehicle types available in the system.
   */
  getSystemVehicleTypes: (endpoint?: string) => Promise<VehicleTypesResponse>

  /**
   * Get descriptions of and information about all public stations in the system.
   * @param endpoint Station feed URL.
   * @param language The target language.
   * @returns An array containing all the stations in the system.
   */
  getStationInformation: (endpoint?: string) => Promise<StationInformationResponse>

  /**
   * Get station statuses for the system.
   * @param endpoint A station_status URL.
   * @returns An array of station statuses.
   */
  getStationStatus: (endpoint?: string) => Promise<StationStatusResponse>

}
