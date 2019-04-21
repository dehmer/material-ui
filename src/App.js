import React from 'react'
import L from 'leaflet'
import Map from './Map'
import Overview from './Overview'
import '../node_modules/leaflet/dist/leaflet.css'
import './App.css'
import tileProviders from './tile-providers'

const mapOptions = {
  zoomControl: false, // default: true
  center: L.latLng(48.65400545105681, 15.319061279296877),
  zoom: 13
}

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

      // current primary map tile provider index (in tileProviders):
      tileProviderIndex: 0,
      tileProvider: tileProviders[0],

      // primary map: viewport (center/zoom):
      viewport: {
        center: L.latLng(48.65400545105681, 15.319061279296877),
        zoom: 13
      }
    }
  }

  componentDidMount() {
    // primary map: cycle through available tile providers:
    setInterval(() => {
      const index = (this.state.tileProviderIndex + 1) % tileProviders.length
      this.setState(Object.assign({}, this.state, {
        tileProviderIndex: index,
        tileProvider: tileProviders[index]
      }))
    }, 10000)
  }

  render() {
    const setViewport = event => {
      const { target } = event
      if(!target) return

      this.setState(Object.assign({}, this.state, {
        viewport: {
          center: target.getCenter(),
          zoom: target.getZoom(),
          bounds: target.getBounds()
        }
      }))
    }

    const mapCallbacks = {
      // zoomend: setViewport,
      // moveend: setViewport,
      zoom: setViewport,
      move: setViewport
    }

    return (
      <div>
        <Overview
          section={this.state.viewport}
        />
        <Map
          id="primary-map"
          tileProvider={this.state.tileProvider}
          options={mapOptions}
          callbacks={mapCallbacks}
        />
      </div>
    )
  }
}

export default App
