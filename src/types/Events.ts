import { SRID } from "./SRS";

/**
 * The custom events we need to support on MapService implementations.
 */
export type MapServiceEventType = 'movestart'
  | 'moveend'
  | 'click'
  | 'mouseover'
  | 'hover';

/**
 * The coordinates defining a point on the map.
 */
export type MapServicePoint = { lng: number, lat: number }

/**
 * Defines a map viewpoint using a center point and a scale.
 */
export type MapServiceViewpoint = {
  center: MapServicePoint,
  scale: number,
  srid?: SRID
}


export type MapServiceEvent = {
  type: MapServiceEventType,
  libEvent: object,
}

export type MapServiceEventHandler = (event: MapServiceEvent) => void

export interface MoveStartEvent extends MapServiceEvent, MapServicePoint {
  type: 'movestart',
}

export interface MoveEndEvent extends MapServiceEvent, MapServicePoint {
  type: 'moveend',
}

export interface ClickEvent extends MapServiceEvent, MapServicePoint {
  type: 'click',
}

export interface MouseOverEvent extends MapServiceEvent, MapServicePoint {
  type: 'mouseover',
}

export interface HoverEvent extends MapServiceEvent, MapServicePoint {
  type: 'hover',
}
