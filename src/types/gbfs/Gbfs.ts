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
  data: {
    [key: string]: any
  }
}

export interface SystemFeeds extends GbfsMetadata {
  data: {
    [key: string]: Feed[]
  }
}

export interface SystemVersions extends GbfsMetadata {
  data: {
    [key: string]: GbfsVersion[]
  }
}
