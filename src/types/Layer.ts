import { Feature, FeatureCollection } from "geojson";

export type VLayer = {
  id: number | string,
  visible: boolean,
  opacity: number,
  name: string,
  type: 'tile' | 'geojson' | 'wfs',
  description?: string,
  attribution?: string,
}

export interface VTileLayer extends VLayer {
  type: 'tile',
  url: string
}

export interface VGeoJSONLayer extends VLayer {
  type: 'geojson',
  data: FeatureCollection | Feature[] | Feature,
}

