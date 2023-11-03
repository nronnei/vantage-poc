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

export namespace MapEvents {
  /**
   * Generic Map Service Event.
   * @param name The name/type of the event.
   * @param libEvent The event emitted by the Map Provider.
   */
  export type Event = {
    libEvent: Record<string, any>,
  };

  /**
   * Emitted when the map is clicked.
   */
  export interface Click extends Event {
    /**
     * The X Map coordinate of the click in the spatial reference used by the map.
     */
    lng: number,
    /**
     * The Y Map coordinate of the click in the spatial reference used by the map.
     */
    lat: number,
    /**
     * The X Container coordinate of the click in pixels.
     */
    x: number,
    /**
     * The Y Container coordinate of the click in pixels.
     */
    y: number
  }

  /**
   * Emitted when the map's extent begins or finishes changing.
   */
  export interface MoveEvent extends Event {
    /**
     * The center X Map coordinate at the time movement began in the spatial
     * reference used by the map.
     */
    lng: number,
    /**
     * The center Y Map coordinate at the time movement began in the spatial
     * reference used by the map.
     */
    lat: number,
  }

  /**
   * Emitted when the user begins or finishes dragging the map.
   */
  export interface DragEvent extends Event, Click {
    /**
     * Center coordinates of the map at the time the event was emitted.
     */
    center: {
      /**
       * The center X Map coordinate in the spatial reference used by the map.
       */
      lng: number,
      /**
       * The center Y Map coordinate in the spatial reference used by the map.
       */
      lat: number,
    }
  }

  /**
   * Maps event names to their constituent events following the pattern used by DOM types.
   * @see https://cgjennings.ca/articles/typescript-events/
   */
  export interface EventMap {
    'click': Click,
    'movestart': MoveEvent,
    'moveend': MoveEvent,
    'hover': MoveEvent,
    'dragstart': DragEvent,
    'dragend': DragEvent,
  }

  /**
   * Generic type for Map Service Event Handlers.
   */
  export type EventHandler<E extends keyof EventMap> = (event: EventMap[E]) => any;

  /**
   * Helper type for classes that implement the EventEmitter interface.
   */
  export type EventHandlerHash = {
    [E in keyof EventMap]: EventHandler<E>[]
  };

  export interface EventEmitter {
    emit<E extends keyof EventMap>(name: E, event: EventMap[E]): void;
    on<E extends keyof EventMap>(name: E, handler: EventHandler<E>): () => void;
    off<E extends keyof EventMap>(name: E): void;
  }
}
