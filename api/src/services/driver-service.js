'use strict';

var { Sequelize } = require('../config/dependencies');
var mapsHelper = require('../helpers/maps-helper');
var { Driver } = require('../models');

var DriverService = {};

DriverService.name = 'DriverService';

DriverService.createFake = async(nearLocation) => {
  var driver = await Driver.create({
    userId: null,
    // TODO: add random offset
    currentLocation: mapsHelper.generateRandomPoint({
      lat: nearLocation.lat,
      lng: nearLocation.lng,
    }, 1500),
  });
  return driver && driver.toJSON ? driver.toJSON() : driver;
};

DriverService.getById = async(driverId) => {
  var driver = await Driver.findByPk(driverId);
  return driver && driver.toJSON ? driver.toJSON() : driver;
};

DriverService.update = async(driverId, driverData) => {
  var updated = await Driver.update(driverData, {
    returning: true,
    where: { id: driverId },
  });

  if (updated.length === 1) {
    return null;
  } else {
    var driver = updated[1][0];
    return driver.toJSON ? driver.toJSON() : driver;
  }
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
