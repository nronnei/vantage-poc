import { VTileLayer } from '../../types'

export type LeafletTileLayer = VTileLayer & {
  subdomains?: string,
  minZoom?: number,
  maxZoom?: number,
  ext?: string,
}
