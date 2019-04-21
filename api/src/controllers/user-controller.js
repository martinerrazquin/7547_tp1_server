'use strict';

var { UserService } = require('../services');

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

UserController.delete = (req, res) => {
  res.send('User deleted');
};

module.exports = UserController;
