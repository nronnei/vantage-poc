import { GbfsClientOptions, IGbfsClient, SystemFeedRequest } from '../../interfaces/IGbfsClient';
import { IHttpClient } from '../../interfaces/IHttpClient';
import { AutoDisoveryResponse, StationInformationResponse, StationStatusResponse, System, SystemInformationResponse, VehicleTypesResponse } from '../../types';
import systemData from '../../data/systems.json';
import { ILogger } from '../../interfaces/ILogger';

type FeedResponseMap = {
  auto_disovery_feed: AutoDisoveryResponse,
  system_information: SystemInformationResponse,
  vehicle_types: VehicleTypesResponse,
  station_information: StationInformationResponse,
  station_status: StationStatusResponse,
  // free_bike_status: GbfsResponse<{ bikes: Record<string, any>[] }>,
  // system_hours: SystemHoursResponse,
  // system_regions: SystemRegionsResponse,
  // system_pricing_plans: SystemPricingPlansResponse
}

const LOG_TAG = 'GbfsService::'
export function logTag(method: string) {
  return `${LOG_TAG}${method}:`
}

export class GbfsService implements IGbfsClient {
  private readonly client: IHttpClient;
  private readonly logger: ILogger;
  private system?: System;
  private _cache = new Map<keyof FeedResponseMap, FeedResponseMap[keyof FeedResponseMap]>();
  language: string = 'en';

  constructor(opts: GbfsClientOptions) {
    // Clear the baseUrl if one is set. We want to make sure we only use the feed endpoints.
    opts.client.baseUrl = undefined;
    this.client = opts.client;
    this.logger = opts.logger;
    this.system = opts.system;
    if (opts.language) this.language = opts.language;
  }

  public static getSystems() {
    return Promise.resolve(systemData as System[]);
  };

  private _getCachedFeed<F extends keyof FeedResponseMap>(feedName: F) {
    const cached = this._cache.get(feedName);
    // If we have something in the cache
    if (cached !== undefined) {
      // And that something is up to date
      const { last_updated, ttl } = cached;
      if (ttl === 0 || ((last_updated + ttl) > last_updated))
        // Return that
        return cached as FeedResponseMap[F];
    }
    // Otherwise, implicityly return undefined
  }

  private _setCachedFeed<F extends keyof FeedResponseMap>(key: F, res: FeedResponseMap[F]) {
    // Later, we may use this as a way to manage auto-updates to certain feeds.
    this._cache.set(key, res);
  }

  private async _getFeed<F extends keyof FeedResponseMap>(feedName: F): Promise<FeedResponseMap[F]> {
    if (!this.system) {
      throw new Error('No system set');
    }
    // First, make sure we've actually loaded all the system's feeds.
    if (!this._cache.has('auto_disovery_feed')) {
      await this._retrieveAndCache('auto_disovery_feed', this.system.auto_discovery_url);
    }

    // Try to hit the cache first
    const cached = this._getCachedFeed(feedName);
    if (cached) return cached as FeedResponseMap[F];

    // If there's nothing in the cache, it's time to make a request. Get the endpoint.
    const feeds = await this.getSystemFeeds();

    // Make sure the system has data for that feed in that language
    const targetFeed = feeds.find(f => f.name === feedName);
    if (!targetFeed) {
      throw new Error(`${logTag('getFeed')} No "${feedName}" feed found.`);
    }

    // Make the request and cache the result
    return this._retrieveAndCache(feedName, targetFeed.url)
  }

  private async _retrieveAndCache<F extends keyof FeedResponseMap>(feedName: F, endpoint: string) {
    this.logger.info(`${logTag('retrieveAndCache')} Requesting ${feedName} at ${endpoint}`);
    const res = await this.client.get<FeedResponseMap[F]>(endpoint);
    this._setCachedFeed(feedName, res);
    return res as FeedResponseMap[F];
  }

  setSystem(system: System) {
    if (system.system_id === this.system?.system_id) return;
    this.system = system;
    this._cache.clear();
  }

  getSystem() {
    if (!this.system) throw new Error('No system set');
    return this.system;
  }

  async getAutoDiscovery() {
    return await this._getFeed('auto_disovery_feed');
  }

  async getSystemFeeds() {
    const feeds = await this.getAutoDiscovery();
    // Now make sure we can handle the language
    const target = feeds.data[this.language];
    if (!target) {
      throw new Error(`${logTag('getSystemFeeds')} No feeds found for language "${this.language}".`)
    }
    return target.feeds;
  }

  getSystemInformation() {
    return this._getFeed('system_information');
  }

  getStationInformation() {
    return this._getFeed('station_information');
  }

  getStationStatus() {
    return this._getFeed('station_status');
  }

  getSystemVehicleTypes() {
    return this._getFeed('vehicle_types');
  };

  getSystemHours() {
    throw new Error('Not implemented');
  }

  getSystemPricing() {
    throw new Error('Not implemented');
  }

}
