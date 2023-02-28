import { ILogger } from './ILogger'

export interface HTTPClientOptions {
  /**
   * The base URL to which the client will make requests.
   */
  baseUrl?: string

  /**
   * Headers which will be included with each request.
   */
  headers?: Record<string, string>

  /**
   * The logger for the service to use
   */
  logger: ILogger
}

export interface HttpClientConstructor {
  new: (opts: HTTPClientOptions) => IHttpClient
}

export interface IHttpClient extends HTTPClientOptions {

  /**
   * GETs the specified URL.
   * @param url The URL to GET.
   * @returns The JSON resopnse.
   */
  get: <T>(url: string) => Promise<T>

}
