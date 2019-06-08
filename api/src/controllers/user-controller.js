'use strict';

var { UserService, DriverService } = require('../services');
var { moment } = require('../config/dependencies');

var UserController = {};

UserController.name = 'UserController';

UserController.list = async(req, res, next) => {
  try {
    var users = await UserService.list(req.query.page);
    res.json(users);
  } catch (err) {
    next(err);
  }
};

UserController.listClients = async(req, res, next) => {
    try {
        var clients = await UserService.list(req.query.page, false, 'client');
        res.json(clients);
    } catch (err) {
        next(err);
    }
};


UserController.listDrivers = async(req, res, next) => {
  try {
    var drivers = await UserService.list(req.query.page, true);
    drivers.summaries = await UserController.getSummaries(drivers.pageContents);
    res.json(drivers);
  } catch (err) {
    next(err);
  }
};

UserController.getSummaries = async(users) => {
  const driversIds = users.map(function(user) {
    return user.driverData.id;
  });
  const summaries = await DriverService.getSummariesForDrivers(driversIds);

  var summariesForDriver = {};
  driversIds.forEach(function(driverId) {
    summariesForDriver[driverId] = {
      current: {
        trips: '0',
        money: '0',
      },
      previous: {
        trips: '0',
        money: '0',
      },
    };
  });

  const currentMonth = moment().format('YYYY-MM');
  const previousMonth = moment().subtract(1, 'months').format('YYYY-MM');
  summaries.forEach(function(item) {
    if (item.month === currentMonth){
      summariesForDriver[item.driverId]['current'] = {
        money: item.total_money,
        trips: item.total_trips,
      };
    }
    if (item.month === previousMonth){
      summariesForDriver[item.driverId]['previous'] = {
        money: item.total_money,
        trips: item.total_trips,
      };
    }
  });

  return summariesForDriver;
};

UserController.retrieve = async(req, res, next) => {
  try {
    var user = await UserService.getById(req.params.userId);
    user ? res.json(user) : res.status(404).send();
  } catch (err) {
    next(err);
  }
};

UserController.update = (req, res) => {
  res.send('User updated');
};

UserController.updateDriverStatus = async(req, res, next) => {
  try {
    delete req.body.id;

    // start by checking if driver is enabled to work.
    var driver = await DriverService.getById(req.user.driverData.id);
    if (!driver.enabledToDrive) {
      return res.status(403).send('Not enabled to work');
    }

    await DriverService.update(
      req.user.driverData.id,
      req.body
    );

    if (req.body.tripOffer) {
      await DriverService.updateTripOffer(
        req.user.driverData.id,
        req.body.tripOffer.id,
        req.body.tripOffer.status
      );
    }

    var updated = await UserService.getById(
      req.user.id,
      'driverStatusUpdate'
    );

    updated = updated.toJSON ? updated.toJSON() : updated;
    var result = updated.driverData;
    if (result.trips.length === 1) {
      result.tripOffer = result.trips[0];
      result.tripOffer.status = result.tripOffer.DriverTripOffer.status;
      delete result.tripOffer.DriverTripOffer;
    } else if (result.trips.length > 1) {
      // If we get here, we're in violation of the business rules.
      var e = new Error();
      e.name = 'MultipleTripOffers';
      throw e;
    }

    delete result.trips;
    res.json(result);
  } catch (err) {
    next(err);
  }
};

UserController.delete = async(req, res, next) => {
  try {
    var deleted = await UserService.delete(req.params.userId);
    deleted ? res.send() : res.status(404).send();
  } catch (err) {
    next(err);
  }
};

module.exports = UserController;
