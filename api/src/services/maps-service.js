'use strict';

var { googleMapsClientService } = require('../config/dependencies');

var MapsService = {};

MapsService.name = 'MapsService';

MapsService.places = async(direction) => {
  return await googleMapsClientService.places({
    query: direction,
  }).asPromise();
};

MapsService.getDirections = async(waypoints) => {
  // TODO: puede que querramos quedarnos solo parte de la info
  // que trae, pero por ahora nos quedamos con todo.
  var response = await googleMapsClientService.directions({
    origin: waypoints.shift(),
    destination: waypoints.pop(),
    waypoints: waypoints,
  }).asPromise();

  return response.json;
};

module.exports = MapsService;
