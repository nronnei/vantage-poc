import { MapEvents, MapServicePoint, MapServiceViewpoint } from "../types/Events";
import { VGeoJSONLayer, VLayer, VTileLayer } from "../types/Layer";

export interface IMapService extends MapEvents.EventEmitter {
  /**
   * Registers the global map object that the service will target.
   * @param container The ID of an element to use as the map container, or the element itself.
   * @returns void
   */
  setMap: (container: string | HTMLDivElement) => void

  /**
   * Adds a layer to the map.
   * @param layer Layer to add.
   * @returns void
   */
  addLayer: (layer: VLayer | VGeoJSONLayer | VTileLayer) => void

  /**
   * Adds multiple layers to the map.
   * @param layers Layers to add.
   * @returns void
   */
  addLayers: (layers: (VLayer | VGeoJSONLayer | VTileLayer)[]) => void

  /**
   * Removes a layer from the map.
   * @param layerId ID of the layer to remove.
   * @returns void
   */
  removeLayer: (layerId: VLayer["id"]) => void

  /**
   * Removes multiple layers in a single operation.
   * @param layerIds IDs of the layers to remove.
   * @returns void
   */
  removeLayers: (layerIds?: VLayer["id"][]) => void

  /**
   * Updates visibility for a layer.
   * @param partialLayer The target layer's ID and desired visibility value.
   * @returns void
   */
  setLayerVisibility: ({ id, visible }: Pick<VLayer, "visible" | "id">) => void

  /**
   * Updates opacity for a layer.
   * @param partialLayer The target layer's ID and desired opacity value.
   * @returns void
   */
  setLayerOpacity: ({ id, opacity }: Pick<VLayer, "opacity" | "id">) => void

  /**
   * Switch the map view to the supplied viewpoint
   * @param viewpoint The viewpoint to fly to.
   * @returns void
   */
  goTo: (viewpoint: MapServiceViewpoint | MapServicePoint) => void
}
