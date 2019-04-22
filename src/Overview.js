import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Map from './Map'

const styles = theme => ({
  root: {
    position: 'fixed',
    width: '200px',
    height: '200px',
    bottom: '24px',
    right: '12px',
    zIndex: 20
  },
})

const mapOptions = {
  zoomControl: false, // default: true
  center: L.latLng(48.65400545105681, 15.319061279296877),
  zoom: 10,
  attributionControl: false // default: true
}

const tileProvider = {
  id: 'OpenStreetMap.Mapnik',
  name: 'OpenStreetMap',
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}

function Overview(props) {
  const { classes } = props

  return (
      <Paper
        className={classes.root}
        elevation={8}
      >
        <Map
          id="overview-map"
          tileProvider={tileProvider}
          options={mapOptions}
          section={props.section}
        />
      </Paper>
  );
}

Overview.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Overview)