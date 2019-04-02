'use strict';

var GoogleMapsClientService = require('@google/maps').createClient({
  key: process.env.GOOGLE_API_KEY,
  Promise: Promise,
});

GoogleMapsClientService.name = 'GoogleMapsClientService';

module.exports = GoogleMapsClientService;
