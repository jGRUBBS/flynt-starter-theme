/* globals google */

import $ from 'jquery'
import 'file-loader?name=vendor/jquery-throttle-debounce.js!jquery-throttle-debounce/jquery.ba-throttle-debounce'
import * as MapsHelper from './helper'

/* You can use https://mapstyle.withgoogle.com/ to style your map for your needs */
import mapStyles from './json/mapstyles.json'

/* Check the MapOptions object specification at https://developers.google.com/maps/documentation/javascript/reference */
import mapSettings from './json/mapsettings.json'

/* Check the Marker docs at https://developers.google.com/maps/documentation/javascript/markers */
import markerSettings from './json/markersettings.json'

class MapGoogle extends window.HTMLDivElement {
  constructor (self) {
    self = super(self)
    self.$ = $(self)
    self.resolveElements()
    return self
  }

  resolveElements () {
    this.$wrapper = $('.map-wrapper', this)
  }

  connectedCallback () {
    this.location = MapsHelper.getLocationFromContainer(this.$wrapper)
    this.infoContent = JSON.parse(this.$wrapper.data('content'))

    this.initMap()
    $(window).on('resize', $.debounce(250, this.redrawMap))
  }

  initMap () {
    this.initGoogleMap()
    this.initGoogleMarker()
    this.initInfoWindow()

    this.infoWindow.open(this.map, this.marker)
  }

  redrawMap = () => {
    MapsHelper.resetMap(this.location, this.map)
  }

  initGoogleMap () {
    this.gmapSettings = MapsHelper.assignMapsSettings(this.location, mapSettings, mapStyles)
    this.map = new google.maps.Map(this.$wrapper.get(0), this.gmapSettings)
  }

  initGoogleMarker () {
    this.markerSettings = MapsHelper.assignMarkerSettings(this.location, markerSettings, this.map)
    this.marker = new google.maps.Marker(this.markerSettings)
  }

  initInfoWindow () {
    this.infoWindow = MapsHelper.addInfoWindow(this.infoContent, this.marker, this.map)
  }
}

window.customElements.define('flynt-map-google', MapGoogle, {extends: 'div'})
