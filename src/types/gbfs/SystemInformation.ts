import { GbfsResponse } from "./Gbfs"

export type SystemInformation = {
  system_id: string,
  language: string,
  name: string,
  timezone: string,
  short_name?: string,
  operator?: string,
  url?: string,
  purchase_url?: string,
  start_date?: string,
  phone_number?: string,
  email?: string,
  feed_contact_email?: string,
  license_url?: string,
  terms_url?: string,
  terms_last_updated?: string,
  privacy_url?: string,
  privacy_last_updated?: string,
  rental_apps?: {
    [key: string]: {
      discovery_uri: string,
      store_uri: string,
    }
  },
  brand_assets?: {
    [key: string]: string
  }
}

export type SystemInformationResponse = GbfsResponse<SystemInformation>
