'use strict';

var { User } = require('../models');

var UserService = {};

UserService.name = 'UserService';

UserService.create = async(userData) => {
  return await User.create(userData);
};

UserService.getById = async(userId) => {
  var user = await User.findByPk(userId);
  return user;
};

module.exports = UserService;
