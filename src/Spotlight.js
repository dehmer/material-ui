import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
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
    backgroundColor: theme.palette.background.paper
  },
  searchField: {
    // TODO: align width with container (root)
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  list: {
    overflow: 'auto',
    flexGrow: 1,
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

    this.setState({...this.state, rows, focusIndex: -1})
  }

  handleKeyPress(event) {
    const searchOptions = {
      limit: 7,
      addressdetails: 1,
      namedetails: 0
    }

    switch(event.key) {
      case 'Enter':
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
        if(this.state.rows.length === 0) return
        this.setState({...this.state, focusIndex: 0})
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
    console.log('handleNavigation', event.key, this.state.focusIndex)
    switch(event.key) {
      case 'ArrowUp':
        this.setState({
          ...this.state,
          focusIndex: Math.max(0, this.state.focusIndex - 1)
        })
        break
      case 'ArrowDown':
        this.setState({
          ...this.state,
          focusIndex: Math.min(this.state.rows.length - 1, this.state.focusIndex + 1)
        })
        break
      case 'Enter':
        break
      default:
        break
    }
  }

  render() {
    const { classes } = this.props
    const { rows, focusIndex } = this.state

    // TODO: explicitly apply focus state upon ArrayUp/Down:
    // https://github.com/mui-org/material-ui/issues/1670

    const items = () => (rows || []).map((row, index) => (
      <ListItem
        button
        divider
        key={ row.key }
        onClick={ () => this.handleSelect(row.key) }
        onFocus={ () => console.log('focus', row.key )}
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
          id="standard-search"
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