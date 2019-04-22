import React from 'react'
import PropTypes from 'prop-types'
import { Paper, TextField, List, ListItem, ListItemText, TableRow } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import L from 'leaflet'
import search from './nominatim'

const styles = theme => ({
  root: {
    position: 'fixed',
    top: 24,
    left: 12,
    bottom: 24,
    width: 300,
    zIndex: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  searchField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  list: {
    overflow: 'auto'
  }
})

class Spotlight extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      rows: []
    }
  }

  updateResultList(searchResult) {
    const rows = searchResult.map(row => ({
      key: row.place_id,
      name: row.display_name,
      type: row.type,
      box: row.boundingbox,
      lat: row.lat,
      lon: row.lon
    }))

    this.setState({ ...this.state, rows })
  }

  handleKeyPress(event) {
    const searchOptions = {
      // limit: 7,
      addressdetails: 0,
      namedetails: 0
    }

    switch(event.key) {
      case 'Enter':
        // TODO: supply search function with props.
        search(searchOptions)(event.target.value)
          .then(searchResult => this.updateResultList(searchResult))
        break
      default:
        break
    }
  }

  handleKeyDown(event) {
    switch(event.key) {
      case 'ArrowDown':
        // TODO: move focus from textfield to result list
        break
      default:
        break
    }
  }

  handleSelect(key) {
    this.state.rows
      .filter(row => row.key === key)
      .forEach(row => this.props.onMoveTo(L.latLng(row.lat, row.lon)))
  }

  handleNavigation(event) {
    switch(event.key) {
      case 'ArrowUp':
        // TODO: move focus to previous item
        break
      case 'ArrowDown':
        // TODO: move focus to next item
        break
      case 'Enter':
        break
      default:
        break
    }
  }

  render() {
    const { classes } = this.props
    const { rows } = this.state

    // TODO: explicitly apply focus state upon ArrayUp/Down:
    // https://github.com/mui-org/material-ui/issues/1670
    // https://reactjs.org/docs/refs-and-the-dom.html

    const items = () => (rows || []).map(row => (
      <ListItem
        button
        divider
        key={ row.key }
        ref={ this.refs[row.key] }
        onClick={ () => this.handleSelect(row.key) }
      >
        <ListItemText
          primary={row.name}
          secondary={row.type}
        />
      </ListItem>
    ))

    return (
      <Paper
        className={classes.root}
        elevation={8}
      >
        <TextField
          id="search"
          label="Search place or address"
          type="search"
          className={classes.searchField}
          margin="normal"
          variant="outlined"
          onKeyPress={ event => this.handleKeyPress(event) }
          onKeyDown={ event => this.handleKeyDown(event) }
        />
        <List
          className={ classes.list }
          onKeyDown={ event => this.handleNavigation(event) }
        >
          { items() }
        </List>
      </Paper>
    )
  }
}

Spotlight.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Spotlight)