'use strict';

var { UserService, DriverService } = require('../services');

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
    req.user.driverData = await DriverService.update(
      req.user.driverData.id,
      req.body
    );

    res.json(req.user);
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
