'use strict';

var { TripService, DriverService } = require('../services');

var TripController = {};

TripController.name = 'TripController';

TripController.create = async(req, res, next) => {
  try {
    var trip = await TripService.create(req.body);
    res.json(trip);
  } catch (err) {
    next(err);
  }
};

TripController.createSimulated = async(req, res, next) => {
  try {
    var trip = await TripService.create(req.body);
    var driver = await DriverService.createFake(trip.origin);
    trip.status = 'En camino';
    trip.driverId = driver.id;
    trip = await TripService.update(trip.id, trip.toJSON());
    res.json(trip);
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
    var trip = await TripService
      .update(req.params.tripId, req.body);
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
