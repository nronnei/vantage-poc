export type Feed = {
  name: "system_information" | "station_information",
  url: string
}

export type GbfsVersion = {
  version: "2.3" | "2.2" | "2.1" | "2.0",
  url: string,
}

export type GbfsMetadata = {
  version: "2.3" | "2.2" | "2.1" | "2.0",
  ttl: number,
  last_updated: EpochTimeStamp,
}

export interface GbfsResponse<T> extends GbfsMetadata {
  data: T
}

export interface SystemFeeds {
  [key: string]: { feeds: Feed[] }
}

export type AutoDisoveryResponse = GbfsResponse<SystemFeeds>

export interface SystemVersions {
  [key: string]: GbfsVersion[]
}
