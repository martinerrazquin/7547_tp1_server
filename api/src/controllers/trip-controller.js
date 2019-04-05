'use strict';

var { TripService, DriverService } = require('../services');

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
  // TODO: Check that the tripId's in data and params are the same.
  var trip = await TripService.update(req.params.tripId, req.body)
    .catch(err => next(err));
  res.json(trip);
};

TripController.getLocation = async(req, res, next) => {
  // TODO: agregar filtro de que no este terminado el viaje?
  var trip = await TripService.getById(req.params.tripId)
    .catch(err => next(err));
  if (!trip) {
    res.status(404).send();
  } else {
    var resp = {};
    resp.status = trip.status;
    resp.currentLocation = {};
    if (trip.status === 'Buscando'){ // buscando chofer
      resp.currentLocation.lat = 0;
      resp.currentLocation.lng = 0;
    } else {
      // chofer asignado
      var driver = await DriverService.getById(trip.driverId)
        .catch(err => next(err));
      if (!driver){
        // red flag: chofer no existente asignado
        res.status(500).send();
      } else {
        // chofer encontrado
        resp.currentLocation = driver.currentLocation;
        // resp.currentLocation.lng = driver.currentLocation.lng;
        // resp.currentLocation.lat = driver.currentLocation.lat;
      }
    }
    res.json(resp);
  }
};

TripController.testingJSONB = async(req, res, next) => {
  var region = {
    lat: { min: 16, max: 20 },
    lng: { min: 15, max: 20 },
  };
  var trip = await TripService.getByOriginRegion(region);
  if (trip) {
    res.json(trip);
  } else {
    res.status(404).send();
  }
};

module.exports = TripController;
