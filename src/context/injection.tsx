import React, { createContext, useContext } from 'react';
import { IGbfsClient } from '../interfaces/IGbfsClient';
import { IHttpClient } from '../interfaces/IHttpClient';
import { ILogger } from '../interfaces/ILogger';
import { createSystemServiceHooks, IGbfsSystemRepo } from '../repositories/systems';
import { FetchGbfsClient } from '../services/GbfsClient';
import { FetchHttpService } from '../services/HttpService';
import logger from '../services/ConsoleLogger';
import { createSystemsState } from '../repositories/systems/recoil-state';
import { LeafletMapService } from '../services/LeafletMapService';
import { IMapService } from '../interfaces/IMapService';

export type ServiceDeps = {
  gbfsClient: IGbfsClient,
  systemService: ReturnType<typeof createSystemServiceHooks>
  stationService: ReturnType<typeof createSystemServiceHooks>
  logger: ILogger,
  httpClient: IHttpClient,
  mapService: IMapService
}

// Injectaroo :-D
const httpClient = new FetchHttpService({ logger });
const mapService = new LeafletMapService();
const gbfsClient = new FetchGbfsClient({ logger, client: httpClient, language: 'en' });
const repoOpts = { logger, client: gbfsClient };
const systemService = createSystemServiceHooks({ ...repoOpts, state: createSystemsState(repoOpts) });
const stationService = createSystemServiceHooks({ ...repoOpts, state: createSystemsState(repoOpts) });
const injections: ServiceDeps = {
  logger,
  httpClient,
  gbfsClient,
  systemService,
  stationService,
  mapService,
}

const InjectionContext = createContext({} as ServiceDeps);

export function useInjection(): ServiceDeps {
  return useContext(InjectionContext);
}

export function InjectionProvider({ children }: React.PropsWithChildren) {
  return (
    <InjectionContext.Provider value={injections}>
      {children}
    </InjectionContext.Provider>
  )
}
