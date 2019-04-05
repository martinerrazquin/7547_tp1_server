'use strict';

var { Trip } = require('../models');
var { Sequelize } = require('../config/dependencies');

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

  return updated[1][0];
};

// Region = { lat: { max, min }, lng: { max, min } }
TripService.getByOriginRegion = async(region) => {
  var results = await Trip.findAll({
    where: {
      origin: {
        lat: {
          [Sequelize.Op.between]: [
            region.lat.min,
            region.lat.max,
          ],
        },
        lng: {
          [Sequelize.Op.between]: [
            region.lng.min,
            region.lng.max,
          ],
        },
      },
    },
  });

  return results && results;
};

module.exports = TripService;
