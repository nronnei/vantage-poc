import {
  ClickEvent,
  HoverEvent,
  MapServiceEvent,
  MapServiceEventHandler,
  MapServiceEventType,
  MapServicePoint,
  MapServiceViewpoint
} from "../../types/Events";
import { VGeoJSONLayer, VLayer, VTileLayer } from "../../types/Layer";
import { IMapService } from "../IMapService";
import { MockMap } from "./map";


export class MockMapService implements IMapService {
  private _map!: MockMap;
  private _listeners: Record<MapServiceEventType, MapServiceEventHandler[]> = {
    click: [],
    movestart: [],
    moveend: [],
    mouseover: [],
    hover: [],
  };

  constructor() { }

  setMap(container: string | HTMLElement) {
    this._map = new MockMap(container);
    console.log(this._map);

    const self = this;
    this._map.on('mouseover', (evt) => {
      self.emit('hover', {
        type: 'hover',
        libEvent: evt,
        lng: evt.x,
        lat: evt.y
      })
    })
    this._map.on('click', (evt) => {
      self.emit('click', {
        type: 'hover',
        libEvent: evt,
        lng: evt.x,
        lat: evt.y
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

  on(eventName: MapServiceEventType, serviceEventHandler: MapServiceEventHandler) {
    this._listeners[eventName].push(serviceEventHandler);
    return () => {
      this._listeners[eventName] = this._listeners[eventName].filter((fn) => {
        return fn !== serviceEventHandler;
      })
    }
  };

  off(eventName: MapServiceEventType) {
    this._listeners[eventName] = [];
  };

  goTo(viewpoint: MapServiceViewpoint | MapServicePoint): void {
    this._map.moveItMoveIt(viewpoint);
  };

  emit(eventName: MapServiceEventType, event: HoverEvent): void
  emit(eventName: MapServiceEventType, event: ClickEvent): void
  emit(eventName: MapServiceEventType, event: MapServiceEvent): void {
    this._listeners[eventName].forEach((handler) => handler(event));
  }
}

export default new MockMapService();
