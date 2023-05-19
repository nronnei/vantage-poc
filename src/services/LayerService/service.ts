import Layer from '@arcgis/core/layers/Layer';
import { ILogger } from '../../interfaces/ILogger'
import { IMapService } from '../../interfaces/IMapService'
import { ILayerRepo } from '../../repositories/layers';
import { NewVLayer, VLayer } from '../../types';
import { ILayerService } from './interface';

export type LayerServiceDeps = {
  logger: ILogger,
  map: IMapService,
  repo: ILayerRepo,
}

const logTag = (fnName: string) => `LayerService::${fnName}:`

export function createLayerService({ logger, map, repo }: LayerServiceDeps) {

  const controller: ILayerService = {
    useAddLayer: () => {
      const createLayer = repo.useCreateLayer();

      return (data: NewVLayer): VLayer => {
        const fnTag = logTag('addLayer');
        logger.info(`${fnTag} Creating new layer...`)
        const layer = createLayer(data);
        logger.info(`${fnTag} Adding layer to map...`)
        map.addLayer(layer);
        logger.info(`${fnTag} Layer created.`)
        return layer;
      };
    },
    useRemoveLayer: () => {
      const removeLayer = repo.useRemoveLayer();

      return (layerId: string | number): void => {
        const fnTag = logTag('removeLayer');
        logger.info(`${fnTag} Removing layer ${layerId}...`);
        removeLayer(layerId);
        map.removeLayer(layerId);
        logger.info(`${fnTag} Layer ${layerId} removed.`);
      }
    },
  };

  return controller;
}
