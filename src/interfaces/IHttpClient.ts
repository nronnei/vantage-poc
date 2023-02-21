export interface HttpClient {

  /**
   * GETs the specified URL.
   * @param url The URL to GET.
   * @returns The JSON resopnse.
   */
  get: (url: string) => JSON

}