'use strict';

var { Trip, Driver } = require('../models');

var TripService = {};
TripService.name = 'TripService';

TripService.create = async(tripData) => {
  delete tripData.id;
  delete tripData.status;
  delete tripData.driverId;
  var trip = await Trip.create(tripData);
  return trip && trip.toJSON ? trip.toJSON() : trip;
};

TripService.getById = async(tripId) => {
  var trip = await Trip.findByPk(tripId);
  return trip && trip.toJSON ? trip.toJSON() : trip;
};

TripService.update = async(tripId, tripData) => {
  var updated = await Trip.update(tripData, {
    returning: true,
    where: { id: tripId },
  });

  if (updated.length === 1) {
    return null;
  } else {
    var trip = updated[1][0];
    return trip.toJSON ? trip.toJSON() : trip;
  }
};

TripService.getLocationData = async(tripId) => {
  var trip = await Trip.findByPk(tripId, {
    include: [
      { model: Driver, as: 'driver', required: false },
    ],
  });

  if (!trip) {
    return null;
  }

  var resp = {};
  resp.status = trip.status;
  resp.currentLocation = {};
  if (['Buscando', 'Finalizado'].includes(trip.status)) {
    resp.currentLocation = null;
  } else if (!trip.driver) {
    // red flag: chofer no existente asignado
    var e = new Error();
    e.name = 'tripMissingDriver';
    throw e;
  } else {
    // chofer encontrado
    resp.currentLocation = trip.driver.currentLocation;
  }
  return resp;
};

module.exports = TripService;
