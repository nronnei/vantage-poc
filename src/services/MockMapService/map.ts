type SupportedEvents = Pick<HTMLElementEventMap, 'click' | 'mouseover'>
type SupportedEventHandler<K extends keyof SupportedEvents> = (evt: SupportedEvents[K]) => void;
type SupportedEventHash = {
  [K in keyof SupportedEvents]: SupportedEventHandler<K>[]
};

export class MockMap {

  private _map: HTMLElement;
  private _listeners: SupportedEventHash = {
    click: [],
    mouseover: [],
  }

  constructor(container: string | HTMLElement) {
    if (!container) throw TypeError('Must specify a container element or element id.');
    if (typeof container === 'string') this._map = document.getElementById(container) as HTMLElement;
    else this._map = container
  }

  on<K extends keyof SupportedEvents>(
    eventName: K,
    eventHandler: SupportedEventHandler<K>
  ): void {
    this._map.addEventListener(eventName, eventHandler);
    this._listeners[eventName].push(eventHandler);
  }

  off(eventName: keyof SupportedEvents): void {
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
