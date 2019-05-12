'use strict';

var { Trip, Driver, User } = require('../models');

const PAGE_SIZE = 10;

var TripService = {};

TripService.name = 'TripService';

TripService.create = async(tripData) => {
  delete tripData.id;
  delete tripData.status;
  delete tripData.driverId;
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

TripService.list = async(page = 0, options = {}) => {
  var trips = await Trip.findAll({
    offset: page * PAGE_SIZE,
    limit: PAGE_SIZE,
    include: [
      { model: Driver, as: 'driver', required: false },
    ],
  });
  console.log("trips JSON'd"); //DEBUG
  trips = trips.map( tripData => tripData.toJSON());
  console.log(trips); //DEBUG

  if (options.driverName){
    trips = await Promise.all(trips.map(
        async(tripData) => {
          var driverName = null;
          if (tripData.driver){
            driverName = await User.findByPk(tripData.driver.userId);
            driverName = driverName ? driverName.name : null;
          }
          tripData.driverName = driverName;
          return  tripData;
        }
    ));
  }
  if (options.clientName){
    trips = await Promise.all(trips.map(
      async(tripData) => {
        var clientName = null;
        if (tripData.clientId){
          clientName = await User.findByPk(tripData.clientId);
          clientName = clientName ? clientName.name : null;
        }
        tripData.clientName = clientName;
        return tripData;
      }
    ));
  }
  return trips;
};

module.exports = TripService;
