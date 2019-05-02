'use strict';

var { UserService } = require('../services');

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

UserController.delete = async(req, res, next) => {
  try {
    var deleted = await UserService.delete(req.params.userId);
    deleted ? res.send() : res.status(404).send();
  } catch (err) {
    next(err);
  }
};

module.exports = UserController;
