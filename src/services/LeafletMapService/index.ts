// import "leaflet/dist/leaflet.css"
import L, {
  Map as LeafletMap,
  LeafletEvent,
  LeafletMouseEvent,
  Layer,
  TileLayer,
} from "leaflet";
import { MapServicePoint, MapServiceViewpoint, MapEvents } from "../../types/Events";
import { VGeoJSONLayer, VLayer } from "../../types/Layer";
import { IMapService } from "../../interfaces/IMapService";
import { LeafletTileLayer } from './types';


export class LeafletMapService implements IMapService {
  private _map!: LeafletMap;
  private _layerCache = new Map();
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
    // if (this._map) this._map.remove();
    this._map = L.map(container, {
      center: { lng: -85.572, lat: 44.707 },
      zoom: 8,
    });

    const baseLayerConfig: VTileLayer = {
      id: '__base',
      type: 'tile',
      name: 'Basemap',
      url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      visible: true,
      opacity: 1,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }

    this.addLayer(baseLayerConfig)

    const self = this;

    this._map.on('movestart', (evt: LeafletEvent) => {
      const { lat, lng } = self._map.getCenter();
      self.emit('movestart', { libEvent: evt, lng, lat })
    })

    this._map.on('moveend', (evt: LeafletEvent) => {
      const { lat, lng } = self._map.getCenter();
      self.emit('moveend', { libEvent: evt, lng, lat })
    })

    this._map.on('click', (evt: LeafletMouseEvent) => {
      const { lat, lng } = evt.latlng;
      self.emit('click', {
        libEvent: evt,
        lng,
        lat,
        x: evt.containerPoint.x,
        y: evt.containerPoint.y,
      })
    })
  };

  addLayer(layer: VLayer | VGeoJSONLayer | LeafletTileLayer) {
    try {
      if (this._layerCache.has(layer.id)) return;
      const leafletLayer = this.createLayer(layer);
      console.log('tlayer', leafletLayer)
      this._layerCache.set(layer.id, leafletLayer);
      leafletLayer.addTo(this._map);
    } catch (error) {
      console.error('[addLayer] Unknown Error:', error);
    }
  };

  addLayers(layers: (VLayer | VGeoJSONLayer | LeafletTileLayer)[]) {
    const addLayer = this.addLayer
    layers.forEach(addLayer);
  };

  removeLayer(layerId: string | number) {
    const targetLayer = this._layerCache.get(layerId);
    if (targetLayer) {
      targetLayer.remove();
      this._layerCache.delete(layerId);
    }
  };

  removeLayers(layerIds?: (string | number)[] | undefined) {
    if (layerIds === undefined) {
      return this._map.eachLayer(l => l.remove());
    } else {
      layerIds.forEach(this.removeLayer);
    }
  };

  /**
   * Delete a layer from the service's cache.
   * @param layerId ID of the layer to delete.
   */
  deleteLayer(layerId: string | number) {
    this.removeLayer(layerId);
    this._layerCache.delete(layerId);
  }

  setLayerOpacity({ id, opacity }: Pick<VLayer, "id" | "opacity">) {
    const leafletLayer = this._layerCache.get(id);
    if (!leafletLayer) throw ReferenceError(`Layer ${id} not found.`);
    leafletLayer.setOpacity(opacity);
  };

  setLayerVisibility({ id, visible }: Pick<VLayer, "id" | "visible">) {
    const leafletLayer = this._layerCache.get(id);
    if (!leafletLayer) throw ReferenceError(`Layer ${id} not found.`);
    const opacity = visible ? 1 : 0;
    this.setLayerOpacity({ id, opacity });
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

  emit<E extends keyof MapEvents.EventMap>(
    eventName: E,
    event: MapEvents.EventMap[E]
  ): void {
    this._listeners[eventName].forEach((handler) => handler(event));
  }

  private createLayer(layerConfig: LeafletTileLayer | VGeoJSONLayer) {
    const possibleError = ReferenceError(`Layer type "${layerConfig.type}" not supported.`);
    switch (layerConfig.type) {
      case 'tile':
        return this.createTileLayer(layerConfig);
      case 'geojson':
        return this.createGeoJSONLayer(layerConfig);
      default:
        throw possibleError;
    }
  }

  private createTileLayer(layerConfig: LeafletTileLayer) {
    try {
      const { url, attribution, minZoom, maxZoom } = layerConfig;
      const tLayer = L.tileLayer(url, { attribution, minZoom, maxZoom });
      return tLayer;
    } catch (error) {
      console.error('[createTileLayer]', error)
    }
  }

  private createGeoJSONLayer(layerConfig: VGeoJSONLayer) {
    try {
      return L.geoJSON(layerConfig.features, {
        pointToLayer: (point, latlng) => {
          return L.circleMarker(latlng);
        },
        style: { color: "#000", weight: 5 }
      });
    } catch (error) {
      console.error('[createGeoJSONLayer]', error)
    }
  }
}

export default new LeafletMapService();
