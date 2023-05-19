import { BBox, Feature, FeatureCollection, Point, Position } from 'geojson';
import { ArugmentError } from '../errors';
import { StationInformation } from '../types';

/**
 * Given an array of Point Geometries or Point Features, find its bounding box.
 * @param points Array of GeoJSON point geometries
 * @returns The bounding box of the supplied points.
 */
export function pointsToBoundingBox(points: (Point[] | Feature[])): BBox {
  // @ts-ignore TS doesn't like the array union, but we're safely checkikng types within.
  return points.reduce((bbox: BBox, point: Point | Feature): BBox => {
    let coords: Position;

    if (point.type === "Feature" && point.geometry.type === "Point") {
      coords = point.geometry.coordinates;
    } else if (point.type === "Point") {
      coords = point.coordinates;
    } else {
      throw new ArugmentError(`Found invalid geomeotry type "${point.type}".`)
    }

    const [lon, lat] = coords;
    if (lon > bbox[0]) bbox[0] = lon;
    if (lat < bbox[1]) bbox[1] = lat;
    if (lon < bbox[2]) bbox[2] = lon;
    if (lat > bbox[3]) bbox[3] = lat;

    return bbox;

  }, [0, 0, 0, 0] as BBox)
}

/**
 * Convert data from a station_information feed into GeoJSON features.
 * @param stations The station information to be converted.
 * @returns The GeoJSON feature representations of the stations.
 */
export function stationsToFeatures(stations: StationInformation[]): Feature[] {
  return stations.map(({ station_id, lat, lon, ...attributes }) => {
    return {
      type: "Feature",
      id: station_id,
      geometry: {
        type: "Point",
        coordinates: [lon, lat]
      },
      properties: { ...attributes }
    };
  })
}

/**
 * Convert data from a station_information feed into a GeoJSON FeatureCollection.
 * @param stations The station information to be converted.
 * @returns The GeoJSON FeatureCollection representation of the stations.
 */
export function stationsToFeatureCollection(stations: StationInformation[]): FeatureCollection {
  // Note: these two operations could be combined to optimize performance.
  const features = stationsToFeatures(stations);
  const bbox = pointsToBoundingBox(features);
  return {
    type: "FeatureCollection",
    bbox,
    features,
  }
}
