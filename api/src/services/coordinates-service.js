'use strict';

var googleMapsClient = require('./maps-service');


var CoordinatesService = {};

CoordinatesService.name = 'CoordinatesService';

CoordinatesService.get_coords = async(direction) => {

  var resp = {};

  var maps_r = await googleMapsClient.places({query: direction}).asPromise();
  if (maps_r.json.status === 'ZERO_RESULTS') {
    throw new Error('no results'); // FIXME
  }
  var first_result = maps_r.json.results[0];
  resp.formatted_address = first_result.formatted_address;
  resp.lng = first_result.geometry.location.lng;
  resp.lat = first_result.geometry.location.lat;

  return resp;
};


module.exports = CoordinatesService;
