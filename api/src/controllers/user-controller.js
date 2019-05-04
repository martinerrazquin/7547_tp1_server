'use strict';

var { UserService, DriverService } = require('../services');

var UserController = {};

UserController.name = 'UserController';

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
    await DriverService.update(
      req.user.driverData.id,
      req.body
    );

    if (req.body.tripOffer.accepted === true) {
      DriverService.acceptTripOffer(req.user.driverData.id, req.body.tripOffer.id);
    }

    var updated = await UserService.getById(
      req.user.id,
      'driverStatusUpdate'
    );

    updated = updated.toJSON ? updated.toJSON() : updated;
    var result = updated.driverData;
    if (result.trips.length === 1) {
      result.tripOffer = result.trips[0];
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
