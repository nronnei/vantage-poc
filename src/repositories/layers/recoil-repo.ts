import { useRecoilCallback, useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { NewVLayer, VLayer } from '../../types';
import { ILayerRepo } from './interface';
import { createLayerState } from './recoil-state';

export function createLayerRepo() {
  const state = createLayerState();

  // const useLayerRepo = (id: VLayer["id"]) => {
  //   const layerState = state.layers(id);
  //   const set = useSetRecoilState(layerState);
  //   const get = useRecoilValue(layerState);
  //   return {}; // Return controller this way instead?
  // }

  const controller: ILayerRepo = {
    useCreateLayer: () => useRecoilCallback(({ set }) => (layer: NewVLayer) => {
      if (!layer.id) layer.id = window.crypto.randomUUID();
      const layerState = state.layers(layer.id);
      set(layerState, layer as VLayer);
      return layer as VLayer;
    }),
    useLayerState: (id: VLayer["id"]) => useRecoilState(state.layers(id)),
    useRemoveLayer: () => useRecoilCallback(({ reset }) => {
      return (id: VLayer["id"]) => reset(state.layers(id));
    }),
    useConfigState: (layerId) => useRecoilState(state.layerConfigs(layerId)),
    // setOpacity: function (layerId: string, opacity: number): void {
    //   throw new Error('Function not implemented.');
    // },
    // setVisible: function (layerId: string, visible: boolean): void {
    //   throw new Error('Function not implemented.');
    // }
  };

  return controller;
}
