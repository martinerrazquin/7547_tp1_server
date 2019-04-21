'use strict';

var DriverService = require('./driver-service');
var TripService = require('./trip-service');
var MapsService = require('./maps-service');
var mapsHelper = require('../helpers/maps-helper');

var SimulationService = {};

SimulationService.name = 'SimulationService';

var sleep = (ms) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

SimulationService.createSimulatedDriver = async(nearLocation) => {
  return await DriverService.create({
    userId: null,
    currentLocation: mapsHelper.generateRandomPoint({
      lat: nearLocation.lat,
      lng: nearLocation.lng,
    }, 1500, 300),
    drivingRecordImage: "NONE",
    policyImage: "NONE",
    transportImage: "NONE", 
  });
};

SimulationService.createSimulatedTrip = async(tripData) => {
  var trip = await TripService.create(tripData);
  var driver = await SimulationService.createSimulatedDriver(trip.origin);
  trip.status = 'En camino';
  trip.driverId = driver.id;
  trip = await TripService.update(trip.id, trip);
  SimulationService.startSimulation(trip, driver);
  return trip;
};

SimulationService.startSimulation = async(trip, driver) => {
  var route = await MapsService.getDirections([
    driver.currentLocation,
    trip.origin,
  ]);

  if (!route || !route.routes
    || !route.routes[0]
    || !route.routes[0].legs
    || !route.routes[0].legs[0]) {
    console.error('ERROR: Couldn\'t find a route');
    return;
  }

  var currentIndex = 0;
  var steps = route.routes[0].legs[0].steps;
  while (currentIndex < steps.length) {
    var current = driver.currentLocation;
    var target = steps[currentIndex].end_location;

    driver.currentLocation = mapsHelper.moveTowards(current, target, 15);

    if (mapsHelper.isSimilar(current, target)) {
      currentIndex++;
    }

    driver = await DriverService.update(driver.id, driver);
    await sleep(1000);
  }
  trip.status = 'En origen';
  await TripService.update(trip.id, trip);
};

module.exports = SimulationService;
