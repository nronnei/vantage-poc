import { IGbfsClient } from '../interfaces/IGbfsClient'
import { ILogger } from '../interfaces/ILogger'

export type CreateGbfsRepoDeps = {
  logger: ILogger,
  client: IGbfsClient,
}
