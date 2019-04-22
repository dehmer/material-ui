import React from 'react'
import L from 'leaflet'


const noop = () => {}
const K = value => fn => { fn(value); return value }
const layers = map => {
  return K([])(layers => map.eachLayer(layer => layers.push(layer)))
}

class Map extends React.Component {

  setTileProvider(tileProvider) {
    if(!tileProvider) return

    layers(this.map)
      .filter(layer => layer instanceof L.TileLayer)
      .forEach(layer => this.map.removeLayer(layer))

    const tiles = L.tileLayer(tileProvider.url, tileProvider)
    tiles.addTo(this.map)

    ;(this.props.onBoundsUpdated || noop)(this.map.getBounds())
  }

  setOutline(section) {
    if(this.outline) {
      if(section) this.outline.setBounds(section)
      else {
        this.map.removeLayer(this.outline)
        delete this.outline
      }
    }
    else {
      if(section) {
        this.outline = L.rectangle(section, {})
        this.outline.addTo(this.map)
      }
    }
  }

  componentDidMount() {
    this.map = L.map(this.props.id, this.props.options)
    this.setTileProvider(this.props.tileProvider)

    ;['move', 'zoom'].forEach(type => this.map.on(type, event => {
      ;(this.props.onBoundsUpdated || noop)(this.map.getBounds())
    }))
  }

  /**
   * Called after update with previous props and state and optional snapshot.
   * componentDidUpdate :: Props a, State b, Snapshot c => a -> b -> c -> ()
   */
  componentDidUpdate(prevProps) {
    // Only set new tile provider if it was changed to avoid unnecessary flicker.
    const { tileProvider } = this.props
    if(prevProps.tileProvider !== tileProvider) this.setTileProvider(tileProvider)

    // Special handling of section outline (overview map):
    const { section } = this.props
    if(!section || !section.equals(prevProps.section)) this.setOutline(section)
  }

  render() {
    return <div id={this.props.id} className={this.props.className}></div>
  }
}

export default Map