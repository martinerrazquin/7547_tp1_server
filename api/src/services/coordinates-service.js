'use strict';

var MapsService = require('../services/maps-service');

var CoordinatesService = {};

CoordinatesService.name = 'CoordinatesService';

CoordinatesService.getCoords = async(direction) => {
  var resp = {};

  var maps_r = await MapsService.places(direction);
  if (maps_r.json.status === 'ZERO_RESULTS') {
    var e = new Error();
    e.name = 'NoResultsFoundOnSearch';
    throw e;
  }
  var first_result = maps_r.json.results[0];
  resp.formatted_address = first_result.formatted_address;
  resp.lng = first_result.geometry.location.lng;
  resp.lat = first_result.geometry.location.lat;

  return resp;
};


module.exports = CoordinatesService;
