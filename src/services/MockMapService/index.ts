import { MapServicePoint, MapServiceViewpoint, MapEvents } from "../../types/Events";
import { VGeoJSONLayer, VLayer, VTileLayer } from "../../types/Layer";
import { IMapService } from "../../interfaces/IMapService";
import { MockMap } from "./map";


export class MockMapService implements IMapService {
  private _map!: MockMap;
  private _listeners: MapEvents.EventHandlerHash = {
    click: [],
    movestart: [],
    moveend: [],
    hover: [],
    dragstart: [],
    dragend: []
  };

  constructor() { }

  setMap(container: string | HTMLElement) {
    this._map = new MockMap(container);
    console.log(this._map);

    const self = this;
    this._map.on('mouseover', (evt) => {
      self.emit('hover', {
        libEvent: evt,
        lng: evt.clientX,
        lat: evt.clientY,
      })
    })
    this._map.on('click', (evt) => {
      self.emit('click', {
        libEvent: evt,
        lng: evt.x,
        lat: evt.y,
        x: evt.x,
        y: evt.y,
      })
    })
  };

  addLayer(layer: VLayer | VGeoJSONLayer | VTileLayer) {
    try {
      this._map.add(layer);
    } catch (error) {
      console.error('[addLayer] Unknown Error:', error);
    }
  };

  addLayers(layers: (VLayer | VGeoJSONLayer | VTileLayer)[]) {
    const addLayer = this.addLayer
    layers.forEach(addLayer);
  };

  removeLayer(layerId: string | number) {
    this._map.remove(layerId);
  };

  removeLayers(layerIds?: (string | number)[] | undefined) {
    if (layerIds === undefined) {
      return this._map.remove('allll the layers!');
    } else {
      layerIds.forEach(this.removeLayer);
    }
  };

  setLayerOpacity({ id, opacity }: Pick<VLayer, "id" | "opacity">) {
    console.log('setLayerOpacity', id, opacity)
  };

  setLayerVisibility({ id, visible }: Pick<VLayer, "id" | "visible">) {
    console.log('setLayerVisibility', id, visible)
  };

  on<E extends keyof MapEvents.EventMap>(
    eventName: E,
    serviceEventHandler: MapEvents.EventHandler<E>
  ) {
    this._listeners[eventName].push(serviceEventHandler);
    return () => {
      const idx = this._listeners[eventName].findIndex(fn => fn === serviceEventHandler);
      this._listeners[eventName].splice(idx, 1);
    }
  };

  off(eventName: keyof MapEvents.EventMap) {
    this._listeners[eventName] = [];
  };

  goTo(viewpoint: MapServiceViewpoint | MapServicePoint): void {
    this._map.moveItMoveIt(viewpoint);
  };

  emit<E extends keyof MapEvents.EventMap>(
    eventName: E,
    event: MapEvents.EventMap[E]
  ): void {
    this._listeners[eventName].forEach((handler) => handler(event));
  }
}

export default new MockMapService();
