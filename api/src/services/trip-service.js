'use strict';

var { Trip } = require('../models');

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

  return updated[1].length > 0 && updated[1][0];
};

module.exports = TripService;
