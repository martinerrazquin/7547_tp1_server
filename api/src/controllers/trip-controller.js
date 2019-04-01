'use strict';

var { ErrorHandler } = require('../helpers/error-handler');
var { TripService } = require('../services');

var TripController = {};

TripController.name = 'TripController';

TripController.create = (req, res) => {
  TripService.create(req.body)
    .then((trip) => {
      res.json(trip);
    }).catch((err) => {
      err = ErrorHandler(err);
      res.status(err.status).json(err.json);
    });
};

TripController.retrieve = (req, res) => {
  TripService.getById(req.params.tripId)
    .then((trip) => {
      if (trip) {
        res.json(trip);
      } else {
        res.status(404).send();
      }
    }).catch((err) => {
      err = ErrorHandler(err);
      res.status(err.status).json(err.json);
    });
};

TripController.update = (req, res) => {
  TripService.update(req.params.tripId, req.body)
    .then((trip) => {
      res.json(trip);
    }).catch((err) => {
      err = ErrorHandler(err);
      res.status(err.status).json(err.json);
    });
};

module.exports = TripController;
