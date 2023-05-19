import React, { createContext, useContext } from 'react';
import { IGbfsClient } from '../interfaces/IGbfsClient';
import { IHttpClient } from '../interfaces/IHttpClient';
import { ILogger } from '../interfaces/ILogger';
import { FetchGbfsClient } from '../services/GbfsClient';
import { FetchHttpService } from '../services/HttpService';
import logger from '../services/ConsoleLogger';
import { LeafletMapService } from '../services/LeafletMapService';
import { IMapService } from '../interfaces/IMapService';
import { createSystemRepo, createStationRepoHooks, } from '../repositories';
import { createStationService, IStationService } from '../services/StationService';
import { createSystemService } from '../services/SystemService/service';
import { ISystemService } from '../services/SystemService/interface';
import { createLayerRepo } from '../repositories/layers';
import { createLayerService } from '../services/LayerService';

export type ServiceDeps = {
  systemService: ISystemService,
  stationService: IStationService,
  logger: ILogger,
  mapService: IMapService
}
const InjectionContext = createContext({} as ServiceDeps);

export function useInjection(): ServiceDeps {
  return useContext(InjectionContext);
}


// Injectaroo :-D
const httpClient = new FetchHttpService({ logger });
const mapService = new LeafletMapService();
const gbfsClient = new FetchGbfsClient({ logger, client: httpClient, language: 'en' });

// Init repos
const repoOpts = { logger, client: gbfsClient };
const systemRepo = createSystemRepo(repoOpts);
const stationRepo = createStationRepoHooks(repoOpts);
const layerRepo = createLayerRepo();

// Init services
const layerService = createLayerService({ logger, map: mapService, repo: layerRepo });
const systemService = createSystemService({ ...repoOpts, repo: systemRepo })
const stationService = createStationService({
  ...repoOpts,
  map: mapService,
  layerService,
  repo: stationRepo,
});

export function InjectionProvider({ children }: React.PropsWithChildren) {

  // Actually do the injection
  const injections: ServiceDeps = {
    logger,
    systemService,
    stationService,
    mapService,
  }

  return (
    <InjectionContext.Provider value={injections}>
      {children}
    </InjectionContext.Provider>
  )
}
