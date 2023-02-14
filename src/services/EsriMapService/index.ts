import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
// import SceneView from "@arcgis/core/views/SceneView";
import TileLayer from "@arcgis/core/layers/TileLayer"
import WFSLayer from "@arcgis/core/layers/WFSLayer"
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
import Layer from "@arcgis/core/layers/Layer"
import { IMapService } from "../../interfaces/IMapService";
import { VLayer, VGeoJSONLayer, VTileLayer } from "../../types/Layer";
import { EsriClickEvent, EsriDragEvent } from "../../types/EsriEvents";
import {
  ClickEvent,
  MapServiceEvent,
  MapServiceEventHandler,
  MapServiceEventType,
  MapServicePoint,
  MapServiceViewpoint,
  MoveEndEvent,
  MoveStartEvent
} from "../../types/Events";

let _map: Map;
let _mapView: MapView;
// let _sceneView: SceneView;

export class EsriMapService implements IMapService {

  private _layerIdMap: Record<string, string> = {};
  private _listeners: Record<MapServiceEventType, MapServiceEventHandler[]> = {
    click: [],
    movestart: [],
    moveend: [],
    mouseover: [],
    hover: [],
  };

  setMap(container: string | HTMLDivElement) {
    _map = new Map({ basemap: "topo-vector" });
    _mapView = new MapView({
      container,
      center: [-85.572, 44.707],
      zoom: 8,
      map: _map
    })

    const self = this;
    _mapView.on("drag", self.onDrag.bind(self));
    _mapView.on("click", self.onClick.bind(self));
  };

  addLayer(layer: VLayer | VGeoJSONLayer | VTileLayer) {
    try {
      const { id, name, opacity, type, visible } = layer
      const LayerTypeClass = this.getLayerClass(type);
      const esriLayer = new LayerTypeClass({
        title: name,
        opacity,
        visible
      });
      _map.add(esriLayer);
      this._layerIdMap[id] = esriLayer.id;
    } catch (error) {
      console.error('[addLayer] Unknown Error:', error);
    }
  };

  addLayers(layers: (VLayer | VGeoJSONLayer | VTileLayer)[]) {
    const addLayer = this.addLayer
    layers.forEach(addLayer);
  };

  removeLayer(layerId: string | number) {
    const esriId = this._layerIdMap[layerId];
    const layer = _map.findLayerById(esriId);
    _map.remove(layer);
  };

  removeLayers(layerIds?: (string | number)[] | undefined) {
    if (layerIds === undefined) {
      return _map.removeAll();
    } else {
      const removeLayer = this.removeLayer;
      layerIds.forEach(removeLayer);
    }
  };

  setLayerOpacity({ id, opacity }: Pick<VLayer, "id" | "opacity">) {
    const layer = _map.findLayerById(this._layerIdMap[id]);
    layer.opacity = opacity;
  };

  setLayerVisibility({ id, visible }: Pick<VLayer, "id" | "visible">) {
    const layer = _map.findLayerById(this._layerIdMap[id]);
    layer.visible = visible;
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
    if (!viewpoint) throw Error('[goTo] Missing required argument.');
    const { lng, lat } = viewpoint.center ?? viewpoint;
    const goToOpts = {
      center: [lng, lat]
    };
    if (viewpoint.scale) goToOpts.scale = viewpoint.scale;

    // This operation is async, but we don't care about waiting for it.
    _mapView.goTo(goToOpts);
  };

  private getLayerClass(type: string) {
    if (type === 'tile') return TileLayer;
    if (type === 'geojson') return GeoJSONLayer;
    if (type === 'wfs') return WFSLayer;
    return Layer;
  }

  private emit(eventName: MapServiceEventType, event: MoveStartEvent): void
  private emit(eventName: MapServiceEventType, event: MoveEndEvent): void
  private emit(eventName: MapServiceEventType, event: ClickEvent): void
  private emit(eventName: MapServiceEventType, event: MapServiceEvent): void {
    this._listeners[eventName].forEach((handler) => handler(event));
  }

  private onClick(event: EsriClickEvent) {
    this.emit("click", {
      type: "click",
      libEvent: event,
      lng: event.mapPoint.longitude,
      lat: event.mapPoint.latitude,
    })
  }

  private onDrag(event: EsriDragEvent) {
    switch (event.action) {
      case 'start':
        this.emit("movestart", {
          type: "movestart",
          libEvent: event,
          lng: event.x,
          lat: event.y,
        })
        break;
      case 'end':
        this.emit("moveend", {
          type: "moveend",
          libEvent: event,
          lng: event.x,
          lat: event.y,
        })
        break;
      default:
        break;
    }

  }

}

export default new EsriMapService();
