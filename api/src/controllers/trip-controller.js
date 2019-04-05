'use strict';

var { TripService, DriverService } = require('../services');

var TripController = {};

TripController.name = 'TripController';

TripController.create = async(req, res, next) => {
  var trip = await TripService.create(req.body)
    .catch(next);
  trip && res.json(trip);
};

TripController.createSimulated = async(req, res, next) => {
  var trip = await TripService.create(req.body)
    .catch(next);
  if (trip) {
    var driver = await DriverService.createFake(trip.origin)
      .catch(next);
    if (driver) {
      trip.status = 'En camino';
      trip.driverId = driver.id;
      trip = await TripService.update(trip.id, trip.toJSON());
      trip && res.json(trip);
    }
  }
};

TripController.retrieve = async(req, res, next) => {
  var trip = await TripService.getById(req.params.tripId)
    .catch(next);
  trip ? res.json(trip) : res.status(404).send();
};

TripController.update = async(req, res, next) => {
  // Check that the tripId's in data and params are the same.
  if (req.body.id && req.params.tripId !== req.body.id) {
    return res.status(400).json({
      status: 'error',
      type: 'updateIdMissmatch',
    });
  }

  var trip = await TripService
    .update(req.params.tripId, req.body)
    .catch(next);
  trip && res.json(trip);
};

TripController.getLocation = async(req, res, next) => {
  // TODO: agregar filtro de que no este terminado el viaje?
  var trip = await TripService.getById(req.params.tripId)
    .catch(next);
  if (!trip) {
    res.status(404).send();
  } else {
    var resp = {};
    resp.status = trip.status;
    resp.currentLocation = {};
    if (['Buscando', 'Finalizado'].indexOf(trip.status) > -1){
      resp.currentLocation = null;
    } else {
      // chofer asignado
      var driver = await DriverService.getById(trip.driverId)
        .catch(next);
      if (!driver) {
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

module.exports = TripController;
