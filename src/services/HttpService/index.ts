import { HTTPClientOptions, IHttpClient } from '../../interfaces/IHttpClient';
import { ILogger } from '../../interfaces/ILogger';
import logger from '../ConsoleLogger';

const LOG_TAG = 'FetchHTTPService::'

export function logTag(method: string) {
  return `${LOG_TAG}${method}:`
}

export class FetchHttpService implements IHttpClient {
  readonly baseUrl?: string;
  readonly logger: ILogger;
  headers: Record<string, string>;
  private pending: Map<string, Promise<any>> = new Map();

  constructor(opts: HTTPClientOptions) {
    this.baseUrl = opts.baseUrl;
    this.headers = opts.headers ?? {};
    this.logger = opts.logger || logger;
  }

  private buildUrl(endpoint: string) {
    const filtered = [this.baseUrl, endpoint]
      .filter(part => !!part)
      .join('/');
    if (!/^https?\:\/\//.test(filtered)) {
      throw new Error(`Invalid URL: ${filtered}`);
    }
    return filtered;
  }

  async get<T>(endpoint: string, opts: Record<string, any> = {}): Promise<T> {

    const url = this.buildUrl(endpoint);

    if (this.pending.has(url)) {
      this.logger.info(`${logTag('get')} Request already in progress for ${url}`);
      return this.pending.get(url);
    }

    this.logger.info(`${logTag('get')} Fetching ${url}`);
    const req = fetch(url, { headers: { ...opts.headers ?? {}, ...this.headers } });

    this.pending.set(url, req);
    const res = await req;
    this.logger.info(`${logTag('get')} Response`, res);
    return res.json();
  }
}
