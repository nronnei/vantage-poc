import EsriMapPoint from "@arcgis/core/geometry/Point";

/**
 * @see https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#event-drag
 */
export type EsriDragEvent = {
  action: "start" | "added" | "update" | "removed" | "end",
  x: number,
  y: number,
  origin: {
    x: number,
    y: number,
  },
  button: 0 | 1 | 2,
  buttons: number,
  type: "drag",
  radius: number,
  angle: number,
  stopPropagation: Function,
  timestamp: number,
  native: MouseEvent
}

/**
 * @see https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html#event-click
 */
export type EsriClickEvent = {
  mapPoint: EsriMapPoint,
  x: number,
  y: number,
  button: 0 | 1 | 2,
  buttons: number,
  type: "click",
  stopPropagation: Function,
  timestamp: number,
  native: MouseEvent,
}