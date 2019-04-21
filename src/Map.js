import React from 'react'
import L from 'leaflet'


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
  }

  componentDidMount() {
    this.map = L.map(this.props.id, this.props.options)
    this.setTileProvider(this.props.tileProvider)
    Object.entries(this.props.callbacks || {})
      .forEach(([name, callback]) => this.map.on(name, callback))
  }

  componentDidUpdate(props) {
    this.setTileProvider(props.tileProvider)

    // Special handling of section outline (overview map):
    if(this.outline) {
      if(this.props.section && this.props.section.bounds) {
        this.outline.setBounds(this.props.section.bounds)
      }
      else {
        this.map.removeLayer(this.outline)
        delete this.outline
      }
    }
    else {
      if(this.props.section && this.props.section.bounds) {
        this.outline = L.rectangle(this.props.section.bounds, {})
        this.outline.addTo(this.map)
      }
    }
  }

  render() {
    return <div id={this.props.id} className={this.props.className}></div>
  }
}

export default Map