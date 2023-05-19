import { SetterOrUpdater } from 'recoil';
import { NewVLayer, VLayer, VLayerConfig } from '../../types';

export interface ILayerRepo {
  useCreateLayer: () => (layer: NewVLayer) => VLayer,
  /**
   * Hook that returns a layer and a setter function for managing the layer
   * @param id ID of the target layer.
   * @returns
   */
  useLayerState: (id: VLayer["id"]) => [
    VLayer | null,
    SetterOrUpdater<VLayer | null>
  ],
  /**
   * Hook that generates a function for removing the target layer.
   * @param layerId ID of the target layer
   * @returns A function for removing the layer from the repo.
   */
  useRemoveLayer: () => (layerId: VLayer["id"]) => void,
  useConfigState: (layerId: VLayer["id"]) => [
    VLayerConfig,
    SetterOrUpdater<VLayerConfig>
  ]
  // setOpacity: (layerId: VLayer["id"], opacity: number) => void,
  // setVisible: (layerId: VLayer["id"], visible: boolean) => void,
}
