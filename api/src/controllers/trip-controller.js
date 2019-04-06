'use strict';

var {
  TripService,
  DriverService,
  MapsService,
  SimulationService,
} = require('../services');

var TripController = {};

TripController.name = 'TripController';

TripController.create = async(req, res, next) => {
  try {
    var trip = await TripService.create(req.body);
    trip ? res.json(trip) : res.status(500).send();
  } catch (err) {
    next(err);
  }
};

TripController.createSimulated = async(req, res, next) => {
  try {
    var trip = await TripService.create(req.body);
    var driver = await DriverService.createFake(JSON.parse(trip.origin));
    trip.status = 'En camino';
    trip.driverId = driver.id;
    var route = await MapsService.getDirections([
        JSON.parse(driver.currentLocation),
        JSON.parse(trip.origin),
        JSON.parse(trip.destination),
    ]);
    SimulationService.startSimulation(driver, route);
    trip = await TripService.update(trip.id, trip);
    trip ? res.json(trip) : res.status(500).send();
  } catch (err) {
    next(err);
  }
};

TripController.retrieve = async(req, res, next) => {
  try {
    var trip = await TripService.getById(req.params.tripId);
    trip ? res.json(trip) : res.status(404).send();
  } catch (err) {
    next(err);
  }
};

TripController.update = async(req, res, next) => {
  // Check that the tripId's in data and params are the same.
  if (req.body.id && req.params.tripId !== req.body.id) {
    return res.status(400).json({
      status: 'error',
      type: 'updateIdMissmatch',
    });
  }

  try {
    var trip = await TripService.update(req.params.tripId, req.body);
    trip ? res.json(trip) : res.status(404).send();
  } catch (err) {
    next(err);
  }
};

TripController.getLocation = async(req, res, next) => {
  try {
    var locationData = await TripService.getLocationData(req.params.tripId);
    locationData ? res.json(locationData) : res.status(404).send();
  } catch (err) {
    next(err);
  }
};

module.exports = TripController;
