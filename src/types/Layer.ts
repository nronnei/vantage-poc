import { Feature, FeatureCollection } from 'geojson';

export type VLayerConfig = {
  id: number | string,
  name: string,
  opacity: number,
  visible: boolean,
  attribution?: string
};

export type VGeoJSONLayer = VLayerConfig & {
  type: "geojson",
  features: FeatureCollection | Feature[] | Feature
}

export type VTileLayer = VLayerConfig & {
  type: "tile",
  url: string,
}

export type VLayer = (VGeoJSONLayer | VTileLayer);

export type NewVLayer = Partial<VLayer>;
