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

DriverService.getById = async(driverId) => {
  var query = {
    where: { id: driverId },
  };

  query.include = [{
    association: 'userData',
  }];

  var driver = await Driver.findOne(query);
  return driver && driver.toJSON ? driver.toJSON() : driver;
};

DriverService.update = async(driverId, driverData) => {
  var updated = await Driver.update(driverData, {
    returning: true,
    where: { id: driverId },
  });

  if (updated.length === 1 || updated[1] === 0) {
    return null;
  } else {
    var driver = updated[1][0];
    driver = driver.toJSON ? driver.toJSON() : driver;
    delete driver.drivingRecordImage;
    delete driver.policyImage;
    delete driver.transportImage;
    return driver;
  }
};

DriverService.isAvailable = async(driverId) => {
  var driver = await Driver.findOne({
    where: {
      id: driverId,
      status: 'Disponible',
      enabledToDrive: true,
    },
    include: [{
      association: 'trips',
      attributes: [ 'id' ],
      where: {
        status: {
          [Sequelize.Op.notIn]: ['Cancelado', 'Finalizado', 'Reservado'],
        },
      },
      through: {
        where: {
          status: ['Pendiente', 'Aceptado'],
        },
      },
      required: false,
    }],
  });
  return driver.trips.length === 0;
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
      enabledToDrive: true,
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
          [Sequelize.Op.notIn]: ['Cancelado', 'Finalizado', 'Reservado'],
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
    return !driver.trips || driver.trips.length === 0;
  });

  return results;
};


DriverService.getSummaryForDriver = async(driverId) => {
  try {
    const minimumDate = moment()
      .subtract(1, 'months')
      .startOf('month')
      .format('YYYY-MM-DD');

    var rawQuery = 'SELECT "driverId",' +
        'TO_CHAR("createdAt", \'YYYY-MM\') as month,' +
        'count(id) as total_trips,' +
        'round(sum(cost)::NUMERIC, 2) as total_money\n' +
        'FROM "Trips"\n' +
        'WHERE status = \'Finalizado\'\n' +
        'AND "createdAt" >= \'' + minimumDate + '\'\n' +
        'AND "driverId"=' + driverId + '\n' +
        'GROUP BY ("driverId",month)\n' +
        'ORDER BY month DESC;';

    const results = await Driver.connectionInstance.query(rawQuery, {
      raw: true,
      type: Sequelize.QueryTypes.SELECT,
      logging: false,
    });
    return results;
  } catch (err) {
    console.error(err);
  }
};

DriverService.getSummariesForDrivers = async(driverIds) => {
  try {
    const minimumDate = moment()
      .subtract(1, 'months')
      .startOf('month')
      .format('YYYY-MM-DD');

    const driverIdsString = driverIds.join(', ');

    var rawQuery = 'SELECT "driverId",' +
            'TO_CHAR("createdAt", \'YYYY-MM\') as month,' +
            'count(id) as total_trips,' +
            'round(sum(cost)::NUMERIC, 2) as total_money\n' +
            'FROM "Trips"\n' +
            'WHERE status = \'Finalizado\'\n' +
            'AND "createdAt" >= \'' + minimumDate + '\'\n' +
            'AND "driverId" IN (' + driverIdsString + ')\n' +
            'GROUP BY ("driverId",month)\n' +
            'ORDER BY "driverId" ASC, month DESC;';

    const results = await Driver.connectionInstance.query(rawQuery, {
      raw: true,
      type: Sequelize.QueryTypes.SELECT,
      logging: false,
    });
    return results;
  } catch (err) {
    console.error(err);
  }
};

DriverService.getDriverImages = async(driverId) => {
  var query = {
    where: { id: driverId },
  };

  var driver = await Driver.scope('full').findOne(query);
  return driver && driver.toJSON ? driver.toJSON() : driver;
};

module.exports = DriverService;
