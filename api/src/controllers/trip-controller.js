'use strict';

var { TripService } = require('../services');

var TripController = {};

TripController.name = 'TripController';

TripController.create = async(req, res, next) => {
  var trip = await TripService.create(req.body)
    .catch(err => next(err));
  res.json(trip);
};

TripController.retrieve = async(req, res, next) => {
  var trip = await TripService.getById(req.params.tripId)
    .catch(err => next(err));
  if (trip) {
    res.json(trip);
  } else {
    res.status(404).send();
  }
};

TripController.update = async(req, res, next) => {
  var trip = await TripService.update(req.params.tripId, req.body)
    .catch(err => next(err));
  res.json(trip);
};

module.exports = TripController;
