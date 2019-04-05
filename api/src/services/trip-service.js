'use strict';

var { Trip, Driver } = require('../models');

var TripService = {};

TripService.name = 'TripService';

TripService.create = async(tripData) => {
  delete tripData.id;
  delete tripData.status;
  delete tripData.driverId;
  return await Trip.create(tripData);
};

TripService.getById = async(tripId) => {
  return await Trip.findByPk(tripId);
};

TripService.update = async(tripId, tripData) => {
  var updated = await Trip.update(tripData, {
    returning: true,
    where: { id: tripId },
  });

  return updated.length > 1 && updated[1].length > 0 && updated[1][0];
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
    if (typeof trip.driver.currentLocation === 'string') {
      resp.currentLocation = JSON.parse(trip.driver.currentLocation);
    } else {
      resp.currentLocation = trip.driver.currentLocation;
    }

  }
  return resp;
};

module.exports = TripService;
