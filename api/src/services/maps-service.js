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

MapsService.googleMapsDistance = async(origin, destination) => {
  var route = await MapsService.getDirections([origin, destination]);

  if (!route || !route.routes
      || !route.routes[0]
      || !route.routes[0].legs
      || !route.routes[0].legs[0]) {
    var e = Error();
    e.name = 'NoRoutesFound';
    throw e;
  }
  var distanceInMeters = route.routes[0].legs[0].distance.value;

  var distanceInKm = distanceInMeters / 1000.0;

  return distanceInKm;
};

module.exports = MapsService;
