'use strict';

var { Sequelize, moment } = require('../config/dependencies');
var { Driver } = require('../models');

var DriverService = {};

DriverService.name = 'DriverService';

DriverService.create = async(driverData) => {
  delete driverData.id;
  var driver = await Driver.create(driverData);
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

DriverService.updateTripOffer = async(driverId, tripId, status) => {
  try {
    var driver = await Driver.findOne({ where: { id: driverId } });
    await driver.addTrip(tripId, { through: { status: status } });
  } catch (err) {
    console.error(err);
  }
};

// Region = { lat: { max, min }, lng: { max, min } }
DriverService.getInsideRegion = async(region, exclude = []) => {
  var results = await Driver.findAll({
    where: {
      id: {
        [Sequelize.Op.notIn]: exclude,
      },
      status: 'Disponible',
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
      updatedAt: {
        [Sequelize.Op.gt]: moment().subtract(1, 'minutes').format(),
      },
    },
    include: [{
      association: 'trips',
      attributes: ['id'],
      where: {
        status: {
          [Sequelize.Op.notIn]: ['Cancelado', 'Finalizado'],
        },
      },
      through: {
        where: {
          status: ['Pendiente', 'Aceptado'],
        },
        // attributes: [],
      },
      required: false,
    }],
  });

  results = results.filter((driver) => {
    console.log(driver);
    return !driver.trips || driver.trips.length === 0;
  });

  return results;
};

module.exports = DriverService;
