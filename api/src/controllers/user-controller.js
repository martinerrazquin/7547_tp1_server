'use strict';

var { UserService } = require('../services');

var UserController = {};

UserController.name = 'UserController';

UserController.create = async(req, res) => {
  var user = await UserService.create(req.body);
  res.json(user);
};

UserController.retrieve = async(req, res) => {
  var user = await UserService.getById(req.params.userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send();
  }
};

UserController.update = (req, res) => {
  res.send('User updated');
};

UserController.delete = (req, res) => {
  res.send('User deleted');
};

module.exports = UserController;
