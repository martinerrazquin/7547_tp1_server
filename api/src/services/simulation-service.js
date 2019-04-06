'use strict';

var DriverService = require('./driver-service');
var TripService = require('./trip-service');
var { geolocationUtils } = require('../config/dependencies');

var SimulationService = {};

SimulationService.name = 'SimulationService';

var sleep = (ms) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

SimulationService.startSimulation = async(trip, route) => {
  if (!route || !route.routes
    || !route.routes[0]
    || !route.routes[0].legs
    || !route.routes[0].legs[0]) {
    return;
  }

  var driver = await DriverService.getById(trip.driverId);
  var currentIndex = 0;
  var steps = route.routes[0].legs[0].steps;
  while (currentIndex < steps.length) {
    var headingDistance = geolocationUtils.headingDistanceTo(
      driver.currentLocation,
      steps[currentIndex].end_location
    );

    headingDistance.distance = Math.min(headingDistance.distance, 15);
    driver.currentLocation = geolocationUtils.moveTo(
      driver.currentLocation,
      headingDistance
    );

    if (geolocationUtils.isEqual(
      driver.currentLocation,
      steps[currentIndex].end_location,
      1e-12
    )) {
      currentIndex++;
    }

    driver = await DriverService.update(driver.id, driver);
    await sleep(1000);
  }
  trip.status = 'En origen';
  await TripService.update(trip.id, trip);
};

module.exports = SimulationService;
