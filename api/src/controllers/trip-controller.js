'use strict';

var {
  TripService,
  SimulationService,
} = require('../services');

var TripController = {};

TripController.name = 'TripController';

TripController.create = async(req, res, next) => {
  try {
    req.body.clientId = req.user.id;

    // model won't allow null ids so it's fine
    var trip = await TripService.create(req.body);

    trip ? res.json(trip) : res.status(500).send();
  } catch (err) {
    next(err);
  }
};

TripController.createSimulated = async(req, res, next) => {
  try {
    req.body.clientId = req.user.id;
    var trip = await SimulationService.createSimulatedTrip(req.body);
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
