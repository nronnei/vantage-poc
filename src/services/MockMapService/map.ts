type SupportedEvents = Pick<HTMLElementEventMap, 'click' | 'mouseover'>

export class MockMap {

  private _map: HTMLElement;
  private _listeners: Record<keyof SupportedEvents, EventListener[]> = {
    click: [],
    mouseover: [],
  }

  constructor(container: string | HTMLElement) {
    if (!container) throw TypeError('Must specify a container element or element id.');
    if (typeof container === 'string') this._map = document.getElementById(container) as HTMLElement;
    else this._map = container
  }

  on(eventName: keyof SupportedEvents, eventHandler: EventListener): void {
    this._map.addEventListener(eventName, eventHandler);
    this._listeners[eventName].push(eventHandler);
  }

  off(eventName: 'click' | 'mouseover'): void {
    this._listeners[eventName].forEach(l => this._map.removeEventListener(eventName, l));
  }

  add(layer: any) {
    console.log('added', layer);
    return;
  }

  remove(layer: any) {
    console.log('removed', layer);
    return
  }

  moveItMoveIt(args: any) {
    console.log('movin\' it!', args);
    return;
  }
}
