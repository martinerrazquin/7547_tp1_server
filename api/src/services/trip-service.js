'use strict';

var { Trip, Driver, User } = require('../models');
var TripCostsService = require('./tripcosts-service');

const PAGE_SIZE = 10;

var TripService = {};

TripService.name = 'TripService';

TripService.create = async(tripData) => {
  delete tripData.id;
  delete tripData.status;
  delete tripData.driverId;
  if (tripData.reservationDate) {
    tripData.reservationDate = tripData.reservationDate + '-03:00';
  }

  // add cost
  tripData.cost = await TripCostsService.calculateCost(tripData);

  var trip = await Trip.create(tripData);
  return trip && trip.toJSON ? trip.toJSON() : trip;
};

TripService.getById = async(tripId, driverId = null) => {
  var query = {
    where: { id: tripId },
  };

  if (driverId) {
    query.include = [{
      association: 'drivers',
      where: {
        id: driverId,
      },
    }];
  }

  var trip = await Trip.findOne(query);
  return trip && trip.toJSON ? trip.toJSON() : trip;
};

TripService.update = async(tripId, tripData) => {
  var updated = await Trip.update(tripData, {
    returning: true,
    where: { id: tripId },
    validate: true,
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
  var pendingStatuses = ['Buscando', 'Finalizado', 'Reservado', 'Cancelado'];
  if (pendingStatuses.includes(trip.status)) {
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

const addDriverNameToTripData = async(tripData) => {
  try {
    var user = await User.findByPk(tripData.driver.userId);
    var name = user.name;
  } catch (e) {
    name = null;
  }
  tripData.driverName = name;
  return tripData;
};

const addClientNameToTripData = async(tripData) => {
  try {
    var user = await User.findByPk(tripData.clientId);
    var name = user.name;
  } catch (e) {
    name = null;
  }
  tripData.clientName = name;
  return tripData;
};

TripService.list = async(page = 0, options = {}) => {
  var trips = await Trip.findAll({
    offset: page * PAGE_SIZE,
    limit: PAGE_SIZE,
    include: [
      { model: Driver, as: 'driver', required: false },
    ],
  });
  trips = trips.map(tripData => tripData.toJSON());
  if (options.driverName){
    trips = await Promise.all(trips.map(addDriverNameToTripData));
  }
  if (options.clientName){
    trips = await Promise.all(trips.map(addClientNameToTripData));
  }
  var tripCount = await Trip.count();
  return { pageContents: trips, total: tripCount };
};

module.exports = TripService;
