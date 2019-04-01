'use strict';

var { User } = require('../models');

var UserService = {};

UserService.name = 'UserService';

UserService.create = async(userData) => {
  return await User.create(userData);
};

UserService.getById = async(userId) => {
  return await User.findByPk(userId);
};

module.exports = UserService;
