'use strict';

var { Sequelize } = require('../config/dependencies');
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
  var where = {};
  if (options.filters && options.filters.onlyCurrent) {
    where.status = [ 'Buscando', 'En camino', 'En origen',
      'En viaje', 'Llegamos'];
  }

  var include = {
    model: Driver,
    as: 'driver',
    required: false,
  };

  if (options.filters && options.filters.driverName) {
    include.required = true;
    include.include = [{
      model: User,
      as: 'userData',
      where: {
        name: 
{          [Sequelize.Op.iRegexp]: options.filters.driverName,
        },
      },
    }];
  }

  if (options.filters && options.filters.month) {
    where.createdAt = {
      [Sequelize.Op.gt]: options.filters.month.startOf('month').format(),
      [Sequelize.Op.lt]: options.filters.month.endOf('month').format(),
    };
  }

  var trips = await Trip.findAll({
    offset: page * PAGE_SIZE,
    limit: PAGE_SIZE,
    where: where,
    include: [include],
    order: [['createdAt', 'DESC']],
  });

  trips = trips.map(tripData => tripData.toJSON());
  if (options.driverName){
    trips = await Promise.all(trips.map(addDriverNameToTripData));
  }
  if (options.clientName){
    trips = await Promise.all(trips.map(addClientNameToTripData));
  }

  var tripCount = await Trip.count({
    where: where,
    include: [include],
  });

  where = Object.assign(where, { cost: { [Sequelize.Op.ne]: NaN } });
  var result = await Trip.findAll({
    where: where,
    attributes: [[Sequelize.fn('sum', Sequelize.col('cost')), 'totalMoney']],
    include: [include],
    raw: true,
  });

  return {
    pageContents: trips,
    total: tripCount,
    totalMoney: result.length === 1 ? result[0].totalMoney : 0,
  };
};

module.exports = TripService;
