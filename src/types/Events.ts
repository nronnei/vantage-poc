import { SRID } from "./SRS";

/**
 * The custom events we need to support on MapService implementations.
 */
export enum MapServiceEventType {
  MoveStart = 'movestart',
  MoveEnd = 'moveend',
  Click = 'click',
  MouseOver = 'mouseover',
  Hover = 'hover',
};

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
  type: MapServiceEventType.MoveStart,
}

export interface MoveEndEvent extends MapServiceEvent, MapServicePoint {
  type: MapServiceEventType.MoveEnd,
}

export interface ClickEvent extends MapServiceEvent, MapServicePoint {
  type: MapServiceEventType.Click,
}

export interface MouseOverEvent extends MapServiceEvent, MapServicePoint {
  type: MapServiceEventType.MouseOver,
}

export interface HoverEvent extends MapServiceEvent, MapServicePoint {
  type: MapServiceEventType.Hover,
}
