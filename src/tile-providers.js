export default [
  {
    "id": "OpenStreetMap.Mapnik",
    "name": "OpenStreetMap",
    "url": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    "maxZoom": 19,
    "attribution": "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
  },
  {
    "id": "OpenTopoMap",
    "name": "OpenTopoMap",
    "url": "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    "maxZoom": 17,
    "attribution": "Map data: &copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors, <a href=\"http://viewfinderpanoramas.org\">SRTM</a> | Map style: &copy; <a href=\"https://opentopomap.org\">OpenTopoMap</a> (<a href=\"https://creativecommons.org/licenses/by-sa/3.0/\">CC-BY-SA</a>)"
  },
  {
    "id": "OpenMapSurfer.Roads",
    "name": "OpenMapSurfer",
    "url": "https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png",
    "maxZoom": 19,
    "attribution": "Imagery from <a href=\"http://giscience.uni-hd.de/\">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
  },
  {
    "id": "Stamen.Toner",
    "name": "Stamen (Toner)",
    "url": "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png",
    "subdomains": "abcd",
    "minZoom": 0,
    "maxZoom": 20,
    "attribution": "Map tiles by <a href=\"http://stamen.com\">Stamen Design</a>, <a href=\"http://creativecommons.org/licenses/by/3.0\">CC BY 3.0</a> &mdash; Map data &copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
  },
  {
    "id": "Stamen.Terrain",
    "name": "Stamen (Terrain)",
    "url": "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png",
    "subdomains": "abcd",
    "minZoom": 0,
    "maxZoom": 18,
    "attribution": "Map tiles by <a href=\"http://stamen.com\">Stamen Design</a>, <a href=\"http://creativecommons.org/licenses/by/3.0\">CC BY 3.0</a> &mdash; Map data &copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
  },
  {
    "id": "Basemap.AT",
    "name": "Basemap (AT)",
    "url": "https://maps{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png",
    "subdomains": ["", "1", "2", "3", "4"],
    "maxZoom": 19,
    "bounds": [[46.35877, 8.782379], [49.037872, 17.189532]],
    "attribution": "Datenquelle: <a href=\"https://www.basemap.at\">basemap.at</a>"
  },
  {
    "id": "Basemap.AT_grau",
    "name": "Basemap (AT/grau)",
    "url": "https://maps{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png",
    "subdomains": ["", "1", "2", "3", "4"],
    "maxZoom": 19,
    "bounds": [[46.35877, 8.782379], [49.037872, 17.189532]],
    "attribution": "Datenquelle: <a href=\"https://www.basemap.at\">basemap.at</a>"
  },
  {
    "id": "Basemap.AT_orthofoto",
    "name": "Basemap (AT/Orthofoto)",
    "url": "https://maps{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg",
    "subdomains": ["", "1", "2", "3", "4"],
    "maxZoom": 20,
    "bounds": [[46.35877, 8.782379], [49.037872, 17.189532]],
    "attribution": "Datenquelle: <a href=\"https://www.basemap.at\">basemap.at</a>"
  },
  {
    "id": "Wikimedia",
    "name": "Wikimedia",
    "url": "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png",
    "minZoom": 1,
    "maxZoom": 19,
    "attribution": "<a href=\"https://wikimediafoundation.org/wiki/Maps_Terms_of_Use\">Wikimedia</a>"
  }
]