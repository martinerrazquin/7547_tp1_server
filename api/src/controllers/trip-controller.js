'use strict';

var { TripService } = require('../services');

var TripController = {};

TripController.name = 'TripController';

TripController.create = async(req, res) => {
  var trip = await TripService.create(req.body);
  res.json(trip);
};

TripController.retrieve = async(req, res) => {
  var trip = await TripService.getById(req.params.tripId);
  if (trip) {
    res.json(trip);
  } else {
    res.status(404).send();
  }
};

TripController.update = async(req, res) => {
  var trip = await TripService.update(req.params.tripId, req.body);
  res.json(trip);
};

module.exports = TripController;
