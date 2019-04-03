'use strict';


var googleMapsClientService = require('@google/maps').createClient({
  key: process.env.GOOGLE_API_KEY,
  Promise: Promise,
});

var MapsService = {};

MapsService.name = 'MapsService';

MapsService.places = (direction) => {
  return googleMapsClientService.places({query: direction}).asPromise();
};

module.exports = MapsService;
