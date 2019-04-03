'use strict';

var { googleMapsClientService } = require('../config/dependencies');

var MapsService = {};

MapsService.name = 'MapsService';

MapsService.places = (direction) => {
  return googleMapsClientService.places({query: direction}).asPromise();
};

module.exports = MapsService;
