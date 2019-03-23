'use strict';

var { User } = require('../models');

var UserController = {};

UserController.name = 'UserController';

UserController.create = (req, res) => {
  User.create(req.body)
    .then((user) => res.json(user));
};

UserController.retrieve = (req, res) => {
  User.findByPk(req.params.userId)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).send();
      }
    });
};

UserController.update = (req, res) => {
  res.send('User updated');
};

UserController.delete = (req, res) => {
  res.send('User deleted');
};

module.exports = UserController;
