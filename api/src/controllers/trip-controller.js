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
  // TODO: agregar filtro de que no este terminado el viaje?
  try {
    var trip = await TripService.getById(req.params.tripId);
    if (!trip) {
      res.status(404).send();
    } else {
      var resp = {};
      resp.status = trip.status;
      resp.currentLocation = {};
      if (['Buscando', 'Finalizado'].includes(trip.status)){
        resp.currentLocation = null;
      } else {
        // chofer asignado
        var driver = await DriverService.getById(trip.driverId);
        if (!driver) {
          // red flag: chofer no existente asignado
          res.status(500).send();
        } else {
          // chofer encontrado
          resp.currentLocation = driver.currentLocation;
        }
      }
      res.json(resp);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = TripController;
