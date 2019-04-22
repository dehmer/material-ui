import React from 'react'
import L from 'leaflet'
import Map from './Map'
import Overview from './Overview'
import Spotlight from './Spotlight'
import '../node_modules/leaflet/dist/leaflet.css'
import './App.css'
import tileProviders from './tile-providers'

const center = L.latLng(48.65400545105681, 15.319061279296877)

const mapOptions = {
  center,
  zoomControl: false, // default: true
  zoom: 13
}

class App extends React.Component {

  constructor(props) {
    super(props)
    this.tileProviderIndex = 0

    this.state = {
      center,

      // current primary map tile provider index (in tileProviders):
      tileProvider: tileProviders[this.tileProviderIndex],
    }
  }

  updateState(delta) {
    // CAUTION: setState() is asynchronous!
    // see: https://reactjs.org/docs/react-component.html#setstate
    this.setState({ ...this.state, ...delta })
  }

  componentDidMount() {
    if(this.props.cycleInterval) {
      // primary map: cycle through available tile providers:
      setInterval(() => {
        this.tileProviderIndex = (this.tileProviderIndex + 1) % tileProviders.length
        this.updateState({
          tileProvider: tileProviders[this.tileProviderIndex]
        })
      }, this.props.cycleInterval)
    }
  }

  handleBoundsUpdated(bounds) {
    if(bounds.equals(this.state.viewport)) return
    this.updateState({ viewport: bounds })
  }

  handleMoveTo(center) {
    this.updateState({ center })
  }

  render() {
    return (
      <div>
        <Spotlight
          onMoveTo={ center => this.handleMoveTo(center) }
        />
        <Overview
          section={ this.state.viewport }
        />
        <Map
          id="primary-map"
          tileProvider={ this.state.tileProvider }
          center={ this.state.center }
          options={ mapOptions }
          onBoundsUpdated={ bounds => this.handleBoundsUpdated(bounds) }
        />
      </div>
    )
  }
}

export default App
