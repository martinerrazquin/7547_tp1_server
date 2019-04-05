'use strict';

var { Sequelize } = require('../config/dependencies');
var { Driver } = require('../models');

var DriverService = {};

DriverService.name = 'DriverService';

DriverService.getById = async(driverId) => {
  return await Driver.findByPk(driverId);
};

// TODO: this will be later used to get drivers close
// to where a trip is requested.
// Region = { lat: { max, min }, lng: { max, min } }
DriverService.getInsideRegion = async(region) => {
  var results = await Driver.findAll({
    where: {
      currentLocation: {
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

  return results;
};

module.exports = DriverService;
