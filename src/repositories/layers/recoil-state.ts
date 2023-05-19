import { pick } from 'lodash';
import { atom, atomFamily, DefaultValue, selectorFamily, SerializableParam } from 'recoil';
import { NotFoundError } from '../../errors';
import { VLayer, VLayerConfig } from '../../types';

const LAYER_CONFIG_KEYS = [
  'name',
  'opacity',
  'visible',
  'attribution'
];

export function createLayerState() {
  const layers = atomFamily<VLayer | null, VLayer["id"]>({
    key: 'layers',
    default: (id: VLayer["id"]) => null
  });

  const layerConfigs = selectorFamily<VLayerConfig, VLayer["id"]>({
    key: 'layerConfigs',
    get: (id: VLayer["id"]) => ({ get }) => {
      const layer = get(layers(id));
      if (layer === null) throw new NotFoundError(`Layer "${id}" not found`);
      return pick(layer, LAYER_CONFIG_KEYS) as VLayerConfig;
    },
    set: (id: VLayer["id"]) => ({ get, set }, config) => {
      if (config instanceof DefaultValue) return;
      const layer = get(layers(id));
      if (layer === null) throw new NotFoundError(`Layer "${id}" not found`);
      set(layers(id), { ...structuredClone(layer), ...config });
    },
  });

  const layersIdx = atom({
    key: "layersIdx",
    default: [],
  });

  return { layers, layerConfigs, layersIdx };
}
