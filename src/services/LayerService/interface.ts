import { VLayer, NewVLayer } from '../../types/Layer';


export interface ILayerService {
  useAddLayer: () => (data: NewVLayer) => VLayer,
  useRemoveLayer: () => (data: VLayer["id"]) => void,
}
